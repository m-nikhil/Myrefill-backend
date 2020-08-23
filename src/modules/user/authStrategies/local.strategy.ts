import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ValidationError,
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
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const loginRequest = Builder(LoginRequest)
      .email(email)
      .password(password)
      .build();
    await validateOrReject(loginRequest, {
      validationError: { target: false },
    }).catch(errors => {
      throw new BadRequestException(this.flattenValidationErrors(errors));
    });
    const user = await atomic(
      this.connection,
      this.authService.validateUser.bind(this.authService),
      loginRequest.email,
      loginRequest.password,
    );
    if (!user) {
      throw new UnauthorizedException();
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
