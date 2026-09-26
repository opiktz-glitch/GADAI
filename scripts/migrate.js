const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firebase-service-account.json');
const fs = require('fs');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function run() {
  console.log("Memulai migrasi data lokal (JSON) ke Firebase Firestore...");

  // 1. Migrate Config
  try {
    const config = JSON.parse(fs.readFileSync('./data/config.json', 'utf-8'));
    await db.collection('config').doc('main').set(config);
    console.log('- Config berhasil dimigrasi.');
  } catch(e) { console.log('- Gagal memigrasi config:', e.message); }

  // 2. Migrate Kota
  try {
    const kotaArray = JSON.parse(fs.readFileSync('./data/kota.json', 'utf-8'));
    const batchKota = db.batch();
    for (const k of kotaArray) {
      const docRef = db.collection('kota').doc(k.slug);
      batchKota.set(docRef, k);
    }
    await batchKota.commit();
    console.log(`- Berhasil memigrasi ${kotaArray.length} kota.`);
  } catch(e) { console.log('- Gagal memigrasi kota:', e.message); }

  // 3. Migrate Articles
  try {
    const articlesArray = JSON.parse(fs.readFileSync('./data/articles.json', 'utf-8'));
    const batchArticles = db.batch();
    for (const a of articlesArray) {
      const docRef = db.collection('articles').doc(a.id);
      batchArticles.set(docRef, a);
    }
    await batchArticles.commit();
    console.log(`- Berhasil memigrasi ${articlesArray.length} artikel.`);
  } catch(e) { console.log('- Gagal memigrasi artikel:', e.message); }
  
  console.log('Migrasi Selesai! Data Anda sekarang ada di Cloud.');
  process.exit(0);
}

run();
