# 🗄️ Dokumentasi Database — Firebase Firestore

> **Stack DB saat ini: Firebase Firestore (Admin SDK) — Firebase-only.** Tidak ada SQLite / Postgres. Semua baca-tulis lewat **Firebase Admin SDK di server** (`lib/firebase.ts`, `app/admin/actions.ts`, `app/api/track-view/route.ts`).

Firestore diakses via `getFirestore()` setelah `initializeApp(cert(...))`. Kredensial diambil dengan urutan:
1. **Env vars** `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` (Vercel / production) — `FIREBASE_PRIVATE_KEY` di-`replace(/\\n/g, ''\n'')` agar `\n` dari env tetap valid.
2. **Fallback file** `firebase-service-account.json` di root (local dev, `fs.readFileSync` + `JSON.parse`) — file ini di-`.gitignore`.

Semua helper Firestore di-cache React (`cache()` di `lib/kota.ts`) dan halaman silo memakai **ISR `revalidate = 86400`** — Firestore hanya di-hit saat build / revalidate, bukan tiap request.

---

## Ringkasan Koleksi

| Koleksi | Doc ID | Jumlah Dokumen | Deskripsi |
|---|---|---|---|
| `kota` | `slug` kota (`bandung`, `kab-bekasi`) | N kota (seed lokal 3) | 1 dokumen per cabang/kota — sumber halaman `[provinsi]/[kota]` |
| `articles` | `id` artikel (string, contoh `"1"` / `"1698765432100"`) | N artikel (seed 2) | Bank artikel Markdown — di-assign ke homepage / provinsi / kota |
| `config` | `main` (singleton) | 1 | Konfigurasi global (WA pusat, mapping artikel, views) |

---

## 1. Koleksi `kota`

**Document ID = `slug`** (lowercase, hyphen). Slug juga dipakai untuk URL: `/simulasi-gadai-bpkb/{provinsi-slug}/{kota-slug}` dengan `provinsi-slug = slugify(provinsi)`.

### TypeScript (`lib/kota.ts`)

```ts
export type Kota = {
  slug: string;                  // doc ID + URL slug
  nama_kota: string;             // tampil di UI, mis. "Bandung"
  provinsi: string;              // nama provinsi asli, mis. "Jawa Barat" (di-slugify untuk URL)
  jumlah_cabang: number;
  estimasi_pencairan_min: number; // IDR
  estimasi_pencairan_max: number; // IDR
  waktu_proses_jam: number;       // jam, mis. 2
  nama_marketing_lokal: string;
  testimoni: string;
  alamat_cabang_utama: string;
  kendaraan_populer: string[];    // ["Toyota Avanza", "Honda Beat"]
  artikel_seo?: string;           // catatan hiperlokal per-kota (plain text, diisi manual atau generateCatatanLokalAI)
  assignedArticleId?: string;     // FK → articles.id (artikel yang menempel di kota ini)
  views?: number;                 // increment via POST /api/track-view {location: slug}
  allowRandom?: boolean;          // false = dikunci (tidak ikut shuffle acak), default true-ish
};
```

### Contoh Dokumen

```json
{
  "slug": "bandung",
  "nama_kota": "Bandung",
  "provinsi": "Jawa Barat",
  "jumlah_cabang": 12,
  "estimasi_pencairan_min": 5000000,
  "estimasi_pencairan_max": 500000000,
  "waktu_proses_jam": 2,
  "nama_marketing_lokal": "Budi Santoso",
  "testimoni": "Prosesnya cepat banget, dana cair dalam 2 jam di cabang Kelapa Gading.",
  "alamat_cabang_utama": "Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara",
  "kendaraan_populer": ["Toyota Avanza", "Honda Beat", "Mitsubishi Xpander"],
  "artikel_seo": "Layanan gadai BPKB Bandung adalah solusi terbaik ... Gratis biaya take over ...",
  "assignedArticleId": "1698765432100",
  "views": 42,
  "allowRandom": false
}
```

