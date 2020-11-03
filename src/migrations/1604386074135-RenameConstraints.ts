import { MigrationInterface, QueryRunner } from "typeorm"

/*
*********
'UNIQUE'
*********
        constraint_name         |   table_name   | column_name | foreign_table_name | foreign_column_name
--------------------------------+----------------+-------------+--------------------+---------------------
 REL_38a6e0a47022a1c957b9018646 | main_stats     | towerId     | main_stats         | towerId
 REL_d5dcdad1a2b257a2445db6106f | barracks_stats | towerId     | barracks_stats     | towerId
 REL_a183facc6b66a4851553798f60 | attack_stats   | towerId     | attack_stats       | towerId
 unique_tower                   | Towers         | name        | Towers             | name
 unique_tower                   | Towers         | name        | Towers             | kingdom
 unique_tower                   | Towers         | kingdom     | Towers             | name
 unique_tower                   | Towers         | kingdom     | Towers             | kingdom
 REL_c598f4f8ace2c65225b034987f | build_sequence | level4Id    | build_sequence     | level4Id
(8 rows)

*************
'PRIMARY KEY'
*************
        constraint_name         |   table_name   | column_name | foreign_table_name | foreign_column_name
--------------------------------+----------------+-------------+--------------------+---------------------
 PK_8c82d7f526340ab734260ea46be | migrations     | id          | migrations         | id
 PK_a9fe6ef57784aff6b73159e9b4d | main_stats     | id          | main_stats         | id
 PK_06005d4dc8ba963484acae34726 | barracks_stats | id          | barracks_stats     | id
 PK_e7cb32239cb7dfd5eebae4d0eaf | attack_stats   | id          | attack_stats       | id
 PK_d35a4e5481305c4848b560a3354 | Towers         | id          | Towers             | id
 PK_433b7560ea75956d78120228a2c | ability_level  | id          | ability_level      | id
 PK_5643559d435d01ec126981417a2 | ability        | id          | ability            | id
 PK_11cbd4cf88c203da6f6e0c22dbe | build_sequence | id          | build_sequence     | id
(8 rows)

*************
'FOREIGN KEY'
*************
        constraint_name         |   table_name   | column_name | foreign_table_name | foreign_column_name
--------------------------------+----------------+-------------+--------------------+---------------------
 FK_38a6e0a47022a1c957b90186462 | main_stats     | towerId     | Towers             | id
 FK_d5dcdad1a2b257a2445db6106fb | barracks_stats | towerId     | Towers             | id
 FK_a183facc6b66a4851553798f608 | attack_stats   | towerId     | Towers             | id
 FK_0d9185e58cdacbdb7787c410d62 | ability_level  | abilityId   | ability            | id
 FK_b8d8816b111ff43dc4f8a9f6afe | ability        | towerId     | Towers             | id
 FK_a0485cb10760fbbe70d7bfea439 | build_sequence | level1Id    | Towers             | id
 FK_e7720dd1227b31428bdd710bac9 | build_sequence | level2Id    | Towers             | id
 FK_fbdaaafa5aaf958509352c74637 | build_sequence | level3Id    | Towers             | id
 FK_c598f4f8ace2c65225b034987f3 | build_sequence | level4Id    | Towers             | id

*/

