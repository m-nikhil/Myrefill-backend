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
import { CouponService } from '../coupon/coupon.service';
import { Coupon } from 'src/entities/coupon.entity';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

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
    private couponService: CouponService,
    private userService: UserService
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
          lastUpdatedBy: userId
        },
      );
      let record=await queryRunner.manager.findOne(Coupon, { userId: createTransactionRequestDto.userId });
      if(record){
        await this.couponService.update(
          queryRunner,
          userId,
          record.id,
          {
            points: ()=> 'points+'+ createTransactionRequestDto.totalPrice,
            lastUpdatedBy: userId,
          }
        )
      }

      let user=await queryRunner.manager.findOne(User, { id: createTransactionRequestDto.userId });
      if(user){
        this.userService.update(
          queryRunner,
          userId,
          createTransactionRequestDto.userId,
          Builder<Partial<User>>()
            .CO2saved(user.CO2saved+(createTransactionRequestDto.numberOfHalfLitres/2))
            .bottlesSaved(user.bottlesSaved+(createTransactionRequestDto.numberOfHalfLitres/2))
            .plasticSaved(user.plasticSaved+(createTransactionRequestDto.numberOfHalfLitres*82.8))
            .lastUpdatedBy(userId)
            .build()
        )
      }      
    }

    return transactionResponse;
  };

  getSummary = async (
    queryRunner: QueryRunner,
    userId: string
  ): Promise<Object> =>{
    let user=await queryRunner.manager.findOne(User, { id: userId });
    let coupon=await queryRunner.manager.findOne(Coupon, { userId: userId })
    return {
      user: user.fullname,
      userId: user.id,
      Co2Saved: user.CO2saved,
      bottleSaved: user.bottlesSaved,
      plasticSaved: user.plasticSaved,
      coupons: coupon.points
    };
  }
}
