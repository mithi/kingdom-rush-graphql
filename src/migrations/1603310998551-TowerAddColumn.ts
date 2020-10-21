import {MigrationInterface, QueryRunner} from "typeorm";

export class TowerAddColumn1603310998551 implements MigrationInterface {
    name = 'TowerAddColumn1603310998551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Towers" DROP COLUMN "imageUrl"`);
    }

}
