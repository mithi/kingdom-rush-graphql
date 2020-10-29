\copy "Towers" FROM './data/generated/csv/towers.csv' DELIMITER ',' csv header;
\copy main_stats FROM './data/generated/csv/main-stats.csv'  DELIMITER ',' csv header;
\copy attack_stats FROM './data/generated/csv/attacks-stats.csv'  DELIMITER ',' csv header;
\copy barracks_stats FROM './data/generated/csv/barracks-stats.csv'  DELIMITER ',' csv header;
\copy ability FROM './data/generated/csv/abilities.csv'  DELIMITER ',' csv header;
\copy ability_level FROM './data/generated/csv/ability-levels.csv'  DELIMITER ',' csv header;
\copy build_sequence FROM './data/generated/csv/build-sequences.csv'  DELIMITER ',' csv header;