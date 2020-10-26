import {MigrationInterface, QueryRunner} from "typeorm";

export class BuildSequenceCreate1603703340687 implements MigrationInterface {
    name = 'BuildSequenceCreate1603703340687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "build_sequence" ("id" SERIAL NOT NULL, "level1Id" integer, "level2Id" integer, "level3Id" integer, "level4Id" integer, CONSTRAINT "REL_c598f4f8ace2c65225b034987f" UNIQUE ("level4Id"), CONSTRAINT "PK_11cbd4cf88c203da6f6e0c22dbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "build_sequence" ADD CONSTRAINT "FK_a0485cb10760fbbe70d7bfea439" FOREIGN KEY ("level1Id") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "build_sequence" ADD CONSTRAINT "FK_e7720dd1227b31428bdd710bac9" FOREIGN KEY ("level2Id") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "build_sequence" ADD CONSTRAINT "FK_fbdaaafa5aaf958509352c74637" FOREIGN KEY ("level3Id") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "build_sequence" ADD CONSTRAINT "FK_c598f4f8ace2c65225b034987f3" FOREIGN KEY ("level4Id") REFERENCES "Towers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "build_sequence" DROP CONSTRAINT "FK_c598f4f8ace2c65225b034987f3"`);
        await queryRunner.query(`ALTER TABLE "build_sequence" DROP CONSTRAINT "FK_fbdaaafa5aaf958509352c74637"`);
        await queryRunner.query(`ALTER TABLE "build_sequence" DROP CONSTRAINT "FK_e7720dd1227b31428bdd710bac9"`);
        await queryRunner.query(`ALTER TABLE "build_sequence" DROP CONSTRAINT "FK_a0485cb10760fbbe70d7bfea439"`);
        await queryRunner.query(`DROP TABLE "build_sequence"`);
    }

}
