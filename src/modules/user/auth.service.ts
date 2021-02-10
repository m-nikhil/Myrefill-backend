import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryRunner } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    transactionRunner: QueryRunner,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.getByEmail(transactionRunner, email);
    if (user && await this.userService.decryptAndCompareString(password,user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.fullname, sub: user.id, roles: 'user' };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * userId is random uuid, shouldn't change.
   * Force create a user with this uuid, so there no collision.
   */
  async adminLogin() {
    const payload = {
      name: 'superuser',
      sub: 'ea019b58-6ea9-4645-afcc-e1f86d173261',
      roles: 'admin',
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  profile = async (
    transactionRunner: QueryRunner,
    userId: string,
  ): Promise<User> => {
    return this.userService.getById(transactionRunner, userId);
  };
}
