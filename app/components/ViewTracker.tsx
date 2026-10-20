'use client';
import { useEffect } from 'react';

export default function ViewTracker({ location }: { location: string }) {
  useEffect(() => {
    if (!location) return;
    
    // Mencegah double counting jika pengguna me-refresh halaman berulang kali dalam sesi yang sama
    const trackedKey = `tracked_loc_${location}`;
    if (sessionStorage.getItem(trackedKey)) return;

    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location })
    })
    .then(res => {
      // Tandai sudah tracked untuk semua respons non-5xx (sukses, 400, 404, 429).
      // Tujuannya: mencegah retry-loop tak terbatas saat user refresh halaman.
      // 5xx dibiarkan agar bisa dicoba lagi (kegagalan sementara).
      if (res.status < 500) {
        sessionStorage.setItem(trackedKey, 'true');
      }
    })
    .catch(() => {
      // Abaikan error jaringan
    });
  }, [location]);

  return null;
}
