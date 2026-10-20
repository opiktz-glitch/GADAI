"use client";

import React, { useState, useId } from "react";
import { Calculator, ShieldCheck, Clock, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { waLink } from "@/lib/wa";

interface KalkulatorSimulasiProps {
  noWa: string;
  namaKota?: string;
  className?: string;
}

// Data referensi resmi (Plafon vs Angsuran per Tenor)
// Motor: 11, 17, 23, 29, 35 Bulan
const MOTOR_ANCHORS: { plafon: number; rates: Record<number, number> }[] = [
  { plafon: 3_000_000, rates: { 11: 493_000, 17: 367_000, 23: 310_000, 29: 278_000, 35: 259_000 } },
  { plafon: 5_000_000, rates: { 11: 712_000, 17: 522_000, 23: 435_000, 29: 386_000, 35: 356_000 } },
  { plafon: 10_000_000, rates: { 11: 1_260_000, 17: 909_000, 23: 747_000, 29: 654_000, 35: 597_000 } },
  { plafon: 15_000_000, rates: { 11: 1_803_000, 17: 1_291_000, 23: 1_053_000, 29: 917_000, 35: 832_000 } },
  { plafon: 20_000_000, rates: { 11: 2_375_000, 17: 1_703_000, 23: 1_391_000, 29: 1_213_000, 35: 1_102_000 } },
  { plafon: 30_000_000, rates: { 11: 3_520_000, 17: 2_520_000, 23: 2_050_000, 29: 1_790_000, 35: 1_620_000 } },
];

// Mobil: 12, 24, 36, 48 Bulan
const MOBIL_ANCHORS: { plafon: number; rates: Record<number, number> }[] = [
  { plafon: 30_000_000, rates: { 12: 3_660_000, 24: 1_998_000, 36: 1_562_000, 48: 1_293_000 } },
  { plafon: 50_000_000, rates: { 12: 5_476_000, 24: 3_145_000, 36: 2_318_000, 48: 1_900_000 } },
  { plafon: 100_000_000, rates: { 12: 10_466_000, 24: 6_000_000, 36: 4_375_000, 48: 3_578_000 } },
  { plafon: 150_000_000, rates: { 12: 15_325_000, 24: 8_562_000, 36: 6_262_000, 48: 5_160_000 } },
  { plafon: 200_000_000, rates: { 12: 20_085_000, 24: 11_080_000, 36: 8_090_000, 48: 6_680_000 } },
  { plafon: 300_000_000, rates: { 12: 29_800_000, 24: 16_400_000, 36: 12_000_000, 48: 9_900_000 } },
];

function formatRupiah(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

function calculateAngsuran(tipe: "motor" | "mobil", plafon: number, tenor: number): number {
  const anchors = tipe === "motor" ? MOTOR_ANCHORS : MOBIL_ANCHORS;

  // Temukan segmen interpolasi
  if (plafon <= anchors[0].plafon) {
    const base = anchors[0].rates[tenor] || (anchors[0].plafon / tenor) * 1.3;
    return Math.round((plafon / anchors[0].plafon) * base);
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (plafon >= a.plafon && plafon <= b.plafon) {
      const rateA = a.rates[tenor];
      const rateB = b.rates[tenor];
      const progress = (plafon - a.plafon) / (b.plafon - a.plafon);
      return Math.round(rateA + progress * (rateB - rateA));
    }
  }

  // Jika di atas batas maksimum anchor
  const last = anchors[anchors.length - 1];
  const lastRate = last.rates[tenor];
  return Math.round((plafon / last.plafon) * lastRate);
}

export default function KalkulatorSimulasi({ noWa, namaKota, className = "" }: KalkulatorSimulasiProps) {
  const [kendaraanType, setKendaraanType] = useState<"motor" | "mobil">("motor");
  const [plafon, setPlafon] = useState<number>(10_000_000);
  const [tenor, setTenor] = useState<number>(23);
  const [nama, setNama] = useState<string>("");
  const [modelKendaraan, setModelKendaraan] = useState<string>("");

  const plafonInputId = useId();
  const namaInputId = useId();
  const kendaraanInputId = useId();

  // Pengaturan dinamis sesuai tipe kendaraan
  const config = kendaraanType === "motor"
    ? {
        min: 3_000_000,
        max: 30_000_000,
        step: 500_000,
        tenorOptions: [11, 17, 23, 29, 35],
        quickPlafon: [5_000_000, 10_000_000, 15_000_000, 20_000_000],
      }
    : {
        min: 20_000_000,
        max: 300_000_000,
        step: 5_000_000,
        tenorOptions: [12, 24, 36, 48],
        quickPlafon: [30_000_000, 50_000_000, 100_000_000, 150_000_000],
      };

  const switchType = (type: "motor" | "mobil") => {
    setKendaraanType(type);
    if (type === "motor") {
      setPlafon(10_000_000);
      setTenor(23);
    } else {
      setPlafon(50_000_000);
      setTenor(24);
    }
  };

  const estimasiCicilan = calculateAngsuran(kendaraanType, plafon, tenor);

  // Buat pesan WhatsApp yang informatif dan terstruktur
  const generateWaMessage = () => {
    const kotaText = namaKota ? ` di *${namaKota}*` : "";
    const namaText = nama.trim() ? `Nama: *${nama.trim()}*\n` : "";
    const unitText = modelKendaraan.trim() ? `Unit Kendaraan: *${modelKendaraan.trim()}*\n` : "";

    return (
      `Halo Admin Marketing Adira,\n\n` +
      `Saya ingin konsultasi simulasi *Gadai BPKB ${kendaraanType === "motor" ? "Motor" : "Mobil"}*${kotaText} melalui website:\n\n` +
      namaText +
      unitText +
      `• Plafon Pinjaman: *${formatRupiah(plafon)}*\n` +
      `• Pilihan Tenor: *${tenor} Bulan*\n` +
      `• Estimasi Cicilan: *${formatRupiah(estimasiCicilan)}/bln*\n\n` +
      `Mohon info kelayakan dan persyaratan pencairannya. Terima kasih.`
    );
  };

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    const url = waLink(noWa, generateWaMessage());
    window.open(url, "_blank");
  };

  return (
    <div
      id="kalkulator-simulasi"
      className={`bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200 overflow-hidden ${className}`}
    >
      {/* Header Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1E36] to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs font-semibold mb-2 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Kalkulator Interaktif
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Simulasi Cicilan Gadai BPKB {namaKota ? `di ${namaKota}` : ""}
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Geser plafon dan tentukan tenor untuk melihat estimasi angsuran bulanan secara instan.
            </p>
          </div>

          {/* Toggle Motor / Mobil */}
          <div className="inline-flex p-1.5 bg-slate-800/90 rounded-2xl border border-slate-700/60 shadow-inner self-start sm:self-center">
            <button
              type="button"
              onClick={() => switchType("motor")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                kendaraanType === "motor"
                  ? "bg-yellow-400 text-slate-900 shadow-md scale-100"
                  : "text-slate-300 hover:text-white scale-95"
              }`}
            >
              <span>🛵</span> BPKB Motor
            </button>
            <button
              type="button"
              onClick={() => switchType("mobil")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                kendaraanType === "mobil"
                  ? "bg-yellow-400 text-slate-900 shadow-md scale-100"
                  : "text-slate-300 hover:text-white scale-95"
              }`}
            >
              <span>🚗</span> BPKB Mobil
            </button>
          </div>
        </div>
      </div>

      {/* Body Grid: Controls & Results */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Slider & Pilihan (7 Kolom) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Plafon Pinjaman Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={plafonInputId} className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-600" />
                Rencana Pinjaman (Plafon)
              </label>
              <span className="text-xl sm:text-2xl font-black text-slate-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                {formatRupiah(plafon)}
              </span>
            </div>

            <input
              id={plafonInputId}
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={plafon}
              onChange={(e) => setPlafon(Number(e.target.value))}
              aria-label="Nominal Plafon Pinjaman"
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />

            <div className="flex justify-between text-xs text-slate-600 font-semibold mt-2">
              <span>{formatRupiah(config.min)}</span>
              <span>{formatRupiah(config.max)}</span>
            </div>

            {/* Quick Plafon Pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-slate-600 self-center font-medium">Pilihan cepat:</span>
              {config.quickPlafon.map((nominal) => (
                <button
                  key={nominal}
                  type="button"
                  onClick={() => setPlafon(nominal)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    plafon === nominal
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {formatRupiah(nominal)}
                </button>
              ))}
            </div>
          </div>

          {/* Tenor Chips */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Pilih Jangka Waktu (Tenor)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {config.tenorOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  className={`py-3 px-3 rounded-2xl border text-center transition-all ${
                    tenor === t
                      ? "bg-amber-400 text-slate-950 border-amber-500 font-extrabold shadow-md scale-102 ring-2 ring-amber-300"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold"
                  }`}
                >
                  <div className="text-base font-black">{t}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-600">Bulan</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Opsional Identitas Kendaraan */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={namaInputId} className="block text-xs font-semibold text-slate-600 mb-1">
                Nama Anda (Opsional):
              </label>
              <input
                id={namaInputId}
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor={kendaraanInputId} className="block text-xs font-semibold text-slate-600 mb-1">
                Merk / Tahun Kendaraan:
              </label>
              <input
                id={kendaraanInputId}
                type="text"
                placeholder={kendaraanType === "motor" ? "Contoh: Vario 150 2021" : "Contoh: Avanza G 2019"}
                value={modelKendaraan}
                onChange={(e) => setModelKendaraan(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Perhitungan & Tombol CTA (5 Kolom) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-amber-50/40 p-6 rounded-2xl border border-amber-200/60 shadow-inner">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/50">
              <span className="text-xs font-bold text-amber-900 tracking-wider uppercase">
                Hasil Estimasi Cicilan
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Resmi Adira
              </span>
            </div>

            <div className="my-5 text-center">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                Angsuran Bulanan (Tenor {tenor} Bulan)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatRupiah(estimasiCicilan)}
                <span className="text-sm font-semibold text-slate-500"> /bln</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5">
                *Sudah termasuk asuransi perlindungan & biaya administrasi.
              </p>
            </div>

            {/* Rincian Fitur */}
            <ul className="space-y-2.5 text-xs text-slate-700 border-t border-b border-amber-200/40 py-4 my-2">
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Plafon Pinjaman:</span>
                <span className="font-bold text-slate-900">{formatRupiah(plafon)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Pencairan Dana:</span>
                <span className="font-bold text-green-700">Hingga 90% Taksiran</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Durasi Proses:</span>
                <span className="font-bold text-slate-900">2 – 24 Jam Kerja</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Status Kendaraan:</span>
                <span className="font-bold text-amber-700">Tetap Anda Pakai</span>
              </li>
            </ul>
          </div>

          {/* Tombol CTA WhatsApp */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleAjukan}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-green-700/25 flex items-center justify-center gap-2 group text-base hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>💬</span>
              <span>Ajukan Simulasi via WhatsApp</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Diawasi OJK
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Bebas Antre
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
