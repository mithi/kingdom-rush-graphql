\dt
\dT
\copy (Select * From "Towers" ORDER BY id ASC) To '../generated/csv/towers.csv' With CSV
\copy (Select * From main_stats ORDER BY id ASC) To '../generated/csv/main-stats.csv' With CSV
\copy (Select * From attack_stats ORDER BY id ASC) To '../generated/csv/attacks-stats.csv' With CSV
\copy (Select * From barracks_stats ORDER BY id ASC) To '../generated/csv/barracks-stats.csv' With CSV
\copy (Select * From ability ORDER BY id ASC) To '../generated/csv/abilities.csv' With CSV
\copy (Select * From ability_level ORDER BY id ASC) To '../generated/csv/ability-levels.csv' With CSV

\o ../generated/txt/towers.txt
SELECT * FROM "Towers" ORDER BY id ASC;
\o ../generated/txt/main-stats.txt
SELECT * FROM main_stats ORDER BY id ASC;
\o ../generated/txt/attack-stats.txt
SELECT * FROM attack_stats ORDER BY id ASC;
\o ../generated/txt/barracks-stats.txt
SELECT * FROM barracks_stats ORDER BY id ASC;
\o ../generated/txt/abilities.txt
SELECT * FROM ability ORDER BY id ASC;
\o ../generated/txt/ability-levels.txt
SELECT * FROM ability_level ORDER BY id ASC;