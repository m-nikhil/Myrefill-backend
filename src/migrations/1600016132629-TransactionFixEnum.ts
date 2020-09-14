import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionFixEnum1600016132629 implements MigrationInterface {
  name = 'TransactionFixEnum1600016132629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."transaction_status_enum" RENAME TO "transaction_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_status_enum" AS ENUM('unrecognized', 'success', 'failure')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "status" TYPE "transaction_status_enum" USING "status"::"text"::"transaction_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "transaction_status_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."transaction_paymentmethod_enum" RENAME TO "transaction_paymentmethod_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_paymentmethod_enum" AS ENUM('unrecognized', 'razorpay')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "paymentMethod" TYPE "transaction_paymentmethod_enum" USING "paymentMethod"::"text"::"transaction_paymentmethod_enum"`,
    );
    await queryRunner.query(`DROP TYPE "transaction_paymentmethod_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "transaction_paymentmethod_enum_old" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "paymentMethod" TYPE "transaction_paymentmethod_enum_old" USING "paymentMethod"::"text"::"transaction_paymentmethod_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "transaction_paymentmethod_enum"`);
    await queryRunner.query(
      `ALTER TYPE "transaction_paymentmethod_enum_old" RENAME TO  "transaction_paymentmethod_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_status_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "status" TYPE "transaction_status_enum_old" USING "status"::"text"::"transaction_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "transaction_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "transaction_status_enum_old" RENAME TO  "transaction_status_enum"`,
    );
  }
}
