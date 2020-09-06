import { Word, Text } from 'src/common/decorators/combined.decorator';
import {
  IsMobilePhone,
  IsEmail,
  IsPhoneNumber,
  IsDecimal,
  IsBoolean,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Station } from 'src/entities/station.entity';
import { Expose, plainToClass } from 'class-transformer';

/**
 * Station response will all the fields.
 * To be displayed only for admins.
 */
export class StationResponse {
  static fromEntity(station: Station): StationResponse {
    return plainToClass(StationResponse, station, {
      excludeExtraneousValues: true,
    });
  }

  static fromEntityList(stationList: Station[]): StationResponse[] {
    return stationList.map(data => StationResponse.fromEntity(data));
  }

  @IsUUID()
  @Expose()
  readonly id: string;

  @Word()
  @Expose()
  readonly name: string;

  @Text()
  @Expose()
  readonly desciption: string;

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

  @Word()
  @Expose()
  readonly managerName: string;

  @IsMobilePhone()
  @Expose()
  readonly mobileNumber1: string;

  @IsOptional()
  @IsMobilePhone()
  @Expose()
  readonly mobileNumber2: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  @Expose()
  readonly landlineNumber?: string;

  @IsEmail()
  @Expose()
  readonly email: string;

  @Text()
  @Expose()
  readonly carpetArea: string;

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
