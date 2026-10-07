# 🗄️ Dokumentasi Database (Firebase Firestore)

Aplikasi Gadai BPKB Syariah ini menggunakan **Firebase Firestore** sebagai database NoSQL utamanya. Struktur databasenya dirancang agar sangat *flat* (datar) dan ringan untuk mempercepat proses kueri saat men-*generate* halaman statis (SSG).

Berikut adalah struktur koleksi (*Collections*) dan dokumen (*Documents*) yang digunakan di dalam proyek ini:

---

## 1. Koleksi: `kota`
Koleksi ini menyimpan semua data cabang atau representasi kota secara spesifik. Setiap halaman wilayah *hyper-local* mengambil data dari sini.

- **Document ID**: Menggunakan *Slug* kota (misal: `bandung`, `surabaya`, `kab-bekasi`)
- **Struktur Data (Fields)**:
  ```typescript
  {
    "slug": "bandung",                      // String: ID Unik URL (misal: "bandung")
    "provinsi": "Jawa Barat",               // String: Nama provinsi (dipakai untuk grouping & URL Silo)
    "nama_kota": "Bandung",                 // String: Nama kota untuk di layar
    "alamat_cabang_utama": "Jl. Asia...",   // String: Alamat detail cabang
    "jumlah_cabang": 5,                     // Number: Total cabang di area tersebut
    "kendaraan_populer": ["Avanza", "Beat"],// Array<String>: Daftar kendaraan populer
    "estimasi_pencairan_min": 5000000,      // Number: Nominal pencairan minimal
    "estimasi_pencairan_max": 500000000,    // Number: Nominal pencairan maksimal
    "waktu_proses_jam": 2,                  // Number: Estimasi waktu cair (dalam jam)
    "testimoni": "Prosesnya cepat...",      // String: Kutipan testimoni pelanggan
    "nama_marketing_lokal": "Budi",         // String: Nama sales/marketing lokal
    "artikel_seo": "Melayani area Dago..",  // String (Opsional): Catatan hiperlokal khusus kota ini
    "assignedArticleId": "art-12345",       // String (Opsional): ID Artikel AI yang menempel di kota ini
    "allowRandom": false,                   // Boolean: Apakah kota ini boleh dirotasi artikelnya oleh AI?
    "lastUpdatedAt": "2026-10-07T00:00:00Z" // String/Timestamp: Waktu update terakhir
  }
  ```

---

## 2. Koleksi: `articles`
Koleksi ini berfungsi sebagai **Bank Artikel**. Semua artikel panjang yang di-*generate* oleh AI Gemini atau ditulis manual akan tersimpan di sini sebelum dipasangkan (*assigned*) ke halaman tertentu.

- **Document ID**: Auto-generated (misal: `uuid` unik atau dari Firestore)
- **Struktur Data (Fields)**:
  ```typescript
  {
    "id": "1698765432100",                  // String: ID unik artikel
    "title": "Keunggulan Gadai BPKB...",    // String: Judul artikel untuk dashboard admin
    "content": "# Panduan Gadai...\n...",   // String: Isi artikel dalam format Markdown
    "metaDesc": "Deskripsi singkat SEO",    // String: Untuk tag <meta name="description">
    "status": "published",                  // String: "published" atau "draft"
    "createdAt": "2026-10-07T00:00:00Z"     // String/Timestamp: Tanggal artikel dibuat
  }
  ```
  > **Info:** Artikel di sini menggunakan *placeholder* seperti `[NAMA_KOTA]` yang nantinya akan otomatis diganti (*replace*) dengan nama kota/provinsi asli saat ditampilkan di halaman depan.

---

## 3. Koleksi: `config`
Koleksi ini hanya berisi **satu buah dokumen** bernama `main`. Dokumen ini berfungsi mengatur konfigurasi global website.

- **Document ID**: `main`
- **Struktur Data (Fields)**:
  ```typescript
  {
    "whatsapp_pusat": "6287724039666",      // String: Nomor WA yang dipakai secara global
    
    // Konfigurasi Halaman Utama (Homepage)
    "artikel_homepage": "Teks manual...",   // String (Opsional): Teks darurat homepage (sebelum pakai AI)
    "assignedArticleId": "art-999",         // String (Opsional): ID Artikel AI yang menempel di Homepage
    
    // Konfigurasi Halaman Provinsi
    "provinsiArticles": {
      "jawa-barat": "art-111",              // Mapping antara Slug Provinsi dengan ID Artikel AI
      "dki-jakarta": "art-222"
    }
  }
  ```

---

## Aturan Hubungan (Relasi) Database
1. **Relasi Halaman Utama:** Mengambil artikel dari tabel `articles` berdasarkan ID yang tercatat di `config.main.assignedArticleId`.
2. **Relasi Halaman Provinsi:** Mengambil artikel dari tabel `articles` berdasarkan ID yang tercatat di `config.main.provinsiArticles['slug-provinsi']`.
3. **Relasi Halaman Kota:** Mengambil artikel dari tabel `articles` berdasarkan ID yang tercatat di dalam properti `assignedArticleId` pada tabel `kota` itu sendiri.

Semua koneksi ke database dilakukan dari sisi Server (*Server Components* & *Server Actions*) menggunakan **Firebase Admin SDK** agar sangat aman dan rahasia.
