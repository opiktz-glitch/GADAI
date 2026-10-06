import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* Trust & Partnership Logos - Banner */}
      <section className="bg-[#FFE600] border-t-4 border-yellow-500 py-3 flex justify-center">
        <Image 
          src="/footer-logo-2x.png" 
          alt="AXI Adira Finance - Dicicil Aja - Otoritas Jasa Keuangan (OJK)" 
          width={1600} 
          height={200} 
          className="h-14 sm:h-16 w-auto object-contain"
          priority={false}
        />
      </section>

      {/* Main Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1: Info Brand */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">AXI Marketing Adira Beraxi</h3>
              <p className="text-sm leading-relaxed mb-6 text-slate-400">
                Layanan resmi gadai BPKB mobil dan motor terpercaya, proses cepat, aman, dan pencairan maksimal dari Adira Finance.
              </p>
            </div>
            
            {/* Column 2: Legal & Utility (Sesuai rekomendasi SEO) */}
            <nav aria-label="Footer Navigation">
              <h3 className="text-white text-lg font-bold mb-4">Informasi</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                </li>
                <li>
                  <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                </li>
              </ul>
            </nav>

            {/* Column 3: Contact */}
            <address className="not-italic">
              <h3 className="text-white text-lg font-bold mb-4">Hubungi Marketing</h3>
              <ul className="space-y-3 text-sm">
                <li>Telepon / WA: +62 878-2365-1470</li>
                <li>Layanan Seluruh Indonesia</li>
              </ul>
            </address>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} AXI Marketing Adira Beraxi. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
