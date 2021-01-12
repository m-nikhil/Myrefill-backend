import { Word, Email } from 'src/common/decorators/combined.decorator';
import { IsUUID, IsMobilePhone } from 'class-validator';
import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class UserResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @Word()
  @Expose()
  readonly fullname: string;

  @Email()
  @Expose()
  readonly email: string;

  @IsMobilePhone('en-IN')
  @Expose()
  readonly phoneNumber: string;

  @Expose()
  razorpayCustomerId: string;

  @Expose()
  readonly cityId: string;

  @Expose()
  readonly stateId: string;

  @Expose()
  readonly city_name: string;
  
  @Expose()
  readonly state_name: string;
}
