import { IsUUID, IsInt } from 'class-validator';

/**
 * Razorpay order creation request
 */
export class CreateRazorpayOrderRequest {
  @IsUUID()
  readonly stationId: string;

  @IsInt()
  readonly numberOfHalfLitres: number;
}
