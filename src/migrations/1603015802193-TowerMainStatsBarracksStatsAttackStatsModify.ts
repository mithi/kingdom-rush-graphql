import { MigrationInterface, QueryRunner } from "typeorm"

export class TowerMainStatsBarracksStatsAttackStatsModify1603015802193
    implements MigrationInterface {
    name = "TowerMainStatsBarracksStatsAttackStatsModify1603015802193"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Towers"`)
        await queryRunner.query(`DROP TABLE "attack_stats"`)
        await queryRunner.query(`DROP TABLE "barracks_stats"`)
        await queryRunner.query(`DROP TABLE "main_stats"`)
        await queryRunner.query(
            `CREATE TABLE "main_stats" ("id" SERIAL NOT NULL, "damageMinimum" real NOT NULL, "damageMaximum" real NOT NULL, "buildCost" real NOT NULL, "towerId" integer, CONSTRAINT "REL_38a6e0a47022a1c957b9018646" UNIQUE ("towerId"), CONSTRAINT "PK_a9fe6ef57784aff6b73159e9b4d" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "barracks_stats" ("id" SERIAL NOT NULL, "numberOfUnits" integer NOT NULL, "respawnInterval" real NOT NULL, "health" real NOT NULL, "armor" real NOT NULL, "towerId" integer, CONSTRAINT "REL_d5dcdad1a2b257a2445db6106f" UNIQUE ("towerId"), CONSTRAINT "PK_06005d4dc8ba963484acae34726" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "Towers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "towerType" "Towers_towertype_enum" NOT NULL, "level" "Towers_level_enum" NOT NULL, "kingdom" "Towers_kingdom_enum" NOT NULL, CONSTRAINT "unique_tower" UNIQUE ("name", "kingdom"), CONSTRAINT "PK_d35a4e5481305c4848b560a3354" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "attack_stats" ("id" SERIAL NOT NULL, "fireInterval" real NOT NULL, "range" real NOT NULL, "towerId" integer, CONSTRAINT "REL_a183facc6b66a4851553798f60" UNIQUE ("towerId"), CONSTRAINT "PK_e7cb32239cb7dfd5eebae4d0eaf" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "main_stats" ADD CONSTRAINT "FK_38a6e0a47022a1c957b90186462" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "barracks_stats" ADD CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "attack_stats" ADD CONSTRAINT "FK_a183facc6b66a4851553798f608" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "attack_stats" DROP CONSTRAINT "FK_a183facc6b66a4851553798f608"`
        )
        await queryRunner.query(
            `ALTER TABLE "barracks_stats" DROP CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb"`
        )
        await queryRunner.query(
            `ALTER TABLE "main_stats" DROP CONSTRAINT "FK_38a6e0a47022a1c957b90186462"`
        )
        await queryRunner.query(`DROP TABLE "attack_stats"`)
        await queryRunner.query(`DROP TABLE "Towers"`)
        await queryRunner.query(`DROP TABLE "barracks_stats"`)
        await queryRunner.query(`DROP TABLE "main_stats"`)
    }
}
