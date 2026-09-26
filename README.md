# PSEO Starter — Simulasi Gadai BPKB per Kota

Starter project Next.js (App Router) untuk halaman programmatic SEO
per kota, dengan ISR-ready static generation dan sitemap otomatis.

## Cara jalanin

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Cara menambah kota baru

Cukup tambah 1 objek baru di `data/kota.json`. Halaman baru otomatis
ter-generate di build berikutnya (via `generateStaticParams`), dan
otomatis masuk ke `sitemap.xml`. Tidak perlu sentuh kode.

**Wajib diisi berbeda-beda per kota** (supaya tidak dianggap konten
tipis/duplikat oleh Google):
- `estimasi_pencairan_min` / `max` — angka riil, bukan sama semua kota
- `nama_marketing_lokal`, `alamat_cabang_utama` — data cabang asli
- `testimoni` — testimoni lokal asli, bukan template
- `kendaraan_populer` — sesuaikan tren kendaraan di kota tsb

## Struktur

```
data/kota.json                              → sumber data semua kota
app/simulasi-gadai-bpkb-[kota]/page.tsx      → 1 template, di-render per kota
app/sitemap.ts                               → sitemap.xml otomatis dari kota.json
lib/kota.ts                                  → helper ambil & format data
```

## Build untuk produksi

```bash
npm run build
```

Deploy ke Vercel: hubungkan repo, tidak perlu config tambahan —
Next.js terdeteksi otomatis.

## Sebelum live: cek helpful-content risk

- Ganti domain contoh di `app/sitemap.ts` dengan domain asli.
- Pastikan tidak ada 2 halaman kota dengan teks >90% identik.
- Tambahkan Google Search Console + GA4 begitu domain live.
