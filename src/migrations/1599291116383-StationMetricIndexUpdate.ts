import { MigrationInterface, QueryRunner } from 'typeorm';

export class StationMetricIndexUpdate1599291116383
  implements MigrationInterface {
  name = 'StationMetricIndexUpdate1599291116383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "FK_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "UQ_58d69669f9e935320b59550430d" UNIQUE ("stationId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "FK_58d69669f9e935320b59550430d" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "FK_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "UQ_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "FK_58d69669f9e935320b59550430d" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
