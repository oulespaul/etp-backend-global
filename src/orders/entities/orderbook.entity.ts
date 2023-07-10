import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orderbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'side', length: 10 })
  side: string;

  @Column({ name: 'order_type', length: 10 })
  orderType: string;

  @Column({ name: 'account_no' })
  accountNo: string;

  @Column({ name: 'price', type: 'decimal', precision: 20, scale: 8 })
  price: number;

  @Column({ name: 'quantity', type: 'decimal', precision: 20, scale: 8 })
  quantity: number;

  @Column({
    name: 'remaining_quantity',
    type: 'decimal',
    precision: 20,
    scale: 8,
    nullable: true,
  })
  remainingQuantity?: number;

  @Column({ name: 'status', default: 'working' })
  status: string;

  @Column({ name: 'site' })
  site: string;

  @Column({ name: 'order_time' })
  orderTime: Date;
}
