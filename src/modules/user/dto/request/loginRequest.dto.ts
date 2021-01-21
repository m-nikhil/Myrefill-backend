import { Password, Email, Text } from 'src/common/decorators/combined.decorator';

/**
 * login request
 */
export class LoginRequest {
  @Email()
  readonly auth_email: string;

  @Text()
  readonly auth_password: string;
}
