import { Text } from 'src/common/decorators/combined.decorator';

/**
 * admin login request
 */
export class AdminLoginRequest {
  @Text()
  readonly password: string;
}
