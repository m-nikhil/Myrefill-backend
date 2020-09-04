import { Password } from 'src/common/decorators/combined.decorator';

/**
 * admin login request
 */
export class AdminLoginRequest {
  @Password()
  readonly password: string;
}
