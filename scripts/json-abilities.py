import yaml
import json
from os import listdir
from os.path import isfile, join

"""
[{
    towerName
    kingdom
    numberOfabilities
    abilities: [
        {
            name
            description
            levels:[
                { cost }
            ]
        },
        {
            name
            description
            levels: [
                { level, cost }
            ]
        }
    ]
}]

---
name: ""
number_of_abilities: 0
abilities:
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
    - name: ""
      description: ""
      number_of_levels: 0
      levels:
          - description: ""
            cost: 0
          - description: ""
            cost: 0
          - description: ""
            cost: 0
"""

def get_abilities(path, kingdom):
    stream = open(path, "r")
    towers = []
    kr_towers = yaml.load_all(stream, yaml.Loader)
    for i, tower in enumerate(kr_towers):
        print(i, tower["name"])
        abilities = tower["abilities"]
        cleaned_abilities = []

        for j, ability in enumerate(abilities):
            print("-", j, ability["name"])
            levels = ability["levels"]
            cleaned_levels = []
            for k, ability_level in enumerate(levels):
                print("--", k)
                cleaned_levels.append({
                    "cost": ability_level["cost"]
                })

            cleaned_abilities.append({
                "abilityName": ability["name"].lower(),
                "description": ability["description"].lower(),
                "levels": cleaned_levels
            })

        tower_abilities = {
            "towerName": tower["name"].lower(),
            "kingdom": kingdom,
            "abilities": cleaned_abilities
        }

        towers.append(tower_abilities)

    return towers

towers_kr = get_abilities("./data/raw/KR/abilities.yml", "kingdom rush")
towers_krf = get_abilities("./data/raw/KRF/abilities.yml", "kingdom rush: frontiers")
towers_kro = get_abilities("./data/raw/KRO/abilities.yml", "kingdom rush: origins")
towers_krv = get_abilities("./data/raw/KRV/abilities/abilities.yml", "kingdom rush: vengeance")

towers2d = [towers_kr, towers_krf, towers_kro, towers_krv]
towers = [item for sublist in towers2d for item in sublist]
for i, tower in enumerate(towers):
    print(i, tower["towerName"])


data = { "data": towers}

with open("./data/generated/json/abilities.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)


