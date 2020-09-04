import { MigrationInterface, QueryRunner } from 'typeorm';

export class StationMetricCreation1599239662871 implements MigrationInterface {
  name = 'StationMetricCreation1599239662871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "station_metric" ("stationId" uuid NOT NULL, "numberOfUsers" integer NOT NULL DEFAULT 0, "lifetimeHalfLitres" integer NOT NULL DEFAULT 0, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_58d69669f9e935320b59550430" UNIQUE ("stationId"), CONSTRAINT "PK_58d69669f9e935320b59550430d" PRIMARY KEY ("stationId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "station_metric" ADD CONSTRAINT "FK_58d69669f9e935320b59550430d" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "station_metric" DROP CONSTRAINT "FK_58d69669f9e935320b59550430d"`,
    );
    await queryRunner.query(`DROP TABLE "station_metric"`);
  }
}
