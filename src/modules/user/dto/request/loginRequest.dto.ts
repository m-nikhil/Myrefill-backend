import { Password } from 'src/common/decorators/combined.decorator';
import { IsEmail } from 'class-validator';

/**
 * login request
 */
export class LoginRequest {
  @IsEmail()
  readonly email: string;

  @Password()
  readonly password: string;
}
