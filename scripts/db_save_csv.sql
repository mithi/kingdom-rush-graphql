\dt
\dT
\copy (SELECT * From "Towers" ORDER BY id ASC) To './data/generated/csv/towers.csv' With CSV
\copy (SELECT * From main_stats ORDER BY id ASC) To './data/generated/csv/main-stats.csv' With CSV
\copy (SELECT * From attack_stats ORDER BY id ASC) To './data/generated/csv/attacks-stats.csv' With CSV
\copy (SELECT * From barracks_stats ORDER BY id ASC) To './data/generated/csv/barracks-stats.csv' With CSV
\copy (SELECT * From ability ORDER BY id ASC) To './data/generated/csv/abilities.csv' With CSV
\copy (SELECT * From ability_level ORDER BY id ASC) To './data/generated/csv/ability-levels.csv' With CSV

\o ./data/generated/txt/towers.txt
SELECT * FROM "Towers" ORDER BY id ASC;
\o ./data/generated/txt/main-stats.txt
SELECT * FROM main_stats ORDER BY id ASC;
\o ./data/generated/txt/attack-stats.txt
SELECT * FROM attack_stats ORDER BY id ASC;
\o ./data/generated/txt/barracks-stats.txt
SELECT * FROM barracks_stats ORDER BY id ASC;
\o ./data/generated/txt/abilities.txt
SELECT * FROM ability ORDER BY id ASC;
\o ./data/generated/txt/ability-levels.txt
SELECT * FROM ability_level ORDER BY id ASC;