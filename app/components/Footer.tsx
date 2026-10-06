import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Info Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Gadai Pojok Berkah</h3>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Layanan gadai BPKB mobil dan motor terpercaya, proses cepat, aman, dan pencairan maksimal.
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
            <h3 className="text-white text-lg font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li>Email: info@pojokberkah.online</li>
              <li>Telepon: 0812-3456-7890</li>
            </ul>
          </address>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Gadai Pojok Berkah. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
