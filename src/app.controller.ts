import { Controller, Post } from '@nestjs/common';
import { TradeMatchingService } from './jobs/trade-matching.service';

@Controller('app')
export class AppController {
  constructor(private tradeMatchingService: TradeMatchingService) {}

  @Post('/trade-matching/trigger')
  triggerMatching() {
    return this.tradeMatchingService.handler();
  }
}
