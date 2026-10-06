import Link from "next/link";
import { getAllKota, getConfig, getArticleById } from "@/lib/kota";
import { ChevronRight, ShieldCheck, Banknote, Clock, MapPin, MapPinned } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/app/components/ViewTracker";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export default async function HomePage() {
  const semuaKota = await getAllKota();
  const config = await getConfig();
  const assignedArticle = config.assignedArticleId ? await getArticleById(config.assignedArticleId) : null;
  const waMessageTemplate = "Halo Admin AXI Adira, saya ingin bertanya mengenai prosedur gadai BPKB / Kredit Kendaraan.";

  // Data Spesifik Cabang dari Gambar
  const cabangUtama = {
    nama: "Adira Finance Cabang Pungkur Bandung",
    noHp: "+6287823651470",
    deskripsi: "Adira terdekat di dekat kamu yaitu Adira Finance Cabang Pungkur Bandung, siap melayani gadai BPKB motor & mobil, kredit motor & mobil bekas, top up, dan take over untuk warga Kota Bandung dan sekitarnya.",
    patokan: "Kantor Cabang Adira Finance Bandung 6 - Pungkur patokan jalan dekat dengan Toko listrik sinar kencana."
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AXI Marketing Adira Beraxi",
    url: "https://adira.pojokberkah.online",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: cabangUtama.noHp,
      contactType: "Customer Service",
      areaServed: "ID",
      availableLanguage: "Indonesian"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {assignedArticle && <ViewTracker location="pusat" />}
      
      {/* Hero Section dengan desain khusus Adira Marketing */}
      <section className="bg-yellow-400 px-6 py-12 text-slate-900 border-b-4 border-slate-900">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl uppercase">
            Butuh Dana Cepat Atau Kredit Kendaraan?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-800 sm:text-xl">
            Solusi tepat dari Marketing Resmi AXI Adira Finance. Kami bantu proses Anda sampai tuntas!
          </p>
        </div>
      </section>

      {/* Artikel Perkenalan Marketing */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          <article>
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                ✦ Marketing Resmi Adira Finance
              </span>
            </div>

            {/* Judul & Nomor */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] mb-2 leading-tight">
                Halo! Saya Marketing AXI Adira Finance
              </h1>
              <p className="text-slate-500 text-base mb-4">Siap membantu kebutuhan pembiayaan Anda dengan proses cepat &amp; aman</p>
              <a
                href={`tel:${cabangUtama.noHp}`}
                className="inline-block text-2xl sm:text-3xl font-extrabold text-[#0B1E36] hover:text-yellow-600 transition-colors border-b-4 border-yellow-400 pb-1"
              >
                {cabangUtama.noHp}
              </a>
            </div>

            {/* Artikel Perkenalan Sesuai Standar OJK */}
            <div className="prose prose-slate max-w-none text-slate-700 mb-10 space-y-4">
              <p className="text-base leading-relaxed">
                Selamat datang! Saya adalah <strong>Marketing Resmi AXI Adira Finance</strong>. Sebagai mitra representatif dari PT Adira Dinamika Multi Finance Tbk, saya hadir untuk membantu memfasilitasi kebutuhan pembiayaan Anda secara profesional.
              </p>
              <p className="text-base leading-relaxed">
                Sebagai marketing berpengalaman, saya akan mendampingi proses pengajuan Anda dari awal hingga selesai. Cukup hubungi saya, dan saya bisa membantu penjemputan dokumen di lokasi Anda.
              </p>

              <h2 className="text-xl font-bold text-[#0B1E36] pt-2">Layanan yang Saya Fasilitasi</h2>
              <ul className="space-y-2 text-base">
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">✔</span><span><strong>Gadai BPKB Mobil &amp; Motor</strong> — Solusi dana tunai dengan jaminan BPKB.</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">✔</span><span><strong>Kredit Motor &amp; Mobil Baru</strong> — Fasilitas pembiayaan kendaraan baru dengan proses mudah.</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">✔</span><span><strong>Kredit Motor &amp; Mobil Bekas</strong> — Pembiayaan kendaraan bekas dengan proses transparan.</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">✔</span><span><strong>Top Up Pinjaman</strong> — Tambahan dana untuk nasabah aktif Adira Finance.</span></li>
                <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold mt-0.5">✔</span><span><strong>Take Over Kredit</strong> — Pemindahan fasilitas kredit ke Adira Finance.</span></li>
              </ul>

              <h2 className="text-xl font-bold text-[#0B1E36] pt-2">Mengapa Mengajukan Melalui Saya?</h2>
              <p className="text-base leading-relaxed">
                Saya berkomitmen memberikan informasi yang jelas dan <strong>transparan mengenai rincian angsuran, biaya administrasi, dan asuransi</strong> (Syarat &amp; Ketentuan Berlaku). Data pribadi serta dokumen pengajuan Anda dijamin kerahasiaannya dan hanya diproses langsung ke sistem resmi Adira Finance.
              </p>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500 italic text-center">
                PT Adira Dinamika Multi Finance Tbk berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).
              </div>
            </div>

            {/* CTA Hubungi */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
              <p className="text-slate-700 font-semibold mb-4">📞 Hubungi saya sekarang untuk konsultasi <span className="text-yellow-600">GRATIS</span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`https://wa.me/${cabangUtama.noHp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md text-base"
                >
                  <span>💬</span> Chat via WhatsApp
                </a>
                <Link
                  href="/layanan/simulasi-angsuran"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors shadow-md text-base"
                >
                  <span>📊</span> Tabel Simulasi
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">Layanan Utama AXI Adira</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Gadai BPKB Mobil</h3>
            <p className="text-sm text-slate-600">Pencairan tinggi untuk kebutuhan dana besar Anda.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Gadai BPKB Motor</h3>
            <p className="text-sm text-slate-600">Proses kilat, dana cair tanpa potong biaya survei.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Kredit Motor dan Mobil Baru</h3>
            <p className="text-sm text-slate-600">Fasilitas kredit kendaraan baru dengan DP ringan.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Kredit Motor dan Mobil Bekas</h3>
            <p className="text-sm text-slate-600">Fasilitas kredit motor dan mobil bekas terpercaya.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Take Over & Top Up</h3>
            <p className="text-sm text-slate-600">Pindahkan kredit Anda atau tambah limit dengan mudah.</p>
          </div>
        </div>
      </section>

      {/* SEO Section: Syarat & Cara Pengajuan */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-bold text-[#0B1E36] mb-8 text-center">Syarat Mudah & Proses Cepat Gadai BPKB</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-4 flex items-center gap-2">
                <span className="bg-yellow-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span> 
                Persyaratan Dokumen
              </h3>
              <ul className="space-y-3 text-slate-600 text-base">
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Fotokopi KTP Suami &amp; Istri (jika sudah menikah)</li>
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Fotokopi Kartu Keluarga (KK)</li>
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Bukti Penghasilan (Slip Gaji / Rekening Koran)</li>
                <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Fotokopi STNK &amp; BPKB Kendaraan Asli</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-4 flex items-center gap-2">
                <span className="bg-yellow-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span> 
                Alur Pencairan Dana
              </h3>
              <ul className="space-y-3 text-slate-600 text-base">
                <li className="flex items-start gap-2"><span className="text-yellow-600 font-bold">A.</span> <strong>Konsultasi WA:</strong> Hubungi saya untuk simulasi angsuran.</li>
                <li className="flex items-start gap-2"><span className="text-yellow-600 font-bold">B.</span> <strong>Jemput Dokumen:</strong> Saya bantu ambil berkas ke rumah Anda.</li>
                <li className="flex items-start gap-2"><span className="text-yellow-600 font-bold">C.</span> <strong>Survei:</strong> Pengecekan kendaraan &amp; verifikasi data.</li>
                <li className="flex items-start gap-2"><span className="text-yellow-600 font-bold">D.</span> <strong>Dana Cair:</strong> Ditransfer langsung ke rekening pribadi Anda.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section: FAQ (Frequently Asked Questions) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] mb-4">Pertanyaan Seputar Pinjaman Dana Adira</h2>
          <p className="text-slate-600 text-lg">Temukan jawaban cepat untuk keraguan Anda</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0B1E36] text-lg mb-2">Apakah kendaraan akan ditahan saat saya menggadai BPKB?</h3>
            <p className="text-slate-600 leading-relaxed">Tentu tidak. Anda hanya perlu menjaminkan dokumen BPKB aslinya saja kepada Adira Finance. Kendaraan bermotor Anda (motor atau mobil) tetap bisa Anda gunakan secara bebas untuk keperluan sehari-hari.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0B1E36] text-lg mb-2">Berapa lama proses hingga dana tunai cair?</h3>
            <p className="text-slate-600 leading-relaxed">Proses pengajuan hingga pencairan dana tunai sangat cepat. Biasanya hanya memakan waktu 1 hingga 3 hari kerja setelah semua dokumen persyaratan lengkap dan tahapan survei disetujui oleh tim verifikasi Adira.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#0B1E36] text-lg mb-2">Apakah saya bisa melakukan Take Over (Pindah Kredit) dari leasing lain?</h3>
            <p className="text-slate-600 leading-relaxed">Bisa! Sebagai marketing, saya melayani fasilitas <em>Take Over</em> kredit dari institusi pembiayaan atau leasing lain. Anda bisa mendapatkan berbagai keuntungan seperti cicilan yang lebih ringan, hingga tambahan dana (Top Up) jika diperlukan.</p>
          </div>
        </div>
      </section>

      {/* Floating CTA (Original Style from App) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa="6287823651470" messageTemplate={waMessageTemplate} buttonText="Chat Marketing Adira" />
      </div>
    </main>
  );
}
