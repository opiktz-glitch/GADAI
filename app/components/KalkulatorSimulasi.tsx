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
      className={`not-prose bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header Widget — Terang & Minimalis */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Kalkulator Interaktif
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Simulasi Cicilan Gadai BPKB {namaKota ? `di ${namaKota}` : ""}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-0">
              Geser nominal dan pilih tenor untuk melihat perkiraan cicilan bulanan.
            </p>
          </div>

          {/* Toggle Motor / Mobil — Segmented Control Terang */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl border border-slate-200 self-start sm:self-center">
            <button
              type="button"
              onClick={() => switchType("motor")}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                kendaraanType === "motor"
                  ? "bg-yellow-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🛵</span> BPKB Motor
            </button>
            <button
              type="button"
              onClick={() => switchType("mobil")}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                kendaraanType === "mobil"
                  ? "bg-yellow-400 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🚗</span> BPKB Mobil
            </button>
          </div>
        </div>
      </div>

      {/* Body Grid: Controls & Results */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Kolom Kiri: Slider & Tenor (7 Kolom) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Plafon Pinjaman Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={plafonInputId} className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5 m-0">
                <Calculator className="w-4 h-4 text-amber-600" />
                Rencana Pinjaman (Plafon)
              </label>
              <span className="text-base sm:text-xl font-extrabold text-slate-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
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
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1.5">
              <span>{formatRupiah(config.min)}</span>
              <span>{formatRupiah(config.max)}</span>
            </div>

            {/* Quick Plafon Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Pilihan cepat:</span>
              {config.quickPlafon.map((nominal) => (
                <button
                  key={nominal}
                  type="button"
                  onClick={() => setPlafon(nominal)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                    plafon === nominal
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {formatRupiah(nominal)}
                </button>
              ))}
            </div>
          </div>

          {/* Tenor Chips */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Pilih Jangka Waktu (Tenor)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {config.tenorOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  className={`py-2 px-2 rounded-xl border text-center transition-all ${
                    tenor === t
                      ? "bg-yellow-400 text-slate-950 border-yellow-400 font-bold shadow-xs ring-2 ring-yellow-200"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <div className="text-sm sm:text-base font-extrabold">{t}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-600">Bulan</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Opsional Identitas Kendaraan */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
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
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Perhitungan & Tombol CTA (5 Kolom) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/90 p-5 rounded-2xl border border-slate-200">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">
                Estimasi Angsuran
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-green-600" /> Resmi Adira
              </span>
            </div>

            <div className="my-4 text-center">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                Cicilan per Bulan ({tenor} Bulan)
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatRupiah(estimasiCicilan)}
                <span className="text-xs sm:text-sm font-semibold text-slate-500"> /bln</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 mb-0">
                *Termasuk asuransi perlindungan & biaya administrasi.
              </p>
            </div>

            {/* Rincian Fitur */}
            <ul className="space-y-2 text-xs text-slate-700 border-t border-b border-slate-200 py-3 my-2 list-none p-0">
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Plafon:</span>
                <span className="font-bold text-slate-900">{formatRupiah(plafon)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Pencairan:</span>
                <span className="font-bold text-green-700">Hingga 90% Taksiran</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Proses:</span>
                <span className="font-bold text-slate-800">2 – 24 Jam Kerja</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-500">Kendaraan:</span>
                <span className="font-bold text-slate-800">Tetap Anda Gunakan</span>
              </li>
            </ul>
          </div>

          {/* Tombol CTA WhatsApp */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAjukan}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer"
            >
              <span>💬</span>
              <span>Ajukan via WhatsApp</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-center gap-4 mt-2.5 text-[11px] text-slate-500">
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
