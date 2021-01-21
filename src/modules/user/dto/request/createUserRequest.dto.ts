import {
  Word,
  Password,
  Email,
} from 'src/common/decorators/combined.decorator';
import { IsMobilePhone, IsOptional, IsUUID } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

/**
 * User creation/registeration dto
 */
export class CreateUserRequest {
  @Word()
  readonly fullname: string;

  @Email()
  readonly email: string;

  @Password()
  readonly password: string;

  @IsMobilePhone('en-IN')
  readonly phoneNumber: string;

  @Match('password', {
    message: 'password and confirmation password do not match',
  })
  readonly confirmPassword: string;

  @IsUUID()
  @IsOptional()
  readonly stateId: string;

  @IsUUID()
  @IsOptional()
  readonly cityId: string;
}

export class CreateUserRequestInternal extends CreateUserRequest {
  razorpayCustomerId: string;
}
