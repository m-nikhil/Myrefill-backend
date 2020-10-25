import { MigrationInterface, QueryRunner } from 'typeorm';

export class FeedbackCreation1603608957987 implements MigrationInterface {
  name = 'FeedbackCreation1603608957987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "feedback_rating_enum" AS ENUM('unrecognized', 'one star', 'two star', 'three star', 'four star', 'five star')`,
    );
    await queryRunner.query(
      `CREATE TABLE "feedback" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionId" uuid NOT NULL, "comment" character varying NOT NULL, "rating" "feedback_rating_enum" NOT NULL, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_4bd4c7a1fd97604df4f65f5123" UNIQUE ("transactionId"), CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_4bd4c7a1fd97604df4f65f5123e" FOREIGN KEY ("transactionId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feedback" DROP CONSTRAINT "FK_4bd4c7a1fd97604df4f65f5123e"`,
    );
    await queryRunner.query(`DROP TABLE "feedback"`);
    await queryRunner.query(`DROP TYPE "feedback_rating_enum"`);
  }
}
