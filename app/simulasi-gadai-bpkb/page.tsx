import { Map } from "lucide-react";
import { Metadata } from "next";
import { getUniqueProvinsi, getAllKota, getConfig, slugify } from "@/lib/kota";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import ProvinsiSearchGrid from "./ProvinsiSearchGrid";
import KalkulatorSimulasi from "@/app/components/KalkulatorSimulasi";
import { DEFAULT_WHATSAPP } from "@/lib/wa";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Simulasi Gadai BPKB Seluruh Provinsi di Indonesia",
  description: "Layanan Gadai BPKB resmi dan terpercaya. Temukan simulasi angsuran dan daftar cabang di berbagai provinsi seluruh Indonesia.",
  alternates: { canonical: "/simulasi-gadai-bpkb" },
  openGraph: {
    title: "Simulasi Gadai BPKB Seluruh Provinsi di Indonesia",
    description: "Layanan Gadai BPKB resmi dan terpercaya di seluruh provinsi Indonesia.",
    url: "https://gadai.pojokberkah.online/simulasi-gadai-bpkb",
    siteName: "Gadai Pojok Berkah",
    locale: "id_ID",
    type: "website",
    images: [{ url: "https://gadai.pojokberkah.online/og-image.jpg", width: 1200, height: 630, alt: "Simulasi Gadai BPKB" }],
  },
};

export default async function HubProvinsiPage() {
  const [provinsiList, allKota, config] = await Promise.all([
    getUniqueProvinsi(),
    getAllKota(),
    getConfig(),
  ]);

  const waNumber = config.whatsapp_pusat || DEFAULT_WHATSAPP;
  const waTemplate = "Halo Admin, saya membaca info di website Gadai Pojok Berkah (gadai.pojokberkah.online), saya ingin konsultasi simulasi gadai BPKB untuk wilayah saya.";

  const kotaItems = allKota.map((k) => ({
    nama_kota: k.nama_kota,
    slug: k.slug,
    provinsi: k.provinsi,
    provinsiSlug: slugify(k.provinsi),
  }));
  
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-amber-700 rounded-full mb-4">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Jaringan Layanan Nasional
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Kami hadir di berbagai provinsi di seluruh Indonesia untuk memberikan solusi dana tunai cepat dengan jaminan BPKB kendaraan Anda. Pilih provinsi atau cari kota Anda di bawah ini:
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <KalkulatorSimulasi noWa={waNumber} className="mb-14" />

        {/* Interactive Search & Grid Cards */}
        <ProvinsiSearchGrid provinsiList={provinsiList} kotaList={kotaItems} />
        
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:bottom-8 sm:right-8 sm:left-auto">
        <WhatsAppButton noWa={waNumber} messageTemplate={waTemplate} buttonText="Konsultasi CS (Gratis)" />
      </div>
    </div>
  );
}
