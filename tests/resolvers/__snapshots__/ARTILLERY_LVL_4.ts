const result = () => {
    return `
    Object {
      "data": Object {
        "towerById": Object {
          "abilities": Array [
            Object {
              "abilityDescription": "increases the maximum number of targets that the bolt arcs to. base is 3 targets. Every upgrade level increase the number of maximum targets.",
              "abilityId": 18,
              "abilityName": "supercharged bolt",
              "kingdom": "KR",
              "levelCosts": Array [
                250,
                250,
              ],
              "numberOfLevels": 2,
              "totalAbilityCost": 500,
              "totalCostWithTowers": 1540,
              "towerId": 5,
              "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-tesla-x104-4b.png",
              "towerName": "tesla x104",
              "towerType": "ARTILLERY",
            },
            Object {
              "abilityDescription": "creates a static field around the tower when attacking dealing explosive to all nearby enemies. Every upgrade level increases the damage dealt by the field.",
              "abilityId": 17,
              "abilityName": "overcharge",
              "kingdom": "KR",
              "levelCosts": Array [
                250,
                125,
                125,
              ],
              "numberOfLevels": 3,
              "totalAbilityCost": 500,
              "totalCostWithTowers": 1540,
              "towerId": 5,
              "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-tesla-x104-4b.png",
              "towerName": "tesla x104",
              "towerType": "ARTILLERY",
            },
          ],
          "allStats": Object {
            "armor": null,
            "buildCost": 375,
            "damageMaximum": 110,
            "damageMinimum": 60,
            "fireInterval": 2.2,
            "health": null,
            "id": 5,
            "imageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-tesla-x104-4b.png",
            "kingdom": "KR",
            "level": "LVL4",
            "name": "tesla x104",
            "numberOfUnits": null,
            "range": 330,
            "respawnInterval": null,
            "towerType": "ARTILLERY",
          },
          "buildSequence": Object {
            "buildSequenceId": 2,
            "kingdom": "KR",
            "level1": Object {
              "buildCost": 125,
              "id": 1,
              "imageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-1-dwarven-bombard.png",
              "name": "dwarven bombard",
            },
            "level2": Object {
              "buildCost": 220,
              "id": 2,
              "imageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-2-dwarven-artillery.png",
              "name": "dwarven artillery",
            },
            "level3": Object {
              "buildCost": 320,
              "id": 3,
              "imageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-3-dwarven-howitzer.png",
              "name": "dwarven howitzer",
            },
            "level4": Object {
              "buildCost": 375,
              "id": 5,
              "imageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-tesla-x104-4b.png",
              "name": "tesla x104",
            },
            "totalAbilitiesCost": 1000,
            "totalBuildCost": 1040,
            "totalBuildCostFullyUpgraded": 2040,
            "towerType": "ARTILLERY",
          },
        },
      },
      "errors": undefined,
      "extensions": undefined,
      "http": Object {
        "headers": Headers {
          Symbol(map): Object {},
        },
      },
    }
`
}

export default result
