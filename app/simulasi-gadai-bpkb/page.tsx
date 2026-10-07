import { MapPin, ChevronRight, Map } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getUniqueProvinsi } from "@/lib/kota";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Simulasi Gadai BPKB Seluruh Provinsi di Indonesia",
  description: "Layanan Gadai BPKB resmi dan terpercaya. Temukan simulasi angsuran dan daftar cabang di berbagai provinsi seluruh Indonesia.",
  alternates: { canonical: "/simulasi-gadai-bpkb" }
};

export default async function HubProvinsiPage() {
  const provinsiList = await getUniqueProvinsi();
  
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-600 rounded-full mb-4">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Jaringan Layanan Nasional
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Kami hadir di berbagai provinsi di seluruh Indonesia untuk memberikan solusi dana tunai cepat dengan jaminan BPKB kendaraan Anda. Pilih provinsi Anda di bawah ini:
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {provinsiList.map((prov, index) => (
            <Link 
              href={`/simulasi-gadai-bpkb/${prov.slug}`} 
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all group flex flex-col h-full items-center text-center"
            >
              {/* Card Header */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              
              {/* Card Body */}
              <div className="flex-grow w-full">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{prov.nama}</h2>
                <p className="text-slate-500 text-sm">Lihat Layanan & Cabang</p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex justify-center text-blue-600">
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
