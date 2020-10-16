CREATE TYPE "Towers_towertype_enum" AS ENUM('archer', 'barracks', 'mage', 'artillery');
CREATE TYPE "Towers_level_enum" AS ENUM('1', '2', '3', '4');
CREATE TYPE "Towers_kingdom_enum" AS ENUM('kingdom rush', 'kingdom rush: frontiers', 'kingdom rush: origin', 'kingdom rush: vengeance');
CREATE TYPE "Towers_towercategory_enum" AS ENUM('special', 'basic');
CREATE TABLE "Towers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "notes" character varying NOT NULL, "towerType" "Towers_towertype_enum" NOT NULL, "level" "Towers_level_enum" NOT NULL, "kingdom" "Towers_kingdom_enum" NOT NULL, "towerCategory" "Towers_towercategory_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_70fea5a9b9cbd8b66dc86b35df2" UNIQUE ("name"), CONSTRAINT "PK_d35a4e5481305c4848b560a3354" PRIMARY KEY ("id"));