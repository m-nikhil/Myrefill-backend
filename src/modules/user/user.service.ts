import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/createUserRequest.dto';
import { User } from 'src/entities/user.entity';
import { CRUDService } from 'src/common/class/crud';
import { QueryRunner } from 'typeorm';

@Injectable()
export class UserService extends CRUDService<User, CreateUserRequest, null> {
  Entity = User;

  /**
   * get user by email
   * Don't throw error. Null value is needed by the auth flow.
   */
  getByEmail = async (queryRunner: QueryRunner, email: string): Promise<User> => {
    return queryRunner.manager.findOne(User, { email: email });
  }
}
