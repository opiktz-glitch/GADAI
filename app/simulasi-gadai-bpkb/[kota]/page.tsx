import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllKota, getKotaBySlug, formatRupiah, getConfig, getArticleById } from "@/lib/kota";
import { MapPin, Clock, CheckCircle2, MessageCircle, Map, Quote } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/app/components/ViewTracker";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export const revalidate = 86400; // ISR: 1 hari (24 jam)

type Props = {
  params: Promise<{ kota: string }>;
};

export async function generateStaticParams() {
  const kotaList = await getAllKota();
  return kotaList.map((k) => ({ kota: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const kota = await getKotaBySlug(p.kota);
  if (!kota) return {};

  const title = `Simulasi Gadai BPKB di ${kota.nama_kota} - Cair ${kota.waktu_proses_jam} Jam`;
  const assignedArticle = kota.assignedArticleId ? await getArticleById(kota.assignedArticleId) : null;
  const descriptionTemplate = assignedArticle?.metaDesc || `Simulasi gadai BPKB kendaraan di [NAMA_KOTA], ${kota.provinsi}. [JUMLAH_CABANG] cabang aktif, dana cair mulai ${formatRupiah(
    kota.estimasi_pencairan_min
  )} hingga ${formatRupiah(kota.estimasi_pencairan_max)}.`;
  
  const description = descriptionTemplate
    .replace(/\[NAMA_KOTA\]/gi, kota.nama_kota)
    .replace(/\[JUMLAH_CABANG\]/gi, kota.jumlah_cabang.toString());

  return {
    title,
    description,
    alternates: { canonical: `/simulasi-gadai-bpkb-${kota.slug}` },
    openGraph: { title, description },
  };
}

export default async function KotaPage({ params }: Props) {
  const p = await params;
  const kota = await getKotaBySlug(p.kota);
  if (!kota) return notFound();
  
  const config = await getConfig();
  const assignedArticle = kota.assignedArticleId ? await getArticleById(kota.assignedArticleId) : null;

  // Internal Linking Logic
  const semuaKota = await getAllKota();
  const otherCities = semuaKota.filter(k => k.slug !== kota.slug);
  // Prioritaskan provinsi yang sama
  let sameProvince = otherCities.filter(k => k.provinsi === kota.provinsi);
  let relatedCities = sameProvince.length > 0 ? sameProvince : otherCities;
  // Acak dan ambil maksimal 4 kota
  relatedCities = relatedCities.sort(() => 0.5 - Math.random()).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Gadai BPKB - Cabang ${kota.nama_kota}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: kota.alamat_cabang_utama,
      addressLocality: kota.nama_kota,
      addressRegion: kota.provinsi,
    },
  };

  const waMessageTemplate = `Halo ${kota.nama_marketing_lokal} [host], saya ingin simulasi gadai BPKB untuk wilayah ${kota.nama_kota}.`;

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      {assignedArticle && <ViewTracker location={kota.slug} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 px-6 py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center space-x-2 text-blue-200">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Layanan Khusus {kota.provinsi}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Gadai BPKB Kendaraan di <span className="text-yellow-400">{kota.nama_kota}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Proses cepat, aman, dan transparan. Dapatkan dana tunai dengan jaminan BPKB Mobil atau Motor Anda.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Highlight Stats Card (Floating) */}
        <div className="relative -mt-10 mb-12 grid grid-cols-1 gap-4 sm:-mt-12 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 transition hover:shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Map className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Cabang Tersedia</p>
                <p className="text-2xl font-bold text-slate-900">{kota.jumlah_cabang} Lokasi</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 transition hover:shadow-2xl sm:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Estimasi Dana Cair</p>
                <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {formatRupiah(kota.estimasi_pencairan_min)} - {formatRupiah(kota.estimasi_pencairan_max)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Kendaraan Populer</h2>
              <p className="mt-2 text-slate-600">Merk yang paling sering diajukan di area {kota.nama_kota}:</p>
              <ul className="mt-4 space-y-3">
                {kota.kendaraan_populer.map((v) => (
                  <li key={v} className="flex items-center text-slate-700">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-indigo-500" />
                    <span className="font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            <section className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <Quote className="absolute -left-4 -top-4 h-12 w-12 text-slate-200" />
              <div className="relative">
                <p className="text-lg italic leading-relaxed text-slate-700">
                  "{kota.testimoni}"
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Marketing Lokal</p>
                    <p className="text-sm text-slate-500">{kota.nama_marketing_lokal}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">Lokasi Cabang Utama</h2>
              <p className="mt-2 flex items-start text-slate-600">
                <MapPin className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-slate-400" />
                {kota.alamat_cabang_utama}
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Localized SEO Article Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          {assignedArticle ? (
            <div className="prose prose-slate prose-blue max-w-none text-slate-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {assignedArticle.content
                  .replace(/\[NAMA_KOTA\]/gi, kota.nama_kota)
                  .replace(/\[JUMLAH_CABANG\]/gi, kota.jumlah_cabang.toString())}
              </ReactMarkdown>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Layanan Gadai BPKB Terpercaya di {kota.nama_kota}, {kota.provinsi}</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Mencari tempat pinjaman dana tunai dengan jaminan BPKB di wilayah <strong>{kota.nama_kota}</strong> kini semakin mudah. Kami memahami bahwa kebutuhan finansial bisa datang kapan saja, baik untuk modal usaha bagi warga {kota.nama_kota}, biaya pendidikan, atau kebutuhan mendesak lainnya. Dengan {kota.jumlah_cabang} cabang yang tersebar strategis di area {kota.nama_kota}, kami siap memberikan pelayanan terbaik dengan proses yang aman dan transparan.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Keuntungan Gadai BPKB di Cabang {kota.nama_kota}</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Dibandingkan mencari pinjaman tanpa jaminan, mempercayakan agunan BPKB Anda kepada kami di {kota.nama_kota} memberikan sejumlah keunggulan khusus:
              </p>
              <ul className="list-disc pl-5 text-slate-700 mb-6 space-y-2">
                <li><strong>Pencairan Tinggi:</strong> Dapatkan pencairan mulai dari {formatRupiah(kota.estimasi_pencairan_min)} hingga {formatRupiah(kota.estimasi_pencairan_max)}, disesuaikan dengan nilai pasaran kendaraan Anda di {kota.provinsi}.</li>
                <li><strong>Proses Super Kilat:</strong> Tim lapangan kami siap menjemput bola, dan jika disetujui, dana bisa cair dalam estimasi waktu {kota.waktu_proses_jam} jam saja.</li>
                <li><strong>Kendaraan Tetap Anda Gunakan:</strong> Anda cukup menjaminkan BPKB. Kendaraan seperti {kota.kendaraan_populer[0] || 'mobil/motor Anda'} tetap bisa digunakan untuk beraktivitas sehari-hari mengitari {kota.nama_kota}.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Hubungi Spesialis Kami Hari Ini</h3>
              <p className="text-slate-700 leading-relaxed">
                Tidak perlu ragu atau repot keluar rumah, Anda bisa berkonsultasi secara online. Perwakilan resmi kami, <strong>{kota.nama_marketing_lokal}</strong>, siap membantu memandu Anda dan menghitung simulasi angsuran yang paling ringan. Datang langsung ke kantor kami di <em>{kota.alamat_cabang_utama}</em> atau cukup tekan tombol WhatsApp di layar Anda untuk respon instan tanpa biaya apapun!
              </p>
            </>
          )}

          {kota.artikel_seo && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Catatan Lokal</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {kota.artikel_seo}
              </p>
            </div>
          )}
        </article>
      </div>

      {/* Internal Linking (SEO Booster) */}
      {relatedCities.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-4 mb-16">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Jelajahi Layanan di Cabang Lainnya</h2>
            <div className="flex flex-wrap gap-3">
              {relatedCities.map((rc) => (
                <Link 
                  key={rc.slug} 
                  href={`/simulasi-gadai-bpkb-${rc.slug}`} 
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Gadai BPKB {rc.nama_kota}
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={config.whatsapp_pusat} messageTemplate={waMessageTemplate} buttonText="Ajukan Sekarang via WA" />
      </div>
    </main>
  );
}
