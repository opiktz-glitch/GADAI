const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function run() {
  const kotaSnap = await db.collection('kota').get();
  const batch = db.batch();
  let updated = 0;
  
  kotaSnap.docs.forEach(doc => {
    const data = doc.data();
    if (data.artikel_seo && /pojok berkah/i.test(data.artikel_seo)) {
      const newData = data.artikel_seo.replace(/dari Pojok Berkah/gi, '').replace(/Pojok Berkah/gi, 'Adira Finance');
      batch.update(doc.ref, { artikel_seo: newData });
      console.log('Updated kota:', doc.id);
      updated++;
    }
  });

  const articlesSnap = await db.collection('articles').get();
  articlesSnap.docs.forEach(doc => {
    const data = doc.data();
    let isUpdated = false;
    let newContent = data.content;
    let newMeta = data.metaDesc;
    
    if (newContent && /pojok berkah/i.test(newContent)) {
      newContent = newContent.replace(/dari Pojok Berkah/gi, '').replace(/Pojok Berkah/gi, 'Adira Finance');
      isUpdated = true;
    }
    
    if (newMeta && /pojok berkah/i.test(newMeta)) {
      newMeta = newMeta.replace(/dari Pojok Berkah/gi, '').replace(/Pojok Berkah/gi, 'Adira Finance');
      isUpdated = true;
    }
    
    if (isUpdated) {
        batch.update(doc.ref, { content: newContent, metaDesc: newMeta });
        console.log('Updated article:', doc.id);
        updated++;
    }
  });

  await batch.commit();
  console.log('Done cleaning database. Total updated:', updated);
  process.exit(0);
}

run();
