import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllKota, getKotaBySlug, formatRupiah, getConfig, getArticleById, slugify } from "@/lib/kota";
import { MapPin, Clock, CheckCircle2, MessageCircle, Map, Quote } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/app/components/ViewTracker";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export const revalidate = 86400; // ISR: 1 hari (24 jam)

type Props = {
  params: Promise<{ provinsi: string; kota: string }>;
};

export async function generateStaticParams() {
  const kotaList = await getAllKota();
  return kotaList.map((k) => ({ 
    provinsi: slugify(k.provinsi),
    kota: k.slug 
  }));
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
    alternates: { canonical: `/simulasi-gadai-bpkb/${p.provinsi}/${kota.slug}` },
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Gadai BPKB - Cabang ${kota.nama_kota}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: kota.alamat_cabang_utama,
        addressLocality: kota.nama_kota,
        addressRegion: kota.provinsi,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "https://www.gadaibpkb.co.id/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `Gadai BPKB ${kota.provinsi}`,
          item: `https://www.gadaibpkb.co.id/simulasi-gadai-bpkb/${p.provinsi}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Gadai BPKB ${kota.nama_kota}`,
          item: `https://www.gadaibpkb.co.id/simulasi-gadai-bpkb/${p.provinsi}/${kota.slug}`
        }
      ]
    }
  ];

  const waMessageTemplate = `Halo ${kota.nama_marketing_lokal} [host], saya ingin simulasi gadai BPKB untuk wilayah ${kota.nama_kota}.`;

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      {assignedArticle && <ViewTracker location={kota.slug} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 px-6 py-16 text-white sm:py-24 border-b-4 border-yellow-400">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center space-x-2 text-yellow-400">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">
              <Link href={`/simulasi-gadai-bpkb/${p.provinsi}`} className="hover:text-yellow-200 transition-colors">
                Layanan Khusus {kota.provinsi}
              </Link>
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Gadai BPKB Kendaraan di <span className="text-yellow-400">{kota.nama_kota}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Proses cepat, aman, dan transparan. Dapatkan dana tunai dengan jaminan BPKB Mobil atau Motor Anda.
          </p>
        </div>
      </section>

      {/* Main Content dihilangkan sesuai permintaan */}

      {/* Localized SEO Article Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          {assignedArticle ? (
            <div className="prose prose-slate prose-blue max-w-none text-slate-700">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }: any) => <h2 className="text-center text-2xl font-bold mt-6 mb-4 text-[#0B1E36]" {...props} />,
                  p: ({ node, ...props }: any) => <p className="text-justify leading-relaxed mb-4" {...props} />,
                  img: ({ node, ...props }: any) => (
                    <img 
                      {...props} 
                      alt={props.alt || `Ilustrasi Gadai BPKB ${kota.nama_kota}`} 
                      loading="lazy" 
                      className="rounded-lg shadow-sm"
                    />
                  )
                }}
              >
                {assignedArticle.content
                  .replace(/\[NAMA_KOTA\]/gi, kota.nama_kota)
                  .replace(/\[JUMLAH_CABANG\]/gi, kota.jumlah_cabang.toString())
                  .replace(/\[\s*(!\[[\s\S]*?\]\([\s\S]*?\)|\<img[\s\S]*?\>|\<button[\s\S]*?\>[\s\S]*?\<\/button\>)\s*\]\(([\s\S]*?)\)/gi, "")
                  .replace(/\[([^\]]*)\]\(https?:\/\/wa\.me[^)]+\)/gi, "")
                  .replace(/\]\(([^)]+)\)/g, (match, url) => `](${url.replace(/ /g, "%20")})`)}
              </ReactMarkdown>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Layanan Gadai BPKB Terpercaya di {kota.nama_kota}, {kota.provinsi}</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Mencari tempat pinjaman dana tunai dengan jaminan BPKB di wilayah <strong>{kota.nama_kota}</strong> kini semakin mudah. Kami memahami bahwa kebutuhan finansial bisa datang kapan saja, baik untuk modal usaha bagi warga {kota.nama_kota}, biaya pendidikan, atau kebutuhan mendesak lainnya. Kami siap memberikan pelayanan terbaik dengan proses yang aman dan transparan.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Silakan ajukan pinjaman Anda sekarang juga atau buat artikel melalui Panel Admin untuk menggantikan teks bawaan ini.
              </p>
            </>
          )}

          {kota.artikel_seo && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Catatan Lokal</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-justify">
                {kota.artikel_seo}
              </p>
            </div>
          )}

          {/* CTA Hubungi */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center mt-12">
            <p className="text-slate-700 font-semibold mb-4">📞 Hubungi saya sekarang untuk konsultasi <span className="text-yellow-600">GRATIS</span></p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${config.whatsapp_pusat.replace('+', '')}?text=${encodeURIComponent(waMessageTemplate)}`}
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

      {/* Internal Linking (SEO Booster) */}
      {relatedCities.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-4 mb-16">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Jelajahi Layanan di Cabang Lainnya</h2>
            <div className="flex flex-wrap gap-3">
              {relatedCities.map((rc) => (
                <Link 
                  key={rc.slug} 
                  href={`/simulasi-gadai-bpkb/${slugify(rc.provinsi)}/${rc.slug}`} 
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
