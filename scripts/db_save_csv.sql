\dt
\dT
\COPY (SELECT * From "Towers" ORDER BY id ASC) TO './data/generated/csv/towers.csv' With CSV HEADER
\COPY (SELECT * From main_stats ORDER BY id ASC) TO './data/generated/csv/main-stats.csv' With CSV HEADER
\COPY (SELECT * From attack_stats ORDER BY id ASC) TO './data/generated/csv/attacks-stats.csv' With CSV HEADER
\COPY (SELECT * From barracks_stats ORDER BY id ASC) TO './data/generated/csv/barracks-stats.csv' With CSV HEADER
\COPY (SELECT * From ability ORDER BY id ASC) TO './data/generated/csv/abilities.csv' With CSV HEADER
\COPY (SELECT * From ability_level ORDER BY id ASC) TO './data/generated/csv/ability-levels.csv' With CSV HEADER
\COPY (SELECT * From build_sequence ORDER BY id ASC) TO './data/generated/csv/build-sequences.csv' With CSV HEADER

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
\o ./data/generated/txt/build-sequences.txt
SELECT * FROM build_sequence ORDER BY id ASC;