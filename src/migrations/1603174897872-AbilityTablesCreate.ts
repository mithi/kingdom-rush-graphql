import {MigrationInterface, QueryRunner} from "typeorm";

export class AbilityTablesCreate1603174897872 implements MigrationInterface {
    name = 'AbilityTablesCreate1603174897872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ability_level" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "cost" integer NOT NULL, "abilityId" integer NOT NULL, CONSTRAINT "PK_433b7560ea75956d78120228a2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ability" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "towerId" integer NOT NULL, CONSTRAINT "PK_5643559d435d01ec126981417a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ability_level" ADD CONSTRAINT "FK_0d9185e58cdacbdb7787c410d62" FOREIGN KEY ("abilityId") REFERENCES "ability"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ability" ADD CONSTRAINT "FK_b8d8816b111ff43dc4f8a9f6afe" FOREIGN KEY ("towerId") REFERENCES "Towers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ability" DROP CONSTRAINT "FK_b8d8816b111ff43dc4f8a9f6afe"`);
        await queryRunner.query(`ALTER TABLE "ability_level" DROP CONSTRAINT "FK_0d9185e58cdacbdb7787c410d62"`);
        await queryRunner.query(`DROP TABLE "ability"`);
        await queryRunner.query(`DROP TABLE "ability_level"`);
    }

}
