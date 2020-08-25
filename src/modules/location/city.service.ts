import { Injectable } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { City } from 'src/entities/city.entity';
import { CreateCityRequest } from './dto/request/createCityRequest.dto';
import { Builder } from 'builder-pattern';
import { UpdateCityRequest } from './dto/request/updateCityRequest.dto';

/**
 * CityService has the CRUD operation for the city entity.
 */
@Injectable()
export class CityService {
  /**
   * create new city
   */
  async create(
    transactionRunner: QueryRunner,
    createCityRequest: CreateCityRequest,
  ): Promise<City> {
    const city: City = Builder(createCityRequest as City)
      .lastUpdatedBy('curr_user')
      .build();

    return transactionRunner.manager.save(City, city);
  }

  /**
   * get city by id or throw EntityNotFoundError
   */
  async getById(transactionRunner: QueryRunner, id: string): Promise<City> {
    return transactionRunner.manager.findOneOrFail(City, id);
  }

  /**
   * update city by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column.
   */
  async update(
    transactionRunner: QueryRunner,
    id: string,
    updateCityRequest: UpdateCityRequest,
  ): Promise<City> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(City)
      .set(updateCityRequest)
      .set({ lastUpdatedBy: 'curr_user' })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(City, id);
    }

    return transactionRunner.manager.findOneOrFail(City, id);
  }

  /**
   * delete city by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column
   */
  async delete(transactionRunner: QueryRunner, id: string): Promise<string> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(City)
      .set({
        lastUpdatedBy: 'curr_user',
      })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(City, id);
    }

    transactionRunner.manager.softDelete(City, id);
    return id;
  }

  static queryCity(transactionRunner: QueryRunner): SelectQueryBuilder<City> {
    return transactionRunner.manager
      .createQueryBuilder()
      .select()
      .from(City, 'city');
  }

  /**
   * query city table
   */
  async query(
    transactionRunner: QueryRunner,
    stateId: string,
  ): Promise<City[]> {
    if (stateId) {
      const result: City[] = await transactionRunner.manager.find(stateId);
      if (result.length == 0) {
        throw new EntityNotFoundError(City, null);
      }
    } else {
      const result: City[] = await CityService.queryCity(
        transactionRunner,
      ).execute();
      if (result.length == 0) {
        throw new EntityNotFoundError(City, null);
      }
      return result;
    }
  }

  /**
   * query city table including soft deleted
   */
  async queryAll(transactionRunner: QueryRunner): Promise<City[]> {
    const result: City[] = await CityService.queryCity(transactionRunner)
      .withDeleted()
      .execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(City, null);
    }
    return result;
  }
  /**
   * query city table by stateId
   */
  async queryByStateId(
    transactionRunner: QueryRunner,
    stateId: string,
  ): Promise<City[]> {
    return transactionRunner.manager.find(stateId);
  }
}
