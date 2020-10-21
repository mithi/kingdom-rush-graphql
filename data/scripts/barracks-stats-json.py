import yaml
import json
from os import listdir
from os.path import isfile, join

"""
CURRENT

{
    name
    kingdom
    health
    respawnInterval
    armor
    numberOfUnits
}

--------------

IDEAL:

{
    name
    kingdom

    BaseBarracksStats {
        health
        respawn_interval
        armor
        number_of_units
    }

    UpgradedBarracksStats {
        health
        respawn_interval
        armor
        number_of_units
    }
}

"""

KINGDOM_NAME = {
    "KR": "kingdom rush",
    "KRF": "kingdom rush: frontiers",
    "KRO": "kingdom rush: origins",
}

def get_barracks_stats(kingdom):
    path = f"../{kingdom}/barracks.yml"

    stream = open(path, "r")
    towers = []
    kr_towers = yaml.load_all(stream, yaml.Loader)
    for i, tower in enumerate(kr_towers):
        number_of_units = 3 if "number_of_units" not in tower.keys() else tower["number_of_units"]
        base_barracks_stats = {
            "name": tower["name"],
            "kingdom": KINGDOM_NAME[kingdom],
            "health": tower["hp_magnitude"],
            "armor": tower["armor_magnitude"],
            "respawnInterval": tower["refresh_in_seconds"],
            "numberOfUnits": number_of_units,
        }
        print(base_barracks_stats)
        towers.append(base_barracks_stats)

    return towers



b1 = "../raw/KRV/barracks-dark-knights.yaml"
b2 = "../raw/KRV/barracks-elite-harassers.yaml"
b3 = "../raw/KRV/barracks-orc-warriors.yaml"

krv_towers = []
for path in [b1, b2, b3]:
    stream = open(path, "r")
    krv_towers_raw = yaml.load_all(stream, yaml.Loader)
    for i, tower_raw in enumerate(krv_towers_raw):
        name = tower_raw["name"]
        for i in [1, 2, 3, 4]:
            stats = tower_raw["levels"][i]
            number_of_units = 3 if "number_of_units" not in tower_raw.keys() else tower_raw["number_of_units"]
            name = tower_raw["name"]
            tower = {
                "name": f"{name}, {i}",
                "health": stats["health"],
                "armor": stats["armor"],
                "respawnInterval": stats["respawn"],
                "numberOfUnits": number_of_units,
                "kingdom": "kingdom rush: vengeance"
            }
            print(tower)
            krv_towers.append(tower)


towers2d = [
    get_barracks_stats("KR"),
    get_barracks_stats("KRF"),
    get_barracks_stats("KRO"),
    krv_towers
]

towers = [item for sublist in towers2d for item in sublist]

data = { "towers": towers }

for i, tower in enumerate(towers):
    print(i, tower["name"])

with open("../generated/json/barracks-stats.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)