### Catatan
- `getAllKota()` / `getKotaBySlug(slug)` / `getCitiesByProvinsiSlug(provSlug)` / `getUniqueProvinsi()` semuanya `cache()`.
- `slugify()` : `toLowerCase → s/\s+/-/ → s/[^\w-]// → s/--+/ -/ → trim -`.
- `allowRandom === false` dipakai `randomizeArticlePlacement` & `assignArticleToKota` untuk mengunci kota agar tidak di-acak.

---

## 2. Koleksi `articles`

Bank artikel Markdown yang di-generate Gemini atau ditulis manual di Admin → dipakai di 3 level (pusat / provinsi / kota) via placeholder.

### TypeScript

```ts
export type Article = {
  id: string;        // doc ID, dipakai sebagai FK di kota/config
  content: string;   // Markdown (boleh mengandung HTML <img>, link, heading)
  metaDesc?: string; // <meta name="description"> — dipakai generateMetadata()
  source?: string;   // asal generate, mis. "gemini" / "manual"
  createdAt?: number;// epoch ms (Date.now())
  shortId?: string;  // 6-char untuk label UI (opsional, tidak dipakai di Firestore saat ini)
};
```

### Contoh Dokumen

```json
{
  "id": "1698765432100",
  "content": "# Panduan Gadai BPKB di [NAMA_KOTA]\\nKini warga [NAMA_KOTA] dengan [JUMLAH_CABANG] cabang ...",
  "metaDesc": "Simulasi gadai BPKB di [NAMA_KOTA] — [JUMLAH_CABANG] cabang, cair 2 jam.",
  "source": "gemini",
  "createdAt": 1728260000000
}
```

### Placeholder (wajib dipahami)
- `[NAMA_KOTA]` → diganti `nama_kota` / `provinsiName` saat render (`replace(/\[NAMA_KOTA\]/gi, ...)`).
- `[JUMLAH_CABANG]` → diganti `jumlah_cabang` / `jumlah kota di provinsi`.
- `cleanMetaDesc(metaDesc, kota, cabang)` (`lib/kota.ts`) → fungsi otomatis untuk membersihkan `metaDesc` dari kurung siku luar (`[...]`), tanda kutip, dan me-replace variabel placeholder `[NAMA_KOTA]` (menjadi "seluruh Indonesia" jika di homepage) serta `[JUMLAH_CABANG]` agar pratinjau media sosial (WhatsApp Web, WhatsApp Mobile, Twitter/X) selalu rapi tanpa placeholder mentah.
- Di halaman kota/provinsi/homepage, link `wa.me` dan wrapper `[...](wa.me)` di-strip dari Markdown sebelum render agar tidak duplikat CTA (lihat `replace` chain di `app/simulasi-gadai-bpkb/[provinsi]/[kota]/page.tsx`).

---

## 3. Koleksi `config` — Dokumen `main`

Singleton — hanya `config/main` yang dipakai.

### TypeScript

```ts
export type Config = {
  whatsapp_pusat: string;                    // "6287724039666" — dipakai Header/Footer/CTA
  artikel_homepage?: string;                 // legacy: teks manual homepage (sebelum bank artikel)
  assignedArticleId?: string;                // FK → articles.id untuk homepage "/"
  views?: number;                            // increment via POST /api/track-view {location: "pusat"}
  allowRandom?: boolean;                     // (jarang dipakai di config)
  provinsiArticles?: Record<string, string>; // { "jawa-barat": "art-111", "dki-jakarta": "art-222" }
};
```

### Contoh Dokumen

```json
{
  "whatsapp_pusat": "6287724039666",
  "assignedArticleId": "art-999",
  "provinsiArticles": {
    "jawa-barat": "art-111",
    "dki-jakarta": "art-222"
  },
  "views": 128
}
```

---

## Relasi & Alur Data

```
articles {id} ──< assignedArticleId ── config.main.assignedArticleId      → Homepage "/"  (getArticleById)
articles {id} ──< assignedArticleId ── config.main.provinsiArticles[slug] → /simulasi-gadai-bpkb/[provinsi]
articles {id} ──< assignedArticleId ── kota.{slug}.assignedArticleId     → /simulasi-gadai-bpkb/[provinsi]/[kota]
```

