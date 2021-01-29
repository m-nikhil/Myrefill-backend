import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCouponRequest {
  @IsUUID()
  readonly userId: string;

  @IsNumber()
  readonly points: number;

  @IsUUID()
  @IsOptional()
  readonly stationId: string;

  @IsUUID()
  readonly couponId: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;
}
