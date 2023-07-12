import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { Tradebook } from './entities/tradebook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Tradebook)
    private tradebookRepository: Repository<Tradebook>,
  ) {}

  async createTrade(createTrade: CreateTradeDto): Promise<Tradebook> {
    const tradebook = this.tradebookRepository.create({
      ...createTrade,
      isTradeRequest: false,
    });

    return this.tradebookRepository.save(tradebook);
  }

  findTradeNonRequested() {
    return this.tradebookRepository.find({
      where: { isTradeRequest: false },
    });
  }

  findMatchedByDateRange(startTime: string, endTime: string) {
    return this.tradebookRepository.find({
      where: {
        status: 'Matched',
        tradeTime: Between(new Date(startTime), new Date(endTime)),
        isTradeRequest: false,
      },
    });
  }
}
