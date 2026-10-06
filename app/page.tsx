import Link from "next/link";
import { getAllKota, getConfig, getArticleById } from "@/lib/kota";
import { ChevronRight, ShieldCheck, Banknote, Clock, MapPin, MapPinned } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/app/components/ViewTracker";
import WhatsAppButton from "@/app/components/WhatsAppButton";

export default async function HomePage() {
  const semuaKota = await getAllKota();
  const config = await getConfig();
  const assignedArticle = config.assignedArticleId ? await getArticleById(config.assignedArticleId) : null;
  const waMessageTemplate = "Halo Admin AXI Adira, saya ingin bertanya mengenai prosedur gadai BPKB / Kredit Kendaraan.";

  // Data Spesifik Cabang dari Gambar
  const cabangUtama = {
    nama: "Adira Finance Cabang Pungkur Bandung",
    noHp: "+6281219251995",
    deskripsi: "Adira terdekat di dekat kamu yaitu Adira Finance Cabang Pungkur Bandung, siap melayani gadai BPKB motor & mobil, kredit motor & mobil bekas, top up, dan take over untuk warga Kota Bandung dan sekitarnya.",
    patokan: "Kantor Cabang Adira Finance Bandung 6 - Pungkur patokan jalan dekat dengan Toko listrik sinar kencana."
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AXI Agen Adira Beraxi",
    url: "https://adira.pojokberkah.online",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: cabangUtama.noHp,
      contactType: "Customer Service",
      areaServed: "ID",
      availableLanguage: "Indonesian"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {assignedArticle && <ViewTracker location="pusat" />}
      
      {/* Hero Section dengan desain khusus Adira Agent */}
      <section className="bg-yellow-400 px-6 py-12 text-slate-900 border-b-4 border-slate-900">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl uppercase">
            Butuh Dana Cepat Atau Kredit Kendaraan?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-800 sm:text-xl">
            Solusi tepat dari Agen Resmi AXI Adira Finance. Kami bantu proses Anda sampai tuntas!
          </p>
        </div>
      </section>

      {/* Main Content Area - Meniru screenshot Cabang */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-purple-600 mb-6 font-medium">
            <Link href="/" className="hover:underline">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href="/cabang" className="hover:underline">Cabang</Link>
            <ChevronRight className="w-4 h-4 mx-1 text-slate-400" />
          </div>

          <p className="text-slate-600 mb-6 font-medium">{cabangUtama.nama}</p>

          {/* Heading & Phone */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] mb-3 leading-tight">
              {cabangUtama.nama}
            </h1>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
              {cabangUtama.noHp}
            </h2>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-center leading-relaxed text-lg mb-10">
            {cabangUtama.deskripsi}
          </p>

          {/* Patokan Lokasi Box */}
          <div className="bg-slate-50 rounded-[2rem] p-8 text-center flex flex-col items-center">
            {/* Circle Icon */}
            <div className="w-20 h-20 bg-[#Fdf1cd] rounded-full flex items-center justify-center mb-6">
              <MapPinned className="w-10 h-10 text-[#a96b24]" strokeWidth={1.5} />
            </div>
            
            <div className="flex items-center justify-center text-sm font-bold tracking-widest text-[#404c5a] mb-4 uppercase">
              <MapPin className="w-4 h-4 text-red-500 mr-2 fill-red-500" />
              Patokan Lokasi
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              {cabangUtama.patokan}
            </p>
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">Layanan Utama AXI Adira</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Gadai BPKB Mobil</h3>
            <p className="text-sm text-slate-600">Pencairan tinggi untuk kebutuhan dana besar Anda.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Gadai BPKB Motor</h3>
            <p className="text-sm text-slate-600">Proses kilat, dana cair tanpa potong biaya survei.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Kredit Bekas</h3>
            <p className="text-sm text-slate-600">Fasilitas kredit motor dan mobil bekas terpercaya.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border-t-4 border-yellow-400">
            <h3 className="font-bold text-lg mb-2">Take Over & Top Up</h3>
            <p className="text-sm text-slate-600">Pindahkan kredit Anda atau tambah limit dengan mudah.</p>
          </div>
        </div>
      </section>

      {/* Floating CTA (Original Style from App) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa="6281219251995" messageTemplate={waMessageTemplate} buttonText="Chat Agen Adira" />
      </div>
    </main>
  );
}
