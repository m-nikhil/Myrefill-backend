import { Injectable } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Builder } from 'builder-pattern';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

class EntityBase {
  lastUpdatedBy: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Common CRUD operation
 *
 * In the entity & createDto, id field must exist.
 */
@Injectable()
export class CRUDService<
  EntityType extends EntityBase,
  ListOptionType = undefined
> {
  Entity: typeof EntityBase;

  /**
   * create new entity
   */
  create = async (
    queryRunner: QueryRunner,
    userId: string,
    createRequestDto: Partial<EntityType>,
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
   */
  update = async (
    queryRunner: QueryRunner,
    userId: string,
    id: string,
    updateJson: QueryPartialEntity<EntityType> | Partial<EntityType>,
  ): Promise<EntityType> => {
    updateJson.lastUpdatedBy = userId;

    // Update set needs to have only fields in the Entity.
    // This statement remove any extra fields.
    const fields = queryRunner.connection
      .getMetadata(this.Entity)
      .ownColumns.map(column => column.propertyName);
    console.log(fields);
    const entity = Object.entries(updateJson)
      .filter(([key]) => fields.includes(key))
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

    const updateResult = await queryRunner.manager
      .createQueryBuilder()
      .update(this.Entity)
      .set(entity)
      .where('id = :id and deletedAt is null', { id: id })
      .execute();

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

  queryEntity = (
    queryRunner: QueryRunner,
    listOption: ListOptionType,
  ): SelectQueryBuilder<EntityBase> => {
    return queryRunner.manager
      .createQueryBuilder()
      .select()
      .from(this.Entity, 'tableAlias')
      .where(listOption);
  };

  /**
   * query entity table
   */
  query = async (
    queryRunner: QueryRunner,
    listOption?: ListOptionType,
  ): Promise<EntityType[]> => {
    const result: EntityType[] = await this.queryEntity(
      queryRunner,
      listOption,
    ).execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(this.Entity, null);
    }
    return result;
  };

  /**
   * query entity table including soft deleted
   */
  queryAll = async (
    queryRunner: QueryRunner,
    listOption?: ListOptionType,
  ): Promise<EntityType[]> => {
    const result: EntityType[] = await this.queryEntity(queryRunner, listOption)
      .withDeleted()
      .execute();
    if (result.length == 0) {
      throw new EntityNotFoundError(this.Entity, null);
    }
    return result;
  };
}
