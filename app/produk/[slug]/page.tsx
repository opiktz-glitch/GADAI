import { notFound } from "next/navigation";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Link from "next/link";

const tableMotor = (
  <div className="mt-10">
    <h3 className="text-xl font-extrabold text-center bg-yellow-400 text-slate-900 py-3 rounded-t-xl">TABEL ANGSURAN MOTOR</h3>
    <div className="overflow-x-auto shadow-md rounded-b-xl border border-slate-200">
      <table className="w-full text-sm text-center">
        <thead className="bg-slate-100 font-bold text-slate-700">
          <tr>
            <th className="px-4 py-3 border-r border-slate-200">PINJAMAN</th>
            <th className="px-4 py-3 border-r border-slate-200">11 Bln</th>
            <th className="px-4 py-3 border-r border-slate-200">17 Bln</th>
            <th className="px-4 py-3 border-r border-slate-200">23 Bln</th>
            <th className="px-4 py-3 border-r border-slate-200">29 Bln</th>
            <th className="px-4 py-3">35 Bln</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {[
            ["3.000.000", "493.000", "367.000", "310.000", "278.000", "259.000"],
            ["4.000.000", "603.000", "444.000", "372.000", "332.000", "307.000"],
            ["5.000.000", "712.000", "522.000", "435.000", "386.000", "356.000"],
            ["6.000.000", "822.000", "599.000", "497.000", "439.000", "404.000"],
            ["7.000.000", "932.000", "677.000", "560.000", "493.000", "452.000"],
            ["8.000.000", "1.041.000", "754.000", "622.000", "547.000", "500.000"],
            ["9.000.000", "1.151.000", "832.000", "684.000", "601.000", "549.000"],
            ["10.000.000", "1.260.000", "909.000", "747.000", "654.000", "597.000"],
            ["11.000.000", "1.362.000", "979.000", "801.000", "700.000", "637.000"],
            ["12.000.000", "1.472.000", "1.057.000", "864.000", "754.000", "686.000"],
            ["13.000.000", "1.582.000", "1.135.000", "927.000", "809.000", "735.000"],
            ["14.000.000", "1.692.000", "1.213.000", "990.000", "863.000", "783.000"],
            ["15.000.000", "1.803.000", "1.291.000", "1.053.000", "917.000", "832.000"],
            ["16.000.000", "1.935.000", "1.391.000", "1.139.000", "996.000", "906.000"],
            ["17.000.000", "2.045.000", "1.469.000", "1.202.000", "1.050.000", "955.000"],
            ["18.000.000", "2.155.000", "1.547.000", "1.265.000", "1.105.000", "1.004.000"],
            ["19.000.000", "2.265.000", "1.625.000", "1.328.000", "1.159.000", "1.053.000"],
            ["20.000.000", "2.375.000", "1.703.000", "1.391.000", "1.213.000", "1.102.000"]
          ].map((row, i) => (
            <tr key={i} className="hover:bg-yellow-50 transition-colors">
              <td className="px-4 py-2 border-r border-slate-100 font-semibold text-slate-800">{row[0]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[1]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[2]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[3]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[4]}</td>
              <td className="px-4 py-2 text-slate-600">{row[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-slate-500 mt-2 text-center">*Tabel angsuran ini adalah estimasi dan dapat berubah sesuai kebijakan Adira Finance tanpa pemberitahuan sebelumnya.</p>
  </div>
);

const tableMobil = (
  <div className="mt-10">
    <h3 className="text-xl font-extrabold text-center bg-yellow-400 text-slate-900 py-3 rounded-t-xl">TABEL ANGSURAN MOBIL</h3>
    <div className="overflow-x-auto shadow-md rounded-b-xl border border-slate-200">
      <table className="w-full text-sm text-center">
        <thead className="bg-slate-100 font-bold text-slate-700">
          <tr>
            <th className="px-4 py-3 border-r border-slate-200">PINJAMAN</th>
            <th className="px-4 py-3 border-r border-slate-200">12 Bln</th>
            <th className="px-4 py-3 border-r border-slate-200">24 Bln</th>
            <th className="px-4 py-3 border-r border-slate-200">36 Bln</th>
            <th className="px-4 py-3">48 Bln</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {[
            ["30.000.000", "3.660.000", "1.998.000", "1.562.000", "1.293.000"],
            ["40.000.000", "4.512.000", "2.554.000", "1.905.000", "1.634.000"],
            ["50.000.000", "5.476.000", "3.145.000", "2.318.000", "1.900.000"],
            ["60.000.000", "6.460.000", "3.758.000", "2.785.000", "2.300.000"],
            ["70.000.000", "7.290.000", "4.176.000", "3.100.000", "2.514.000"],
            ["80.000.000", "8.125.000", "4.669.000", "3.412.000", "2.805.000"],
            ["90.000.000", "9.425.000", "5.419.000", "4.000.000", "3.300.000"],
            ["100.000.000", "10.466.000", "6.000.000", "4.375.000", "3.578.000"],
            ["110.000.000", "11.289.000", "6.235.000", "4.615.000", "3.768.000"],
            ["120.000.000", "12.195.000", "6.817.000", "4.967.000", "4.009.000"],
            ["130.000.000", "13.155.000", "7.321.000", "5.380.000", "4.390.000"],
            ["140.000.000", "14.178.000", "7.825.000", "5.748.000", "4.695.000"],
            ["150.000.000", "15.325.000", "8.562.000", "6.262.000", "5.160.000"],
            ["160.000.000", "16.000.000", "8.840.000", "6.442.000", "5.300.000"],
            ["170.000.000", "17.150.000", "9.400.000", "6.865.000", "5.691.000"],
            ["180.000.000", "18.090.000", "9.799.000", "7.134.000", "5.987.000"],
            ["190.000.000", "19.056.000", "10.595.000", "7.845.000", "6.357.000"],
            ["200.000.000", "20.085.000", "11.080.000", "8.090.000", "6.680.000"]
          ].map((row, i) => (
            <tr key={i} className="hover:bg-yellow-50 transition-colors">
              <td className="px-4 py-2 border-r border-slate-100 font-semibold text-slate-800">{row[0]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[1]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[2]}</td>
              <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[3]}</td>
              <td className="px-4 py-2 text-slate-600">{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-slate-500 mt-2 text-center">*Tabel angsuran ini adalah estimasi dan dapat berubah sesuai kebijakan Adira Finance tanpa pemberitahuan sebelumnya.</p>
  </div>
);

const productData: Record<string, { title: string, subtitle: string, desc: string, waText: string, table?: React.ReactNode }> = {
  "gadai-bpkb-mobil": {
    title: "Gadai BPKB Mobil",
    subtitle: "Pencairan tinggi untuk kebutuhan dana besar Anda.",
    desc: "Butuh dana cepat dalam jumlah besar? Gadai BPKB Mobil adalah solusi tepat untuk Anda. Kami menawarkan nilai pencairan tinggi dengan suku bunga yang kompetitif. Kendaraan tetap bisa Anda gunakan karena hanya BPKB yang kami tahan. Proses survei dilakukan dengan cepat dan transparan.",
    waText: "Halo Admin AXI Adira, saya ingin konsultasi pengajuan Gadai BPKB Mobil.",
    table: tableMobil
  },
  "gadai-bpkb-motor": {
    title: "Gadai BPKB Motor",
    subtitle: "Proses kilat, dana cair tanpa potong biaya survei.",
    desc: "Dapatkan dana tunai kilat hanya dengan jaminan BPKB Motor. Kami memproses pengajuan Anda dengan sangat cepat tanpa potongan biaya survei. Syarat mudah dan kendaraan tetap bisa dipakai untuk aktivitas Anda sehari-hari.",
    waText: "Halo Admin AXI Adira, saya ingin konsultasi pengajuan Gadai BPKB Motor.",
    table: tableMotor
  },
  "kredit-bekas": {
    title: "Kredit Kendaraan Bekas",
    subtitle: "Fasilitas kredit motor dan mobil bekas terpercaya.",
    desc: "Ingin membeli mobil atau motor impian tapi budget terbatas? Kami menyediakan fasilitas kredit kendaraan bekas berkualitas. Dengan Adira Finance, Anda bisa mendapatkan kendaraan impian dengan cicilan ringan, syarat mudah, dan BPKB yang aman.",
    waText: "Halo Admin AXI Adira, saya ingin konsultasi mengenai Kredit Kendaraan Bekas."
  },
  "take-over-top-up": {
    title: "Take Over & Top Up",
    subtitle: "Pindahkan kredit Anda atau tambah limit dengan mudah.",
    desc: "Merasa cicilan kendaraan Anda di tempat lain terlalu berat? Lakukan Take Over ke Adira Finance untuk mendapatkan cicilan yang lebih ringan. Selain itu, jika Anda adalah nasabah aktif kami yang membutuhkan dana tambahan, Anda bisa melakukan Top Up pinjaman tanpa harus mengganti kontrak lama.",
    waText: "Halo Admin AXI Adira, saya ingin konsultasi mengenai fasilitas Take Over / Top Up."
  }
};

export default async function ProdukPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = productData[slug];

  if (!product) {
    notFound();
  }

  const noHp = "+6287823651470";

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">

      {/* Hero Section */}
      <section className="bg-yellow-400 px-6 py-12 text-slate-900 border-b-4 border-slate-900">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl uppercase">
            {product.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-800 sm:text-xl">
            {product.subtitle}
          </p>
        </div>
      </section>

      {/* Detail Konten Produk */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-16">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          <article className="prose prose-slate max-w-none text-slate-700">
            <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">Mengenal Layanan {product.title}</h2>
            <p className="text-base leading-relaxed mb-6">
              {product.desc}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
               <h3 className="text-lg font-bold text-[#0B1E36] mb-3">Keuntungan Lewat Marketing Resmi AXI:</h3>
               <ul className="space-y-2 text-base list-none p-0 m-0">
                 <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Proses didampingi dari awal sampai cair.</li>
                 <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Tidak perlu antre lama di kantor cabang.</li>
                 <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✔</span> Syarat dijemput langsung ke rumah Anda.</li>
               </ul>
            </div>

            {product.table && (
              <div className="mb-10">
                {product.table}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
              <p className="text-slate-700 font-semibold mb-4">Konsultasi gratis sekarang juga!</p>
              <a
                href={`https://wa.me/6287823651470?text=${encodeURIComponent(product.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md text-base"
              >
                <span>💬</span> Hubungi via WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Tautan ke produk lain */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10 mb-20 text-center">
         <h3 className="text-xl font-bold text-slate-800 mb-6">Lihat Produk Lainnya</h3>
         <div className="flex flex-wrap justify-center gap-4">
           {Object.keys(productData).map((s) => (
             s !== slug && (
               <Link 
                 key={s} 
                 href={`/produk/${s}`}
                 className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-yellow-400 hover:text-yellow-600 transition-colors shadow-sm"
               >
                 {productData[s].title}
               </Link>
             )
           ))}
         </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa="6287823651470" messageTemplate={product.waText} buttonText="Chat Marketing Adira" />
      </div>
    </main>
  );
}
