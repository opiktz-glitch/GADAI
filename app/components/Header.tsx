"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Toggle & Logo */}
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 hover:text-red-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center space-x-3 group" aria-label="Beranda AXI Marketing Adira">
              <Image 
                src="/logo-axi-v3-web.png" 
                alt="Logo AXI Marketing Adira Beraxi" 
                width={240} 
                height={120} 
                priority
                className="h-10 sm:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Navigation - SEO Semantic <nav> */}
          <nav className="hidden md:flex space-x-8 items-center" aria-label="Main Navigation">
            <Link href="/tentang-kami" className="text-slate-600 hover:text-red-600 font-medium transition-colors">
              Tentang Kami
            </Link>
            {/* Dropdown Produk - Warna merah menandakan active/highlight */}
            <div className="relative group cursor-pointer py-2">
              <span className="text-slate-600 hover:text-red-600 transition-colors font-medium flex items-center gap-1">
                Produk
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-60 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <ul className="py-2">
                  <li><Link href="/produk/gadai-bpkb-mobil" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors border-b border-slate-50">Gadai BPKB Mobil</Link></li>
                  <li><Link href="/produk/gadai-bpkb-motor" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors border-b border-slate-50">Gadai BPKB Motor</Link></li>
                  <li><Link href="/produk/kredit-baru" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors border-b border-slate-50">Kredit Motor dan Mobil Baru</Link></li>
                  <li><Link href="/produk/kredit-bekas" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors border-b border-slate-50">Kredit Motor dan Mobil Bekas</Link></li>
                  <li><Link href="/produk/take-over-top-up" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">Take Over &amp; Top Up</Link></li>
                </ul>
              </div>
            </div>
            {/* Dropdown Layanan */}
            <div className="relative group cursor-pointer py-2">
              <span className="text-slate-600 group-hover:text-red-600 font-medium transition-colors flex items-center gap-1">
                Layanan
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <ul className="py-2">
                  <li><Link href="/layanan/simulasi-angsuran" className="block px-5 py-3 text-sm font-bold text-yellow-600 hover:bg-yellow-50 transition-colors border-b border-slate-50">Tabel Simulasi Angsuran</Link></li>
                  <li><Link href="/layanan/syarat-dan-proses" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors border-b border-slate-50">Syarat &amp; Proses Gadai BPKB</Link></li>
                  <li><Link href="/layanan/cara-pengajuan" className="block px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">Cara Pengajuan Gadai BPKB</Link></li>
                </ul>
              </div>
            </div>
            <Link href="/lokasi" className="text-slate-600 hover:text-red-600 font-medium transition-colors">
              Lokasi
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center">
            <a 
              href="https://wa.me/6287724039666" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-2 px-3 sm:py-2.5 sm:px-6 rounded-md transition-colors shadow-sm tracking-wide text-[11px] sm:text-sm flex items-center gap-1.5 sm:gap-2"
              aria-label="Hubungi kami via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white absolute top-full left-0 w-full shadow-lg pb-4">
          <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <Link href="/tentang-kami" className="block text-slate-700 font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Tentang Kami
            </Link>

            {/* Mobile Produk Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left text-slate-700 font-bold"
                onClick={() => toggleDropdown("produk")}
              >
                <span>Produk</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'produk' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'produk' && (
                <div className="mt-3 pl-4 space-y-4 border-l-2 border-slate-100">
                  <Link href="/produk/gadai-bpkb-mobil" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Gadai BPKB Mobil</Link>
                  <Link href="/produk/gadai-bpkb-motor" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Gadai BPKB Motor</Link>
                  <Link href="/produk/kredit-baru" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kredit Motor dan Mobil Baru</Link>
                  <Link href="/produk/kredit-bekas" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Kredit Motor dan Mobil Bekas</Link>
                  <Link href="/produk/take-over-top-up" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Take Over &amp; Top Up</Link>
                </div>
              )}
            </div>

            {/* Mobile Layanan Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-left text-slate-700 font-bold"
                onClick={() => toggleDropdown("layanan")}
              >
                <span>Layanan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'layanan' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'layanan' && (
                <div className="mt-3 pl-4 space-y-4 border-l-2 border-slate-100">
                  <Link href="/layanan/simulasi-angsuran" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tabel Simulasi Angsuran</Link>
                  <Link href="/layanan/syarat-dan-proses" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Syarat &amp; Proses Gadai BPKB</Link>
                  <Link href="/layanan/cara-pengajuan" className="block text-slate-600 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Cara Pengajuan Gadai BPKB</Link>
                </div>
              )}
            </div>

            <Link href="/lokasi" className="block text-slate-700 font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Lokasi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
