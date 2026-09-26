"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ToastNotification({
  successMsg,
  errorMsg,
}: {
  successMsg?: string;
  errorMsg?: string;
}) {
  const [show, setShow] = useState(!!successMsg || !!errorMsg);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Jika ada pesan baru, munculkan kembali
    if (successMsg || errorMsg) {
      setShow(true);
      
      // Sembunyikan otomatis setelah 3.5 detik
      const timer = setTimeout(() => {
        setShow(false);
        
        // Hapus parameter URL tanpa me-reload halaman
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('success');
        newSearchParams.delete('error');
        
        // Buat string query, jika kosong jangan tambahkan tanda '?'
        const query = newSearchParams.toString();
        const newUrl = query ? `${pathname}?${query}` : pathname;
        
        router.replace(newUrl, { scroll: false });
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg, pathname, router, searchParams]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {successMsg && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200 flex items-center shadow-lg animate-in slide-in-from-right-8 fade-in duration-300">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium text-green-800">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200 flex items-center shadow-lg animate-in slide-in-from-right-8 fade-in duration-300">
          <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium text-red-800">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
