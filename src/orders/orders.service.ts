import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderbook } from './entities/orderbook.entity';
import { Between, FindOperator, InsertResult, Not, Repository } from 'typeorm';
import { ORDER_STATUS } from 'src/constants/order-status.enum';

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

  async save(updatedOrderbook: Orderbook): Promise<Orderbook> {
    return this.orderbookRepository.save(updatedOrderbook);
  }

  findAll(): Promise<Orderbook[]> {
    return this.orderbookRepository.find();
  }

  findWorkingByDateRange(startTime: string, endTime: string) {
    return this.orderbookRepository.find({
      where: {
        status: ORDER_STATUS.WORKING,
        orderTime: Between(new Date(startTime), new Date(endTime)),
      },
    });
  }

  async findOrdersByPrice(
    price: FindOperator<number>,
    side: string,
    accountNo: string,
    startTime: string,
    endTime: string,
    site: string,
  ): Promise<Orderbook[]> {
    return this.orderbookRepository.find({
      where: {
        price,
        side,
        status: ORDER_STATUS.WORKING,
        accountNo: Not(accountNo),
        remainingQuantity: Not(0),
        orderTime: Between(new Date(startTime), new Date(endTime)),
        site: Not(site),
      },
    });
  }
}
