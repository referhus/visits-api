import { FirestoreService } from '../firestore/firestore.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const visits = await this.firestoreService.getData('visits');

    if (!visits) throw new NotFoundException('Посещения не найдены');

    return visits;
  }

  async getVisitsLength() {
    const visits = await this.firestoreService.getData('visits');

    if (!visits) throw new NotFoundException('Посещения не найдены');

    return {
      total: (visits as ResponseVisitWithData).data.visits?.length,
    };
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
        ...total,
      };
    } catch (e: unknown) {
      return {
        error: e,
      };
    }
  }
}
