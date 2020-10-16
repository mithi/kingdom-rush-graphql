import { MigrationInterface, QueryRunner } from "typeorm"

export class makePairUnique1602811161119 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Towers" ADD CONSTRAINT unique_tower UNIQUE (name, kingdom)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP CONSTRAINT unique_tower`)
    }
}
