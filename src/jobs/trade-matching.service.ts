import * as dayjs from 'dayjs';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrdersService } from 'src/orders/orders.service';
import { Orderbook } from 'src/orders/entities/orderbook.entity';
import { ORDER_SIDE } from 'src/constants/order-side.enum';
import { ORDER_STATUS } from 'src/constants/order-status.enum';
import { TradesService } from 'src/trades/trades.service';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class TradeMatchingService {
  constructor(
    private orderbookService: OrdersService,
    private tradebookService: TradesService,
  ) {}

  private readonly logger = new Logger(TradeMatchingService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handler() {
    const [startOrderTime, endOrderTime] = this.getPrevDateRange();
    const workingOrders = await this.orderbookService.findWorkingByDateRange(
      startOrderTime,
      endOrderTime,
    );

    await Promise.all(
      workingOrders.map((order) =>
        this.matchingOrder(order, startOrderTime, endOrderTime),
      ),
    );
  }

  private getPrevDateRange(): string[] {
    const prevHour = dayjs().subtract(1, 'hour');
    const startOrderTime = prevHour
      .set('minute', 0)
      .set('second', 0)
      .toString();
    const endOrderTime = prevHour
      .set('minute', 59)
      .set('second', 59)
      .toString();

    return [startOrderTime, endOrderTime];
  }

  private filterOrderForMatching(
    order: Orderbook,
    startOrderTime: string,
    endOrderTime: string,
  ) {
    const isBuy = order.side === ORDER_SIDE.BUY;

    const priceCriteria = isBuy
      ? LessThanOrEqual(order.price)
      : MoreThanOrEqual(order.price);

    return this.orderbookService.findOrdersByPrice(
      priceCriteria,
      isBuy ? ORDER_SIDE.SELL : ORDER_SIDE.BUY,
      order.accountNo,
      startOrderTime,
      endOrderTime,
      order.site,
    );
  }

  private async matchingOrder(
    order: Orderbook,
    startOrderTime: string,
    endOrderTime: string,
  ) {
    try {
      let quantityTmp = order.remainingQuantity;
      const matchingableOrders = await this.filterOrderForMatching(
        order,
        startOrderTime,
        endOrderTime,
      );

      await Promise.all(
        matchingableOrders.map(async (orderbook) => {
          if (quantityTmp == 0) return;

          const qtyLeft = orderbook.remainingQuantity - quantityTmp;

          const isFullyExecuted = qtyLeft <= 0;

          quantityTmp = isFullyExecuted ? Math.abs(qtyLeft) : 0;

          // Update book order
          await this.orderbookService.save({
            ...orderbook,
            remainingQuantity: isFullyExecuted ? 0 : qtyLeft,
            status: isFullyExecuted
              ? ORDER_STATUS.FULLY_EXECUTED
              : ORDER_STATUS.WORKING,
          });

          const matchedQty =
            orderbook.remainingQuantity - (isFullyExecuted ? 0 : qtyLeft);

          // Update incoming order
          await this.orderbookService.save({
            ...order,
            remainingQuantity: quantityTmp,
            status:
              quantityTmp == 0
                ? ORDER_STATUS.FULLY_EXECUTED
                : ORDER_STATUS.WORKING,
          });

          await this.tradebookService.createTrade({
            incomingAccountNo: order.accountNo,
            bookOrderAccountNo: orderbook.accountNo,
            bookOrderId: orderbook.orderId,
            incomingOrderId: order.orderId,
            quantity: matchedQty,
            price: orderbook.price,
            tradeTime: order.orderTime,
            incomingOrderSide: order.side,
            bookOrderSide: orderbook.side,
            incomingOrderRemainingQuantity: quantityTmp,
            bookOrderRemainingQuantity: isFullyExecuted ? 0 : qtyLeft,
            incomingSite: order.site,
            bookSite: orderbook.site,
            status: 'Matched',
          });
        }),
      );
    } catch (err) {
      this.logger.error('Trading matching error: ', err);
    }
  }
}