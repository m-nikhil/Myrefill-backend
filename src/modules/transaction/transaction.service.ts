import { Injectable, BadRequestException } from '@nestjs/common';
import { RazorpayService } from '../thirdparty/razorpay.service';
import { ConfigService } from '@nestjs/config';
import { RazorypayOrderResponse } from './dto/response/razorypayOrderResponse.dto';
import { Builder } from 'builder-pattern';
import { CRUDService } from 'src/common/class/crud';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionListOption } from './query/transactionListOption.dto';
import { QueryRunner } from 'typeorm';
import { StationMetricService } from '../station/stationMetric.service';
import * as crypto from 'crypto';

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
    private readonly stationMetricService: StationMetricService,
  ) {
    super();
  }

  createRazorpayOrder = async (
    userId,
    createRazorpayOrderRequest: Partial<Transaction>,
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

  superCreate = this.create;
  create = async (
    queryRunner: QueryRunner,
    userId: string,
    createTransactionRequestDto: Partial<Transaction>,
  ): Promise<Transaction> => {
    const hmac = crypto.createHmac(
      'sha256',
      this.configService.get<string>('RAZORPAY_SECRET'),
    );
    hmac.update(
      createTransactionRequestDto.razorpayOrderId +
        '|' +
        createTransactionRequestDto.razorpayPaymentId,
    );
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature != createTransactionRequestDto.razorpaySignature) {
      // Signature mismatch
      throw new BadRequestException('Invalid rapazpay signature');
    }

    const order = await this.razorpayService.getOrderById(
      createTransactionRequestDto.razorpayOrderId,
    );

    createTransactionRequestDto.numberOfHalfLitres =
      order.notes.numberOfHalfLitre;
    createTransactionRequestDto.totalPrice = order.notes.price;
    createTransactionRequestDto.stationId = order.notes.stationId;
    createTransactionRequestDto.userId = order.notes.userId;

    const transactionResponse = await this.superCreate(
      queryRunner,
      userId,
      createTransactionRequestDto,
    );

    if (createTransactionRequestDto.status == 'success') {
      /** create station metric */
      await this.stationMetricService.update(
        queryRunner,
        userId,
        order.notes.stationId,
        {
          numberOfUsers: () => '"numberOfUsers" + 1',
          lifetimeHalfLitres: () =>
            '"lifetimeHalfLitres" + ' + order.notes.numberOfHalfLitre,
        },
      );
    }

    return transactionResponse;
  };
}
