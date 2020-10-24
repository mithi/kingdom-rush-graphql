import yaml
import json
from os import listdir
from os.path import isfile, join

"""

name
level
towerType
kingdom
buildCost
damage: {
    minimum:
    maximum:
}

"""

KINGDOM_DIRECTORY = {
    "KR": "kingdom rush",
    "KRF": "kingdom rush: frontiers",
    "KRO": "kingdom rush: origins",
}

def get_towers(tower_type, kingdom):
    path = f"./data/raw/{kingdom}/{tower_type}.yml"
    kingdom_string = KINGDOM_DIRECTORY[kingdom]
    damage_type = "magical_damage" if tower_type == 'magic' else "physical_damage"

    stream = open(path, "r")
    towers = []
    kr_towers = yaml.load_all(stream, yaml.Loader)
    for i, tower in enumerate(kr_towers):
        print(i, tower["name"], kingdom)
        new_tower = {
            "name": tower["name"],
            "buildCost": tower["build_cost"],
            "kingdom": kingdom_string,
            "level": tower["level"],
            "towerType": tower_type,
            "damage":{
                "minimum": tower[damage_type]["min"],
                "maximum": tower[damage_type]["max"]
            }
        }
        towers.append(new_tower)

    return towers

TYPE_ARTILLERY = "artillery"
TYPE_MAGIC = "magic"
TYPE_RANGED = "ranged"
TYPE_BARRACKS = "barracks"

towers2d = [
    get_towers(TYPE_ARTILLERY, "KR"),
    get_towers(TYPE_ARTILLERY, "KRF"),
    get_towers(TYPE_ARTILLERY, "KRO"),
    get_towers(TYPE_MAGIC, "KR"),
    get_towers(TYPE_MAGIC, "KRF"),
    get_towers(TYPE_MAGIC, "KRO"),
    get_towers(TYPE_RANGED, "KR"),
    get_towers(TYPE_RANGED, "KRF"),
    get_towers(TYPE_RANGED, "KRO"),
    get_towers(TYPE_BARRACKS, "KR"),
    get_towers(TYPE_BARRACKS, "KRF"),
    get_towers(TYPE_BARRACKS, "KRO"),
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
        for i in [1, 2, 3, 4]:
            stats = tower_raw["levels"][i]
            tower = {
                "name": f"{name}, {i}",
                "level": i,
                "buildCost": stats["build_cost"],
                "towerType": tower_raw["type"],
                "damage": {
                    "minimum": stats["damage"]["min"],
                    "maximum": stats["damage"]["max"],
                },
                "kingdom": "kingdom rush: vengeance"
            }

            krv_towers.append(tower)


towers2d.append(krv_towers)
towers = [item for sublist in towers2d for item in sublist]

data = { "towers": towers }

for i, tower in enumerate(towers):
    print(i, tower["name"])

with open("./data/generated/json/towers.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)
