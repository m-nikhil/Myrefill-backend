import { Word, UUID, Text } from 'src/common/decorators/combined.decorator';
import { IsDecimal, IsBoolean, IsInt, IsUUID } from 'class-validator';
import { Station } from 'src/entities/station.entity';
import { Expose, plainToClass } from 'class-transformer';

/**
 * Station response will limited fields.
 * To be displayed for users.
 */
export class StationLimitedResponse {
  static fromEntity(station: Station): StationLimitedResponse {
    return plainToClass(StationLimitedResponse, station, {
      excludeExtraneousValues: true,
    });
  }

  static fromEntityList(stationList: Station[]): StationLimitedResponse[] {
    return stationList.map(data => StationLimitedResponse.fromEntity(data));
  }

  @UUID()
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
}
