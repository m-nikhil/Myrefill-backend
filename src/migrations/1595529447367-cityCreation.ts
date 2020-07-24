import { MigrationInterface, QueryRunner } from 'typeorm';

export class CityCreation1595529447367 implements MigrationInterface {
  name = 'CityCreation1595529447367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c8ed18ff47475e2c4a7bf59daa" ON "resource" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_c8ed18ff47475e2c4a7bf59daa"`);
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
