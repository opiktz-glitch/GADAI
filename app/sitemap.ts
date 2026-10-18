import type { MetadataRoute } from "next";
import { getAllKota, getUniqueProvinsi, slugify } from "@/lib/kota";

const BASE_URL = "https://gadai.pojokberkah.online";

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

  // Halaman statis & landing page utama
  const staticPages = [
    { route: "/", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/simulasi-gadai-bpkb", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/produk/gadai-bpkb-mobil", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "/produk/gadai-bpkb-motor", priority: 0.85, changeFrequency: "weekly" as const },
    { route: "/produk/kredit-baru", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/produk/kredit-bekas", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/produk/take-over-top-up", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/layanan/syarat-dan-proses", priority: 0.75, changeFrequency: "monthly" as const },
    { route: "/layanan/cara-pengajuan", priority: 0.75, changeFrequency: "monthly" as const },
    { route: "/layanan/simulasi-angsuran", priority: 0.75, changeFrequency: "monthly" as const },
    { route: "/tentang-kami", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/kebijakan-privasi", priority: 0.5, changeFrequency: "yearly" as const },
  ].map((item) => ({
    url: `${BASE_URL}${item.route === "/" ? "" : item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  return [...staticPages, ...provinsiPages, ...kotaPages];
}
