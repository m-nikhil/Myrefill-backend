import { IsBoolean, IsDecimal, IsUUID } from 'class-validator';
import { AwsLink, Text } from 'src/common/decorators/combined.decorator';
import { Entity } from 'typeorm';

@Entity()
export class StationCouponRequest {
  @IsUUID()
  stationId: string;

  @Text()
  couponCode: string;

  @AwsLink()
  image: string;

  @Text()
  terms: string;

  @IsDecimal()
  couponPoints: number;

  @IsBoolean()
  isActive: boolean;

}
