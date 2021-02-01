import { Word, Text } from 'src/common/decorators/combined.decorator';
import {
  IsMobilePhone,
  IsEmail,
  IsPhoneNumber,
  IsDecimal,
  IsInt,
  IsOptional,
  IsUUID,
  IsBooleanString,
  IsJSON,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdateStationRequest {
  @Word()
  @IsOptional()
  readonly name?: string;

  @Text()
  @IsOptional()
  readonly desciption?: string;

  @Text()
  @IsOptional()
  readonly address?: string;

  @Text()
  @IsOptional()
  readonly area?: string;

  @IsInt()
  @IsOptional()
  readonly pincode?: number;

  @IsBoolean()
  @IsOptional()
  readonly open?: boolean;

  @Word()
  @IsOptional()
  readonly managerName?: string;

  @IsMobilePhone()
  @IsOptional()
  readonly mobileNumber1?: string;

  @IsMobilePhone()
  @IsOptional()
  readonly mobileNumber2?: string;

  @IsPhoneNumber('IN')
  @IsOptional()
  readonly landlineNumber?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @Text()
  @IsOptional()
  readonly carpetArea?: string;

  @IsUUID()
  @IsOptional()
  readonly stateId?: string;

  @IsUUID()
  @IsOptional()
  readonly cityId?: string;

  @Word()
  @IsOptional()
  readonly storeType?: string;

  @Word()
  @IsOptional()
  readonly typeOfWater?: string;

  @Text()
  @IsOptional()
  readonly mondayTiming?: string;

  @Text()
  @IsOptional()
  readonly tuesdayTiming?: string;

  @Text()
  @IsOptional()
  readonly wednesdayTiming?: string;

  @Text()
  @IsOptional()
  readonly thursdayTiming?: string;

  @Text()
  @IsOptional()
  readonly fridayTiming?: string;

  @Text()
  @IsOptional()
  readonly saturdayTiming?: string;

  @Text()
  @IsOptional()
  readonly sundayTiming?: string;

  @IsJSON()
  @IsOptional()
  readonly timings?: string;

  @IsNumber()
  @IsOptional()
  readonly latitude?: number;

  @IsNumber()
  @IsOptional()
  readonly longitude?: number;

  @IsDecimal()
  @IsOptional()
  readonly pricePerHalfLitre: number;

  @IsDecimal()
  @IsOptional()
  readonly pricePerLitre: number;

  @IsDecimal()
  @IsOptional()
  readonly cafeSharePerLitre: number;

  @IsDecimal()
  @IsOptional()
  readonly ourSharePerLitre: number;

  @IsDecimal()
  @IsOptional()
  readonly cafeSharePerHalfLitre: number;

  @IsDecimal()
  @IsOptional()
  readonly ourSharePerHalfLitre: number;

  @Text()
  @IsOptional()
  readonly awsToken: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;
  
}