1. **Homepage** — `getConfig()` → `config.assignedArticleId` → `getArticleById()` → render Markdown + `metaDesc` untuk `generateMetadata()`.
2. **Provinsi** — `config.provinsiArticles[provinsiSlug]` → artikel provinsi (fallback deskripsi auto jika kosong).
3. **Kota** — `kota.assignedArticleId` → artikel kota (fallback teks statis edukatif jika kosong) + `kota.artikel_seo` (Catatan Lokal) selalu tampil di bawah artikel utama.

Semua relasi diselesaikan **server-side** (Server Components / Server Actions) — tidak ada query client-side.

---

## Operasi Tulis

| Aksi (Admin) | Fungsi | Koleksi | Metode |
|---|---|---|---|
| Update WA & artikel_homepage | `updateConfig()` | `config/main` | `set(newConfig)` + `revalidatePath("/", "layout")` |
| Tambah kota | `addKota()` | `kota/{slug}` | `doc(slug).get()` cek duplikat → `set(newKota)` |
| Hapus kota | `deleteKota()` | `kota/{slug}` | `delete()` |
| Edit kota | `editKota()` | `kota/{slug}` | `get()` → `set()` (atau `update` jika slug tidak berubah) |
| Tambah artikel manual | `addArticle()` | `articles/{id}` | `set({id, content, createdAt})` |
| Generate AI batch | `generateArticleAI()` | `articles/*` | Gemini `generateContent` → `batch.set()` per artikel |
| Hapus artikel | `deleteArticle()` | `articles/{id}` | `delete()` + bersihkan FK di `kota` & `config` |
| Assign artikel ke kota/provinsi/pusat | `assignArticleToKota()` | `kota/{slug}` atau `config/main` | `update({assignedArticleId})` / `set({provinsiArticles}, {merge:true})` |
| Acak penempatan | `randomizeArticlePlacement()` | `kota/*` + `config/main` | `batch.update()` shuffle, hormati `allowRandom === false` |
| Catatan lokal AI per kota | `generateCatatanLokalAI(kotaName)` | — (return text, simpan via `editKota`) | Gemini `gemini-2.5-flash-lite:generateContent` |
| Tracking view | `POST /api/track-view` | `config/main` atau `kota/{slug}` | `FieldValue.increment(1)` |

---

## Seed & Migrasi Lokal

```bash
# 1. Edit seed lokal
#    data/kota.json      — array Kota (3 contoh: jakarta, bekasi, bandung)
#    data/config.json    — { whatsapp_pusat }
#    data/articles.json  — [{id, content}, ...]

# 2. Push ke Firestore (butuh firebase-service-account.json di root)
node scripts/migrate.js
#   → batch.set() untuk config (doc main), kota (per slug), articles (per id)
```

`scripts/migrate.js` memakai `require("../firebase-service-account.json")` langsung (CommonJS) — bukan env vars. Untuk production/Vercel, seeding dilakukan manual atau via Admin CMS.

---

## Index & Security Notes

- Tidak ada composite index Firestore yang dibutuhkan saat ini — semua query adalah `collection.get()` atau `doc(slug).get()` (full scan + filter di memori via `getCitiesByProvinsiSlug`, `getUniqueProvinsi`). Jika kota > 1k, pertimbangkan `where("provinsi", "==", ...)` + index.
- **Rules Firestore** (jika diaktifkan): semua akses via Admin SDK bypass rules. Jika membuka akses client SDK di masa depan, kunci `kota`/`articles`/`config` ke `allow read: if true; allow write: if false;`.
- Jangan commit `firebase-service-account.json` / `.env.local` — keduanya di-`.gitignore`.

---

## File Terkait

- `lib/firebase.ts` — inisialisasi Admin SDK (env vars → fallback JSON)
- `lib/kota.ts` — types + `cache()` helpers + `slugify` + `formatRupiah`
- `data/kota.json`, `data/config.json`, `data/articles.json` — seed lokal
- `scripts/migrate.js` — migrasi JSON → Firestore
- `app/admin/actions.ts` — semua Server Actions tulis
- `app/api/track-view/route.ts` — increment views