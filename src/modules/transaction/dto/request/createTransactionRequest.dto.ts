import { IsUUID, IsInt, IsNumber, IsEnum, IsString } from 'class-validator';

enum Status {
  unrecognized = 'unrecognized',
  success = 'success',
  failure = 'failure',
}

enum PaymentMethod {
  unrecognized = 'unrecognized',
  razorpay = 'razorpay',
}

/**
 * Used only at service class creation.
 *
 * More validations is needed when newer payments options
 * are introduced to ensure the input data integrity.
 */
export class CreateTransactionRequest {
  @IsUUID()
  readonly stationId: string;

  @IsUUID()
  readonly userId: string;

  @IsInt()
  readonly numberOfHalfLitres: number;

  @IsNumber()
  readonly totalPrice: number;

  @IsString()
  readonly razorpayPaymentId: string;

  @IsString()
  readonly razorpayOrderId: string;

  @IsString()
  readonly razorpaySignature: string;

  @IsEnum(Status)
  readonly status: Status;

  @IsEnum(PaymentMethod)
  readonly paymentMethod: PaymentMethod;
}
