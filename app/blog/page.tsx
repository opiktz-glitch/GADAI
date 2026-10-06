import { MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Informasi Kota",
  description: "Daftar informasi dan simulasi pencairan di berbagai kota cabang Gadai Pojok Berkah.",
};

// Data dummy sesuai dengan gambar
const cities = [
  {
    province: "JAWA BARAT",
    name: "Bandung",
    branches: "10 Cabang Aktif",
    slug: "bandung"
  },
  {
    province: "JAWA BARAT",
    name: "Bekasi",
    branches: "5 Cabang Aktif",
    slug: "bekasi"
  },
  {
    province: "DKI JAKARTA",
    name: "Jakarta",
    branches: "12 Cabang Aktif",
    slug: "jakarta"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tersedia di Berbagai Kota
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Pilih kota domisili Anda untuk melihat simulasi pencairan dan lokasi cabang.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <Link 
              href={`/blog/${city.slug}`} 
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex items-center text-slate-400 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-xs font-semibold tracking-wider uppercase">{city.province}</span>
              </div>
              
              {/* Card Body */}
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{city.name}</h2>
                <p className="text-slate-500 text-sm">{city.branches}</p>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-medium group-hover:text-blue-700">
                <span>Lihat Simulasi</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
