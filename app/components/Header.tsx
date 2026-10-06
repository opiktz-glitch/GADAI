import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Beranda Gadai Pojok Berkah">
            <Image 
              src="/logo.jpg" 
              alt="Logo Gadai Pojok Berkah" 
              width={40} 
              height={40} 
              className="rounded-lg group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-xl text-slate-900 hidden sm:block">Pojok Berkah</span>
          </Link>

          {/* Navigation - SEO Semantic <nav> */}
          <nav className="hidden md:flex space-x-8 items-center" aria-label="Main Navigation">
            <Link href="/tentang-kami" className="text-slate-600 hover:text-red-600 font-medium transition-colors">
              Tentang Kami
            </Link>
            {/* Dropdown Produk - Warna merah menandakan active/highlight */}
            <div className="relative group cursor-pointer">
              <span className="text-red-600 font-medium flex items-center gap-1">
                Produk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
              {/* Tempatkan list submenu di sini untuk dropdown nantinya */}
            </div>
            {/* Dropdown Layanan */}
            <div className="relative group cursor-pointer">
              <span className="text-slate-600 hover:text-red-600 font-medium transition-colors flex items-center gap-1">
                Layanan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </div>
            <Link href="/blog" className="text-slate-600 hover:text-red-600 font-medium transition-colors">
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-2.5 px-6 rounded-md transition-colors shadow-sm tracking-wide text-sm flex items-center gap-2"
              aria-label="Hubungi kami via WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
