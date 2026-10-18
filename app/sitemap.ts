import type { MetadataRoute } from "next";
import { getAllKota, getUniqueProvinsi, slugify, getConfig, getArticleById } from "@/lib/kota";

const BASE_URL = "https://gadai.pojokberkah.online";

function toDate(ts?: number): Date | undefined {
  if (!ts) return undefined;
  return new Date(ts);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [kotaList, provinsiList, config] = await Promise.all([
    getAllKota(),
    getUniqueProvinsi(),
    getConfig(),
  ]);

  const provinsiPages = await Promise.all(
    provinsiList.map(async (p) => {
      const articleId = config.provinsiArticles?.[p.slug];
      const article = articleId ? await getArticleById(articleId) : null;
      return {
        url: `${BASE_URL}/simulasi-gadai-bpkb/${p.slug}`,
        lastModified: toDate(article?.updatedAt) || toDate(article?.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    })
  );

  const kotaPages = await Promise.all(
    kotaList.map(async (k) => {
      const article = k.assignedArticleId ? await getArticleById(k.assignedArticleId) : null;
      const ts = k.updatedAt || article?.updatedAt || article?.createdAt;
      return {
        url: `${BASE_URL}/simulasi-gadai-bpkb/${slugify(k.provinsi)}/${k.slug}`,
        lastModified: toDate(ts),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
  );

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
    lastModified: undefined,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  return [...staticPages, ...provinsiPages, ...kotaPages];
}
