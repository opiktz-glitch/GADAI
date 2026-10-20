/**
 * lib/wa.ts
 *
 * Helper murni untuk formatting nomor WhatsApp / telepon.
 *
 * PENTING: file ini TIDAK boleh meng-import `@/lib/kota` maupun
 * `@/lib/firebase`, karena dua modul itu memakai `firebase-admin`
 * (server-only) dan akan menggagalkan build komponen client.
 * Modul ini aman dipakai di server maupun client component.
 */

/**
 * Nomor WhatsApp fallback (dipakai hanya bila config belum tersedia di DB).
 * Format kanonik: digit saja, tanpa "+" dan tanpa spasi (contoh: 628xxxxxxxxxx).
 */
export const DEFAULT_WHATSAPP = "6287724039666";

/**
 * Normalisasi nomor WhatsApp menjadi digit saja.
 * Menolak "+", spasi, tanda hubung, dan karakter non-digit sehingga
 * format yang diketik user di Admin CMS tidak pernah merusak link wa.me / tel:.
 */
export function normalizeWaNumber(raw?: string | null): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  return digits || DEFAULT_WHATSAPP;
}

/**
 * Link WhatsApp dengan nomor yang sudah ternormalisasi.
 * wa.me hanya menerima digit — "+" atau spasi akan membuat link rusak.
 */
export function waLink(no?: string | null, message = ""): string {
  const base = `https://wa.me/${normalizeWaNumber(no)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Nomor telepon format E.164 (disertakan "+") untuk JSON-LD `telephone`
 * dan link `tel:`. Google/Anggaran lokal lebih mengenali format dengan "+".
 */
export function telNumber(no?: string | null): string {
  return `+${normalizeWaNumber(no)}`;
}
