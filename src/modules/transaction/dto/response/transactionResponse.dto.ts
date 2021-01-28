import { IsUUID, IsInt, IsNumber, IsEnum, IsDate, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ResponseBase } from 'src/common/dto/responseBase.dto';

enum Status {
  unrecognized,
  success,
  failure,
}

export class TransactionResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsUUID()
  @Expose()
  readonly stationId: string;

  @IsUUID()
  @Expose()
  readonly userId: string;

  @IsInt()
  @Expose()
  readonly numberOfHalfLitres: number;

  @IsNumber()
  @Expose()
  readonly totalPrice: number;

  @Expose()
  readonly razorpayPaymentId: string;

  @Expose()
  readonly razorpayOrderId: string;

  @Expose()
  readonly razorpaySignature: string;

  @IsEnum(Status)
  @Expose()
  readonly status: string;

  @IsDate()
  @Expose()
  readonly createdAt: Date;

  @IsString()
  @Expose()
  readonly station_name: string;

}
