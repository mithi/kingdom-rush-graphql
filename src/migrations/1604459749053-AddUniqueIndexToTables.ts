import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUniqueIndexToTables1604459749053 implements MigrationInterface {
    name = "AddUniqueIndexToTables1604459749053"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UNIQUE_INDEX_ability__name" ON ability (name);
            CREATE UNIQUE INDEX "UNIQUE_INDEX_main_stats__tower_id" ON main_stats ("towerId");
            CREATE UNIQUE INDEX "UNIQUE_INDEX_barracks_stats__tower_id" ON barracks_stats ("towerId");
            CREATE UNIQUE INDEX "UNIQUE_INDEX_attack_stats__tower_id" ON attack_stats ("towerId");
            CREATE UNIQUE INDEX "UNIQUE_INDEX_build_sequence__level4_id" ON build_sequence ("level4Id");
            ALTER TABLE ability_level ADD CONSTRAINT "UNIQUE_ability_level__ability_level" UNIQUE ("abilityId", level);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE ability_level DROP CONSTRAINT "UNIQUE_ability_level__ability_level";
            DROP INDEX
                "UNIQUE_INDEX_build_sequence__level4_id",
                "UNIQUE_INDEX_attack_stats__tower_id",
                "UNIQUE_INDEX_barracks_stats__tower_id",
                "UNIQUE_INDEX_main_stats__tower_id",
                "UNIQUE_INDEX_ability__name";
            ;
        `)
    }
}
