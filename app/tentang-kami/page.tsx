import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami - Gadai Pojok Berkah',
  description: 'Pojok Berkah adalah platform informasi dan rujukan gadai BPKB, membantu Anda menemukan dan membandingkan lembaga pembiayaan resmi.',
};

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <article className="prose prose-blue prose-slate lg:prose-lg bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mx-auto">
          <p className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Pojok Berkah</p>
          <h1 className="mt-0">Tentang Kami</h1>
          
          <p className="lead text-xl text-gray-700 font-medium">
            Kami adalah platform informasi dan rujukan gadai BPKB &mdash; membantu Anda menemukan dan membandingkan lembaga pembiayaan resmi sebelum mengambil keputusan.
          </p>

          <div className="not-prose bg-yellow-50 border-l-4 border-yellow-400 p-5 my-8 rounded-r-lg">
            <p className="font-bold text-yellow-800 m-0">Penting untuk Anda ketahui:</p>
            <p className="text-yellow-800 mt-2 m-0 leading-relaxed">
              Pojok Berkah <strong>bukan</strong> lembaga pemberi pinjaman. Kami tidak menyimpan BPKB, tidak mencairkan dana, dan tidak menetapkan bunga. Kami menghubungkan Anda dengan mitra lembaga pergadaian dan pembiayaan yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).
            </p>
          </div>

          <h2>Apa yang kami lakukan</h2>
          <p>
            Banyak orang kesulitan membandingkan penawaran gadai BPKB karena informasinya tersebar dan sulit diverifikasi. Pojok Berkah merangkum simulasi, syarat, dan proses dari beberapa lembaga resmi di satu tempat, supaya Anda bisa membandingkan sebelum menghubungi mereka langsung.
          </p>

          <h2>Bagaimana kami bekerja</h2>
          <ul>
            <li>Anda mengisi simulasi kebutuhan dana di situs ini.</li>
            <li>Kami menunjukkan estimasi dan mitra lembaga yang sesuai dengan kota dan jenis kendaraan Anda.</li>
            <li>Proses pengajuan, verifikasi, dan pencairan dana sepenuhnya dilakukan oleh lembaga mitra &mdash; bukan oleh kami.</li>
            <li>Kami dapat menerima komisi rujukan dari mitra; ini tidak menambah biaya apa pun bagi Anda.</li>
          </ul>

          <h2>Sebelum menghubungi lembaga manapun</h2>
          <p>
            Selalu periksa status izin lembaga pembiayaan melalui laman resmi OJK di <a href="https://www.ojk.go.id" target="_blank" rel="noopener noreferrer">ojk.go.id</a> atau hubungi kontak OJK 157. Waspadai lembaga yang menjanjikan pencairan tanpa survei sama sekali, atau meminta biaya di muka di luar prosedur resmi.
          </p>

          <hr className="my-10 border-gray-200" />

          <div className="not-prose text-center">
            <p className="font-medium text-lg text-gray-800 mb-6">
              Ada pertanyaan soal proses atau ingin dibantu mencari mitra terdekat?
            </p>
            
            <a 
              href="https://wa.me/6287724039666" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Chat via WhatsApp &rarr;
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-12 italic text-center not-prose">
            Pojok Berkah &mdash; platform informasi dan rujukan gadai BPKB.<br /> Bukan lembaga jasa keuangan.
          </p>
        </article>
      </div>
    </div>
  );
}
