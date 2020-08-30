import {MigrationInterface, QueryRunner} from "typeorm";

export class StationCreation1598810231265 implements MigrationInterface {
    name = 'StationCreation1598810231265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "address" character varying NOT NULL, "area" character varying NOT NULL, "pincode" integer NOT NULL, "open" boolean NOT NULL DEFAULT true, "managerName" character varying NOT NULL, "mobileNumber1" character varying NOT NULL, "mobileNUmber2" character varying, "landlineNumber" character varying, "email" character varying NOT NULL, "carpetArea" character varying, "stateId" uuid, "cityId" uuid, "storeType" character varying NOT NULL, "typeOfWater" character varying NOT NULL, "mondayTiming" character varying NOT NULL, "tuesdayTiming" character varying NOT NULL, "wednesdayTiming" character varying NOT NULL, "thursdayTiming" character varying NOT NULL, "fridayTiming" character varying NOT NULL, "saturdayTiming" character varying NOT NULL, "sundayTiming" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "station" ADD CONSTRAINT "FK_14fa00a1a5bbe4a7ea4aff4fc4a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "station" ADD CONSTRAINT "FK_6bdce757e152974ab2902ff6a72" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station" DROP CONSTRAINT "FK_6bdce757e152974ab2902ff6a72"`);
        await queryRunner.query(`ALTER TABLE "station" DROP CONSTRAINT "FK_14fa00a1a5bbe4a7ea4aff4fc4a"`);
        await queryRunner.query(`DROP TABLE "station"`);
    }

}
