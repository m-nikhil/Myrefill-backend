import { IsBoolean, IsDecimal, IsOptional, IsUUID } from 'class-validator';
import { AwsLink, Text } from 'src/common/decorators/combined.decorator';
import { Entity } from 'typeorm';

@Entity()
export class StationCouponUpdateRequest {
  @IsUUID()
  id: string;

  @IsUUID()
  @IsOptional()
  stationId: string;

  @Text()
  @IsOptional()
  couponCode: string;

  @AwsLink()
  @IsOptional()
  image: string;

  @Text()
  @IsOptional()
  terms: string;

  @IsDecimal()
  @IsOptional()
  couponPoints: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
