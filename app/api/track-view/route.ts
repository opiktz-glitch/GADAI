import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const { location } = await req.json();
    if (!location) return NextResponse.json({ error: 'Missing location' }, { status: 400 });

    if (location === 'pusat') {
      await db.collection('config').doc('main').update({ views: FieldValue.increment(1) });
    } else {
      await db.collection('kota').doc(location).update({ views: FieldValue.increment(1) });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    // Abaikan jika dokumen tidak ditemukan (bisa jadi artikel dihapus)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
