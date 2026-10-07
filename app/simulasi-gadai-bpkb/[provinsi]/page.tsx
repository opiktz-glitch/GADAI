import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUniqueProvinsi, getCitiesByProvinsiSlug, getConfig, slugify, getArticleById } from "@/lib/kota";
import { MapPin, ChevronRight, Building } from "lucide-react";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 86400; // ISR: 1 hari (24 jam)

type Props = {
  params: Promise<{ provinsi: string }>;
};

export async function generateStaticParams() {
  const provinsiList = await getUniqueProvinsi();
  return provinsiList.map((p) => ({ provinsi: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const cities = await getCitiesByProvinsiSlug(p.provinsi);
  if (cities.length === 0) return {};
  
  const provinsiName = cities[0].provinsi;
  
  const config = await getConfig();
  const assignedArticleId = config.provinsiArticles?.[p.provinsi];
  const assignedArticle = assignedArticleId ? await getArticleById(assignedArticleId) : null;
  
  const descriptionTemplate = assignedArticle?.metaDesc || `Daftar cabang dan layanan gadai BPKB mobil/motor di wilayah ${provinsiName}. Tersedia di ${cities.length} kota. Ajukan sekarang untuk dana tunai cepat!`;
  
  const description = descriptionTemplate
    .replace(/\[NAMA_KOTA\]/gi, provinsiName)
    .replace(/\[JUMLAH_CABANG\]/gi, cities.length.toString());

  return {
    title: `Layanan Gadai BPKB di ${provinsiName} - Dana Cepat Cair`,
    description,
    alternates: { canonical: `/simulasi-gadai-bpkb/${p.provinsi}` },
  };
}

export default async function ProvinsiPage({ params }: Props) {
  const p = await params;
  const cities = await getCitiesByProvinsiSlug(p.provinsi);
  
  if (cities.length === 0) return notFound();
  
  const provinsiName = cities[0].provinsi;
  const config = await getConfig();
  
  const assignedArticleId = config.provinsiArticles?.[p.provinsi];
  const assignedArticle = assignedArticleId ? await getArticleById(assignedArticleId) : null;
  
  const jsonLd = [
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
          name: "Simulasi Gadai BPKB",
          item: "https://www.gadaibpkb.co.id/simulasi-gadai-bpkb"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Provinsi ${provinsiName}`,
          item: `https://www.gadaibpkb.co.id/simulasi-gadai-bpkb/${p.provinsi}`
        }
      ]
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen py-16 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/simulasi-gadai-bpkb" className="hover:text-blue-600 transition-colors">
                Layanan
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-slate-700 font-medium">{provinsiName}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Building className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Gadai BPKB Wilayah {provinsiName}
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Temukan layanan cabang terdekat di wilayah {provinsiName}. Kami hadir di {cities.length} kota untuk membantu pencairan dana tunai jaminan BPKB Anda dengan cepat, aman, dan resmi.
          </p>
        </div>

        {/* Grid Cards for Cities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <Link 
              href={`/simulasi-gadai-bpkb/${p.provinsi}/${city.slug}`} 
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all group flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex items-center text-slate-400 mb-4">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-500">{city.provinsi}</span>
              </div>
              
              {/* Card Body */}
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{city.nama_kota}</h2>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-medium group-hover:text-blue-700">
                <span>Lihat Detail Layanan</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        
        {/* Localized SEO Article Section untuk Provinsi */}
        {assignedArticle && (
          <div id="artikel" className="mt-16 mb-8">
            <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="prose prose-slate prose-blue max-w-none text-slate-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }: any) => <h2 className="text-center text-2xl font-bold mt-6 mb-4 text-[#0B1E36]" {...props} />,
                    p: ({ node, ...props }: any) => <p className="text-justify leading-relaxed mb-4" {...props} />,
                    img: ({ node, ...props }: any) => (
                      <img 
                        {...props} 
                        alt={props.alt || `Ilustrasi Gadai BPKB Provinsi ${provinsiName}`} 
                        loading="lazy" 
                        className="rounded-lg shadow-sm"
                      />
                    )
                  }}
                >
                  {assignedArticle.content
                    .replace(/\[NAMA_KOTA\]/gi, provinsiName)
                    .replace(/\[JUMLAH_CABANG\]/gi, cities.length.toString())
                    .replace(/\[\s*(!\[[\s\S]*?\]\([\s\S]*?\)|\<img[\s\S]*?\>|\<button[\s\S]*?\>[\s\S]*?\<\/button\>)\s*\]\(([\s\S]*?)\)/gi, "")
                    .replace(/\[([^\]]*)\]\(https?:\/\/wa\.me[^)]+\)/gi, "")
                    .replace(/\]\(([^)]+)\)/g, (match, url) => `](${url.replace(/ /g, "%20")})`)}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        )}

      </div>
      
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={config.whatsapp_pusat} messageTemplate={`Halo, saya ingin info gadai BPKB untuk wilayah ${provinsiName}.`} buttonText="Tanya CS (Gratis)" />
      </div>
    </main>
  );
}
