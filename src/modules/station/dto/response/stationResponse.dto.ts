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
  IsJSON,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ResponseBase } from 'src/common/dto/responseBase.dto';

/**
 * Station response will all the fields.
 * To be displayed only for admins.
 */
export class StationResponse extends ResponseBase {
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

  @IsJSON()
  @Expose()
  readonly timings: string;

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
  readonly pricePerLitre: number;

  @IsDecimal()
  @Expose()
  readonly cafeSharePerLitre: number;

  @IsDecimal()
  @Expose()
  readonly ourSharePerLitre: number;

  @IsDecimal()
  @Expose()
  readonly cafeSharePerHalfLitre: number;

  @IsDecimal()
  @Expose()
  readonly ourSharePerHalfLitre: number;
  
  @IsDecimal()
  @Expose()
  @Transform((val)=>{
    if(val){
      return val.toFixed(2)
    }
  })
  readonly CO2saved: number;

  @IsDecimal()
  @Expose()
  @Transform((val)=>{
    if(val){
      return val.toFixed(2)
    }
  })
  readonly bottlesSaved: number;

  @IsDecimal()
  @Expose()
  @Transform((val)=>{
    if(val){
      return val.toFixed(2)
    }
  })
  readonly plasticSaved: number;

  @Text()
  @Expose()
  @Transform((val)=>{
    if(val){
      if(val<1){
        return Math.round(parseFloat(val)*1000)+" m"
      }
      let converted=parseFloat(val).toFixed(3);
      return converted+" "+"Km";
    }
  })
  readonly distanceInKms: string;

  @Text()
  @Expose()
  readonly status: string;

  @Text()
  @Expose()
  readonly awsToken: string;

  @IsBoolean()
  @Expose()
  readonly isActive: boolean;
}
