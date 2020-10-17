import {MigrationInterface, QueryRunner} from "typeorm";

export class AttackStatsCreateTable1602944082193 implements MigrationInterface {
    name = 'AttackStatsCreateTable1602944082193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attack_stats" ("id" SERIAL NOT NULL, "fireInterval" real NOT NULL, "range" real NOT NULL, CONSTRAINT "PK_e7cb32239cb7dfd5eebae4d0eaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD "attackStatsId" integer`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "UQ_3c933b98fe30fa46657f57ad779" UNIQUE ("attackStatsId")`);
        await queryRunner.query(`ALTER TABLE "Towers" ADD CONSTRAINT "FK_3c933b98fe30fa46657f57ad779" FOREIGN KEY ("attackStatsId") REFERENCES "attack_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "FK_3c933b98fe30fa46657f57ad779"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT "UQ_3c933b98fe30fa46657f57ad779"`);
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "attackStatsId"`);
        await queryRunner.query(`DROP TABLE "attack_stats"`);
    }

}
