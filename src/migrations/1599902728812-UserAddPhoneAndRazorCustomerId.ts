import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddPhoneAndRazorCustomerId1599902728812
  implements MigrationInterface {
  name = 'UserAddPhoneAndRazorCustomerId1599902728812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "razorpayCustomerId" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "razorpayCustomerId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
  }
}
