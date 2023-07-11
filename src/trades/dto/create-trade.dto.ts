export class CreateTradeDto {
  incomingAccountNo: string;
  bookOrderAccountNo: string;
  bookOrderId: string;
  incomingOrderId: string;
  quantity: number;
  price: number;
  tradeTime: Date;
  incomingOrderSide: string;
  bookOrderSide: string;
  incomingOrderRemainingQuantity: number;
  bookOrderRemainingQuantity: number;
  incomingSite: string;
  bookSite: string;
  status?: string;
}
