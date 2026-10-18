import { db } from "@/lib/firebase";
import { cache } from "react";

export type Kota = {
  slug: string;
  nama_kota: string;
  provinsi: string;
  jumlah_cabang: number;
  estimasi_pencairan_min: number;
  estimasi_pencairan_max: number;
  waktu_proses_jam: number;
  nama_marketing_lokal: string;
  testimoni: string;
  alamat_cabang_utama: string;
  kendaraan_populer: string[];
  artikel_seo?: string;
  assignedArticleId?: string;
  views?: number;
  allowRandom?: boolean;
};

export type Config = {
  whatsapp_pusat: string;
  artikel_homepage?: string;
  assignedArticleId?: string;
  views?: number;
  allowRandom?: boolean;
  provinsiArticles?: Record<string, string>;
};

export type Article = {
  id: string;
  content: string;
  metaDesc?: string;
  source?: string;
  createdAt?: number;
  shortId?: string;
};

export const getAllKota = cache(async (): Promise<Kota[]> => {
  const snapshot = await db.collection('kota').get();
  return snapshot.docs.map(doc => doc.data() as Kota);
});

export const getKotaBySlug = cache(async (slug: string): Promise<Kota | undefined> => {
  const doc = await db.collection('kota').doc(slug).get();
  if (!doc.exists) return undefined;
  return doc.data() as Kota;
});

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const getUniqueProvinsi = cache(async (): Promise<{ nama: string, slug: string }[]> => {
  const kotaList = await getAllKota();
  const provinsiSet = new Set(kotaList.map(k => k.provinsi));
  return Array.from(provinsiSet).map(p => ({
    nama: p,
    slug: slugify(p)
  }));
});

export const getCitiesByProvinsiSlug = cache(async (provinsiSlug: string): Promise<Kota[]> => {
  const kotaList = await getAllKota();
  return kotaList.filter(k => slugify(k.provinsi) === provinsiSlug);
});

export const getConfig = cache(async (): Promise<Config> => {
  const doc = await db.collection('config').doc('main').get();
  if (!doc.exists) return { whatsapp_pusat: "6287724039666" };
  return doc.data() as Config;
});

export async function getAllArticles(): Promise<Article[]> {
  const snapshot = await db.collection('articles').get();
  return snapshot.docs.map(doc => doc.data() as Article);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  if (!id) return undefined;
  const doc = await db.collection('articles').doc(id).get();
  if (!doc.exists) return undefined;
  return doc.data() as Article;
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export function cleanMetaDesc(rawDesc?: string | null, kota?: string, cabang?: number): string {
  if (!rawDesc) return "";
  let clean = rawDesc.trim();
  // Strip outer quotes or brackets: [...] or "..."
  clean = clean.replace(/^\[\s*/, "").replace(/\s*\]$/, "");
  clean = clean.replace(/^"\s*/, "").replace(/\s*"$/, "");
  
  if (kota) {
    clean = clean.replace(/\[NAMA_KOTA\]/gi, kota);
    clean = clean.replace(/\[NAMA_KOTA_KAPITAL\]/gi, kota.toUpperCase());
  } else {
    clean = clean.replace(/di\s+\[NAMA_KOTA\]/gi, "seluruh Indonesia");
    clean = clean.replace(/\[NAMA_KOTA\]/gi, "Seluruh Indonesia");
    clean = clean.replace(/\[NAMA_KOTA_KAPITAL\]/gi, "SELURUH INDONESIA");
  }

  if (cabang !== undefined) {
    clean = clean.replace(/\[JUMLAH_CABANG\]/gi, cabang.toString());
  } else {
    clean = clean.replace(/\[JUMLAH_CABANG\]/gi, "berbagai");
  }

  // Remove any remaining bracket placeholders like [APA_SAJA]
  clean = clean.replace(/\[[^\]]+\]/g, "");
  // Clean up any double spaces
  clean = clean.replace(/\s{2,}/g, " ").trim();
  return clean;
}

