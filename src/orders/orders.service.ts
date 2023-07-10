import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderbook } from './entities/orderbook.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orderbook)
    private orderbookRepository: Repository<Orderbook>,
  ) {}

  blukCreate(createOrderDto: CreateOrderDto[]): Promise<InsertResult> {
    const orderbookEntities = createOrderDto.map((order) =>
      this.orderbookRepository.create(order),
    );

    return this.orderbookRepository.insert(orderbookEntities);
  }

  findAll(): Promise<Orderbook[]> {
    return this.orderbookRepository.find();
  }
}
