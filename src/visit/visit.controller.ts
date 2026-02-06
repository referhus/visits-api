import { Controller, Get, Req } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Request } from 'express';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  getVisits() {
    return this.visitService.getVisits();
  }

  @Get('visited')
  setVisit(@Req() req: Request) {
    return this.visitService.setVisit(req);
  }
}
