import type { Kota, Article } from "@/lib/kota";
const slugify = (text: string) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
import { assignArticleToKota } from "./actions";
import { Link2 } from "lucide-react";

export default function ArticleAssignmentForm({ kotaList, articles }: { kotaList: Kota[], articles: Article[] }) {
  // Sortir artikel dari yang terbaru
  const sortedArticles = [...articles].sort((a, b) => {
    const ta = a.createdAt || parseInt(a.id) || 0;
    const tb = b.createdAt || parseInt(b.id) || 0;
    return tb - ta;
  });

  if (articles.length === 0) return null;

  const provinsiSet = new Set(kotaList.map(k => k.provinsi));
  const provinsiList = Array.from(provinsiSet).map(p => ({
    nama: p,
    slug: `provinsi_${slugify(p)}`
  }));

  return (
    <form action={assignArticleToKota} className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6 flex flex-col sm:flex-row items-end gap-4 shadow-sm">
      <div className="flex-1 w-full">
        <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Tujuan Pasang</label>
        <select name="kotaSlug" required className="w-full rounded-md border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white cursor-pointer">
          <option value="">-- Pilih Kota / Global --</option>
          <option value="pusat">Pusat / Global (Halaman Utama)</option>
          <optgroup label="Halaman Provinsi">
            {provinsiList.map(p => (
              <option key={p.slug} value={p.slug}>Provinsi {p.nama}</option>
            ))}
          </optgroup>
          <optgroup label="Halaman Kota">
            {kotaList.map(k => (
              <option key={k.slug} value={k.slug}>{k.nama_kota}</option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="flex-[2] w-full">
        <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Artikel yang Ingin Dipasang</label>
        <select name="articleId" required className="w-full rounded-md border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white cursor-pointer">
          <option value="">-- Pilih Artikel dari Bank Artikel --</option>
          {sortedArticles.map(a => {
            const shortIdStr = a.shortId ? `[A-${a.shortId}]` : `[ID: ${a.id.substring(0,6)}]`;
            const snippet = a.content.substring(0, 60).replace(/\n/g, ' ') + '...';
            return (
              <option key={a.id} value={a.id}>{shortIdStr} {snippet}</option>
            );
          })}
        </select>
      </div>
      <div className="w-full sm:w-auto mt-2 sm:mt-0">
        <button type="submit" className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center">
          <Link2 className="w-4 h-4 mr-2" />
          Pasangkan!
        </button>
      </div>
    </form>
  );
}
