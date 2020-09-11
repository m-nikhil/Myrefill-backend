import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionCreation1599844798613 implements MigrationInterface {
  name = 'TransactionCreation1599844798613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "transaction_status_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_paymentmethod_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stationId" uuid, "userId" uuid, "numberOfHalfLitres" integer NOT NULL, "totalPrice" integer NOT NULL, "razorpayPaymentId" character varying NOT NULL, "razorpayOrderId" character varying NOT NULL, "razorpaySignature" character varying NOT NULL, "status" "transaction_status_enum" NOT NULL, "paymentMethod" "transaction_paymentmethod_enum" NOT NULL, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_a281f02e8cfac452318e861982f" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_a281f02e8cfac452318e861982f"`,
    );
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "transaction_paymentmethod_enum"`);
    await queryRunner.query(`DROP TYPE "transaction_status_enum"`);
  }
}
