import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  blukCreate(@Body() createOrderDto: CreateOrderDto[]) {
    return this.ordersService.blukCreate(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
