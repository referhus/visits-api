import { FirestoreService } from '../firestore/firestore.service';
import { Injectable, Req } from '@nestjs/common';
import { ResponseVisitWithData } from '../types';
import { getTodayDate } from '../utils';
import { Request } from 'express';

@Injectable()
export class VisitService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getVisitCounter() {
    try {
      return await this.firestoreService.getData('visit-counter');
    } catch (e) {
      return [];
    }
  }

  async setVisitCounter(req: Request) {
    try {
      const clientIp = req.clientIp;
      const data = await this.getVisitCounter();
      if (!data) return;

      const oldCount = (data as ResponseVisitWithData).data[
        'visit-counter'
      ]?.[0]?.count;

      const newCount = (oldCount || 0) + 1;
      await this.firestoreService.runTransaction('visit-counter', 'counter', {
        count: newCount,
      });

      return {
        count: newCount,
      };
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
