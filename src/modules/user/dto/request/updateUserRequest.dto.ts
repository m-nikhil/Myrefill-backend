import { Password } from 'src/common/decorators/combined.decorator';
import { IsMobilePhone, IsEmail, IsOptional } from 'class-validator';
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
  @IsOptional()
  readonly confirmPassword: string;

  @IsEmail()
  readonly auth_email: string;

  @Password()
  readonly auth_password: string;
}
