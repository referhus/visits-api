import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;
import WithFieldValue = firestore.WithFieldValue;

@Injectable()
export class FirestoreService {
  constructor(
    @Inject('FIRESTORE_CLIENT') private readonly db: admin.firestore.Firestore,
  ) {}

  async update(
    name: string,
    doc: string,
    newVal: WithFieldValue<DocumentData>,
  ) {
    const transactionRef = this.db.collection(name).doc(doc);
    return await transactionRef.update(newVal);
  }

  async create(
    name: string,
    doc: string,
    newVal: WithFieldValue<DocumentData>,
  ) {
    const transactionRef = this.db.collection(name).doc(doc);
    return transactionRef.set(newVal);
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
