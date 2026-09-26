"use client";

import { useState } from "react";
import { Article, Kota, Config } from "@/lib/kota";
import { Pencil, Trash2, Check, X, Eye, Shuffle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { editArticle, deleteArticle, shuffleArticles, toggleRandomLocation } from "./actions";

export default function ArticleTable({ articles, kotaList, config }: { articles: Article[], kotaList: Kota[], config: Config }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startEdit = (a: Article, rowKey: string) => {
    setEditingId(rowKey);
    setEditContent(a.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    setIsLoading(true);
    try {
      await editArticle(id, editContent);
      setEditingId(null);
    } catch (e) {
      alert("Gagal menyimpan artikel.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-12 whitespace-nowrap">No</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 whitespace-nowrap">ID Artikel</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 min-w-[300px]">Artikel</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-32 whitespace-nowrap">Lokasi</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-24 whitespace-nowrap">Pembuat</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-16 whitespace-nowrap">Klik</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-16 whitespace-nowrap">Random</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-40 whitespace-nowrap">Tanggal Buat</th>
              <th className="px-4 py-3 text-center font-medium text-slate-700 w-32 sticky right-0 bg-slate-50 z-10 whitespace-nowrap shadow-[inset_1px_0_0_#e2e8f0]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                  Belum ada artikel di bank artikel.
                </td>
              </tr>
            ) : (
              (() => {
                const flattenedRows: {
                  article: Article;
                  loc: { slug: string, name: string, views: number, allowRandom: boolean | undefined, isPusat: boolean } | null;
                }[] = [];

                const sortedArticles = [...articles].sort((a, b) => {
                  const ta = a.createdAt || parseInt(a.id) || 0;
                  const tb = b.createdAt || parseInt(b.id) || 0;
                  return tb - ta; // Newest first
                });
                
                sortedArticles.forEach(a => {
                  const locs: { slug: string, name: string, views: number, allowRandom: boolean | undefined, isPusat: boolean }[] = [];
                  if (config.assignedArticleId === a.id) locs.push({ slug: "pusat", name: "Pusat", views: config.views || 0, allowRandom: config.allowRandom, isPusat: true });
                  kotaList.forEach(k => {
                    if (k.assignedArticleId === a.id) locs.push({ slug: k.slug, name: k.nama_kota, views: k.views || 0, allowRandom: k.allowRandom, isPusat: false });
                  });

                  if (locs.length === 0) {
                    flattenedRows.push({ article: a, loc: null });
                  } else {
                    locs.forEach(loc => flattenedRows.push({ article: a, loc }));
                  }
                });

                return flattenedRows.map((row, idx) => {
                  const a = row.article;
                  const loc = row.loc;
                  const rowKey = `${a.id}-${loc ? loc.slug : 'none'}`;
                  const isEditing = editingId === rowKey;
                  
                  // Gunakan createdAt jika ada (dari artikel baru), atau coba parse ID (artikel lama)
                  let dateValue = a.createdAt;
                  if (!dateValue && /^\d+$/.test(a.id)) {
                    dateValue = parseInt(a.id);
                  }
                  
                  const date = dateValue ? new Date(dateValue) : null;
                  const isValidDate = date && !isNaN(date.getTime());
                  const dateStr = isValidDate 
                    ? date.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) 
                    : '-';
                    
                  return (
                    <tr key={rowKey} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-4 py-3 font-medium text-slate-900 align-top text-center whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-500 align-top text-center whitespace-nowrap">
                        {a.shortId ? `A-${a.shortId}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-700 align-top min-w-[300px]">
                        {isEditing ? (
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={4}
                            disabled={isLoading}
                            className="w-full rounded-md border border-blue-400 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm"
                          />
                        ) : (
                          <div className="line-clamp-2" title={a.content}>
                            {a.content}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-700 align-top text-center text-xs whitespace-nowrap">
                        {!loc ? (
                          <span className="text-slate-400 italic">Belum dipasang</span>
                        ) : (
                          <span className={`px-2 py-1 rounded-full ${loc.isPusat ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} min-w-[80px]`}>
                            {loc.name}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-700 align-top text-center whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${a.source === 'AI' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-700'}`}>
                          {a.source === 'AI' ? '✨ AI' : '👤 Admin'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-700 align-top text-center whitespace-nowrap">
                        {!loc ? (
                          <span className="text-slate-300">-</span>
                        ) : (
                          <span>{loc.views}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-center whitespace-nowrap">
                        {!loc ? (
                          <span className="text-slate-300">-</span>
                        ) : (
                          <input 
                            type="checkbox" 
                            title={`Centang untuk ikut diacak (${loc.name})`}
                            checked={loc.allowRandom !== false} 
                            onChange={(e) => toggleRandomLocation(loc.slug, e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 align-top text-center text-xs whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="px-4 py-3 align-top sticky right-0 bg-white group-hover:bg-slate-50 z-10 shadow-[inset_1px_0_0_#e2e8f0]">
                        <div className="flex items-center justify-center space-x-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEdit(a.id)}
                                disabled={isLoading}
                                className="text-green-600 hover:text-green-800 p-1 bg-green-100 rounded-md transition-colors"
                                title="Simpan"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={isLoading}
                                className="text-slate-600 hover:text-slate-800 p-1 bg-slate-200 rounded-md transition-colors"
                                title="Batal"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setPreviewContent(a.content)}
                                className="text-blue-600 hover:text-blue-800 p-1.5 bg-blue-50 rounded-md transition-colors"
                                title="Preview"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => startEdit(a, rowKey)}
                                className="text-amber-600 hover:text-amber-800 p-1.5 bg-amber-50 rounded-md transition-colors"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <form action={deleteArticle} className="inline-block">
                                <input type="hidden" name="id" value={a.id} />
                                <button
                                  type="submit"
                                  className="text-red-600 hover:text-red-800 p-1.5 bg-red-50 rounded-md transition-colors"
                                  title="Hapus"
                                  onClick={(e) => {
                                    if (!confirm("Yakin ingin menghapus artikel ini?")) {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </form>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                });
              })()
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <form action={shuffleArticles}>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Acak Ulang Posisi Artikel
          </button>
        </form>
      </div>

      {/* Modal Preview */}
      {previewContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center"><Eye className="w-5 h-5 mr-2 text-blue-600"/> Preview Artikel</h3>
              <button onClick={() => setPreviewContent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-slate-700 leading-relaxed text-sm prose prose-sm max-w-none max-h-[70vh] overflow-y-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewContent}</ReactMarkdown>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button 
                onClick={() => setPreviewContent(null)} 
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
