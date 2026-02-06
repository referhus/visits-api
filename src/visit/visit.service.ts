import { FirestoreService } from '../firestore/firestore.service';
import { Injectable } from '@nestjs/common';
import { getTodayDate } from '../utils';
import { Request } from 'express';
import { ResponseVisitWithData } from '../types';

@Injectable()
export class VisitService {
  constructor(private readonly firestoreService: FirestoreService) {}

  private generateVisitId(ip: string = ''): string {
    const today = getTodayDate();
    const ipFormatted = ip.replace(/\./g, '_').replace(/:/g, '_');
    return `${ipFormatted}_${today}`;
  }

  async getVisits() {
    try {
      return await this.firestoreService.getData('visits');
    } catch (e: unknown) {
      return {
        error: e,
      };
    }
  }

  async getVisitsLength() {
    try {
      const visits = await this.firestoreService.getData('visits');

      return {
        total: (visits as ResponseVisitWithData).data.visits?.length,
      };
    } catch (e: unknown) {
      return {
        error: e,
      };
    }
  }

  async setVisit(req: Request) {
    try {
      const clientIp = req.clientIp;
      const visitId = this.generateVisitId(clientIp);

      await this.firestoreService.create('visits', visitId, {
        ip: clientIp,
        date: getTodayDate(),
      });

      const total = await this.getVisitsLength();

      return {
        total: total,
      };
    } catch (e: unknown) {
      return {
        error: e,
      };
    }
  }
}
