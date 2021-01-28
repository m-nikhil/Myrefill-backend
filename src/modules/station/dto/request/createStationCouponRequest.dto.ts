import { IsBoolean, IsDecimal, IsUUID } from 'class-validator';
import { Text } from 'src/common/decorators/combined.decorator';
import { Entity } from 'typeorm';

@Entity()
export class StationCouponRequest {
  @IsUUID()
  stationId: string;

  @Text()
  couponCode: string;

  @Text()
  image: string;

  @Text()
  terms: string;

  @IsDecimal()
  couponPoints: number;

  @IsBoolean()
  isActive: boolean;

}
