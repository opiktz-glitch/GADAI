"use client";

import { useState } from "react";
import { generateArticleAI, addArticle } from "./actions";
import { Loader2 } from "lucide-react";
import { Kota } from "@/lib/kota";

export default function AIGenerator({ kotaList }: { kotaList: Kota[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedKota, setSelectedKota] = useState("");

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setGeneratedText("");

    const formData = new FormData(e.currentTarget);
    const targetKota = formData.get("kota")?.toString() || "";
    setSelectedKota(targetKota);
    
    try {
      const result = await generateArticleAI(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.success && result?.text) {
        setGeneratedText(result.text);
        if (result.metaDesc) setMetaDesc(result.metaDesc);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan saat menghubungi server.");
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-8">
      {/* Form Generate AI */}
      <form onSubmit={handleGenerate} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
        <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
          <span className="text-xl mr-2">✨</span> Pembuat Artikel AI Spesifik Kota
        </h3>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Target Kota</label>
            <select name="kota" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading}>
              <option value="">-- Artikel Global (Tanpa Kota) --</option>
              {kotaList.map(k => (
                <option key={k.slug} value={k.slug}>{k.nama_kota}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Target Pembaca</label>
            <select name="target_pembaca" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading}>
              <option value="Masyarakat umum yang membutuhkan dana cepat">Masyarakat Umum (Dana Darurat)</option>
              <option value="Pelaku UMKM dan pedagang yang butuh modal usaha">Pelaku UMKM (Modal Usaha)</option>
              <option value="Karyawan swasta atau buruh pabrik yang butuh biaya tambahan">Karyawan (Biaya Tambahan)</option>
              <option value="Keluarga yang membutuhkan biaya pendidikan atau renovasi rumah">Keluarga (Pendidikan/Renovasi)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Jenis Kendaraan</label>
            <select name="jenis_kendaraan" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading}>
              <option value="Motor dan Mobil">BPKB Motor & Mobil</option>
              <option value="Hanya Mobil">Khusus BPKB Mobil</option>
              <option value="Hanya Motor">Khusus BPKB Motor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Fokus Keunggulan</label>
            <select name="fokus_keunggulan" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading}>
              <option value="Proses cepat, syarat mudah, dan pencairan tinggi">Proses Cepat & Mudah</option>
              <option value="Bunga sangat ringan dan kompetitif dari Adira Finance">Bunga Ringan / Kompetitif</option>
              <option value="Pajak kendaraan mati bisa dibantu proses">Pajak Mati Bisa Dibantu</option>
              <option value="BPKB atas nama orang lain masih bisa diproses">BPKB Atas Nama Orang Lain</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Tone / Gaya Bahasa</label>
            <select name="tone" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading}>
              <option value="edukatif netral">Edukatif Netral</option>
              <option value="persuasif untuk promosi produk">Persuasif Promosi</option>
              <option value="netral jurnalistik">Netral Jurnalistik</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Panjang Artikel</label>
            <input type="text" name="panjang" defaultValue="800-1200 kata" className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading} />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-medium text-purple-700 mb-1">Instruksi Khusus / Topik (Opsional)</label>
            <input type="text" name="instruksi_tambahan" placeholder="Contoh: Fokuskan pada cerita Budi yang butuh dana renovasi rumah, atau tulis dengan sudut pandang agen lapangan..." className="w-full rounded-md border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500" disabled={isLoading} />
          </div>
        </div>
        
        <button type="submit" disabled={isLoading} className="w-full rounded-md bg-purple-600 px-4 py-3 text-white hover:bg-purple-700 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sedang Menulis Artikel AI... (Bisa butuh beberapa detik)
            </>
          ) : (
            "Generate Artikel Lengkap dengan AI"
          )}
        </button>
      </form>

      {/* Editor Hasil AI */}
      {generatedText && (
        <div className="mt-6 bg-white p-6 rounded-xl border-2 border-purple-200 shadow-lg animate-in fade-in zoom-in duration-300">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center">
            <span className="text-xl mr-2">📝</span> Preview & Edit Hasil AI
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Artikel telah selesai dibuat! Silakan baca, edit jika perlu, dan simpan. Artikel ini akan {selectedKota ? "otomatis terpasang ke kota yang dipilih." : "tersimpan sebagai artikel global."}
          </p>
          
          <form action={addArticle}>
            <input type="hidden" name="source" value="AI" />
            <input type="hidden" name="targetKota" value={selectedKota} />
            {metaDesc && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Description (Otomatis untuk SEO):</label>
                <textarea
                  name="metaDesc"
                  rows={2}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500 bg-slate-50"
                />
              </div>
            )}
            
            <label className="block text-sm font-semibold text-slate-700 mb-1">Konten Artikel:</label>
            <textarea
              name="content"
              rows={15}
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-4 text-sm font-mono focus:border-purple-500 focus:ring-purple-500 mb-4"
              placeholder="Hasil artikel AI akan muncul di sini..."
            />
            
            <div className="flex space-x-3 justify-end">
              <button 
                type="button" 
                onClick={() => setGeneratedText("")} 
                className="px-6 py-2 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 font-medium transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit" 
                onClick={() => {
                  setTimeout(() => setGeneratedText(""), 100);
                }}
                className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-md transition-colors"
              >
                Simpan & Pasang Artikel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
