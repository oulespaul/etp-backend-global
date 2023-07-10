import { IsEnum, IsString } from 'class-validator';
import { ORDER_SIDE } from 'src/constants/order-side.enum';

export class CreateOrderDto {
  @IsString()
  orderId: string;

  @IsEnum(ORDER_SIDE)
  side: string;

  @IsString()
  orderType: string;

  @IsString()
  accountNo: string;

  price: number;

  quantity: number;

  remainingQuantity: number;

  @IsString()
  status: string;

  @IsString()
  site: string;

  @IsString()
  orderTime: string;
}
