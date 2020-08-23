import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryRunner } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
}
