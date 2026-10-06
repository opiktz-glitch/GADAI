import { Metadata } from 'next';
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { getConfig } from "@/lib/kota";

export const metadata: Metadata = {
  title: 'Tentang Kami - Marketing Resmi AXI Adira Finance',
  description: 'Kami adalah Marketing Resmi AXI Adira Finance yang siap membantu memfasilitasi pengajuan Gadai BPKB Motor & Mobil dengan proses cepat, aman, dan transparan.',
};

export default async function TentangKami() {
  const config = await getConfig();
  const noHp = config.whatsapp_pusat || "+6287724039666";
  const waMessageTemplate = "Halo Admin AXI Adira, saya ingin bertanya seputar layanan Adira Finance.";

  return (
    <div className="min-h-screen bg-slate-50 py-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <article className="prose prose-slate lg:prose-lg bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 mx-auto">
          <div className="flex justify-center mb-6">
            <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              ✦ Profil Marketing Resmi
            </span>
          </div>
          
          <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-[#0B1E36] mb-8 leading-tight mt-0">
            Tentang Kami
          </h1>
          
          <p className="lead text-xl text-slate-700 font-medium text-center mb-10">
            Kami adalah <strong>Marketing Resmi AXI Adira Finance</strong> yang berdedikasi untuk membantu Anda mendapatkan solusi finansial terbaik.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">Siapa Kami?</h2>
          <p className="text-base leading-relaxed text-slate-700">
            Sebagai mitra representatif (AXI) dari PT Adira Dinamika Multi Finance Tbk, kami hadir untuk menjembatani kebutuhan pembiayaan masyarakat, mulai dari Gadai BPKB Kendaraan (Motor & Mobil), fasilitas Kredit Kendaraan Bekas, hingga layanan Take Over dan Top Up.
          </p>
          <p className="text-base leading-relaxed text-slate-700 mb-8">
            Kehadiran kami bertujuan agar calon nasabah tidak perlu repot datang ke kantor cabang untuk sekadar bertanya, berkonsultasi, atau menyerahkan dokumen awal. Semua bisa dilakukan dari rumah melalui bantuan kami.
          </p>

          <div className="not-prose bg-slate-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
            <p className="font-bold text-[#0B1E36] m-0 mb-2">Penting untuk Anda ketahui:</p>
            <p className="text-slate-600 m-0 leading-relaxed text-sm">
              Seluruh proses persetujuan kredit, pencairan dana, hingga penetapan suku bunga mutlak berada di bawah kewenangan kantor pusat/cabang <strong>PT Adira Dinamika Multi Finance Tbk</strong>. Kami selaku Marketing AXI bertugas sebagai fasilitator yang membantu merapikan dokumen, memberikan simulasi, dan mempercepat alur pengajuan Anda ke sistem Adira secara resmi.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">Mengapa Mengajukan Lewat Kami?</h2>
          <ul className="space-y-4 text-slate-700 text-base mb-8 list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-1 flex-shrink-0">✔</span> 
              <span><strong>Gratis Konsultasi:</strong> Dapatkan simulasi angsuran yang transparan sebelum Anda memutuskan untuk meminjam.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-1 flex-shrink-0">✔</span> 
              <span><strong>Jemput Bola:</strong> Kami bantu ambil dokumen langsung ke lokasi Anda (rumah/kantor) sehingga menghemat waktu Anda.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-1 flex-shrink-0">✔</span> 
              <span><strong>Proses Didampingi:</strong> Kami pantau status pengajuan Anda sejak dokumen diserahkan hingga dana cair ke rekening Anda.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-1 flex-shrink-0">✔</span> 
              <span><strong>Aman & Terpercaya:</strong> Data Anda langsung masuk ke sistem Adira Finance yang berizin dan diawasi oleh OJK.</span>
            </li>
          </ul>

          <hr className="my-10 border-slate-200" />

          <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-[#0B1E36] text-lg mb-4">
              Punya pertanyaan atau butuh dana cepat hari ini?
            </p>
            <p className="text-slate-600 mb-6 text-sm">
              Jangan ragu untuk menghubungi kami. Kami siap melayani Anda di berbagai kota di Indonesia.
            </p>
            
            <a 
              href={`https://wa.me/${noHp.replace('+', '')}?text=${encodeURIComponent(waMessageTemplate)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md text-base"
            >
              <span>💬</span> Chat Konsultasi Gratis
            </a>
          </div>

          <p className="text-sm text-slate-500 mt-12 italic text-center not-prose">
            PT Adira Dinamika Multi Finance Tbk berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).
          </p>
        </article>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={noHp} messageTemplate={waMessageTemplate} buttonText="Konsultasi Marketing" />
      </div>
    </div>
  );
}
