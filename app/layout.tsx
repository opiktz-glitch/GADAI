import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gadaibpkbsyariah.com"),
  title: {
    default: "Gadai BPKB Kendaraan | Gadai BPKB Syariah",
    template: "%s | Gadai BPKB Syariah",
  },
  description: "Layanan gadai BPKB mobil dan motor terpercaya, proses cepat, aman, dan pencairan maksimal. Temukan simulasi dan cabang terdekat di kota Anda.",
  keywords: ["gadai bpkb", "pinjaman dana tunai", "gadai bpkb mobil", "gadai bpkb motor", "pinjaman cepat cair", "dana tunai", "gadai bpkb terdekat"],
  openGraph: {
    title: "Gadai BPKB Kendaraan Proses Cepat & Aman",
    description: "Proses pencairan dana kilat, tanpa ribet, dan dijamin aman. Temukan cabang terdekat di kota Anda sekarang.",
    url: "https://gadaibpkbsyariah.com",
    siteName: "Gadai BPKB Syariah",
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
      <body className={`${inter.className} bg-white text-slate-900 antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
