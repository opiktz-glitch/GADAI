# 🚀 Gadai Pojok Berkah — Programmatic SEO (PSEO) Platform

Website rujukan & simulasi **Gadai BPKB** berskala PSEO untuk mendominasi pencarian *local SEO* di ratusan kota/provinsi Indonesia. Dibangun dengan **Next.js 15 (App Router)**, **Firebase Firestore (Admin SDK)**, **Tailwind CSS**, dan **Google Gemini AI**.

**Domain Live:** [https://gadai.pojokberkah.online](https://gadai.pojokberkah.online)

---

## ✨ Fitur Utama

| Area | Detail |
|---|---|
| **Arsitektur SEO Silo** | `/simulasi-gadai-bpkb` (hub) → `/simulasi-gadai-bpkb/[provinsi]` → `/simulasi-gadai-bpkb/[provinsi]/[kota]` — distribusi *link juice* + internal linking antar kota se-provinsi |
| **SSG + ISR** | Semua halaman silo & produk/layanan `revalidate = 86400` (24 jam) + `cache()` React — Firestore hanya di-hit saat build/revalidate |
| **Rich OpenGraph & WhatsApp Preview** | Banner resmi 1200×630px (`public/og-image.jpg`), sanitasi otomatis `cleanMetaDesc()` (bebas kurung siku `[...]` dan placeholder mentah) untuk pratinjau sempurna di WhatsApp Web, WhatsApp Mobile, dan medsos |
| **Live Search Kota & Provinsi** | Pencarian instan (*live search filter*) di hub `/simulasi-gadai-bpkb` (`ProvinsiSearchGrid.tsx`) dengan chip navigasi langsung ke halaman kota |
| **Structured Data & Google Site Name** | Schema.org `WebSite` ("Gadai Pojok Berkah") di `layout.tsx`, `FAQPage` di `/faq`, `LocalBusiness` + `BreadcrumbList` di halaman kota |
| **AI Article Generator** | Gemini `gemini-2.5-flash-lite` — batch Markdown + placeholder `[NAMA_KOTA]`/`[JUMLAH_CABANG]` yang di-replace saat render |
| **Catatan Lokal AI** | `generateCatatanLokalAI()` — 3–4 kalimat hiperlokal per kota (keyword wajib `Layanan gadai BPKB {kota}`) |
| **Smart WhatsApp CTA & Branding** | Salam ramah "Halo", identifikasi rujukan website `Gadai Pojok Berkah (gadai.pojokberkah.online)` di semua tombol & tabel angsuran, plus Floating CTA di hub wilayah |
| **Admin CMS** | 2 tab (`pengaturan` & `artikel`) — CRUD kota, assign/acak artikel, bank artikel, generate AI, tracking views |
| **Proteksi SEO Multi-Lapis Admin** | Basic Auth (`middleware.ts`), HTTP Header `X-Robots-Tag: noindex, nofollow`, dan `<meta name="robots" content="noindex, nofollow, noarchive" />` di `admin/layout.tsx` |

---

## 🗺️ Peta Rute

| Rute | Tipe | Sumber Data |
|---|---|---|
| `/` | Homepage + artikel pusat (`config.assignedArticleId`) | `getConfig()` + `getArticleById()` |
| `/simulasi-gadai-bpkb` | Hub provinsi (grid provinsi) | `getUniqueProvinsi()` |
| `/simulasi-gadai-bpkb/[provinsi]` | Listing kota per provinsi + artikel provinsi (`config.provinsiArticles[slug]`) | `getCitiesByProvinsiSlug()` |
| `/simulasi-gadai-bpkb/[provinsi]/[kota]` | Detail kota (hero, estimasi cair, testimoni, artikel placeholder + catatan lokal, related cities) | `getKotaBySlug()` |
| `/produk/gadai-bpkb-mobil` | Produk — tabel `TableMobil` | statis |
| `/produk/gadai-bpkb-motor` | Produk — tabel `TableMotor` | statis |
| `/produk/kredit-baru` | Kredit kendaraan baru | statis |
| `/produk/kredit-bekas` | Kredit kendaraan bekas | statis |
| `/produk/take-over-top-up` | Take Over & Top Up (Gratis Biaya Take Over) | statis |
| `/layanan/syarat-dan-proses` | Grid 5 kartu persyaratan dokumen | statis |
| `/layanan/cara-pengajuan` | Timeline 4 langkah | statis |
| `/layanan/simulasi-angsuran` | `TableMotor` + `TableMobil` | statis |
| `/tentang-kami` | Profil Marketing Resmi AXI | `getConfig()` (WA) |
| `/faq` | 7 Q&A | statis |
| `/kebijakan-privasi` | Kebijakan privasi | statis |
| `/lokasi` | `redirect("/simulasi-gadai-bpkb")` | — |
| `/sitemap.xml` | `app/sitemap.ts` — static + provinsi + kota | Firestore |
| `/robots.txt` | `app/robots.ts` — `Allow: /`, deklarasi Sitemap resmi | — |
| `/api/track-view` | `POST {location}` → `FieldValue.increment(1)` | Firestore |

---

## 🧱 Stack & Versi

- **Next.js** `^15.0.0` (`output: standalone`, `next/font Inter`, `rewrites: /simulasi-gadai-bpkb-:kota → /simulasi-gadai-bpkb/:kota`)
- **React** `^19.0.0` + `react-markdown` `^10.1.0` + `remark-gfm` `^4.0.1`
- **firebase-admin** `^14.5.0` (Firestore Admin SDK)
- **Tailwind CSS** `^3.4.0` + `@tailwindcss/typography` `^0.5.20` + `lucide-react` `^1.48.0`
- **TypeScript** `^5.5.0` (strict), **Node** 18+ (Docker `node:18-alpine`)

---

## 📁 Struktur Proyek

```
app/
  admin/            # CMS (layout.tsx with noindex, page.tsx, actions.ts, AIGenerator, ArticleTable, …)
  api/track-view/   # POST increment views (config/kota)
  components/       # Header (client, dropdown Produk/Layanan), Footer (banner OJK), TabelAngsuran, WhatsAppButton, ViewTracker
  simulasi-gadai-bpkb/
    page.tsx                 # Hub provinsi
    [provinsi]/page.tsx      # Provinsi → grid kota (ISR 86400)
    [provinsi]/[kota]/page.tsx # Kota → LocalBusiness + Breadcrumb JSON-LD (ISR 86400)
  produk/[slug]/page.tsx     # 5 produk (hero kuning, TabelAngsuran)
  layanan/[slug]/page.tsx    # 3 layanan (syarat/cara/simulasi)
  tentang-kami/, faq/, kebijakan-privasi/, lokasi/ (redirect)
  layout.tsx        # Inter font, Header/Footer, SEO metadataBase
  sitemap.ts / robots.ts / globals.css / icon.png
lib/
  firebase.ts       # Admin SDK init (env vars → fallback firebase-service-account.json)
  kota.ts           # Types + cache() helpers (getAllKota, getKotaBySlug, getUniqueProvinsi, getCitiesByProvinsiSlug, getConfig, getAllArticles, getArticleById, formatRupiah, slugify)
data/
  kota.json / config.json / articles.json   # seed lokal
scripts/migrate.js  # node scripts/migrate.js → push data/*.json ke Firestore via batch
middleware.ts       # Basic Auth untuk /admin
next.config.js      # rewrites + output standalone
Dockerfile          # multi-stage (deps → builder → runner)
```

---

## 🗄️ Database

Firebase Firestore — detail skema lihat **`DATABASE.md`**.

Ringkasan: `kota/{slug}` (1 dok per kota), `articles/{id}` (bank artikel Markdown + `metaDesc`), `config/main` (singleton `whatsapp_pusat`, `assignedArticleId`, `provinsiArticles`, `views`). Semua akses via **Admin SDK di server** — tidak ada akses client-side.

---

## 🛠️ Instalasi & Pengembangan Lokal

### 1. Prasyarat
- Node.js 18+, akun Firebase (Firestore enabled), Gemini API Key (opsional tapi wajib untuk fitur AI)

### 2. Environment
Salin `.env.sample` → `.env.local` lalu isi:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123
FIREBASE_PROJECT_ID=project-anda
FIREBASE_CLIENT_EMAIL=...@project-anda.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GEMINI_API_KEY=AIzaSy...
```

> Lokal tanpa env vars tetap bisa jalan jika ada `firebase-service-account.json` di root (di-`fs.readFileSync` di `lib/firebase.ts`). File ini di-`.gitignore`.

### 3. Jalan lokal
```bash
npm install
npm run dev        # http://localhost:3000  |  http://localhost:3000/admin
npm run build      # build standalone
npm start          # jalankan build standalone
npm run lint
```

### 4. Seed / migrasi Firestore
```bash
# Edit data/kota.json, data/config.json, data/articles.json sesuai kebutuhan
node scripts/migrate.js
```

---

## 🚀 Deploy ke Vercel

1. Push repo ke GitHub → Import di Vercel (auto-detect Next.js).
2. Isi **Environment Variables** Vercel dengan semua key dari `.env.local` (perhatikan `FIREBASE_PRIVATE_KEY` — jaga `\\n` tetap valid).
3. Deploy — `next build` dengan output `standalone` (juga kompatibel Docker).

Alternatif Docker: `docker build -t pseo . && docker run -p 3000:3000 pseo` (runner `node server.js`).

---

## 🔒 Keamanan & Kuota

- `/admin` dilindungi **Basic Auth** via `middleware.ts` (`WWW-Authenticate: Basic realm="Secure Admin Area"`). Ganti kredensial sebelum production.
- Spark (gratis) 50k reads / 20k writes / hari — aman karena **ISR + `cache()`** (hit Firestore hanya saat build/revalidate). Satu-satunya write per visit adalah `/api/track-view`.
- Jangan commit `.env.local` / `firebase-service-account.json`.

---

## 📌 Rekomendasi & Roadmap Pengembangan Selanjutnya
 
1. **Google Analytics 4 & Event Tracking**: Mengintegrasikan GA4 / Google Tag Manager untuk melacak impresi serta event klik tombol WhatsApp per halaman kota (mengukur konversi leads).
2. **Optimasi Query Firestore (>1.000 Kota)**: Mengoptimalkan `getCitiesByProvinsiSlug` menggunakan query Firestore berindeks `collection.where("provinsi", "==", ...)` menggantikan pemfilteran in-memory saat data kota bertambah besar.
3. **PWA (Progressive Web App)**: Dukungan manifest PWA dan service worker untuk pengalaman aplikasi mobile yang lebih cepat dan offline caching pada halaman simulasi.

---

## 📜 Changelog

Lihat **`CHANGELOG.md`** (format *Keep a Changelog*) untuk riwayat versi lengkap.

---

## 📄 Lisensi

Private — Hak cipta AXI Marketing Adira Beraxi.