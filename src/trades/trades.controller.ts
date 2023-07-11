import { Controller, Get } from '@nestjs/common';
import { TradesService } from './trades.service';
import { Tradebook } from './entities/tradebook.entity';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Get('/non-requested')
  findAll(): Promise<Tradebook[]> {
    return this.tradesService.findTradeNonRequested();
  }
}
