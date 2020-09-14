import { Injectable } from '@nestjs/common';
import { RazorpayService } from '../thirdparty/razorpay.service';
import { CreateRazorpayOrderRequest } from './dto/request/createRazorpayOrderRequest.dto';
import { ConfigService } from '@nestjs/config';
import { RazorypayOrderResponse } from './dto/response/razorypayOrderResponse.dto';
import { Builder } from 'builder-pattern';
import { CRUDService } from 'src/common/class/crud';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionListOption } from './query/transactionListOption.dto';

/**
 * Transaction Service
 */
@Injectable()
export class TransactionService extends CRUDService<
  Transaction,
  TransactionListOption
> {
  Entity = Transaction;

  constructor(
    private razorpayService: RazorpayService,
    private configService: ConfigService,
  ) {
    super();
  }

  createRazorpayOrder = async (
    userId,
    createRazorpayOrderRequest: CreateRazorpayOrderRequest,
  ): Promise<RazorypayOrderResponse> => {
    const order = await this.razorpayService.createOrder(
      createRazorpayOrderRequest.stationId,
      userId,
      createRazorpayOrderRequest.numberOfHalfLitres,
      createRazorpayOrderRequest.numberOfHalfLitres *
        this.configService.get<number>('PRICE_PER_HALF_LITRE'),
    );

    return Builder(RazorypayOrderResponse)
      .id(order.id)
      .amount(order.amount_due / 100) // convert to rupee
      .build();
  };
}
