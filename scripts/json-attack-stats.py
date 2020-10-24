import yaml
import json
from os import listdir
from os.path import isfile, join

"""
CURRENT

{
    name
    kingdom
    fireInterval
    range
}

"""

KINGDOM_DIRECTORY = {
    "KR": "kingdom rush",
    "KRF": "kingdom rush: frontiers",
    "KRO": "kingdom rush: origins",
}

def get_attack_stats(tower_type, kingdom):
    path = f"./data/raw/{kingdom}/{tower_type}.yml"
    kingdom_string = KINGDOM_DIRECTORY[kingdom]
    stream = open(path, "r")
    towers = []
    kr_towers = yaml.load_all(stream, yaml.Loader)
    for i, tower in enumerate(kr_towers):
        keys = tower.keys()
        fire_interval = 0
        if 'fire_rate_magnitude' in keys:
            fire_interval = tower["fire_rate_magnitude"]

        if 'fire_rate_in_seconds' in keys:
            fire_interval = tower["fire_rate_in_seconds"]

        new_tower = {
            "name": tower["name"],
            "kingdom": kingdom_string,
            "fireInterval": fire_interval,
            "range": tower["range_magnitude"],
        }

        print(new_tower)
        towers.append(new_tower)

    return towers

TYPE_ARTILLERY = "artillery"
TYPE_MAGIC = "magic"
TYPE_RANGED = "ranged"

towers2d = [
    get_attack_stats(TYPE_ARTILLERY, "KR"),
    get_attack_stats(TYPE_ARTILLERY, "KRF"),
    get_attack_stats(TYPE_ARTILLERY, "KRO"),
    get_attack_stats(TYPE_MAGIC, "KR"),
    get_attack_stats(TYPE_MAGIC, "KRF"),
    get_attack_stats(TYPE_MAGIC, "KRO"),
    get_attack_stats(TYPE_RANGED, "KR"),
    get_attack_stats(TYPE_RANGED, "KRF"),
    get_attack_stats(TYPE_RANGED, "KRO"),
]

krv_dir = "./data/raw/KRV/"
krv_files_path = [f for f in listdir(krv_dir) if isfile(join(krv_dir, f))]

krv_towers = []
for path in krv_files_path:
    new_path = krv_dir + path
    stream = open(new_path, "r")
    krv_towers_raw = yaml.load_all(stream, yaml.Loader)

    for i, tower_raw in enumerate(krv_towers_raw):
        name = tower_raw["name"]
        if tower_raw["type"] == "barracks":
            continue
        for i in [1, 2, 3, 4]:
            stats = tower_raw["levels"][i]
            tower = {
                "name": f"{name}, {i}",
                "kingdom": "kingdom rush: vengeance",
                "fireInterval": stats["fire_rate"],
                "range": stats["range"],
            }
            print(tower)
            krv_towers.append(tower)


towers2d.append(krv_towers)
towers = [item for sublist in towers2d for item in sublist]

data = { "towers": towers }

for i, tower in enumerate(towers):
    print(i, tower["name"])

with open("./data/generated/json/attack-stats.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)
