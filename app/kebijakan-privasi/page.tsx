import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - Gadai BPKB Adira Finance',
  description: 'Kebijakan privasi dan keamanan data untuk pelanggan yang mengajukan fasilitas pembiayaan melalui website mitra Adira Finance.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-[#0B1E36] mb-4">Kebijakan Privasi</h1>
          <p className="text-slate-500 mb-10 text-sm">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-slate prose-blue max-w-none text-slate-700">
            <p>
              Selamat datang di website representatif / agen marketing resmi AXI Adira Finance. Keamanan dan kerahasiaan data pribadi Anda adalah prioritas utama kami. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan saat menggunakan layanan di website ini.
            </p>

            <h2>1. Pengumpulan Informasi</h2>
            <p>
              Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela saat Anda menghubungi kami melalui formulir kontak, chat WhatsApp, atau saluran komunikasi lainnya. Informasi yang mungkin kami minta meliputi:
            </p>
            <ul>
              <li>Nama lengkap</li>
              <li>Nomor telepon / WhatsApp</li>
              <li>Area tempat tinggal (Kota/Kabupaten)</li>
              <li>Detail kendaraan (Merk, Tipe, Tahun) untuk keperluan simulasi kredit</li>
            </ul>

            <h2>2. Penggunaan Informasi</h2>
            <p>
              Informasi yang Anda berikan akan digunakan secara eksklusif untuk tujuan-tujuan berikut:
            </p>
            <ul>
              <li>Membantu proses pendaftaran dan pengajuan pembiayaan (Gadai BPKB / Kredit Kendaraan) ke sistem resmi Adira Finance.</li>
              <li>Menghubungi Anda terkait status pengajuan atau memberikan rincian simulasi angsuran.</li>
              <li>Meningkatkan kualitas layanan kami.</li>
            </ul>

            <h2>3. Keamanan Data</h2>
            <p>
              Kami berkomitmen untuk menjaga keamanan data pribadi Anda. Data Anda (seperti foto KTP, BPKB, dsb.) yang dikirimkan melalui platform komunikasi kami akan <strong>dijaga kerahasiaannya dan hanya diteruskan langsung ke sistem verifikasi internal PT Adira Dinamika Multi Finance Tbk.</strong> Kami tidak akan pernah memperjualbelikan, menyewakan, atau mendistribusikan data Anda kepada pihak ketiga yang tidak berkepentingan tanpa izin tertulis dari Anda.
            </p>

            <h2>4. Tautan ke Situs Pihak Ketiga</h2>
            <p>
              Website kami mungkin berisi tautan ke situs web lain. Perlu diketahui bahwa kami tidak mengontrol situs web eksternal tersebut dan tidak bertanggung jawab atas perlindungan serta privasi informasi apa pun yang Anda berikan saat mengunjungi situs tersebut.
            </p>

            <h2>5. Perubahan Kebijakan Privasi</h2>
            <p>
              Kebijakan Privasi ini dapat diubah atau diperbarui dari waktu ke waktu agar sesuai dengan regulasi terbaru. Anda disarankan untuk memeriksa halaman ini secara berkala. Penggunaan layanan kami setelah adanya perubahan menandakan bahwa Anda setuju dengan Kebijakan Privasi yang telah direvisi.
            </p>

            <h2>6. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau mengenai penanganan data Anda, silakan hubungi tim marketing kami melalui tombol komunikasi yang tersedia di website atau via WhatsApp resmi kami.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
