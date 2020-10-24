\copy "Towers" FROM './data/generated/csv/towers.csv' DELIMITER ',' csv;
\copy main_stats FROM './data/generated/csv/main-stats.csv'  DELIMITER ',' csv;
\copy attack_stats FROM './data/generated/csv/attacks-stats.csv'  DELIMITER ',' csv;
\copy barracks_stats FROM './data/generated/csv/barracks-stats.csv'  DELIMITER ',' csv;
\copy ability FROM './data/generated/csv/abilities.csv'  DELIMITER ',' csv;
\copy ability_level FROM './data/generated/csv/ability-levels.csv'  DELIMITER ',' csv;