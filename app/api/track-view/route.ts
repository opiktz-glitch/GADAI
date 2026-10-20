import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import {
  consumeDailyBudget,
  consumeMemoryLimit,
  getClientIp,
  hashIp,
} from '@/lib/rate-limit';

/**
 * Format `location` yang sah.
 * - "pusat"   → dokumen config/main (ditangani terpisah)
 * - "<slug>"  → dokumen kota/{slug}
 *
 * Hanya huruf kecil, angka, dan tanda hubung yang diizinkan. Ini mencegah:
 * - path traversal ("config/main", "../../etc") yang bisa menyentuh dokumen
 *   di luar koleksi `kota`
 * - doc ID made-up yang mencemari Firestore dengan field `views`
 */
const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;

const LOCATION_KEY = 'pusat';

function isValidLocation(value: unknown): value is string {
  return typeof value === 'string' && SLUG_PATTERN.test(value);
}

export async function POST(req: Request) {
  try {
    /* ---------------------------------------------------------------- */
    /* 1. Rate limit L1 (in-memory, nol biaya Firestore)                 */
    /* ---------------------------------------------------------------- */
    const ipHash = hashIp(getClientIp(req));
    const memory = consumeMemoryLimit(ipHash);

    if (!memory.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: { 'Retry-After': String(memory.retryAfterSeconds) },
        }
      );
    }

    /* ---------------------------------------------------------------- */
    /* 2. Parse & validasi body                                          */
    /* ---------------------------------------------------------------- */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const location = (body as { location?: unknown } | null)?.location;

    if (location === undefined || location === null || location === '') {
      return NextResponse.json({ error: 'Missing location' }, { status: 400 });
    }

    if (!isValidLocation(location)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    const isPusat = location === LOCATION_KEY;
    const ref = isPusat
      ? db.collection('config').doc('main')
      : db.collection('kota').doc(location);

    /* ---------------------------------------------------------------- */
    /* 3. Pastikan dokumen benar-benar ada (404, bukan 500)               */
    /* ---------------------------------------------------------------- */
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Unknown location' }, { status: 404 });
    }

    /* ---------------------------------------------------------------- */
    /* 4. Rate limit L2 — budget global harian                           */
    /* ---------------------------------------------------------------- */
    const budget = await consumeDailyBudget();
    if (!budget.allowed) {
      // Kuota harian habis: responded 200 agar client tidak retry-loop,
      // tapi view tidak dihitung (analytics berhenti, situs tetap normal).
      return NextResponse.json({ success: true, counted: false });
    }

    /* ---------------------------------------------------------------- */
    /* 5. Catat view                                                     */
    /* ---------------------------------------------------------------- */
    await ref.update({ views: FieldValue.increment(1) });

    return NextResponse.json({ success: true, counted: true });
  } catch (err) {
    console.error('[track-view] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

