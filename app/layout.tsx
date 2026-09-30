import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gadai.pojokberkah.online"),
  title: {
    default: "Gadai BPKB Kendaraan | Gadai Pojok Berkah",
    template: "%s | Gadai Pojok Berkah",
  },
  description: "Layanan gadai BPKB mobil dan motor terpercaya, proses cepat, aman, dan pencairan maksimal. Temukan simulasi dan cabang terdekat di kota Anda.",
  keywords: ["gadai bpkb", "pinjaman dana tunai", "gadai bpkb mobil", "gadai bpkb motor", "pinjaman cepat cair", "dana tunai", "gadai bpkb terdekat"],
  openGraph: {
    title: "Gadai BPKB Kendaraan Proses Cepat & Aman",
    description: "Proses pencairan dana kilat, tanpa ribet, dan dijamin aman. Temukan cabang terdekat di kota Anda sekarang.",
    url: "https://gadai.pojokberkah.online",
    siteName: "Gadai Pojok Berkah",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white text-slate-900 antialiased flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* Global Header */}
          <header className="bg-white shadow-sm border-b border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image 
                  src="/logo.jpg" 
                  alt="Logo Gadai Pojok Berkah" 
                  width={36} 
                  height={36} 
                  className="rounded-lg group-hover:scale-105 transition-transform"
                />
                <span className="font-bold text-lg text-slate-900">Gadai Pojok Berkah</span>
              </Link>
            </div>
          </header>
          
          {children}
        </div>
        
        {/* Global Footer */}
        <footer className="bg-slate-900 text-slate-400 pt-10 pb-28 sm:pb-10 mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Gadai Pojok Berkah. Hak Cipta Dilindungi.
              </p>
              <div className="flex space-x-6 text-sm font-medium mr-0 md:mr-48">
                <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
