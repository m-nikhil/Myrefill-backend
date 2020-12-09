import { Password, Email, Text } from 'src/common/decorators/combined.decorator';
import { Match } from 'src/common/decorators/match.decorator';

/**
 * User Password reset dto
 */
export class ResetPasswordRequest {
  @Password()
  readonly newPassword: string;

  @Match('newPassword', {
    message: 'password and confirmation password do not match',
  })
  readonly confirmPassword: string;

  @Email()
  readonly emailId: string;

  @Text()
  readonly emailCode: string;
}
