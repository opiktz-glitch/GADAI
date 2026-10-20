/**
 * lib/rate-limit.ts
 *
 * Rate limiting untuk endpoint publik `/api/track-view`.
 *
 * DESAIN (2 lapis):
 * - L1 "fast path": counter in-memory per instance. Nol biaya Firestore, jadi
 *   scraper/loop-refresh diblokir SEBELUM menyentuh Firestore (melindungi kuota read).
 * - L2 "budget global": counter harian di Firestore. Hard cap absolut yang
 *   menutup celah botnet multi-IP (per-IP saja tidak cukup menjaga kuota).
 *
 * Catatan: counter in-memory TIDAK konsisten antar instance serverless. Itu
 * disengaja — L1 adalah lapisan pertahanan pertama yang Murah, L2 yang
 * menjamin batas mutlak. Kombinasi keduanya cukup untuk kasus pemakaian
 * aplikasi ini (PSEO, trafik rendah-menengah).
 */

import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase";

/** Jendela waktu untuk limit per-IP: 1 jam. */
const WINDOW_MS = 60 * 60 * 1000;

/** Maksimal request per IP per jam (per instance). */
export const MAX_REQUESTS_PER_IP_PER_HOUR = 20;

/** Maksimal view yang boleh dihitung per hari (seluruh traffic). */
export const MAX_VIEWS_PER_DAY = 5000;

/** Batas jumlah entri in-memory (proteksi memory leak). */
const MAX_MEMORY_BUCKETS = 10_000;

const COLLECTION = "rateLimit";

/**
 * Ambil IP klien dari header proxy.
 * Urutan mengikuti konvensi Vercel / reverse proxy umum.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    // Header bisa berisi daftar IP (proxy chain) — ambil yang pertama.
    const first = raw.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

/**
 * Hash IP agar alamat asli tidak tersimpan di Firestore (privasi) dan agar
 * panjang kunci tetap pendek. SHA-256 + 32 hex char.
 */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

/* -------------------------------------------------------------------------- */
/* L1 — Fast path in-memory                                                    */
/* -------------------------------------------------------------------------- */

type MemoryBucket = { count: number; resetAt: number };

/**
 * Bucket disimpan di `globalThis`, bukan di module scope biasa.
 *
 * Alasan: Next.js (terutama mode dev / App Router) dapat meng-evaluasi ulang
 * module route handler pada setiap request, sehingga `Map` di module scope
 * akan ter-reset dan rate limit selalu lolos. `globalThis` bertahan selama
 * عمر proses (lambda) sehingga state tetap konsisten antar request.
 */
const globalForRateLimit = globalThis as unknown as {
  __rateLimitBuckets?: Map<string, MemoryBucket>;
};

const memoryBuckets: Map<string, MemoryBucket> =
  globalForRateLimit.__rateLimitBuckets ?? (globalForRateLimit.__rateLimitBuckets = new Map());

/** Sweep bucket kedaluwarsa agar Map tidak tumbuh tanpa batas. */
function sweepMemory(now: number): void {
  if (memoryBuckets.size <= MAX_MEMORY_BUCKETS) return;
  for (const [key, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(key);
    if (memoryBuckets.size <= MAX_MEMORY_BUCKETS / 2) break;
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
  used: number;
}

/**
 * Periksa & konsumsi kuota per-IP di memori (L1).
 * Nol operasi Firestore.
 */
export function consumeMemoryLimit(ipHash: string): RateLimitResult {
  const now = Date.now();
  sweepMemory(now);

  const existing = memoryBuckets.get(ipHash);

  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(ipHash, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0, used: 1 };
  }

  if (existing.count >= MAX_REQUESTS_PER_IP_PER_HOUR) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      used: existing.count,
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0, used: existing.count };
}

/* -------------------------------------------------------------------------- */
/* L2 — Budget global harian (Firestore)                                        */
/* -------------------------------------------------------------------------- */

function todayKey(now = new Date()): string {
  return now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
}

/**
 * Periksa budget harian global (L2) lalu naikkan counter.
 *
 * Catatan:读 lalu write (bukan transaction) — trade-off yang disengaja.
 * Transaction pada satu "hot document" akan bottleneck & retry saat traffic
 * tinggi, sementara selisih beberapa request dari batas tidak masalah.
 *
 * @returns true bila view masih boleh dihitung.
 */
export async function consumeDailyBudget(): Promise<{ allowed: boolean; used: number }> {
  const key = todayKey();
  const ref = db.collection(COLLECTION).doc(`daily_${key}`);

  let used = 0;
  try {
    const snap = await ref.get();
    used = typeof snap.data()?.count === "number" ? snap.data()!.count : 0;
  } catch (e) {
    // Gagal baca budget -> jangan blokir tracking (fail-open, bukan fail-closed).
    console.warn("[rate-limit] gagal membaca budget harian:", (e as Error).message);
    return { allowed: true, used: 0 };
  }

  if (used >= MAX_VIEWS_PER_DAY) {
    return { allowed: false, used };
  }

  try {
    await ref.set(
      {
        count: FieldValue.increment(1),
        day: key,
        // TTL: hapus otomatis setelah 3 hari (butuh TTL policy aktif di Firestore).
        expireAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn("[rate-limit] gagal menulis budget harian:", (e as Error).message);
    return { allowed: true, used };
  }

  return { allowed: true, used: used + 1 };
}
