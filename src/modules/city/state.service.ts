import { Injectable, BadRequestException } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Builder } from 'builder-pattern';
import { CreateStateRequest } from './dto/request/createStateRequest.dto';
import { State } from 'src/entities/state.entity';
import { UpdateStateRequest } from './dto/request/updateStateRequest.dto';

/**
 * StateService has the CRUD operation for the state entity.
 */
@Injectable()
export class StateService {
  /**
   * create new state
   */
  async create(
    transactionRunner: QueryRunner,
    createStateRequest: CreateStateRequest,
  ): Promise<State> {
    const state = Builder(State)
      .name(createStateRequest.name)
      .lastUpdatedBy('curr_user')
      .build();

    return transactionRunner.manager.save(state);
  }

  /**
   * get state by id or throw EntityNotFoundError
   */
  async getById(transactionRunner: QueryRunner, id: string): Promise<State> {
    return transactionRunner.manager.findOneOrFail(State, id);
  }

  /**
   * update state by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column.
   */
  async update(
    transactionRunner: QueryRunner,
    id: string,
    updateStateRequest: UpdateStateRequest,
  ): Promise<State> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(State)
      .set(updateStateRequest)
      .set({
        name: updateStateRequest.name,
        lastUpdatedBy: 'curr_user',
      })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(State, id);
    }

    return transactionRunner.manager.findOneOrFail(State, id);
  }

  /**
   * delete state by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column
   */
  async delete(transactionRunner: QueryRunner, id: string): Promise<string> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(State)
      .set({
        lastUpdatedBy: 'curr_user',
      })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(State, id);
    }

    transactionRunner.manager.softDelete(State, id);
    return id;
  }

  static queryState(transactionRunner: QueryRunner): SelectQueryBuilder<State> {
    return transactionRunner.manager
      .createQueryBuilder()
      .select()
      .from(State, 'state');
  }

  /**
   * query state table
   */
  async query(transactionRunner: QueryRunner): Promise<State[]> {
    const query = StateService.queryState(transactionRunner);
    const result: State[] = await query.execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(State, null);
    }
    return result;
  }

  /**
   * query state table including soft deleted
   */
  async queryAll(transactionRunner: QueryRunner): Promise<State[]> {
    const query = StateService.queryState(transactionRunner);
    const result: State[] = await query.withDeleted().execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(State, null);
    }
    return result;
  }
}
