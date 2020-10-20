/*
--------------
IMPORTANT NOTE
--------------

The following functions here are NOT efficient for adding
seed to the database since we will be querying and inserting to the database one at a time.
It is better if we query and insert in bulk.

A json file is also NOT the best file format to get this information.
It is best to have the data in csv format so that it's so much easier
and efficient to retrieve this data and intert to the database.

                  List of relations
 Schema |      Name      | Type  |       Owner
--------+----------------+-------+-------------------
 public | Towers         | table | kingdom_rush_user
 public | attack_stats   | table | kingdom_rush_user
 public | barracks_stats | table | kingdom_rush_user
 public | main_stats     | table | kingdom_rush_user
 public | migrations     | table | kingdom_rush_user
(5 rows)

 */
import populateAttackStats from "./AttackStats"
import populateBarracksStats from "./BarracksStats"
import { populateTowers, populateMainStats, populateAbilities } from "./Tower"

const seed = async ({ dbName = "default", verbose = true } = {}) => {
    await populateTowers({ dbName, verbose })
    await populateMainStats({ dbName, verbose })
    await populateAbilities({ dbName, verbose })
    await populateBarracksStats({ dbName, verbose })
    await populateAttackStats({ dbName, verbose })
}
export default seed
