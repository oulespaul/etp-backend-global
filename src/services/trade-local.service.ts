import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TradeLocalRequestDto } from 'src/dto/trade-local-request.dto';

@Injectable()
export class TradeLocalService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(TradeLocalService.name);

  async tradeRequest(
    reqBody: TradeLocalRequestDto,
    site: string,
  ): Promise<any> {
    const baseSiteUrl = {
      BCP: this.configService.get('BCP_URL'),
      NECTEC: this.configService.get('NECTEC_URL'),
    };

    this.logger.debug(
      `Trade local to ${site} request with ${JSON.stringify(
        reqBody.incomingOrderId,
      )}`,
    );

    try {
      return this.httpService
        .post(`${baseSiteUrl[site]}/api/trade`, reqBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .toPromise();
    } catch (error) {
      this.logger.error(`Trade local request error: ${error}`);
      return null;
    }
  }
}
