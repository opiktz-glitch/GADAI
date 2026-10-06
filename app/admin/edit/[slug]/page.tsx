import { getKotaBySlug } from "@/lib/kota";
import { editKota } from "../../actions";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";

export default async function EditKotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const kota = await getKotaBySlug(p.slug);
  
  if (!kota) return notFound();

  // Simple wrapper action to also redirect after editing
  async function editAndRedirect(formData: FormData) {
    "use server";
    await editKota(formData);
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/admin" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <ArrowLeft className="h-5 w-5 mr-1" /> Kembali ke Admin
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900">Edit Data Kota: {kota.nama_kota}</h1>

        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center space-x-2 border-b pb-4">
            <Edit className="h-6 w-6 text-slate-500" />
            <h2 className="text-xl font-semibold">Ubah Data</h2>
          </div>
          
          <form action={editAndRedirect} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input type="hidden" name="original_slug" value={kota.slug} />
            
            <div>
              <label className="block text-sm font-medium">Nama Kota</label>
              <input required type="text" name="nama_kota" defaultValue={kota.nama_kota} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Slug (Tanpa Spasi/Gunakan Strip)</label>
              <input required type="text" name="slug" defaultValue={kota.slug} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Provinsi</label>
              <input required type="text" name="provinsi" defaultValue={kota.provinsi} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Alamat Cabang Utama</label>
              <input required type="text" name="alamat_cabang_utama" defaultValue={kota.alamat_cabang_utama} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            
            <div className="sm:col-span-2 border-t pt-4">
              <button type="submit" className="w-full rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 font-bold text-lg">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
