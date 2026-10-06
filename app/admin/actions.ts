"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Kota, Config, Article } from "@/lib/kota";
import { db } from "@/lib/firebase";

export async function updateConfig(formData: FormData) {
  const noWa = formData.get("whatsapp_pusat")?.toString() || "";
  const artikel_homepage = formData.get("artikel_homepage")?.toString() || "";
  
  if (!noWa) throw new Error("Nomor tidak boleh kosong");

  const currentConfig = await db.collection('config').doc('main').get();
  const oldConfig = currentConfig.exists ? currentConfig.data() : {};

  const newConfig: Config = { ...oldConfig, whatsapp_pusat: noWa, artikel_homepage } as Config;
  await db.collection('config').doc('main').set(newConfig);
  
  revalidatePath("/", "layout");
  redirect("/admin?tab=global&success=Pengaturan%20global%20berhasil%20disimpan!");
}

export async function addKota(formData: FormData) {
  const slug = formData.get("slug")?.toString().toLowerCase().replace(/\s+/g, '-') || "";
  const nama_kota = formData.get("nama_kota")?.toString() || "";
  const provinsi = formData.get("provinsi")?.toString() || "";
  const jumlah_cabang = parseInt(formData.get("jumlah_cabang")?.toString() || "0");
  const estimasi_pencairan_min = parseInt(formData.get("estimasi_pencairan_min")?.toString() || "0");
  const estimasi_pencairan_max = parseInt(formData.get("estimasi_pencairan_max")?.toString() || "0");
  const waktu_proses_jam = parseInt(formData.get("waktu_proses_jam")?.toString() || "0");
  const nama_marketing_lokal = formData.get("nama_marketing_lokal")?.toString() || "";
  const testimoni = formData.get("testimoni")?.toString() || "";
  const alamat_cabang_utama = formData.get("alamat_cabang_utama")?.toString() || "";
  const artikel_seo = formData.get("artikel_seo")?.toString() || "";
  
  // Pisahkan berdasarkan koma untuk array kendaraan
  const kendaraanRaw = formData.get("kendaraan_populer")?.toString() || "";
  const kendaraan_populer = kendaraanRaw.split(",").map(v => v.trim()).filter(v => v);

  if (!slug || !nama_kota) throw new Error("Slug dan Nama Kota wajib diisi");

  const newKota: Kota = {
    slug, nama_kota, provinsi, jumlah_cabang, estimasi_pencairan_min, 
    estimasi_pencairan_max, waktu_proses_jam, nama_marketing_lokal, 
    testimoni, alamat_cabang_utama, kendaraan_populer, artikel_seo
  };

  const docRef = db.collection('kota').doc(slug);
  const doc = await docRef.get();
  
  // Cek jika slug sudah ada
  if (doc.exists) {
    throw new Error("Slug kota sudah ada, gunakan nama lain.");
  }

  await docRef.set(newKota);
  
  revalidatePath("/", "layout");
  redirect("/admin?tab=kota&success=Kota%20baru%20berhasil%20ditambahkan!");
}

export async function deleteKota(formData: FormData) {
  const slug = formData.get("slug")?.toString();
  if (!slug) throw new Error("Slug tidak valid");

  await db.collection('kota').doc(slug).delete();
  
  revalidatePath("/", "layout");
  redirect("/admin?tab=kota&success=Kota%20berhasil%20dihapus!");
}

