import {MigrationInterface, QueryRunner} from "typeorm";

export class BarracksStatsCreateTable1602907173584 implements MigrationInterface {
    name = 'BarracksStatsCreateTable1602907173584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "barracks_stats" ("id" SERIAL NOT NULL, "numberOfUnits" integer NOT NULL, "respawnInterval" real NOT NULL, "health" real NOT NULL, "armor" real NOT NULL, CONSTRAINT "PK_06005d4dc8ba963484acae34726" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD "barracksStatsId" integer`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "UQ_64c7544094eaa061c047cda680a" UNIQUE ("barracksStatsId")`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "FK_64c7544094eaa061c047cda680a" FOREIGN KEY ("barracksStatsId") REFERENCES "barracks_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "FK_64c7544094eaa061c047cda680a"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "UQ_64c7544094eaa061c047cda680a"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "barracksStatsId"`);
        await queryRunner.query(`DROP TABLE "barracks_stats"`);
    }

}
