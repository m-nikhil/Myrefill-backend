import { Injectable } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Builder } from 'builder-pattern';

class EntityBase {
  lastUpdatedBy: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Common CRUD operation
 */
@Injectable()
export class CRUDService<
  EntityType extends EntityBase,
  CreateRequestDtoType,
  UpdateRequestDtoType
> {
  Entity: typeof EntityBase;

  /**
   * create new entity
   */
  create = async (
    queryRunner: QueryRunner,
    userId: string,
    createRequestDto: CreateRequestDtoType,
  ): Promise<EntityType> => {
    const entity = Builder((createRequestDto as unknown) as EntityType)
      .lastUpdatedBy(userId)
      .build();

    const generatedResult = (
      await queryRunner.manager.insert(this.Entity, entity)
    ).generatedMaps[0];
    const entityInserted = Builder(entity)
      .id(generatedResult.id)
      .createdAt(generatedResult.createdAt)
      .updatedAt(generatedResult.updatedAt)
      .build();

    return entityInserted as EntityType;
  };

  /**
   * get entity by id or throw EntityNotFoundError
   */
  getById = async (
    queryRunner: QueryRunner,
    id: string,
  ): Promise<EntityType> => {
    return queryRunner.manager.findOneOrFail(this.Entity, id) as Promise<
      EntityType
    >;
  };

  /**
   * update entity by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column.
   */
  update = async (
    queryRunner: QueryRunner,
    userId: string,
    id: string,
    updateRequestDto: UpdateRequestDtoType,
  ): Promise<EntityType> => {
    const entity = Builder((updateRequestDto as unknown) as EntityType)
      .lastUpdatedBy(userId)
      .build();

    const updateResult = await queryRunner.manager.update(
      this.Entity,
      id,
      entity,
    );

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(this.Entity, id);
    }

    return queryRunner.manager.findOneOrFail(this.Entity, id) as Promise<
      EntityType
    >;
  };

  /**
   * delete entity by id, if deletedAt is null,
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column
   */
  delete = async (
    queryRunner: QueryRunner,
    userId: string,
    id: string,
  ): Promise<string> => {
    const updateResult = await queryRunner.manager.update(
      this.Entity,
      {
        id: id,
        deletedAt: null,
      },
      { lastUpdatedBy: userId },
    );

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(this.Entity, id);
    }

    queryRunner.manager.softDelete(this.Entity, id);
    return id;
  };

  queryEntity = (queryRunner: QueryRunner): SelectQueryBuilder<EntityBase> => {
    return queryRunner.manager
      .createQueryBuilder()
      .select()
      .from(this.Entity, 'tableAlias');
  };

  /**
   * query entity table
   */
  query = async (queryRunner: QueryRunner): Promise<EntityType[]> => {
    const result: EntityType[] = await this.queryEntity(queryRunner).execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(this.Entity, null);
    }
    return result;
  };

  /**
   * query entity table including soft deleted
   */
  queryAll = async (queryRunner: QueryRunner): Promise<EntityType[]> => {
    const result: EntityType[] = await this.queryEntity(queryRunner)
      .withDeleted()
      .execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(this.Entity, null);
    }
    return result;
  };
}