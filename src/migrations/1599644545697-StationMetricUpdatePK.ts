import { MigrationInterface, QueryRunner } from 'typeorm';

export class StationMetricUpdatePK1599644545697 implements MigrationInterface {
  name = 'StationMetricUpdatePK1599644545697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "FK_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME COLUMN "stationId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME CONSTRAINT "PK_58d69669f9e935320b59550430d" TO "PK_7c93f4ca510194377661bfae829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME CONSTRAINT "UQ_58d69669f9e935320b59550430d" TO "UQ_7c93f4ca510194377661bfae829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "FK_7c93f4ca510194377661bfae829" FOREIGN KEY ("id") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "FK_7c93f4ca510194377661bfae829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME CONSTRAINT "UQ_7c93f4ca510194377661bfae829" TO "UQ_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME CONSTRAINT "PK_7c93f4ca510194377661bfae829" TO "PK_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" RENAME COLUMN "id" TO "stationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "FK_58d69669f9e935320b59550430d" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
