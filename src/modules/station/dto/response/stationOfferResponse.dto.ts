import { IsUUID, IsInt, IsString, IsBoolean } from 'class-validator';
import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class StationOfferResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsInt()
  @Expose()
  readonly couponPoints: number;

  @IsString()
  @Expose()
  readonly stationId: string;

  @IsBoolean()
  @Expose()
  isActive: boolean;

  @IsString()
  @Expose()
  couponCode: string;

  @IsString()
  @Expose()
  image: string;

  @IsString()
  @Expose()
  terms: string;

}
