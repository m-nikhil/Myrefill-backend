import { Password, Email } from 'src/common/decorators/combined.decorator';

/**
 * login request
 */
export class LoginRequest {
  @Email()
  readonly auth_email: string;

  @Password()
  readonly auth_password: string;
}
