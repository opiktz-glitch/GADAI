import { updateConfig, addKota, deleteKota, addArticle, deleteArticle, generateArticleAI } from "./actions";
import { getConfig, getAllKota, getAllArticles } from "@/lib/kota";
import { Settings, PlusCircle, MapPin, Pencil, Trash2, Library, CheckCircle } from "lucide-react";
import Link from "next/link";
import ArticleTable from "./ArticleTable";
import AllArticlesTable from "./AllArticlesTable";
import ArticleAssignmentForm from "./ArticleAssignmentForm";
import ToastNotification from "./ToastNotification";
import AIGenerator from "./AIGenerator";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; tab?: string }>;
}) {
  const sp = await searchParams;
  const activeTab = sp.tab || "pengaturan";
  const config = await getConfig();
  const semuaKota = await getAllKota();
  const semuaArticles = await getAllArticles();

  return (
    <main className="min-h-screen bg-slate-100 p-8 relative">
      <ToastNotification successMsg={sp.success} errorMsg={sp.error} />

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-5 md:mb-0">Admin Dashboard</h1>
          
          {/* Tab Navigation (Modern Segmented Control) */}
          <nav className="inline-flex p-1 space-x-1 bg-slate-200/60 rounded-xl overflow-x-auto hide-scrollbar">
            <Link 
              href="/admin?tab=pengaturan" 
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center ${activeTab === 'pengaturan' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'}`}
            >
              <Settings className="w-4 h-4 mr-2" /> Pengaturan & Kota
            </Link>
            <Link 
              href="/admin?tab=artikel" 
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center ${activeTab === 'artikel' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'}`}
            >
              <Library className="w-4 h-4 mr-2" /> Artikel & AI
            </Link>
          </nav>
        </div>
        
        {/* Gabungan Pengaturan Global & Manajemen Kota */}
        {activeTab === "pengaturan" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pengaturan Global */}
              <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 h-fit">
                <div className="mb-4 flex items-center space-x-2 border-b pb-4">
                  <Settings className="h-6 w-6 text-slate-500" />
                  <h2 className="text-xl font-semibold">Pengaturan Global</h2>
                </div>
                <form action={updateConfig} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Nomor WhatsApp Pusat (Awali 62)</label>
                    <input 
                      type="text" 
                      name="whatsapp_pusat" 
                      defaultValue={config.whatsapp_pusat}
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Teks Artikel Halaman Utama (Opsional)</label>
                    <textarea 
                      name="artikel_homepage" 
                      rows={4}
                      defaultValue={config.artikel_homepage || ""}
                      placeholder="Jika diisi, teks ini akan menggantikan artikel bawaan di halaman utama..."
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" 
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 font-medium">
                      Simpan Pengaturan
                    </button>
                  </div>
                </form>
              </section>

              {/* Tambah Kota */}
              <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 h-fit">
                <div className="mb-4 flex items-center space-x-2 border-b pb-4">
                  <PlusCircle className="h-6 w-6 text-slate-500" />
                  <h2 className="text-xl font-semibold">Tambah Kota Baru</h2>
                </div>
                <form action={addKota} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Nama Kota</label>
                      <input required type="text" name="nama_kota" placeholder="Contoh: Semarang" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Slug (Tanpa Spasi)</label>
                      <input required type="text" name="slug" placeholder="Contoh: semarang" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Provinsi</label>
                      <input required type="text" name="provinsi" placeholder="Contoh: Jawa Tengah" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Alamat Cabang</label>
                      <input required type="text" name="alamat_cabang_utama" placeholder="Jalan Sudirman No 1..." className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="w-full rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700 font-bold">
                      Simpan Kota Baru
                    </button>
                  </div>
                </form>
              </section>
            </div>

        {/* Daftar Kota Saat Ini */}
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center space-x-2 border-b pb-4">
            <MapPin className="h-6 w-6 text-slate-500" />
            <h2 className="text-xl font-semibold">Daftar Kota Saat Ini ({semuaKota.length})</h2>
          </div>
          <div className="overflow-hidden rounded-md border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Nama Kota</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Provinsi</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">URL / Slug</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {semuaKota.map((k) => (
                  <tr key={k.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{k.nama_kota}</td>
                    <td className="px-4 py-3 text-slate-600">{k.provinsi}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{k.slug}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link href={`/admin/edit/${k.slug}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Link>
                        <form action={deleteKota}>
                          <input type="hidden" name="slug" value={k.slug} />
                          <button type="submit" className="text-red-600 hover:text-red-800 flex items-center" title="Hapus (Tanpa Konfirmasi)">
                            <Trash2 className="h-4 w-4 mr-1" /> Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </section>
          </div>
        )}

        {/* Tab Artikel & AI */}
        {activeTab === "artikel" && (
          <div className="space-y-8">
            
            {/* Bagian: Buat Artikel Baru */}
            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center space-x-2 border-b pb-4">
                <Library className="h-6 w-6 text-slate-500" />
                <h2 className="text-xl font-semibold">Buat Artikel Baru</h2>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Gunakan AI untuk membuat artikel SEO-friendly dengan sekali klik, atau paste artikel Anda sendiri.
              </p>

              {/* Form Generate AI Terpisah (Client Component) */}
              <AIGenerator kotaList={semuaKota} />

              {/* Form Simpan Manual */}
              <form action={addArticle} className="mt-8 border-t pt-6">
                <label className="block text-sm font-medium mb-2 text-slate-700">Atau Tambah Artikel Manual</label>
                <div className="flex items-start space-x-3">
                  <textarea required name="content" rows={2} placeholder="Paste artikel Anda di sini..." className="flex-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none"></textarea>
                  <button type="submit" className="rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-900 font-medium whitespace-nowrap transition-colors h-[56px]">
                    Simpan Manual
                  </button>
                </div>
              </form>
            </section>

            {/* Bagian: Distribusi Artikel */}
            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center space-x-2 border-b pb-4">
                <CheckCircle className="h-6 w-6 text-slate-500" />
                <h2 className="text-xl font-semibold">Distribusi Artikel</h2>
              </div>
              <ArticleAssignmentForm kotaList={semuaKota} articles={semuaArticles} />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <ArticleTable articles={semuaArticles} kotaList={semuaKota} config={config} />
              </div>
            </section>

            {/* Bagian: Bank Artikel */}
            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-semibold">Bank Artikel SEO ({semuaArticles.length})</h2>
              </div>
              <AllArticlesTable articles={semuaArticles} />
            </section>
            
          </div>
        )}
      </div>
    </main>
  );
}
