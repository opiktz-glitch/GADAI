# 🚀 Gadai BPKB Syariah - Programmatic SEO (PSEO) Platform

Website rujukan dan informasi gadai BPKB berskala raksasa, dirancang khusus untuk mendominasi pencarian SEO lokal di berbagai kota di Indonesia. Proyek ini dibangun menggunakan **Next.js 15 (App Router)**, **Firebase Firestore**, dan terintegrasi dengan **Google Gemini AI**.

**Domain Live:** [https://gadaibpkbsyariah.com](https://gadaibpkbsyariah.com)

---

## ✨ Fitur Unggulan

1. **Arsitektur PSEO & Incremental Static Regeneration (ISR)**  
   Mampu men-*generate* ratusan hingga ribuan halaman kota secara spesifik dan dinamis tanpa harus membuat file satu per satu. Render statis memastikannya meload dengan kecepatan sepersekian detik.
   
2. **AI Article Generator (Gemini 3.5 Flash)**  
   Panel admin dilengkapi AI yang memproduksi artikel edukatif yang patuh regulasi OJK. Sistem memanfaatkan variabel placeholder (`[NAMA_KOTA]` & `[JUMLAH_CABANG]`) sehingga satu artikel bisa di-*shuffle* (dirotasi) ke berbagai kota dan selalu terbaca lokal.

3. **Secure Admin CMS (Firebase + Middleware)**  
   Pengelolaan data kota, jumlah cabang, pengaturan nomor WhatsApp, dan rotasi artikel tersimpan aman di database NoSQL real-time (Firestore). Panel dilindungi *Basic Auth Middleware*.

4. **Sitemap Dinamis**  
   Halaman `sitemap.xml` otomatis mengambil daftar kota dari Firestore untuk memandu *crawler* Google mengindeks setiap penjuru situs.

5. **Smart WhatsApp CTA**  
   Tombol *floating* pintar yang merekam dari URL kota mana pengguna berasal.

---

## 🛠️ Instalasi & Pengembangan Lokal

### 1. Prasyarat
- Node.js versi 18+
- Akun Firebase (dengan service account key)
- Google Gemini API Key

### 2. Setup Environment Variables
Salin file template `.env.sample` menjadi `.env.local` dan isi kredensial Anda:
```bash
cp .env.sample .env.local
```

Variabel yang perlu disiapkan di `.env.local`:
```env
# Kredensial Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123

# Firebase Server-side Credentials (dari firebase-service-account.json)
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
Buka [http://localhost:3000](http://localhost:3000) untuk halaman publik, dan [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke CMS.

---

## 🚀 Deployment (Produksi)

Sistem ini didesain agar sangat mulus saat di-*deploy* ke **Vercel**.
1. Push *repository* ini ke GitHub.
2. Buat project baru di Vercel dan hubungkan ke *repository* GitHub.
3. Di bagian **Environment Variables** Vercel, pastikan Anda menyalin semua variabel dari `.env.local`. 
   - *Catatan: Hati-hati dengan `FIREBASE_PRIVATE_KEY` di Vercel, pastikan `\n` ditangani dengan benar agar multiline string tetap valid.*
4. Vercel akan otomatis mengenali framework Next.js dan melakukan *build*.

---

## 🔒 Catatan Keamanan
- File kredensial Firebase lokal (`firebase-service-account.json`) dan `.env.local` **sudah dimasukkan ke `.gitignore`**. JANGAN PERNAH *commit* kunci rahasia ke publik.
- Pastikan hanya menggunakan koneksi *Server-side* (Server Actions) saat berkomunikasi dengan Firestore agar kredensial tetap tersembunyi.
