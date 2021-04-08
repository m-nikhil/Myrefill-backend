import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ValidationError,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Connection } from 'typeorm';
import { atomic } from 'src/common/database/transaction';
import { User } from 'src/entities/user.entity';
import { LoginRequest } from '../dto/request/loginRequest.dto';
import { validateOrReject } from 'class-validator';
import { Builder } from 'builder-pattern';
import { iterate } from 'iterare';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private connection: Connection,
  ) {
    super({ usernameField: 'auth_email', passwordField: 'auth_password' });
  }

  async validate(email: string, password: string): Promise<User> {
    const loginRequest = Builder(LoginRequest)
      .auth_email(email)
      .auth_password(password)
      .build();
    await validateOrReject(loginRequest, {
      validationError: { target: false },
    }).catch(errors => {
      throw new BadRequestException(this.flattenValidationErrors(errors));
    });
    const user = await atomic(
      this.connection,
      this.authService.validateUser.bind(this.authService),
      loginRequest.auth_email,
      loginRequest.auth_password,
    );
    if (!user) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Invalid USER`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return user;
  }

  private flattenValidationErrors(validationErrors: ValidationError[]) {
    return iterate(validationErrors)
      .filter(item => !!item.constraints)
      .map(item => Object.values(item.constraints))
      .flatten()
      .toArray();
  }
}
