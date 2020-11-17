import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCouponRequest {
  @IsUUID()
  readonly userId: string;

  @IsNumber()
  readonly points: number;

  @IsUUID()
  @IsOptional()
  readonly stationId: string;
}
