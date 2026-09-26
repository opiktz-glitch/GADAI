import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    let credentialObj;

    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    ) {
      // 1. Menggunakan Environment Variables (Untuk Vercel / Production)
      credentialObj = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace newline chars so private key is parsed correctly
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };
    } else {
      // 2. Menggunakan file JSON (Untuk Local Development)
      const fs = require('fs');
      const path = require('path');
      // Membaca menggunakan fs untuk menghindari error kompilasi Webpack di Vercel
      const serviceAccountPath = path.resolve(process.cwd(), 'firebase-service-account.json');
      if (fs.existsSync(serviceAccountPath)) {
        const fileContent = fs.readFileSync(serviceAccountPath, 'utf8');
        credentialObj = JSON.parse(fileContent);
      } else {
        throw new Error("Missing Firebase Credentials (env vars or JSON file)");
      }
    }

    initializeApp({
      credential: cert(credentialObj),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin initialization error", error);
  }
}

export const db = getFirestore();
