import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gadai Pojok Berkah - Marketing Resmi AXI Adira Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadai BPKB Kendaraan Proses Cepat & Aman",
    description: "Proses pencairan dana kilat, tanpa ribet, dan dijamin aman. Temukan cabang terdekat di kota Anda sekarang.",
    images: ["/og-image.jpg"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gadai Pojok Berkah",
  alternateName: ["Pojok Berkah", "Gadai BPKB Adira AXI"],
  url: "https://gadai.pojokberkah.online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white text-slate-900 antialiased flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
