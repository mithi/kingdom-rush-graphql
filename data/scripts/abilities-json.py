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
                "abilityName": ability["name"],
                "description": ability["description"],
                "levels": cleaned_levels
            })

        tower_abilities = {
            "towerName": tower["name"],
            "kingdom": kingdom,
            "abilities":cleaned_abilities
        }

        towers.append(tower_abilities)

    return towers

towers_kr = get_abilities("../KR/abilities.yml", "kingdom rush")
towers_krf = get_abilities("../KRF/abilities.yml", "kingdom rush: frontiers")
towers_kro = get_abilities("../KRO/abilities.yml", "kingdom rush: origin")
towers_krv = get_abilities("../KRV/abilities.yml", "kingdom rush: origin")

towers2d = [towers_kr, towers_krf, towers_kro, towers_krv]
towers = [item for sublist in towers2d for item in sublist]
for i, tower in enumerate(towers):
    print(i, tower["towerName"])


data = { "data": towers}

with open("../generated/abilities.json", 'w') as fout:
    json_dumps_str = json.dumps(data, indent=4)
    print(json_dumps_str, file=fout)


