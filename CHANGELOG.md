# Changelog

Semua perubahan penting pada proyek **Gadai Pojok Berkah — PSEO Platform** dicatat di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/) dan [Semantic Versioning](https://semver.org/lang/id/).
Tanggal memakai zona `Asia/Jakarta` (WIB).

---

## [Unreleased]

### Ditambahkan
- **`app/admin/layout.tsx`**: Layout proteksi SEO khusus rute admin dengan metadata `robots: { index: false, follow: false, nocache: true }` (`<meta name="robots" content="noindex, nofollow, noarchive" />`).
- **HTTP Header `X-Robots-Tag: noindex, nofollow`** di `middleware.ts` untuk respons halaman `/admin` (baik status 401 maupun login valid), memastikan bot pencari membaca arahan noindex langsung pada level HTTP header.
- **`app/faq/page.tsx`**: Menambahkan Schema.org JSON-LD `FAQPage` terstruktur untuk 7 pertanyaan umum, mendukung Google Rich Snippets / SERP Accordion, menambahkan canonical `/faq`, serta membuat nomor WhatsApp dinamis dari `config`.
- **OpenGraph & Twitter Card Image (`public/og-image.jpg`)**: Memasang thumbnail banner resmi AXI Adira Beraxi di `app/layout.tsx` dan `app/page.tsx` dengan resolusi 1200×630px untuk kartu pratinjau sosial media & WhatsApp.
- **Floating WhatsApp Hub (`app/simulasi-gadai-bpkb/page.tsx`)**: Memasang tombol melayang WhatsApp dinamis untuk mempermudah calon nasabah berkonsultasi langsung saat memilih wilayah.
- **Schema.org `WebSite` (`app/layout.tsx`)**: Menambahkan structured data `WebSite` dengan nama resmi "Gadai Pojok Berkah" untuk memunculkan Google Site Name resmi di hasil pencarian.
- **Pencarian Cepat Kota & Provinsi (`app/simulasi-gadai-bpkb/ProvinsiSearchGrid.tsx`)**: Menyediakan fitur pencarian instan (*live search filter*) di halaman hub `/simulasi-gadai-bpkb` lengkap dengan chip navigasi langsung ke halaman kota dan filter dinamis kartu provinsi.

### Diubah
- **Template Pesan WhatsApp**: Memperbarui seluruh link dan tombol WhatsApp di seluruh halaman (`Header`, `Beranda`, `Simulasi Kota & Provinsi`, `Produk`, `Layanan`, `Tentang Kami`, `FAQ`, dan `Tabel Angsuran`) dengan salam pembuka "Halo" serta mencantumkan nama website **Gadai Pojok Berkah (gadai.pojokberkah.online)** secara eksplisit agar admin dapat langsung mengenali asal rujukan nasabah.
- **Rebranding Domain & Identitas Website**: Domain resmi beralih ke `https://gadai.pojokberkah.online` dan nama website diselaraskan menjadi **`Gadai Pojok Berkah`** (`layout.tsx`, `page.tsx`, `actions.ts` prompt AI, Breadcrumbs JSON-LD).
- **`app/robots.ts`**: Menghapus direktif `disallow: '/admin/'` dan menerapkan `allow: '/'` penuh sesuai panduan resmi Google Search Central agar Googlebot dapat merayapi dan membaca arahan `noindex`.
- **`app/sitemap.ts`**: Menghapus rute lama yang 404 (`/produk/kredit-kendaraan-bekas`), menambahkan 5 landing page produk aktual dan 3 rute layanan dengan prioritas & `changeFrequency` proporsional.
- **Pembersihan Aset Eksternal**: Mengganti URL tekstur pihak ketiga `transparenttextures.com` di halaman detail kota menjadi pola murni CSS dot grid pattern.

### Diperbaiki
- Sinkronisasi sitemap 100% bebas dari broken links / 404, seluruh URL menghasilkan HTTP 200.

### Catatan & Rekomendasi Rilis Mendatang
- **Google Analytics 4 & Event Tracking**: Pelacakan impresi dan klik tombol WhatsApp konversi leads per kota.
- **Optimasi Query Firestore (>1.000 Kota)**: Query Firestore berindeks `collection.where("provinsi", "==", ...)` untuk skala besar.

---

## [0.5.0] - 2026-10-12

### Dihapus
- **SQLite sepenuhnya dihapus** sesuai permintaan `hapus semua sqlite`: `schema_sqlite.sql`, `migrations/001–004`, `lib/db/*`, `scripts/migrate-sqlite.ts`, `tests/migration-parity.test.ts`, `types/node-sqlite.d.ts`, `data/app.db*` dihapus; `package.json`/`tsconfig.json`/`.gitignore` dikembalikan ke state Firebase-only. Validasi: `git status` clean, `tsc --noEmit` 0 error. Stack DB kembali **Firebase-only** (Firestore Admin SDK).

### Ditambahkan (sesi SQLite yang kini di-revert — untuk arsip)
- Skema SQLite berversi `schema_sqlite.sql` v004 + migrasi incremental `001_initial` → `004_final_sync` (rebuild `_new_*` + `INSERT SELECT COALESCE`, `schema_migrations` tracking, WAL + `foreign_keys ON`).
- `lib/db/migrate.ts` (`node:sqlite` `DatabaseSync` — Node 24) + CLI `scripts/migrate-sqlite.ts` (`migrate`/`--fresh`) + 6 parity tests (`node --experimental-strip-types --test`, 6/6 pass).

---

## [0.4.0] - 2026-10-07

### Ditambahkan
- **Arsitektur SEO Silo** penuh: `/simulasi-gadai-bpkb` (hub) → `/[provinsi]` → `/[provinsi]/[kota]` dengan `generateStaticParams`, ISR `revalidate = 86400`, `cache()` React, `LocalBusiness` + `BreadcrumbList` JSON-LD, dan internal linking 4 kota terkait se-provinsi.
- **Admin CMS 2-tab** (`pengaturan` & `artikel`): CRUD kota, `CatatanLokalInput`, `AIGenerator`, `ArticleTable`/`AllArticlesTable`, `ArticleAssignmentForm`, `ToastNotification`.
- **Bank Artikel + distribusi 3 level**: `articles` → `config.main.assignedArticleId` (pusat), `config.main.provinsiArticles[slug]` (provinsi), `kota.assignedArticleId` (kota) + `allowRandom` lock + `randomizeArticlePlacement` (shuffle batch).
- **AI Generator**: Gemini `gemini-2.5-flash-lite` single-pass batch Markdown + placeholder `[NAMA_KOTA]`/`[JUMLAH_CABANG]` + `generateCatatanLokalAI()` hiperlokal per kota.
- **View tracking**: `POST /api/track-view` (`FieldValue.increment(1)` untuk `config/main` atau `kota/{slug}`) + `ViewTracker` client.
- **Tabel Angsuran**: `app/components/TabelAngsuran.tsx` (`TableMotor`/`TableMobil`) dipakai di `/produk/*` dan `/layanan/simulasi-angsuran`.
- **Sitemap & Robots**: `app/sitemap.ts` (provinsi + kota dinamis) + `app/robots.ts` (`Disallow: /admin/`).

### Diubah
- `lib/firebase.ts` — init Admin SDK via env vars (`FIREBASE_PROJECT_ID`/`CLIENT_EMAIL`/`PRIVATE_KEY` dengan `replace(/\\n/g,''\n'')`) fallback `firebase-service-account.json` (fs).
- `lib/kota.ts` — types `Kota`/`Config`/`Article` + helpers `getAllKota`, `getKotaBySlug`, `getUniqueProvinsi`, `getCitiesByProvinsiSlug`, `getConfig`, `getAllArticles`, `getArticleById`, `formatRupiah`, `slugify` — semua `cache()` kecuali articles.
- `middleware.ts` — Basic Auth `ADMIN_USERNAME`/`ADMIN_PASSWORD` untuk `/admin/:path*`.
- `next.config.js` — `output: standalone` + `rewrites: /simulasi-gadai-bpkb-:kota → /simulasi-gadai-bpkb/:kota`.

### Diperbaiki
- Optimasi delivery image (`sizes` attributes), kontras warna floating WhatsApp & Footer, compact city cards di halaman provinsi, Grid Cards untuk Persyaratan Dokumen, alignment langkah `cara-pengajuan`, mobile layout & loan timeline.

---

## [0.3.0] - 2026-10-06

### Ditambahkan
- **Header & Footer** final: `Header.tsx` (client, dropdown Produk/Layanan, mobile toggle kiri, logo `logo-axi-v3-web.png` 240×120 `sizes="150px"`) + `Footer.tsx` (banner `#ffed00` `footer-logo-2x.png`, kolom Info/Legal/Kontak AXI `Leni Suherman` `000019002675`).
- Halaman **Produk** 5 slug (`gadai-bpkb-mobil`, `gadai-bpkb-motor`, `kredit-baru`, `kredit-bekas`, `take-over-top-up`) — hero kuning + `TableMotor`/`TableMobil` + badge *Gratis Biaya Take Over*.
- Halaman **Layanan** 3 slug (`syarat-dan-proses` grid 5 kartu, `cara-pengajuan` timeline 4 langkah, `simulasi-angsuran` kedua tabel) — `app/layanan/[slug]/page.tsx`.
- Halaman `tentang-kami`, `faq` (7 Q&A), `kebijakan-privasi`, `lokasi` (redirect ke `/simulasi-gadai-bpkb`), `app/icon.png` (logo AXI favicon).
- `DATABASE.md` & `README.md` awal (arsitektur Silo, ISR, AI placeholder, WhatsApp CTA, Basic Auth, Vercel deploy).

### Diubah
- Rebranding domain ke `gadai.pojokberkah.online` / **AXI Marketing Adira Beraxi**: domain `gadai.pojokberkah.online` di `layout.tsx` `metadataBase`, `sitemap.ts` `BASE_URL`, `robots.ts`, Header/Footer, homepage hero.
- Homepage `app/page.tsx` — hero kuning, artikel perkenalan marketing, cabang utama Pungkur Bandung, FAQ homepage, floating CTA `WhatsAppButton`.
- `app/components/TabelAngsuran.tsx` interaktif + modal simulasi.

### Diperbaiki
- `logo size / cropping / header scale`, `banner #ffed00` match image, `footer colon alignment`, `wa.me` links di-strip dari Markdown homepage, `kota.no_hp → config.whatsapp_pusat`, markdown `[]()` spaces → `%20`, line breaks di dalam image links, font `next/font/google Inter`.

---

## [0.2.0] - 2026-10-06

### Ditambahkan
- `scripts/migrate.js` (CommonJS `require(firebase-service-account.json)` → `batch.set()` untuk `config`/`kota`/`articles` dari `data/*.json`).
- `data/kota.json` (3 kota: jakarta/bekasi/bandung), `data/config.json` (`whatsapp_pusat`), `data/articles.json` (2 seed).
- `Dockerfile` multi-stage (`node:18-alpine` deps → builder → runner `server.js` standalone).
- `.env.sample` (`GEMINI_API_KEY`, `ADMIN_USERNAME/PASSWORD`, `FIREBASE_*`).

### Diubah
- `package.json` → Next 15, React 19, `firebase-admin` 14.5, `react-markdown` 10, `remark-gfm` 4, `tailwindcss` 3.4, `lucide-react` 1.48.
- `tsconfig.json` — `strict`, `bundler` moduleResolution, `paths @/*`.

---

## [0.1.0] - 2026-09-30

### Ditambahkan
- Inisialisasi Next.js App Router + Tailwind + TypeScript (`app/layout.tsx`, `app/globals.css`).
- Rute awal PSEO dan komponen dasar.

---

## Catatan Versi & Tag

- Versi `package.json` saat ini `0.1.0` — belum di-bump mengikuti changelog ini (disarankan bump ke `0.5.0` atau `1.0.0` saat rilis berikutnya dan buat git tag `v0.5.0`).
- Riwayat commit lengkap: `git log --oneline --date=short` (terakhir `353c6ac Optimize image delivery by adding sizes attributes` 2026-10-07).

[Unreleased]: https://github.com/…/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/…/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/…/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/…/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/…/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/…/releases/tag/v0.1.0