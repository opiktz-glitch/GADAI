# 🚀 Gadai BPKB Syariah - Programmatic SEO (PSEO) Platform

Website rujukan dan informasi gadai BPKB berskala raksasa, dirancang khusus untuk mendominasi pencarian SEO lokal (Local SEO) di berbagai kota dan provinsi di Indonesia. Proyek ini dibangun menggunakan **Next.js 15 (App Router)**, **Firebase Firestore**, dan terintegrasi dengan **Google Gemini AI**.

**Domain Live:** [https://gadaibpkbsyariah.com](https://gadaibpkbsyariah.com)

---

## ✨ Fitur & Arsitektur Unggulan

### 1. Arsitektur SEO Silo (Struktur Berjenjang)
Website ini dirancang menggunakan konsep arsitektur **Silo SEO** yang sangat disukai oleh Google untuk mendistribusikan *Link Juice* (Otoritas):
- **Level 1 (Global):** `/simulasi-gadai-bpkb` (Hub utama)
- **Level 2 (Provinsi):** `/simulasi-gadai-bpkb/[provinsi]` (Membidik keyword *mid-tail*)
- **Level 3 (Kota):** `/simulasi-gadai-bpkb/[provinsi]/[kota]` (Membidik keyword *hyper-local* / spesifik)

### 2. Rendering Cepat & Caching (SSG & ISR)
Memanfaatkan fitur Incremental Static Regeneration (ISR) dan React `cache`, website mampu men-*generate* ribuan halaman dengan kecepatan super cepat tanpa membebani kuota database Firebase. Firebase hanya dipanggil saat proses *build* atau *revalidate* di *background*.

### 3. AI Article Generator Terintegrasi
Panel admin dilengkapi AI (Google Gemini 1.5 Flash) yang memproduksi artikel SEO dan edukatif secara otomatis. 
Sistem memanfaatkan *placeholder* dinamis seperti `[NAMA_KOTA]` & `[JUMLAH_CABANG]` sehingga satu artikel utama bisa menempel di berbagai kota namun tetap terasa lokal.

### 4. Smart WhatsApp CTA
Tombol kontak WhatsApp otomatis melampirkan dari halaman kota/provinsi mana pengguna tersebut berasal, mempermudah tim marketing mengetahui konteks pelanggan.

### 5. Secure Admin CMS
Pengelolaan data kota, jumlah cabang, pengaturan nomor WhatsApp, dan publikasi artikel tersimpan aman di database NoSQL real-time (Firestore). Panel dilindungi oleh sistem keamanan berbasis *Basic Auth Middleware*.

---

## 🛠️ Instalasi & Pengembangan Lokal

### 1. Prasyarat
- Node.js versi 18+
- Akun Firebase (dengan service account key Firestore)
- Google Gemini API Key

### 2. Setup Environment Variables
Buat file `.env.local` di *root directory* dan isi kredensial berikut:

```env
# Kredensial Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123

# Firebase Server-side Credentials (didapat dari console firebase > project settings > service accounts)
FIREBASE_PROJECT_ID=project-anda
FIREBASE_CLIENT_EMAIL=email-anda
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Gemini AI API
GEMINI_API_KEY=AIzaSy...
```

### 3. Menjalankan Server Lokal
```bash
npm install
npm run dev
```
- Buka [http://localhost:3000](http://localhost:3000) untuk halaman publik.
- Buka [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke CMS.

---

## 🚀 Deployment ke Vercel (Produksi)

Sistem ini didesain agar sangat mulus saat di-*deploy* ke **Vercel**.
1. Push *repository* ini ke GitHub.
2. Buat project baru di Vercel dan hubungkan ke *repository* GitHub Anda.
3. Di bagian **Environment Variables** Vercel, pastikan Anda menyalin semua variabel dari `.env.local`. 
   > **Catatan Penting:** Hati-hati dengan `FIREBASE_PRIVATE_KEY` di Vercel. Pastikan karakter `\n` ditangani dengan benar agar string kunci tetap valid.
4. Vercel akan otomatis mengenali framework Next.js, melakukan *build*, dan mempublikasikan website.

---

## 🔒 Catatan Keamanan & Batasan Kuota
- Kuota Gratis Firebase (Spark Plan) mencakup **50.000 Reads** dan **20.000 Writes** per hari. Kapasitas ini sangat besar dan tidak akan habis karena website menerapkan mekanisme *caching* (tidak hit database setiap kali ada kunjungan).
- Pastikan file `.env.local` dan `firebase-service-account.json` (jika ada) **TIDAK PERNAH** di-*commit* ke repositori publik Anda.
