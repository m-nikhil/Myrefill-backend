import { Word, Password } from 'src/common/decorators/combined.decorator';
import { IsEmail } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

/**
 * User creation/registeration dto
 */
export class CreateUserRequest {
  @Word()
  readonly fullname: string;

  @IsEmail()
  readonly email: string;

  @Password()
  readonly password: string;

  @Match('password', {
    message: 'password and confirmation password do not match',
  })
  readonly confirmPassword: string;
}
