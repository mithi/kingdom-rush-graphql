import { MigrationInterface, QueryRunner } from "typeorm"

export class TowerMakeNonUniqueName1602807754357 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Towers" DROP CONSTRAINT "UQ_70fea5a9b9cbd8b66dc86b35df2"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Towers" ADD CONSTRAINT "UQ_70fea5a9b9cbd8b66dc86b35df2" UNIQUE ("name");`
        )
    }
}
