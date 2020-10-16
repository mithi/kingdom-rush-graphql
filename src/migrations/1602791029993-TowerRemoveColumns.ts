import { MigrationInterface, QueryRunner } from "typeorm"

export class TowerRemoveColumns1602790120279 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "notes"`)
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "towerCategory"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" ADD COLUMN "towerCategory"`)
        await queryRunner.query(`ALTER TABLE "Towers" ADD COLUMN "notes"`)
    }
}
