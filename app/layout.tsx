import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Simulasi Gadai BPKB per Kota",
    template: "%s",
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
