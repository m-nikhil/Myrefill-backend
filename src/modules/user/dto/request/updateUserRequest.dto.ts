import { Password, Email } from 'src/common/decorators/combined.decorator';
import { IsMobilePhone, IsOptional, IsUUID } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

/**
 * User updation dto
 */
export class UpdateUserRequest {
  @Password()
  @IsOptional()
  readonly password: string;

  @IsMobilePhone('en-IN')
  @IsOptional()
  readonly phoneNumber: string;

  @Match('password', {
    message: 'password and confirmation password do not match',
  })
  readonly confirmPassword: string;

  @Email()
  readonly auth_email: string;

  @Password()
  readonly auth_password: string;

  @IsUUID()
  readonly stateId: string;

  @IsUUID()
  readonly cityId: string;
}