export async function editKota(formData: FormData) {
  const originalSlug = formData.get("original_slug")?.toString();
  if (!originalSlug) throw new Error("Original slug missing");

  const slug = formData.get("slug")?.toString().toLowerCase().replace(/\s+/g, '-') || "";
  const nama_kota = formData.get("nama_kota")?.toString() || "";
  const provinsi = formData.get("provinsi")?.toString() || "";
  const jumlah_cabang = parseInt(formData.get("jumlah_cabang")?.toString() || "0");
  const estimasi_pencairan_min = parseInt(formData.get("estimasi_pencairan_min")?.toString() || "0");
  const estimasi_pencairan_max = parseInt(formData.get("estimasi_pencairan_max")?.toString() || "0");
  const waktu_proses_jam = parseInt(formData.get("waktu_proses_jam")?.toString() || "0");
  const nama_marketing_lokal = formData.get("nama_marketing_lokal")?.toString() || "";
  const testimoni = formData.get("testimoni")?.toString() || "";
  const alamat_cabang_utama = formData.get("alamat_cabang_utama")?.toString() || "";
  const artikel_seo = formData.get("artikel_seo")?.toString() || "";
  
  const kendaraanRaw = formData.get("kendaraan_populer")?.toString() || "";
  const kendaraan_populer = kendaraanRaw.split(",").map(v => v.trim()).filter(v => v);

  if (!slug || !nama_kota) throw new Error("Slug dan Nama Kota wajib diisi");

  const updatedKota: Kota = {
    slug, nama_kota, provinsi, jumlah_cabang, estimasi_pencairan_min, 
    estimasi_pencairan_max, waktu_proses_jam, nama_marketing_lokal, 
    testimoni, alamat_cabang_utama, kendaraan_populer, artikel_seo
  };

  const docRef = db.collection('kota').doc(originalSlug);
  const doc = await docRef.get();
  
  if (!doc.exists) throw new Error("Kota tidak ditemukan");

  if (slug !== originalSlug) {
    const newDoc = await db.collection('kota').doc(slug).get();
    if (newDoc.exists) {
      throw new Error("Slug kota sudah dipakai oleh kota lain.");
    }
    // Delete old doc, create new
    await db.collection('kota').doc(originalSlug).delete();
    await db.collection('kota').doc(slug).set(updatedKota);
  } else {
    // Just update
    await docRef.set(updatedKota);
  }
  
  revalidatePath("/", "layout");
  redirect("/admin?tab=kota&success=Perubahan%20kota%20berhasil%20disimpan!");
}

export async function addArticle(formData: FormData) {
  const content = formData.get("content")?.toString() || "";
  const metaDesc = formData.get("metaDesc")?.toString() || "";
  const source = formData.get("source")?.toString() || "Admin"; // Default "Admin" jika tidak diisi
  if (!content) throw new Error("Konten tidak boleh kosong");

  const counterRef = db.collection('config').doc('articleCounter');
  const nextIdNum = await db.runTransaction(async (t: any) => {
    const doc = await t.get(counterRef);
    let count = 1;
    if (doc.exists) {
      count = (doc.data()?.count || 0) + 1;
    }
    t.set(counterRef, { count }, { merge: true });
    return count;
  });
  const shortId = nextIdNum.toString().padStart(4, '0');

  const newId = crypto.randomUUID(); // Menggunakan UUID agar dijamin tidak bentrok (menimpa)
  await db.collection('articles').doc(newId).set({
    id: newId,
    shortId,
    content,
    metaDesc,
    source,
    createdAt: Date.now()
  });

  revalidatePath("/", "layout");
  redirect("/admin?tab=artikel&success=Artikel%20berhasil%20ditambahkan!");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) return;

  await db.collection('articles').doc(id).delete();
  revalidatePath("/", "layout");
  redirect("/admin?tab=artikel&success=Artikel%20berhasil%20dihapus!");
}

export async function editArticle(id: string, content: string) {
  if (!id || !content) throw new Error("Data tidak valid");
  await db.collection('articles').doc(id).update({ content });
  revalidatePath("/", "layout");
}

