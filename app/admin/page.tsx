import { updateConfig, addKota, deleteKota, addArticle, deleteArticle, generateArticleAI } from "./actions";
import { getConfig, getAllKota, getAllArticles } from "@/lib/kota";
import { Settings, PlusCircle, MapPin, Pencil, Trash2, Library, CheckCircle } from "lucide-react";
import Link from "next/link";
import ArticleTable from "./ArticleTable";
import AllArticlesTable from "./AllArticlesTable";
import ToastNotification from "./ToastNotification";
import AIGenerator from "./AIGenerator";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; tab?: string }>;
}) {
  const sp = await searchParams;
  const activeTab = sp.tab || "global";
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
              href="/admin?tab=global" 
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center ${activeTab === 'global' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'}`}
            >
              <Settings className="w-4 h-4 mr-2" /> Global
            </Link>
            <Link 
              href="/admin?tab=kota" 
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center ${activeTab === 'kota' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'}`}
            >
              <MapPin className="w-4 h-4 mr-2" /> Kota
            </Link>
            <Link 
              href="/admin?tab=artikel" 
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center ${activeTab === 'artikel' ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'}`}
            >
              <Library className="w-4 h-4 mr-2" /> Artikel AI
            </Link>
          </nav>
        </div>
        
        {/* Pengaturan Global */}
        {activeTab === "global" && (
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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
                rows={5}
                defaultValue={config.artikel_homepage || ""}
                placeholder="Jika diisi, teks ini akan menggantikan artikel bawaan di halaman utama..."
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" 
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 font-medium">
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </section>
        )}

        {/* Manajemen Kota */}
        {activeTab === "kota" && (
          <div className="space-y-8">
            {/* Tambah Kota */}
            <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center space-x-2 border-b pb-4">
            <PlusCircle className="h-6 w-6 text-slate-500" />
            <h2 className="text-xl font-semibold">Tambah Kota Baru</h2>
          </div>
          <form action={addKota} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Nama Kota</label>
              <input required type="text" name="nama_kota" placeholder="Contoh: Semarang" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Slug (Tanpa Spasi/Gunakan Strip)</label>
              <input required type="text" name="slug" placeholder="Contoh: semarang" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Provinsi</label>
              <input required type="text" name="provinsi" placeholder="Contoh: Jawa Tengah" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Jumlah Cabang</label>
              <input required type="number" name="jumlah_cabang" defaultValue="1" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Estimasi Pencairan Minimal</label>
              <input required type="number" name="estimasi_pencairan_min" defaultValue="5000000" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Estimasi Pencairan Maksimal</label>
              <input required type="number" name="estimasi_pencairan_max" defaultValue="500000000" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Waktu Proses (Jam)</label>
              <input required type="number" name="waktu_proses_jam" defaultValue="2" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Nama Marketing Lokal</label>
              <input required type="text" name="nama_marketing_lokal" placeholder="Contoh: Pak Joko" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Alamat Cabang Utama</label>
              <input required type="text" name="alamat_cabang_utama" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Testimoni Lokal</label>
              <textarea required name="testimoni" rows={3} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Kendaraan Populer (Pisahkan dengan koma)</label>
              <input required type="text" name="kendaraan_populer" placeholder="Avanza, NMAX, Xenia" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-blue-700">Artikel SEO Khusus Kota Ini (Opsional)</label>
              <textarea name="artikel_seo" rows={4} placeholder="Tuliskan paragraf tambahan yang unik untuk SEO kota ini..." className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 bg-blue-50"></textarea>
              <p className="mt-1 text-xs text-slate-500">Jika diisi, paragraf ini akan muncul di paling bawah artikel halaman kota.</p>
            </div>
            
            <div className="sm:col-span-2 border-t pt-4">
              <button type="submit" className="w-full rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700 font-bold text-lg">
                Simpan Kota Baru
              </button>
              <p className="mt-2 text-center text-sm text-slate-500">
                Setelah disimpan, coba refresh halaman depan untuk melihat perubahannya!
              </p>
            </div>
          </form>
        </section>

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

        {/* Bank Artikel SEO */}
        {activeTab === "artikel" && (
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center space-x-2 border-b pb-4">
            <Library className="h-6 w-6 text-slate-500" />
            <h2 className="text-xl font-semibold">Bank Artikel SEO ({semuaArticles.length})</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Artikel-artikel di bawah ini akan diacak (dirotasi) secara otomatis setiap harinya pada halaman-halaman kota. Semakin banyak artikel yang Anda masukkan, semakin unik halaman Anda setiap harinya!
          </p>
          
          {/* Form Simpan Manual */}
          <form action={addArticle} className="mb-6 border-b pb-6">
            <label className="block text-sm font-medium mb-1">Tambah Artikel Manual</label>
            <div className="flex items-start space-x-3">
              <textarea required name="content" rows={3} placeholder="Paste atau tulis artikel Anda di sini..." className="flex-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none"></textarea>
              <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-medium whitespace-nowrap transition-colors h-[76px]">
                Simpan Manual
              </button>
            </div>
          </form>

          {/* Form Generate AI Terpisah (Client Component) */}
          <AIGenerator />

          <AllArticlesTable articles={semuaArticles} />
        </section>
        )}

        {/* Distribusi & Rotasi Artikel */}
        {activeTab === "artikel" && (
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 mt-8">
          <div className="mb-4 flex items-center space-x-2 border-b pb-4">
            <CheckCircle className="h-6 w-6 text-slate-500" />
            <h2 className="text-xl font-semibold">Distribusi & Rotasi Artikel</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Tabel ini menunjukkan artikel mana yang sedang terpasang di setiap kota. Anda dapat mengatur apakah suatu kota diikutkan dalam rotasi artikel acak atau tidak.
          </p>

          <ArticleTable articles={semuaArticles} kotaList={semuaKota} config={config} />
        </section>
        )}
      </div>
    </main>
  );
}
