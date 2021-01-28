import { IsBoolean, IsNumber, IsUUID } from 'class-validator';
import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class CouponResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsUUID()
  @Expose()
  readonly userId: string;

  @IsNumber()
  @Expose()
  readonly points: number;

  @IsBoolean()
  @Expose()
  readonly isActive: boolean;
}
