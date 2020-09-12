import {MigrationInterface, QueryRunner} from "typeorm";

export class ComplaintCreation1599912342056 implements MigrationInterface {
    name = 'ComplaintCreation1599912342056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "complaint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stationId" uuid NOT NULL, "userId" uuid NOT NULL, "comment" character varying NOT NULL, "lastUpdatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "complaint" ADD CONSTRAINT "FK_5795e32a6ad50aee5c720864fa6" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaint" ADD CONSTRAINT "FK_52dc113dcddfae564f99848c8af" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complaint" DROP CONSTRAINT "FK_52dc113dcddfae564f99848c8af"`);
        await queryRunner.query(`ALTER TABLE "complaint" DROP CONSTRAINT "FK_5795e32a6ad50aee5c720864fa6"`);
        await queryRunner.query(`DROP TABLE "complaint"`);
    }

}