export async function generateArticleAI(formData: FormData) {
  // Ambil API Key dari environment variable
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "API Key Gemini belum diatur. Harap tambahkan GEMINI_API_KEY di file .env.local" };
  }

  const targetPembaca = formData.get("target_pembaca")?.toString() || "masyarakat umum yang membutuhkan dana cepat";
  const panjang = formData.get("panjang")?.toString() || "800-1200 kata";
  const tone = formData.get("tone")?.toString() || "edukatif netral";

  const prompt = `Buatkan/revisi konten halaman web untuk Pojok Berkah, sebuah platform informasi dan rujukan gadai BPKB, dengan ketentuan berikut:

Positioning (wajib, tidak bisa ditawar):
- Pojok Berkah adalah platform rujukan/perbandingan, BUKAN lembaga pemberi pinjaman, bukan penyimpan BPKB, dan tidak mencairkan dana.
- Semua proses pengajuan, verifikasi, dan pencairan dana dilakukan oleh lembaga mitra yang berizin OJK, bukan oleh Pojok Berkah.
- Jangan gunakan klaim kepemilikan proses seperti "kami cairkan dana", "BPKB Anda kami simpan", "hubungi layanan pelanggan kami" (untuk hal yang sebenarnya dilakukan lembaga mitra).
- Boleh gunakan: "kami bantu Anda menemukan/membandingkan", "mitra kami akan...", "lembaga rujukan kami".

Elemen yang wajib ada di setiap halaman:
- Satu H1 saja per halaman (headline utama, spesifik pada isi halaman).
- Badge/kalimat disclosure singkat: platform rujukan, bukan pemberi pinjaman.
- Ajakan untuk mengecek legalitas lembaga di ojk.go.id atau kontak OJK 157, sebelum CTA.
- CTA yang jujur: mengarahkan ke bantuan mencari mitra, bukan "ajukan pinjaman sekarang".

Yang harus dihindari:
- Klaim jaminan seperti "100% Aman", "Pencairan Maksimal", "Dijamin Cair" tanpa syarat.
- Testimoni atau angka (jumlah nasabah, rating) yang tidak bisa diverifikasi.
- Bahasa yang menyiratkan Pojok Berkah adalah lembaga jasa keuangan berizin.

Struktur konten (sesuaikan dengan target pembaca):
- Hero: judul + sublead + disclosure badge
- Bagian edukatif: cara kerja gadai BPKB, dokumen yang dibutuhkan
- Bagian kehati-hatian: cek legalitas sebelum lanjut
- CTA akhir: WhatsApp untuk bantuan mencari mitra

Gaya bahasa: ${tone}. Mudah dipahami, edukatif, protektif terhadap konsumen, dan BUKAN hard-selling.

PENTING UNTUK TEKNIS SHUFFLE KONTEN:
Sistem kami akan merotasi artikel ini ke ratusan halaman kota. Oleh karena itu, JANGAN pernah tulis nama kota asli (seperti Jakarta/Bandung). 
Sebagai gantinya, Anda WAJIB menggunakan variabel kode persis seperti ini (termasuk kurung sikunya):
- [NAMA_KOTA] (untuk menyebutkan nama kota, misal: "Simulasi Gadai BPKB di [NAMA_KOTA]")
- [JUMLAH_CABANG] (untuk menyebutkan jumlah mitra cabang)
Gunakan kata kunci SEO seperti "gadai BPKB [NAMA_KOTA]", "simulasi gadai BPKB [NAMA_KOTA]" secara natural.

Target pembaca: ${targetPembaca}
Panjang artikel: ${panjang}

PENTING! Berikan respons Anda dengan format baku seperti ini:
META_DESC: [isi meta description di sini, maks 160 karakter, gunakan [NAMA_KOTA]]
CONTENT: [isi artikel lengkap format Markdown di sini]`;

  let text = "";
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    if (!res.ok) return { error: "Gagal memanggil API AI" };
    const data = await res.json();
    text = data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    return { error: "Gagal menghubungi AI. Periksa koneksi atau limit API Anda." };
  }

  if (text) {
    // Parsing meta description dan konten
    let meta = "";
    let content = text;
    
    if (text.includes("META_DESC:") && text.includes("CONTENT:")) {
      const parts = text.split("CONTENT:");
      meta = parts[0].replace("META_DESC:", "").trim();
      content = parts[1].trim();
    }
    
    return { success: true, text: content, metaDesc: meta };
  } else {
    return { error: "Gagal menghasilkan teks artikel dari AI." };
  }
}

export async function toggleRandomLocation(location: string, allowRandom: boolean) {
  if (!location) throw new Error("Lokasi tidak valid");
  if (location === 'pusat') {
    await db.collection('config').doc('main').update({ allowRandom });
  } else {
    await db.collection('kota').doc(location).update({ allowRandom });
  }
  revalidatePath("/", "layout");
}

export async function shuffleArticles() {
  const [kotaSnap, configDoc, articlesSnap] = await Promise.all([
    db.collection('kota').get(),
    db.collection('config').doc('main').get(),
    db.collection('articles').get()
  ]);

  if (articlesSnap.empty) {
    redirect("/admin?tab=artikel&error=Tidak%20ada%20artikel%20untuk%20diacak");
  }

  const allArticles = articlesSnap.docs.map(d => d.id);
  const batch = db.batch();
  
  // Fungsi bantu untuk mengacak array
  const shuffle = (arr: string[]) => arr.sort(() => 0.5 - Math.random());
  
  const configData = configDoc.data() || {};
  
  // Assign to Pusat (Home) jika tidak dikunci
  if (configData.allowRandom !== false) {
    const shuffledForPusat = shuffle([...allArticles]);
    batch.update(db.collection('config').doc('main'), { assignedArticleId: shuffledForPusat[0] });
  }

  // Assign to Kota jika tidak dikunci
  const shuffledForKota = shuffle([...allArticles]);
  let i = 0;
  kotaSnap.docs.forEach(doc => {
    const data = doc.data();
    if (data.allowRandom !== false) {
      batch.update(doc.ref, { assignedArticleId: shuffledForKota[i % shuffledForKota.length] });
      i++;
    }
  });

  await batch.commit();
  revalidatePath("/", "layout");
  redirect("/admin?tab=artikel&success=Penempatan%20artikel%20berhasil%20diacak%20ulang!");
}
