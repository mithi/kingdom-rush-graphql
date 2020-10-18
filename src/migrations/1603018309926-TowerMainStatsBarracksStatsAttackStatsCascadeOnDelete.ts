import {MigrationInterface, QueryRunner} from "typeorm";

export class TowerMainStatsBarracksStatsAttackStatsCascadeOnDelete1603018309926 implements MigrationInterface {
    name = 'TowerMainStatsBarracksStatsAttackStatsCascadeOnDelete1603018309926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main_stats" DROP CONSTRAINT "FK_38a6e0a47022a1c957b90186462"`);
        await queryRunner.query(`ALTER TABLE "barracks_stats" DROP CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb"`);
        await queryRunner.query(`ALTER TABLE "attack_stats" DROP CONSTRAINT "FK_a183facc6b66a4851553798f608"`);
        await queryRunner.query(`ALTER TABLE "main_stats" ADD CONSTRAINT "FK_38a6e0a47022a1c957b90186462" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "barracks_stats" ADD CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attack_stats" ADD CONSTRAINT "FK_a183facc6b66a4851553798f608" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_stats" DROP CONSTRAINT "FK_a183facc6b66a4851553798f608"`);
        await queryRunner.query(`ALTER TABLE "barracks_stats" DROP CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb"`);
        await queryRunner.query(`ALTER TABLE "main_stats" DROP CONSTRAINT "FK_38a6e0a47022a1c957b90186462"`);
        await queryRunner.query(`ALTER TABLE "attack_stats" ADD CONSTRAINT "FK_a183facc6b66a4851553798f608" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "barracks_stats" ADD CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main_stats" ADD CONSTRAINT "FK_38a6e0a47022a1c957b90186462" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
