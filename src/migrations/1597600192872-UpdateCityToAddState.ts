import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCityToAddState1597600192872 implements MigrationInterface {
  name = 'UpdateCityToAddState1597600192872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_f8c0858628830a35f19efdc0ec"`);
    await queryRunner.query(`ALTER TABLE "city" ADD "stateId" uuid`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_44cfb9c752b6e4030c39faff9d" ON "city" ("name", "stateId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_44cfb9c752b6e4030c39faff9d"`);
    await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "stateId"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f8c0858628830a35f19efdc0ec" ON "city" ("name") `,
    );
  }
}
