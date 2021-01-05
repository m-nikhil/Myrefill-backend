import { IsOptional, IsString, IsUUID } from 'class-validator';
import {
  Password,
} from 'src/common/decorators/combined.decorator';
import { Match } from 'src/common/decorators/match.decorator';

/**
 * User Password reset dto
 */
export class changePasswordRequest {
  @IsUUID()
  @IsOptional()
  readonly userId: string;

  @IsString()
  readonly oldPassword: string;

  @Password()
  readonly newPassword: string;

  @Match('newPassword', {
    message: `Password doesn't match`,
  })
  readonly confirmPassword: string;
}
