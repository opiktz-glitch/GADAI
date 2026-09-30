import Link from "next/link";
import { getAllKota, getConfig, getArticleById } from "@/lib/kota";
import { ChevronRight, ShieldCheck, Banknote, Clock, MapPin, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/app/components/ViewTracker";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export default async function HomePage() {
  const semuaKota = await getAllKota();
  const config = await getConfig();
  const assignedArticle = config.assignedArticleId ? await getArticleById(config.assignedArticleId) : null;
  const waMessageTemplate = "Halo Admin [host], saya ingin bertanya mengenai prosedur gadai BPKB.";

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      {assignedArticle && <ViewTracker location="pusat" />}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 px-6 py-20 text-white sm:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Solusi Cepat Dana Tunai, <br className="hidden sm:block" />
            <span className="text-blue-400">Jaminan BPKB Kendaraan</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Proses pencairan dana kilat, tanpa ribet, dan dijamin aman. Temukan cabang terdekat di kota Anda sekarang.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center ring-1 ring-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
              <Clock className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Proses Kilat</h2>
            <p className="mt-2 text-sm text-slate-500">Dana cair dalam hitungan jam setelah survei selesai.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center ring-1 ring-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Banknote className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Pencairan Maksimal</h2>
            <p className="mt-2 text-sm text-slate-500">Dapatkan nilai pinjaman tertinggi untuk kendaraan Anda.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center ring-1 ring-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">100% Aman</h2>
            <p className="mt-2 text-sm text-slate-500">BPKB Anda disimpan dengan aman dan terjamin.</p>
          </div>
        </div>
      </section>

      {/* City Directory */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Tersedia di Berbagai Kota</h2>
          <p className="mt-4 text-slate-600">Pilih kota domisili Anda untuk melihat simulasi pencairan dan lokasi cabang.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {semuaKota.map((k) => (
            <Link
              key={k.slug}
              href={`/simulasi-gadai-bpkb-${k.slug}`}
              className="group flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-blue-500"
            >
              <div>
                <div className="flex items-center text-slate-400 mb-3 group-hover:text-blue-500 transition-colors">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{k.provinsi}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{k.nama_kota}</h3>
                <p className="text-sm text-slate-500">{k.jumlah_cabang} Cabang Aktif</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-medium text-blue-600">Lihat Simulasi</span>
                <ChevronRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Article Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-24 mb-16">
        <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Mengapa Memilih Layanan Gadai BPKB Kami?</h2>
          {assignedArticle ? (
            <div className="prose prose-slate max-w-none text-slate-700">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }: any) => (
                    <img 
                      {...props} 
                      alt={props.alt || "Ilustrasi Gadai BPKB Kendaraan Aman dan Cepat"} 
                      loading="lazy" 
                      className="rounded-lg shadow-sm"
                    />
                  )
                }}
              >
                {assignedArticle.content
                  .replace(/\[NAMA_KOTA\]/gi, "Seluruh Indonesia")
                  .replace(/\[JUMLAH_CABANG\]/gi, "berbagai")}
              </ReactMarkdown>
            </div>
          ) : config.artikel_homepage ? (
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {config.artikel_homepage}
            </div>
          ) : (
            <>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Kebutuhan dana mendesak seringkali datang tanpa terduga. Entah untuk tambahan modal usaha, biaya pendidikan anak, renovasi rumah, atau kebutuhan medis mendadak. Dalam situasi seperti ini, fasilitas <strong>Gadai BPKB (Buku Pemilik Kendaraan Bermotor)</strong> menjadi salah satu solusi pembiayaan tercepat dan terpercaya. Keunggulan utamanya adalah: Anda tetap bisa menggunakan kendaraan tersebut untuk aktivitas sehari-hari, sementara dokumen BPKB disimpan dengan aman sebagai jaminan.
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Syarat Mudah dan Proses Cepat</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Berbeda dengan pinjaman bank konvensional yang membutuhkan riwayat kredit (BI Checking) yang sangat ketat, gadai BPKB memiliki tingkat persetujuan yang jauh lebih tinggi. Persyaratannya pun sangat sederhana, umumnya meliputi:
              </p>
              <ul className="list-disc pl-5 text-slate-700 mb-6 space-y-2">
                <li>Fotokopi KTP Pemohon (dan Pasangan bila sudah menikah) serta Kartu Keluarga.</li>
                <li>Dokumen kendaraan yang sah: STNK dan BPKB asli (Motor atau Mobil).</li>
                <li>Bukti penghasilan, seperti slip gaji atau mutasi rekening 3 bulan terakhir.</li>
                <li>Kendaraan beroperasi dengan baik, usia kendaraan masuk kriteria, dan pajak dalam keadaan hidup.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Keamanan Dokumen Terjamin 100%</h3>
              <p className="text-slate-700 leading-relaxed">
                Keamanan adalah prioritas kami. Banyak masyarakat yang ragu untuk menggadaikan BPKB karena takut hilang atau disalahgunakan oleh pihak yang tidak bertanggung jawab. Bersama kami, BPKB Anda dijamin penyimpanannya di fasilitas brankas dengan standar keamanan tinggi. Seluruh transaksi bersifat transparan, bebas dari biaya tersembunyi, dan dicatat secara resmi. Konsultasikan jumlah pencairan yang Anda butuhkan melalui layanan WhatsApp kami hari ini juga!
              </p>
            </>
          )}
        </article>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={config.whatsapp_pusat} messageTemplate={waMessageTemplate} buttonText="Tanya Admin via WA" />
      </div>
    </main>
  );
}
