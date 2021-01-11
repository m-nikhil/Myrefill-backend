import { Word, Text } from 'src/common/decorators/combined.decorator';
import { IsDecimal, IsBoolean, IsInt, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { ResponseBase } from 'src/common/dto/responseBase.dto';

/**
 * Station response will limited fields.
 * To be displayed for users.
 */
export class StationLimitedResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @Word()
  @Expose()
  readonly name: string;

  @Text()
  @Expose()
  readonly address: string;

  @Text()
  @Expose()
  readonly area: string;

  @IsInt()
  @Expose()
  readonly pincode: number;

  @IsBoolean()
  @Expose()
  readonly open: boolean;

  @IsUUID()
  @Expose()
  readonly stateId: string;

  @IsUUID()
  @Expose()
  readonly cityId: string;

  @Word()
  @Expose()
  readonly storeType: string;

  @Word()
  @Expose()
  readonly typeOfWater: string;

  @Text()
  @Expose()
  readonly mondayTiming: string;

  @Text()
  @Expose()
  readonly tuesdayTiming: string;

  @Text()
  @Expose()
  readonly wednesdayTiming: string;

  @Text()
  @Expose()
  readonly thursdayTiming: string;

  @Text()
  @Expose()
  readonly fridayTiming: string;

  @Text()
  @Expose()
  readonly saturdayTiming: string;

  @Text()
  @Expose()
  readonly sundayTiming: string;

  @IsDecimal()
  @Expose()
  readonly latitude: number;

  @IsDecimal()
  @Expose()
  readonly longitude: number;

  @IsDecimal()
  @Expose()
  readonly pricePerHalfLitre: number;
  
  @IsDecimal()
  @Expose()
  readonly CO2saved: number;

  @IsDecimal()
  @Expose()
  readonly bottlesSaved: number;

  @IsDecimal()
  @Expose()
  readonly plasticSaved: number;

}
