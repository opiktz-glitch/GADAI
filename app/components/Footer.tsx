import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getConfig } from "@/lib/kota";
import { telNumber, waLink } from "@/lib/wa";

export default async function Footer() {
  const config = await getConfig();
  return (
    <>
      {/* Trust & Partnership Logos - Banner */}
      <section className="bg-[#ffed00] border-t-4 border-yellow-500 py-3 flex justify-center">
        <Image 
          src="/footer-logo-2x.png" 
          alt="AXI Adira Finance - Dicicil Aja - Otoritas Jasa Keuangan (OJK)" 
          width={1600} 
          height={200} 
          sizes="(max-width: 768px) 300px, 400px"
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
              <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-3 text-sm items-center">
                <span className="text-slate-400">Nama AXI</span><span>:</span><span className="text-white font-medium">{config.nama_marketing || "Leni Suherman"}</span>
                <span className="text-slate-400">Id AXI</span><span>:</span><span className="text-white font-medium">{config.id_axi || "000019002675"}</span>
                <span className="text-slate-400">Telepon / WA</span><span>:</span>
                <div>
                  <a
                    href={waLink(config.whatsapp_pusat, "Halo Admin, saya menghubungi melalui website Gadai Pojok Berkah, saya ingin konsultasi pengajuan Gadai BPKB.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-semibold transition-colors group cursor-pointer"
                    title="Klik untuk Chat WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="hover:underline">{telNumber(config.whatsapp_pusat)}</span>
                    <span className="text-[10px] bg-green-950/80 text-green-400 px-1.5 py-0.5 rounded border border-green-700/60 font-bold ml-1">
                      Chat WA
                    </span>
                  </a>
                </div>
                <span className="col-span-3 mt-1 text-slate-400">Layanan Seluruh Indonesia</span>
              </div>
            </address>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} AXI Marketing Adira Beraxi. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
