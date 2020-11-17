import { IsUUID, IsOptional } from 'class-validator';

export class CouponListOption {
  @IsUUID()
  @IsOptional()
  readonly userId?: string;
}