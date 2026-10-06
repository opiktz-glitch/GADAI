import type { MetadataRoute } from "next";
import { getAllKota } from "@/lib/kota";

const BASE_URL = "https://gadaibpkbsyariah.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const kotaList = await getAllKota();
  
  // Halaman dinamis kota
  const kotaPages = kotaList.map((k) => ({
    url: `${BASE_URL}/simulasi-gadai-bpkb/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Halaman statis
  const staticPages = [
    "/",
    "/lokasi",
    "/tentang-kami",
    "/faq",
    "/kebijakan-privasi",
    "/layanan/syarat-dan-proses",
    "/layanan/simulasi-angsuran",
    "/produk/kredit-kendaraan-bekas",
    "/produk/take-over-top-up",
  ].map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.7,
  }));

  return [...staticPages, ...kotaPages];
}
