import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tradebook {
  @PrimaryGeneratedColumn({ name: 'trade_id' })
  tradeId: number;

  @Column({ name: 'incoming_account_no' })
  incomingAccountNo: string;

  @Column({ name: 'book_order_account_no' })
  bookOrderAccountNo: string;

  @Column({ name: 'book_order_id' })
  bookOrderId: string;

  @Column({ name: 'incoming_order_id' })
  incomingOrderId: string;

  @Column({ name: 'price', type: 'decimal', precision: 20, scale: 8 })
  price: number;

  @Column({ name: 'quantity', type: 'decimal', precision: 20, scale: 8 })
  quantity: number;

  @CreateDateColumn({ name: 'trade_time' })
  tradeTime: Date;

  @Column({ name: 'incoming_order_side' })
  incomingOrderSide: string;

  @Column({ name: 'book_order_side' })
  bookOrderSide: string;

  @Column({ name: 'incoming_order_remaining_quantity' })
  incomingOrderRemainingQuantity: number;

  @Column({ name: 'book_order_remaining_quantity' })
  bookOrderRemainingQuantity: number;

  @Column({ name: 'incoming_site' })
  incomingSite: string;

  @Column({ name: 'book_site' })
  bookSite: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'is_trade_requested' })
  isTradeRequest: boolean;
}
