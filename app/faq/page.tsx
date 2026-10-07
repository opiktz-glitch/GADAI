import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Seputar Gadai BPKB Adira Finance',
  description: 'Daftar pertanyaan yang sering diajukan mengenai persyaratan, proses, dan simulasi gadai BPKB motor dan mobil di Adira Finance.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Apa itu fasilitas Gadai BPKB di Adira Finance?",
      a: "Gadai BPKB Adira Finance adalah fasilitas pinjaman dana tunai dengan menjaminkan Buku Pemilik Kendaraan Bermotor (BPKB) mobil atau motor Anda. Kendaraan tetap bisa Anda gunakan, kami hanya menyimpan dokumen BPKB Anda selama masa angsuran."
    },
    {
      q: "Apa saja syarat untuk mengajukan pinjaman?",
      a: "Persyaratan umum meliputi KTP (Suami-Istri jika sudah menikah), Kartu Keluarga, Bukti Penghasilan/Slip Gaji, Bukti Kepemilikan Rumah (PBB/Rekening Listrik), Dokumen Kendaraan (STNK & BPKB asli). Syarat bisa menyesuaikan profesi Anda (Karyawan/Wiraswasta)."
    },
    {
      q: "Berapa lama proses persetujuan dan pencairan dana?",
      a: "Jika dokumen Anda lengkap dan memenuhi kriteria, proses persetujuan (approval) hingga pencairan dana bisa dilakukan dalam waktu estimasi 2 hingga 24 jam (hari kerja)."
    },
    {
      q: "Tahun kendaraan apa saja yang bisa diproses?",
      a: "Umumnya kami melayani pembiayaan untuk motor maksimal usia 10 tahun dan mobil maksimal usia 15 tahun dari tahun saat pengajuan (syarat & ketentuan berlaku, silakan hubungi marketing kami untuk pengecekan detail merk dan tipe kendaraan Anda)."
    },
    {
      q: "Apakah BPKB saya aman disimpan di Adira?",
      a: "Sangat aman. Adira Finance adalah perusahaan pembiayaan berskala nasional yang diawasi penuh oleh Otoritas Jasa Keuangan (OJK). BPKB Anda akan disimpan di tempat khusus yang aman hingga masa tenor selesai."
    },
    {
      q: "Bisakah BPKB atas nama orang lain / belum balik nama?",
      a: "Bisa, asalkan Anda melampirkan kuitansi jual beli asli yang sah atas kendaraan tersebut. Tim marketing kami akan membantu memandu Anda lebih lanjut mengenai dokumen tambahannya."
    },
    {
      q: "Apakah ada asuransi untuk kendaraan yang BPKB-nya diagunkan?",
      a: "Ya, pinjaman Anda sudah dilengkapi dengan asuransi kendaraan, sehingga memberikan perlindungan ekstra jika terjadi kehilangan atau kerusakan berat sesuai dengan polis yang Anda pilih."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-[#0B1E36] mb-4">FAQ (Pertanyaan yang Sering Diajukan)</h1>
          <p className="text-slate-600 mb-10 text-lg">
            Temukan jawaban untuk pertanyaan umum terkait layanan Gadai BPKB Adira Finance di bawah ini.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-yellow-50 rounded-xl p-6 text-center border border-yellow-200">
            <h4 className="font-bold text-slate-800 mb-2">Masih punya pertanyaan lain?</h4>
            <p className="text-slate-600 mb-4">Jangan ragu untuk berkonsultasi langsung dengan tim Marketing kami (Gratis!).</p>
            <a href="https://wa.me/6287724039666" className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-colors">
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
