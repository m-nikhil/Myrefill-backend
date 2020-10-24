import { Password } from 'src/common/decorators/combined.decorator';
import { IsEmail } from 'class-validator';

/**
 * login request
 */
export class LoginRequest {
  @IsEmail()
  readonly auth_email: string;

  @Password()
  readonly auth_password: string;
}
