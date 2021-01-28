import { Word, Text } from 'src/common/decorators/combined.decorator';
import {
  IsMobilePhone,
  IsEmail,
  IsPhoneNumber,
  IsInt,
  IsOptional,
  IsUUID,
  IsNumber,
  IsBoolean,
  IsJSON,
  IsDecimal,
} from 'class-validator';

export class CreateStationRequest {
  @Word()
  readonly name: string;

  @Text()
  readonly desciption: string;

  @Text()
  readonly address: string;

  @Text()
  readonly area: string;

  @IsInt()
  readonly pincode: number;

  @IsBoolean()
  readonly open: boolean;

  @Word()
  readonly managerName: string;

  @IsMobilePhone('en-IN')
  readonly mobileNumber1: string;

  @IsOptional()
  @IsMobilePhone('en-IN')
  readonly mobileNumber2?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  readonly landlineNumber?: string;

  @IsEmail()
  readonly email: string;

  @Text()
  readonly carpetArea: string;

  @IsUUID()
  readonly stateId: string;

  @IsUUID()
  readonly cityId: string;

  @Word()
  readonly storeType: string;

  @Word()
  readonly typeOfWater: string;

  @Text()
  readonly mondayTiming: string;

  @Text()
  readonly tuesdayTiming: string;

  @Text()
  readonly wednesdayTiming: string;

  @Text()
  readonly thursdayTiming: string;

  @Text()
  readonly fridayTiming: string;

  @Text()
  readonly saturdayTiming: string;

  @Text()
  readonly sundayTiming: string;

  @IsJSON()
  readonly timings: JSON

  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;

  @IsDecimal()
  readonly pricePerHalfLitre: number;

  @IsDecimal()
  readonly pricePerLitre: number;

  @IsDecimal()
  readonly cafeSharePerLitre: number;

  @IsDecimal()
  readonly ourSharePerLitre: number;

  @IsDecimal()
  readonly cafeSharePerHalfLitre: number;

  @IsDecimal()
  readonly ourSharePerHalfLitre: number;


  @Text()
  @IsOptional()
  readonly awsToken: string;

  @IsBoolean()
  readonly isActive: boolean;
}
