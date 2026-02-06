import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

@Injectable()
export class FirestoreService {
  constructor(
    @Inject('FIRESTORE_CLIENT') private readonly db: admin.firestore.Firestore,
  ) {}

  async runTransaction(name: string, doc: string, nevVal: any): Promise<any> {
    const transactionRef = this.db.collection(name).doc(doc);
    return await this.db.runTransaction(async (transaction) => {
      transaction.update(transactionRef, nevVal);
    });
  }

  async getData(name: string) {
    const snapshot = await this.db.collection(name).get();

    return {
      data: {
        [name]: snapshot.docs.map((item) => item.data()),
      },
    };
  }
}
