import { Tradebook } from 'src/trades/entities/tradebook.entity';

export class TradeLocalRequestDto {
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
  status?: string;
  isLocal?: boolean;

  static toModel(tradebook: Tradebook): TradeLocalRequestDto {
    const tradeLocalReqDto = new TradeLocalRequestDto();

    tradeLocalReqDto.incomingAccountNo = tradebook.incomingAccountNo;
    tradeLocalReqDto.bookOrderAccountNo = tradebook.bookOrderAccountNo;
    tradeLocalReqDto.bookOrderId = tradebook.bookOrderId;
    tradeLocalReqDto.incomingOrderId = tradebook.incomingOrderId;
    tradeLocalReqDto.quantity = tradebook.quantity;
    tradeLocalReqDto.price = tradebook.price;
    tradeLocalReqDto.tradeTime = tradebook.tradeTime;
    tradeLocalReqDto.incomingOrderSide = tradebook.incomingOrderSide;
    tradeLocalReqDto.bookOrderSide = tradebook.bookOrderSide;
    tradeLocalReqDto.incomingOrderRemainingQuantity =
      tradebook.incomingOrderRemainingQuantity;
    tradeLocalReqDto.bookOrderRemainingQuantity =
      tradebook.bookOrderRemainingQuantity;
    tradeLocalReqDto.status = tradebook.status;
    tradeLocalReqDto.isLocal = false;

    return tradeLocalReqDto;
  }
}
