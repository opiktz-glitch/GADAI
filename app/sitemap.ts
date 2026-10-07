import type { MetadataRoute } from "next";
import { getAllKota, getUniqueProvinsi, slugify } from "@/lib/kota";

const BASE_URL = "https://gadaibpkbsyariah.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const kotaList = await getAllKota();
  const provinsiList = await getUniqueProvinsi();
  
  // Halaman dinamis provinsi (Silo Level 1)
  const provinsiPages = provinsiList.map((p) => ({
    url: `${BASE_URL}/simulasi-gadai-bpkb/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Halaman dinamis kota (Silo Level 2)
  const kotaPages = kotaList.map((k) => ({
    url: `${BASE_URL}/simulasi-gadai-bpkb/${slugify(k.provinsi)}/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Halaman statis
  const staticPages = [
    "/",
    "/simulasi-gadai-bpkb",
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
    priority: route === "/" ? 1.0 : (route === "/simulasi-gadai-bpkb" ? 0.9 : 0.7),
  }));

  return [...staticPages, ...provinsiPages, ...kotaPages];
}
