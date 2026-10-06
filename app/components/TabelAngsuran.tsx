"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export const TableMotor = () => {
  const [selectedPinjaman, setSelectedPinjaman] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const noWa = "6287823651470";

  const data = [
    ["3.000.000", "493.000", "367.000", "310.000", "278.000", "259.000"],
    ["4.000.000", "603.000", "444.000", "372.000", "332.000", "307.000"],
    ["5.000.000", "712.000", "522.000", "435.000", "386.000", "356.000"],
    ["6.000.000", "822.000", "599.000", "497.000", "439.000", "404.000"],
    ["7.000.000", "932.000", "677.000", "560.000", "493.000", "452.000"],
    ["8.000.000", "1.041.000", "754.000", "622.000", "547.000", "500.000"],
    ["9.000.000", "1.151.000", "832.000", "684.000", "601.000", "549.000"],
    ["10.000.000", "1.260.000", "909.000", "747.000", "654.000", "597.000"],
    ["11.000.000", "1.362.000", "979.000", "801.000", "700.000", "637.000"],
    ["12.000.000", "1.472.000", "1.057.000", "864.000", "754.000", "686.000"],
    ["13.000.000", "1.582.000", "1.135.000", "927.000", "809.000", "735.000"],
    ["14.000.000", "1.692.000", "1.213.000", "990.000", "863.000", "783.000"],
    ["15.000.000", "1.803.000", "1.291.000", "1.053.000", "917.000", "832.000"],
    ["16.000.000", "1.935.000", "1.391.000", "1.139.000", "996.000", "906.000"],
    ["17.000.000", "2.045.000", "1.469.000", "1.202.000", "1.050.000", "955.000"],
    ["18.000.000", "2.155.000", "1.547.000", "1.265.000", "1.105.000", "1.004.000"],
    ["19.000.000", "2.265.000", "1.625.000", "1.328.000", "1.159.000", "1.053.000"],
    ["20.000.000", "2.375.000", "1.703.000", "1.391.000", "1.213.000", "1.102.000"]
  ];

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Admin AXI Adira,\n\nNama saya *${nama}*.\nSaya tertarik mengajukan Gadai BPKB Motor.\n\n- Rencana Pinjaman: *Rp ${selectedPinjaman}*\n- Info Kendaraan: *${kendaraan}*\n\nMohon info detail persyaratan dan prosesnya. Terima kasih.`;
    window.open(`https://wa.me/${noWa}?text=${encodeURIComponent(message)}`, "_blank");
    setSelectedPinjaman(null);
    setNama("");
    setKendaraan("");
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-extrabold text-center bg-yellow-400 text-slate-900 py-3 rounded-t-xl">TABEL ANGSURAN MOTOR</h3>
      <div className="overflow-x-auto shadow-md rounded-b-xl border border-slate-200">
        <table className="w-full text-sm text-center cursor-pointer">
          <thead className="bg-slate-100 font-bold text-slate-700">
            <tr>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">PINJAMAN</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">11 Bln</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">17 Bln</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">23 Bln</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">29 Bln</th>
              <th className="px-4 py-3 whitespace-nowrap">35 Bln</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr 
                key={i} 
                onClick={() => setSelectedPinjaman(row[0])}
                className="hover:bg-yellow-50 transition-colors"
              >
                <td className="px-4 py-2 border-r border-slate-100 font-semibold text-slate-800 group-hover:text-yellow-700">{row[0]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[1]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[2]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[3]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[4]}</td>
                <td className="px-4 py-2 text-slate-600">{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">*Klik pada baris pinjaman untuk mulai mengajukan. Tabel ini adalah estimasi.</p>

      {/* Modal Popup */}
      {selectedPinjaman && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="bg-yellow-400 p-3.5 flex justify-between items-center rounded-t-2xl">
              <h4 className="font-bold text-slate-900 text-base">Pengajuan Motor</h4>
              <button onClick={() => setSelectedPinjaman(null)} className="text-slate-800 hover:text-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100 flex justify-between items-center">
                <p className="text-sm text-slate-500">Pinjaman:</p>
                <p className="text-xl font-bold text-[#0B1E36]">Rp {selectedPinjaman}</p>
              </div>

              <form onSubmit={handleAjukan} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Merek & Tahun Motor</label>
                  <input 
                    type="text" 
                    required
                    value={kendaraan}
                    onChange={(e) => setKendaraan(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm"
                    placeholder="Contoh: Honda Beat 2021"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <button 
                    type="button"
                    onClick={() => setSelectedPinjaman(null)}
                    className="w-full sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-center text-sm"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-2/3 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md text-center flex items-center justify-center gap-2 text-sm"
                  >
                    <span>💬</span> Lanjut via WA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const TableMobil = () => {
  const [selectedPinjaman, setSelectedPinjaman] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const noWa = "6287823651470";

  const data = [
    ["30.000.000", "3.660.000", "1.998.000", "1.562.000", "1.293.000"],
    ["40.000.000", "4.512.000", "2.554.000", "1.905.000", "1.634.000"],
    ["50.000.000", "5.476.000", "3.145.000", "2.318.000", "1.900.000"],
    ["60.000.000", "6.460.000", "3.758.000", "2.785.000", "2.300.000"],
    ["70.000.000", "7.290.000", "4.176.000", "3.100.000", "2.514.000"],
    ["80.000.000", "8.125.000", "4.669.000", "3.412.000", "2.805.000"],
    ["90.000.000", "9.425.000", "5.419.000", "4.000.000", "3.300.000"],
    ["100.000.000", "10.466.000", "6.000.000", "4.375.000", "3.578.000"],
    ["110.000.000", "11.289.000", "6.235.000", "4.615.000", "3.768.000"],
    ["120.000.000", "12.195.000", "6.817.000", "4.967.000", "4.009.000"],
    ["130.000.000", "13.155.000", "7.321.000", "5.380.000", "4.390.000"],
    ["140.000.000", "14.178.000", "7.825.000", "5.748.000", "4.695.000"],
    ["150.000.000", "15.325.000", "8.562.000", "6.262.000", "5.160.000"],
    ["160.000.000", "16.000.000", "8.840.000", "6.442.000", "5.300.000"],
    ["170.000.000", "17.150.000", "9.400.000", "6.865.000", "5.691.000"],
    ["180.000.000", "18.090.000", "9.799.000", "7.134.000", "5.987.000"],
    ["190.000.000", "19.056.000", "10.595.000", "7.845.000", "6.357.000"],
    ["200.000.000", "20.085.000", "11.080.000", "8.090.000", "6.680.000"]
  ];

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Admin AXI Adira,\n\nNama saya *${nama}*.\nSaya tertarik mengajukan Gadai BPKB Mobil.\n\n- Rencana Pinjaman: *Rp ${selectedPinjaman}*\n- Info Kendaraan: *${kendaraan}*\n\nMohon info detail persyaratan dan prosesnya. Terima kasih.`;
    window.open(`https://wa.me/${noWa}?text=${encodeURIComponent(message)}`, "_blank");
    setSelectedPinjaman(null);
    setNama("");
    setKendaraan("");
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-extrabold text-center bg-yellow-400 text-slate-900 py-3 rounded-t-xl">TABEL ANGSURAN MOBIL</h3>
      <div className="overflow-x-auto shadow-md rounded-b-xl border border-slate-200">
        <table className="w-full text-sm text-center cursor-pointer">
          <thead className="bg-slate-100 font-bold text-slate-700">
            <tr>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">PINJAMAN</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">12 Bln</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">24 Bln</th>
              <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">36 Bln</th>
              <th className="px-4 py-3 whitespace-nowrap">48 Bln</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr 
                key={i} 
                onClick={() => setSelectedPinjaman(row[0])}
                className="hover:bg-yellow-50 transition-colors"
              >
                <td className="px-4 py-2 border-r border-slate-100 font-semibold text-slate-800">{row[0]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[1]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[2]}</td>
                <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row[3]}</td>
                <td className="px-4 py-2 text-slate-600">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">*Klik pada baris pinjaman untuk mulai mengajukan. Tabel ini adalah estimasi.</p>

      {/* Modal Popup */}
      {selectedPinjaman && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="bg-yellow-400 p-3.5 flex justify-between items-center rounded-t-2xl">
              <h4 className="font-bold text-slate-900 text-base">Pengajuan Mobil</h4>
              <button onClick={() => setSelectedPinjaman(null)} className="text-slate-800 hover:text-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100 flex justify-between items-center">
                <p className="text-sm text-slate-500">Pinjaman:</p>
                <p className="text-xl font-bold text-[#0B1E36]">Rp {selectedPinjaman}</p>
              </div>

              <form onSubmit={handleAjukan} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Merek & Tahun Mobil</label>
                  <input 
                    type="text" 
                    required
                    value={kendaraan}
                    onChange={(e) => setKendaraan(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm"
                    placeholder="Contoh: Toyota Avanza 2018"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <button 
                    type="button"
                    onClick={() => setSelectedPinjaman(null)}
                    className="w-full sm:w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-lg transition-colors text-center text-sm"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-2/3 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md text-center flex items-center justify-center gap-2 text-sm"
                  >
                    <span>💬</span> Lanjut via WA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
