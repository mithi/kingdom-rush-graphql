import {MigrationInterface, QueryRunner} from "typeorm";

export class MainStatsCreateTable1602885764551 implements MigrationInterface {
    name = 'MainStatsCreateTable1602885764551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "main_stats" ("id" SERIAL NOT NULL, "damageMinimum" real NOT NULL, "damageMaximum" real NOT NULL, "buildCost" real NOT NULL, CONSTRAINT "PK_a9fe6ef57784aff6b73159e9b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD "mainStatsId" integer`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "UQ_71599bb5a1d1b31b70da2ccee03" UNIQUE ("mainStatsId")`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "FK_71599bb5a1d1b31b70da2ccee03" FOREIGN KEY ("mainStatsId") REFERENCES "main_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "FK_71599bb5a1d1b31b70da2ccee03"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "UQ_71599bb5a1d1b31b70da2ccee03"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "mainStatsId"`);
        await queryRunner.query(`DROP TABLE "main_stats"`);
    }

}
