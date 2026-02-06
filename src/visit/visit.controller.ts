import { Controller, Get, Req } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Request } from 'express';

@Controller('visit-counter')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  getVisit() {
    return this.visitService.getVisitCounter();
  }

  @Get('visited')
  setVisit(@Req() req: Request) {
    return this.visitService.setVisitCounter(req);
  }
}
