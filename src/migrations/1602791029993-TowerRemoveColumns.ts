import { MigrationInterface, QueryRunner } from "typeorm"

export class TowerRemoveColumns1602790120279 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Towers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "notes" character varying NOT NULL, "towerType" "Towers_towertype_enum" NOT NULL, "level" "Towers_level_enum" NOT NULL, "kingdom" "Towers_kingdom_enum" NOT NULL, "towerCategory" "Towers_towercategory_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_70fea5a9b9cbd8b66dc86b35df2" UNIQUE ("name"), CONSTRAINT "PK_d35a4e5481305c4848b560a3354" PRIMARY KEY ("id"))`
        )

        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "notes"`)
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "towerCategory"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" ADD COLUMN "towerCategory"`)
        await queryRunner.query(`ALTER TABLE "Towers" ADD COLUMN "notes"`)
        await queryRunner.query(`DROP TABLE "Towers"`)
    }
}
