import { MigrationInterface, QueryRunner } from "typeorm"

export class TowerMainStatsBarracksStatsCascade1602910082625
    implements MigrationInterface {
    name = "TowerMainStatsBarracksStatsCascade1602910082625"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Towers"`)
        await queryRunner.query(`DROP TABLE "barracks_stats"`)
        await queryRunner.query(`DROP TABLE "main_stats"`)
        await queryRunner.query(
            `CREATE TABLE "main_stats" ("id" SERIAL NOT NULL, "damageMinimum" real NOT NULL, "damageMaximum" real NOT NULL, "buildCost" real NOT NULL, CONSTRAINT "PK_a9fe6ef57784aff6b73159e9b4d" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "Towers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "towerType" "Towers_towertype_enum" NOT NULL, "level" "Towers_level_enum" NOT NULL, "kingdom" "Towers_kingdom_enum" NOT NULL, "mainStatsId" integer, "barracksStatsId" integer, CONSTRAINT "unique_tower" UNIQUE ("name", "kingdom"), CONSTRAINT "REL_71599bb5a1d1b31b70da2ccee0" UNIQUE ("mainStatsId"), CONSTRAINT "REL_64c7544094eaa061c047cda680" UNIQUE ("barracksStatsId"), CONSTRAINT "PK_d35a4e5481305c4848b560a3354" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "barracks_stats" ("id" SERIAL NOT NULL, "numberOfUnits" integer NOT NULL, "respawnInterval" real NOT NULL, "health" real NOT NULL, "armor" real NOT NULL, CONSTRAINT "PK_06005d4dc8ba963484acae34726" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "Towers" ADD CONSTRAINT "FK_71599bb5a1d1b31b70da2ccee03" FOREIGN KEY ("mainStatsId") REFERENCES "main_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "Towers" ADD CONSTRAINT "FK_64c7544094eaa061c047cda680a" FOREIGN KEY ("barracksStatsId") REFERENCES "barracks_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Towers" DROP CONSTRAINT "FK_64c7544094eaa061c047cda680a"`
        )
        await queryRunner.query(
            `ALTER TABLE "Towers" DROP CONSTRAINT "FK_71599bb5a1d1b31b70da2ccee03"`
        )
        await queryRunner.query(`DROP TABLE "Towers"`)
        await queryRunner.query(`DROP TABLE "barracks_stats"`)
        await queryRunner.query(`DROP TABLE "main_stats"`)
    }
}
