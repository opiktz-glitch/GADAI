import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Hanya lindungi rute yang diawali dengan /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 🔐 PASSWORD & USERNAME ADMIN
      // Silakan ganti ini sesuai keinginan Anda!
      const validUser = process.env.ADMIN_USERNAME || 'admin';
      const validPassword = process.env.ADMIN_PASSWORD || 'admin@123';

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }
    }

    // Jika belum login atau password salah, munculkan popup bawaan browser
    return new NextResponse('Akses Ditolak. Harap masukkan Username dan Password yang benar.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware hanya berjalan di halaman admin
export const config = {
  matcher: ['/admin/:path*'],
};
