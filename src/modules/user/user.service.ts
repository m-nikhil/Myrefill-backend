import { Injectable } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Builder } from 'builder-pattern';
import { CreateUserRequest } from './dto/request/createUserRequest.dto';
import { User } from 'src/entities/user.entity';

/**
 * UserService has the CRUD operation for the user entity.
 */
@Injectable()
export class UserService {
  /**
   * create new user
   */
  async create(
    transactionRunner: QueryRunner,
    createUserRequest: CreateUserRequest,
  ): Promise<User> {
    const user: User = Builder((createUserRequest as unknown) as User)
      .lastUpdatedBy('')
      .build();
    return transactionRunner.manager.save(User, user);
  }

  /**
   * get user by id or throw EntityNotFoundError
   */
  async getById(transactionRunner: QueryRunner, id: string): Promise<User> {
    return transactionRunner.manager.findOneOrFail(User, id);
  }

  /**
   * get user by email
   * Don't throw error. Null value is needed by the auth flow.
   */
  async getByEmail(
    transactionRunner: QueryRunner,
    email: string,
  ): Promise<User> {
    return transactionRunner.manager.findOne(User, { email: email });
  }

  /**
   * delete user by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * When deleted, the personal details are replaced with userId.
   * Deleted user must not be reactivated.
   *
   * Update lastUpdatedBy column
   */
  async delete(
    transactionRunner: QueryRunner,
    userId: string,
    id: string,
  ): Promise<string> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({
        fullname: id,
        email: id,
        lastUpdatedBy: userId,
      })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, id);
    }

    transactionRunner.manager.softDelete(User, id);
    return id;
  }

  static queryUser(transactionRunner: QueryRunner): SelectQueryBuilder<User> {
    return transactionRunner.manager
      .createQueryBuilder()
      .select()
      .from(User, 'user');
  }

  /**
   * query user table
   */
  async query(transactionRunner: QueryRunner): Promise<User[]> {
    const result: User[] = await UserService.queryUser(
      transactionRunner,
    ).execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(User, null);
    }
    return result;
  }

  /**
   * query user table including soft deleted
   */
  async queryAll(transactionRunner: QueryRunner): Promise<User[]> {
    const result: User[] = await UserService.queryUser(transactionRunner)
      .withDeleted()
      .execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(User, null);
    }
    return result;
  }
}
