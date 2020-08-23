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
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.fullname, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
