import type { MetadataRoute } from "next";
import { getAllKota } from "@/lib/kota";

const BASE_URL = "https://contoh-domain-kamu.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const kotaList = await getAllKota();
  const kotaPages = kotaList.map((k) => ({
    url: `${BASE_URL}/simulasi-gadai-bpkb-${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...kotaPages,
  ];
}
