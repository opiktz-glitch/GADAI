"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, Search, X, Building2 } from "lucide-react";

export type ProvinsiItem = {
  nama: string;
  slug: string;
};

export type KotaItem = {
  nama_kota: string;
  slug: string;
  provinsi: string;
  provinsiSlug: string;
};

export default function ProvinsiSearchGrid({
  provinsiList,
  kotaList,
}: {
  provinsiList: ProvinsiItem[];
  kotaList: KotaItem[];
}) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  // Filter kota
  const matchedKota = useMemo(() => {
    if (!trimmed) return [];
    return kotaList
      .filter((k) =>
        k.nama_kota.toLowerCase().includes(trimmed) ||
        k.provinsi.toLowerCase().includes(trimmed)
      )
      .slice(0, 8); // Maksimal 8 chip kota teratas
  }, [trimmed, kotaList]);

  // Filter provinsi
  const matchedProvinsi = useMemo(() => {
    if (!trimmed) return provinsiList;
    return provinsiList.filter(
      (p) =>
        p.nama.toLowerCase().includes(trimmed) ||
        kotaList.some(
          (k) =>
            k.provinsiSlug === p.slug &&
            k.nama_kota.toLowerCase().includes(trimmed)
        )
    );
  }, [trimmed, provinsiList, kotaList]);

  return (
    <div>
      {/* Search Bar Input */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama kota atau provinsi (contoh: Bandung, Bekasi)..."
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-300 rounded-full shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Hasil Pencarian Cepat Kota (Direct City Chips) */}
        {trimmed && matchedKota.length > 0 && (
          <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              Kota Ditemukan (Klik langsung untuk simulasi):
            </p>
            <div className="flex flex-wrap gap-2">
              {matchedKota.map((kota) => (
                <Link
                  key={kota.slug}
                  href={`/simulasi-gadai-bpkb/${kota.provinsiSlug}/${kota.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{kota.nama_kota}</span>
                  <span className="text-xs opacity-75">({kota.provinsi})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Cards Provinsi */}
      {matchedProvinsi.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matchedProvinsi.map((prov, index) => (
            <Link
              href={`/simulasi-gadai-bpkb/${prov.slug}`}
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all group flex flex-col h-full items-center text-center"
            >
              {/* Card Header */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>

              {/* Card Body */}
              <div className="flex-grow w-full">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {prov.nama}
                </h2>
                <p className="text-slate-500 text-sm">Lihat Layanan &amp; Cabang</p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex justify-center text-blue-600">
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
          <p className="text-slate-600 mb-4">
            Tidak ditemukan provinsi atau kota dengan kata kunci &quot;
            <span className="font-semibold text-slate-800">{query}</span>&quot;.
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Tampilkan Semua Provinsi
          </button>
        </div>
      )}
    </div>
  );
}
