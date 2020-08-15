import { MigrationInterface, QueryRunner } from 'typeorm';

export class StateCreation1595771419950 implements MigrationInterface {
  name = 'StateCreation1595771419950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b2c4aef5929860729007ac32f6" ON "state" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_b2c4aef5929860729007ac32f6"`);
    await queryRunner.query(`DROP TABLE "state"`);
  }
}
