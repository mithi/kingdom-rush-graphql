import { MigrationInterface, QueryRunner } from "typeorm"

/**
The goal of this migration is to change the enum order
from: "Towers_towertype_enum = ENUM('archer', 'barracks', 'mage', 'artillery')
to: "Towers_newtowertype_enum" AS ENUM('archer', 'artillery', 'barracks', 'mage')
so that when we sort by "towerType" it will be in alphabetical order

At the start the column order looks like this:
 id  |         name          | towerType | level |         kingdom         |                                                imageUrl
-----+-----------------------+-----------+-------+-------------------------+--------------------------------------------------------------------------------------------------------
   1 | dwarven bombard       | artillery | 1     | kingdom rush            | https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-1-dwarven-bombard.png

But after updating, it will look like this:

 id  |         name          | level |         kingdom         |                                                imageUrl                                                | towerType
-----+-----------------------+-------+-------------------------+--------------------------------------------------------------------------------------------------------+-----------
   1 | dwarven bombard       | 1     | kingdom rush            | https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-1-dwarven-bombard.png      | artillery

This is because columns are by default sorted in the order they are created.
But we dont want the imageUrl to be before the towerType because it will not look good
when we import it to a csv file.
We want the imageUrl to be always the last column.

So this means we have to recreate the image url so that it will be the last column again.
In the end it will look like this:

 id  |         name          | level |         kingdom         | towerType |                                                imageUrl
-----+-----------------------+-------+-------------------------+-----------+--------------------------------------------------------------------------------------------------------
   1 | dwarven bombard       | 1     | kingdom rush            | artillery | https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-1-dwarven-bombard.png


IMPORTANT NOTE:
We don't need reverse the last four statements of the up() function

    ALTER TABLE "Towers" ADD COLUMN "newImgUrl" character varying;
    UPDATE "Towers" SET "newImgUrl" = "imageUrl";
    ALTER TABLE "Towers" DROP COLUMN "imageUrl";
    ALTER TABLE "Towers" RENAME COLUMN "newImgUrl" TO "imageUrl";

Because that won't do anything.
 */

export class EnumTowerTypeAlterOrder1604220016152 implements MigrationInterface {
    name = "EnumTowerTypeAlterOrder1604220016152"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "Towers_newtowertype_enum" AS ENUM('archer', 'artillery', 'barracks', 'mage');
            ALTER TABLE "Towers" ADD "newTowerType" "Towers_newtowertype_enum";
            UPDATE "Towers" SET "newTowerType" = 'archer' WHERE "towerType" = 'archer';
            UPDATE "Towers" SET "newTowerType" = 'barracks' WHERE "towerType" = 'barracks';
            UPDATE "Towers" SET "newTowerType" = 'artillery' WHERE "towerType" = 'artillery';
            UPDATE "Towers" SET "newTowerType" = 'mage' WHERE "towerType" = 'mage';
            ALTER TABLE "Towers" DROP COLUMN "towerType";
            ALTER TABLE "Towers" RENAME COLUMN "newTowerType" TO "towerType";
            DROP TYPE "Towers_towertype_enum";
            ALTER TYPE "Towers_newtowertype_enum" RENAME TO "Towers_towertype_enum";
            ALTER TABLE "Towers" ALTER COLUMN "towerType" SET NOT NULL;
            ALTER TABLE "Towers" ADD COLUMN "newImgUrl" character varying;
            UPDATE "Towers" SET "newImgUrl" = "imageUrl";
            ALTER TABLE "Towers" DROP COLUMN "imageUrl";
            ALTER TABLE "Towers" RENAME COLUMN "newImgUrl" TO "imageUrl";
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "Towers" ALTER COLUMN "towerType" DROP NOT NULL;
        ALTER TYPE "Towers_towertype_enum" RENAME TO "Towers_newtowertype_enum";
        CREATE TYPE "Towers_towertype_enum" AS ENUM('archer', 'barracks', 'mage', 'artillery');
        ALTER TABLE "Towers" RENAME COLUMN "towerType" TO "newTowerType";
        ALTER TABLE "Towers" ADD COLUMN "towerType" "Towers_towertype_enum";
        UPDATE "Towers" SET "towerType" = 'mage' WHERE "newTowerType" = 'mage';
        UPDATE "Towers" SET "towerType" = 'artillery' WHERE "newTowerType" = 'artillery';
        UPDATE "Towers" SET "towerType" = 'barracks' WHERE "newTowerType" = 'barracks';
        UPDATE "Towers" SET "towerType" = 'archer' WHERE "newTowerType" = 'archer';
        ALTER TABLE "Towers" ALTER COLUMN "towerType" SET NOT NULL;
        ALTER TABLE "Towers" DROP "newTowerType";
        DROP TYPE "Towers_newtowertype_enum";
        `)
    }
}
