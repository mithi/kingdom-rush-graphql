\COPY "Towers" FROM './data/generated/csv/towers.csv' DELIMITER ',' CSV HEADER;
\COPY main_stats FROM './data/generated/csv/main-stats.csv'  DELIMITER ',' CSV HEADER;
\COPY attack_stats FROM './data/generated/csv/attacks-stats.csv'  DELIMITER ',' CSV HEADER;
\COPY barracks_stats FROM './data/generated/csv/barracks-stats.csv'  DELIMITER ',' CSV HEADER;
\COPY ability FROM './data/generated/csv/abilities.csv'  DELIMITER ',' CSV HEADER;
\COPY ability_level FROM './data/generated/csv/ability-levels.csv'  DELIMITER ',' CSV HEADER;
\COPY build_sequence FROM './data/generated/csv/build-sequences.csv'  DELIMITER ',' CSV HEADER;