export class RenameConstraints1604386074135 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "main_stats" RENAME CONSTRAINT "REL_38a6e0a47022a1c957b9018646" TO "UNIQUE_main_stats_towerId";
            ALTER TABLE "barracks_stats" RENAME CONSTRAINT "REL_d5dcdad1a2b257a2445db6106f" TO "UNIQUE_barracks_stats_towerId";
            ALTER TABLE "attack_stats" RENAME CONSTRAINT "REL_a183facc6b66a4851553798f60" TO "UNIQUE_attack_stats_towerId";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "REL_c598f4f8ace2c65225b034987f" TO "UNIQUE_build_sequence_level4Id";
            ALTER TABLE "migrations" RENAME CONSTRAINT "PK_8c82d7f526340ab734260ea46be" TO "PK_migrations_id";
            ALTER TABLE "main_stats" RENAME CONSTRAINT "PK_a9fe6ef57784aff6b73159e9b4d" TO "PK_main_stats_id";
            ALTER TABLE "barracks_stats" RENAME CONSTRAINT "PK_06005d4dc8ba963484acae34726" TO "PK_barracks_stats_id";
            ALTER TABLE "attack_stats" RENAME CONSTRAINT "PK_e7cb32239cb7dfd5eebae4d0eaf" TO "PK_attack_stats_id";
            ALTER TABLE "Towers" RENAME CONSTRAINT "PK_d35a4e5481305c4848b560a3354" TO "PK_Towers_id";
            ALTER TABLE "ability_level" RENAME CONSTRAINT "PK_433b7560ea75956d78120228a2c" TO "PK_ability_level_id";
            ALTER TABLE "ability" RENAME CONSTRAINT "PK_5643559d435d01ec126981417a2" TO "PK_ability_id";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "PK_11cbd4cf88c203da6f6e0c22dbe" TO "PK_build_sequence_id";
            ALTER TABLE "main_stats" RENAME CONSTRAINT "FK_38a6e0a47022a1c957b90186462" TO "FK_main_stats_towerId__Towers_id";
            ALTER TABLE "barracks_stats" RENAME CONSTRAINT "FK_d5dcdad1a2b257a2445db6106fb" TO "FK_barracks_stats_towerId__Towers_id";
            ALTER TABLE "attack_stats" RENAME CONSTRAINT "FK_a183facc6b66a4851553798f608" TO "FK_attack_stats_towerId__Towers_id";
            ALTER TABLE "ability_level" RENAME CONSTRAINT "FK_0d9185e58cdacbdb7787c410d62" TO "FK_ability_level_abilityId__ability_id";
            ALTER TABLE "ability" RENAME CONSTRAINT "FK_b8d8816b111ff43dc4f8a9f6afe" TO "FK_ability_towerId__Towers_id";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_a0485cb10760fbbe70d7bfea439" TO "FK_build_sequence_level1Id__Towers_id";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_e7720dd1227b31428bdd710bac9" TO "FK_build_sequence_level2Id__Towers_id";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_fbdaaafa5aaf958509352c74637" TO "FK_build_sequence_level3Id__Towers_id";
            ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_c598f4f8ace2c65225b034987f3" TO "FK_build_sequence_level4Id__Towers_id";
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_build_sequence_level4Id__Towers_id" TO "FK_c598f4f8ace2c65225b034987f3";
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_build_sequence_level3Id__Towers_id" TO "FK_fbdaaafa5aaf958509352c74637";
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_build_sequence_level2Id__Towers_id" TO "FK_e7720dd1227b31428bdd710bac9";
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "FK_build_sequence_level1Id__Towers_id" TO "FK_a0485cb10760fbbe70d7bfea439";
        ALTER TABLE "ability" RENAME CONSTRAINT "FK_ability_towerId__Towers_id" TO "FK_b8d8816b111ff43dc4f8a9f6afe";
        ALTER TABLE "ability_level" RENAME CONSTRAINT "FK_ability_level_abilityId__ability_id" TO "FK_0d9185e58cdacbdb7787c410d62";
        ALTER TABLE "attack_stats" RENAME CONSTRAINT "FK_attack_stats_towerId__Towers_id" TO "FK_a183facc6b66a4851553798f608";
        ALTER TABLE "barracks_stats" RENAME CONSTRAINT "FK_barracks_stats_towerId__Towers_id" TO "FK_d5dcdad1a2b257a2445db6106fb";
        ALTER TABLE "main_stats" RENAME CONSTRAINT "FK_main_stats_towerId__Towers_id" TO "FK_38a6e0a47022a1c957b90186462";
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "PK_build_sequence_id" TO "PK_11cbd4cf88c203da6f6e0c22dbe";
        ALTER TABLE "ability" RENAME CONSTRAINT "PK_ability_id" TO "PK_5643559d435d01ec126981417a2";
        ALTER TABLE "ability_level" RENAME CONSTRAINT "PK_ability_level_id" TO "PK_433b7560ea75956d78120228a2c";
        ALTER TABLE "Towers" RENAME CONSTRAINT "PK_Towers_id" TO "PK_d35a4e5481305c4848b560a3354";
        ALTER TABLE "attack_stats" RENAME CONSTRAINT "PK_attack_stats_id" TO "PK_e7cb32239cb7dfd5eebae4d0eaf";
        ALTER TABLE "barracks_stats" RENAME CONSTRAINT "PK_barracks_stats_id" TO "PK_06005d4dc8ba963484acae34726";
        ALTER TABLE "main_stats" RENAME CONSTRAINT "PK_main_stats_id" TO "PK_a9fe6ef57784aff6b73159e9b4d";
        ALTER TABLE "migrations" RENAME CONSTRAINT "PK_migrations_id" TO "PK_8c82d7f526340ab734260ea46be";
        ALTER TABLE "build_sequence" RENAME CONSTRAINT "UNIQUE_build_sequence_level4Id" TO "REL_c598f4f8ace2c65225b034987f";
        ALTER TABLE "attack_stats" RENAME CONSTRAINT "UNIQUE_attack_stats_towerId" TO "REL_a183facc6b66a4851553798f60";
        ALTER TABLE "barracks_stats" RENAME CONSTRAINT "UNIQUE_barracks_stats_towerId" TO "REL_d5dcdad1a2b257a2445db6106f";
        ALTER TABLE "main_stats" RENAME CONSTRAINT "UNIQUE_main_stats_towerId" TO "REL_38a6e0a47022a1c957b9018646";
        `)
    }
}
