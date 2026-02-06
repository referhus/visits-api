import { Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

export const FirestoreProvider: Provider = {
  provide: 'FIRESTORE_CLIENT',
  useFactory: () => {
    if (admin.apps.length === 0) {
      const adminConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

      admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
      });

      console.log('✅ Firebase инициализирован через provider');
    }

    return admin.firestore();
  },
};
