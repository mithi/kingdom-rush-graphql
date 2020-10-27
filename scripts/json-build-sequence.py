import yaml
import json
from os import listdir
from os.path import isfile, join

TYPE_ARTILLERY = "artillery"
TYPE_MAGIC = "magic"
TYPE_RANGED = "ranged"
TYPE_BARRACKS = "barracks"

KINGDOM_DIRECTORY = {
    "KR": "kingdom rush",
    "KRF": "kingdom rush: frontiers",
    "KRO": "kingdom rush: origins",
}

def get_build_sequence(tower_type, kingdom):
    path = f"./data/raw/{kingdom}/{tower_type}.yml"
    kingdom_string = KINGDOM_DIRECTORY[kingdom]

    stream = open(path, "r")
    tower_names = []
    build_sequence = []
    kr_towers = yaml.load_all(stream, yaml.Loader)
    for i, tower in enumerate(kr_towers):
        tower_names.append(tower["name"])

    name4a, name4b = tower_names[3:]

    build_sequence.append({
        "kingdom": kingdom_string,
        "levels": tower_names[0:3] + [name4a]
    })

    build_sequence.append({
        "kingdom": kingdom_string,
        "levels": tower_names[0:3] + [name4b]
    })

    return build_sequence


TYPE_ARTILLERY = "artillery"
TYPE_MAGIC = "magic"
TYPE_RANGED = "ranged"
TYPE_BARRACKS = "barracks"

build_sequences_2d = [
    get_build_sequence(TYPE_ARTILLERY, "KR"),
    get_build_sequence(TYPE_ARTILLERY, "KRF"),
    get_build_sequence(TYPE_ARTILLERY, "KRO"),
    get_build_sequence(TYPE_MAGIC, "KR"),
    get_build_sequence(TYPE_MAGIC, "KRF"),
    get_build_sequence(TYPE_MAGIC, "KRO"),
    get_build_sequence(TYPE_RANGED, "KR"),
    get_build_sequence(TYPE_RANGED, "KRF"),
    get_build_sequence(TYPE_RANGED, "KRO"),
    get_build_sequence(TYPE_BARRACKS, "KR"),
    get_build_sequence(TYPE_BARRACKS, "KRF"),
    get_build_sequence(TYPE_BARRACKS, "KRO"),
]

krv_dir = "./data/raw/KRV/"

krv_files_path = [f for f in listdir(krv_dir) if isfile(join(krv_dir, f))]
krv_build_sequences = []

for path in krv_files_path:
    new_path = krv_dir + path
    stream = open(new_path, "r")
    krv_towers_raw = yaml.load_all(stream, yaml.Loader)

    for i, tower_raw in enumerate(krv_towers_raw):
        name = tower_raw["name"]
        krv_build_sequences.append({
            "kingdom": "kingdom rush: vengeance",
            "levels": [
                f"{name}, 1",
                f"{name}, 2",
                f"{name}, 3",
                f"{name}, 4",
            ]
        })


build_sequences_2d.append(krv_build_sequences)
build_sequences = [item for sublist in build_sequences_2d for item in sublist]
data = { "buildSequences": build_sequences }

for i, build_sequence in enumerate(build_sequences):
    print(i, build_sequence)

with open("./data/generated/json/build-sequences.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)
