import { notFound } from "next/navigation";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Link from "next/link";
import { TableMotor, TableMobil } from "@/app/components/TabelAngsuran";
import { getConfig } from "@/lib/kota";

const layananData: Record<string, { title: string, subtitle: string, waText: string, content: React.ReactNode }> = {
  "syarat-dan-proses": {
    title: "Syarat & Proses Gadai BPKB",
    subtitle: "Persiapan yang Anda butuhkan sebelum mengajukan pinjaman.",
    waText: "Halo Admin AXI Adira, saya ingin bertanya lebih lanjut tentang syarat Gadai BPKB.",
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">Persyaratan Dokumen Umum</h2>
        <p className="text-base leading-relaxed mb-6">
          Untuk mempercepat proses pengajuan dana tunai atau kredit di Adira Finance, pastikan Anda telah menyiapkan dokumen-dokumen dasar berikut:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 not-prose">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">1</span>
              <h3 className="font-bold text-[#0B1E36] text-lg">KTP Asli</h3>
            </div>
            <p className="text-slate-600 text-sm pl-11">KTP Pemohon dan Pasangan (jika sudah menikah).</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">2</span>
              <h3 className="font-bold text-[#0B1E36] text-lg">Kartu Keluarga (KK)</h3>
            </div>
            <p className="text-slate-600 text-sm pl-11">Fotokopi atau dokumen asli untuk keperluan diverifikasi.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">3</span>
              <h3 className="font-bold text-[#0B1E36] text-lg">Bukti Penghasilan</h3>
            </div>
            <p className="text-slate-600 text-sm pl-11">Slip Gaji (karyawan) atau Rekening Koran / Bukti Usaha (wiraswasta).</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">4</span>
              <h3 className="font-bold text-[#0B1E36] text-lg">Dokumen Kendaraan</h3>
            </div>
            <p className="text-slate-600 text-sm pl-11">STNK dan BPKB asli kendaraan yang akan dijaminkan.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all sm:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">5</span>
              <h3 className="font-bold text-[#0B1E36] text-lg">Bukti Domisili</h3>
            </div>
            <p className="text-slate-600 text-sm pl-11">Rekening listrik / PBB / Surat Domisili (Jika alamat tinggal berbeda dengan alamat KTP).</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0B1E36] mb-4 mt-10">Proses Verifikasi (Survei)</h2>
        <p className="text-base leading-relaxed mb-6">
          Setelah dokumen lengkap, tim surveyor Adira Finance akan melakukan proses verifikasi yang meliputi pengecekan fisik kendaraan (gesek nomor mesin dan rangka) serta verifikasi tempat tinggal atau tempat usaha. Proses ini berlangsung cepat dan transparan.
        </p>
      </>
    )
  },
  "cara-pengajuan": {
    title: "Cara Pengajuan Gadai BPKB",
    subtitle: "Langkah mudah mendapatkan dana tunai dari rumah.",
    waText: "Halo Admin AXI Adira, saya ingin mulai melakukan pengajuan Gadai BPKB.",
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">Langkah-Langkah Pengajuan</h2>
        <p className="text-base leading-relaxed mb-6">
          Sebagai Marketing Resmi AXI Adira Finance, saya hadir untuk mempermudah seluruh proses pengajuan Anda agar Anda tidak perlu repot bolak-balik ke kantor cabang. Ikuti langkah mudah berikut:
        </p>
        
        <div className="not-prose space-y-6 mb-8 mt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">1</div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-1">Konsultasi Awal via WhatsApp</h3>
              <p className="text-slate-600 text-base leading-relaxed">Hubungi saya melalui tombol WhatsApp di bawah. Kita akan mendiskusikan kebutuhan dana Anda, jenis kendaraan, dan saya akan memberikan simulasi cicilan yang sesuai dengan budget Anda.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">2</div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-1">Penjemputan Dokumen</h3>
              <p className="text-slate-600 text-base leading-relaxed">Jika Anda setuju dengan simulasi yang diberikan, siapkan berkas (KTP, KK, STNK, BPKB, Slip Gaji). Saya akan membantu menjemput dokumen langsung ke rumah atau lokasi yang disepakati.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">3</div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-1">Proses Survei</h3>
              <p className="text-slate-600 text-base leading-relaxed">Tim surveyor dari Adira Finance akan melakukan verifikasi data fisik kendaraan dan tempat tinggal Anda dengan proses yang profesional dan sopan.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-lg">4</div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] mb-1">Pencairan Dana Tunai</h3>
              <p className="text-slate-600 text-base leading-relaxed">Setelah pengajuan disetujui (biasanya 1-2 hari kerja), dana akan langsung ditransfer secara utuh ke rekening bank pribadi Anda secara aman.</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  "simulasi-angsuran": {
    title: "Tabel Simulasi Angsuran",
    subtitle: "Estimasi angsuran bulanan untuk pengajuan Gadai BPKB Motor & Mobil.",
    waText: "Halo Admin AXI Adira, saya sudah melihat tabel simulasi angsuran dan ingin bertanya lebih lanjut.",
    content: (
      <>
        <p className="text-base leading-relaxed mb-8 text-center text-slate-600">
          Gunakan tabel di bawah ini sebagai referensi untuk menghitung estimasi angsuran bulanan Anda. Silakan hubungi kami untuk perhitungan yang lebih presisi sesuai tahun dan tipe kendaraan Anda.
        </p>
        <TableMotor />
        <TableMobil />
      </>
    )
  }
};

export default async function LayananPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const layanan = layananData[slug];

  if (!layanan) {
    notFound();
  }

  const config = await getConfig();

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 px-6 py-12 text-white border-b-4 border-yellow-400">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
            {layanan.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-300 sm:text-xl">
            {layanan.subtitle}
          </p>
        </div>
      </section>

      {/* Konten Artikel Layanan */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-16">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          <article className="prose prose-slate max-w-none text-slate-700">
            {layanan.content}

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center mt-10">
              <p className="text-slate-700 font-semibold mb-4">Siap untuk mengajukan pinjaman Anda hari ini?</p>
              <a
                href={`https://wa.me/6287724039666?text=${encodeURIComponent(layanan.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md text-base"
              >
                <span>💬</span> Hubungi via WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Tautan ke layanan lain */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10 mb-20 text-center">
         <h3 className="text-xl font-bold text-slate-800 mb-6">Informasi Layanan Lainnya</h3>
         <div className="flex flex-wrap justify-center gap-4">
           {Object.keys(layananData).map((s) => (
             s !== slug && (
               <Link 
                 key={s} 
                 href={`/layanan/${s}`}
                 className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm"
               >
                 {layananData[s].title}
               </Link>
             )
           ))}
         </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={config.whatsapp_pusat || "6287724039666"} messageTemplate={layanan.waText} buttonText="Konsultasi Marketing" />
      </div>
    </main>
  );
}
