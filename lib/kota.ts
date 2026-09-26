import { db } from "@/lib/firebase";

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
};

export type Article = {
  id: string;
  content: string;
  metaDesc?: string;
  source?: string;
  createdAt?: number;
  shortId?: string;
};

export async function getAllKota(): Promise<Kota[]> {
  const snapshot = await db.collection('kota').get();
  return snapshot.docs.map(doc => doc.data() as Kota);
}

export async function getKotaBySlug(slug: string): Promise<Kota | undefined> {
  const doc = await db.collection('kota').doc(slug).get();
  if (!doc.exists) return undefined;
  return doc.data() as Kota;
}

export async function getConfig(): Promise<Config> {
  const doc = await db.collection('config').doc('main').get();
  if (!doc.exists) return { whatsapp_pusat: "6287823651470" };
  return doc.data() as Config;
}

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
