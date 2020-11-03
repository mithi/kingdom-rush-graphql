import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "towerById: Be able to query by a level 4 artillery tower by id.\
 Build sequence and abilities must not be null.\
 Because it is not a barracks type tower, \
 numberOfUnits, respawnInterval, health and armor must be null."

const testQuery = gql`
    {
        towerById(id: 5) {
            abilities {
                abilityDescription
                abilityId
                abilityName
                kingdom
                levelCosts
                numberOfLevels
                totalAbilityCost
                totalCostWithTowers
                towerId
                towerImageUrl
                towerName
                towerType
            }

            allStats {
                armor
                buildCost
                damageMaximum
                damageMinimum
                fireInterval
                health
                id
                imageUrl
                kingdom
                level
                name
                numberOfUnits
                range
                respawnInterval
                towerType
            }
            buildSequence {
                buildSequenceId
                kingdom
                level1 {
                    buildCost
                    id
                    imageUrl
                    name
                }
                level2 {
                    buildCost
                    id
                    imageUrl
                    name
                }
                level3 {
                    buildCost
                    id
                    imageUrl
                    name
                }
                level4 {
                    buildCost
                    id
                    imageUrl
                    name
                }
                totalAbilitiesCost
                totalBuildCost
                totalBuildCostFullyUpgraded
                towerType
            }
        }
    }
`
export const result = () => {
    return `
    Object {
      "data": Object {
        "towerById": Object {
          "abilities": Array [
            Object {
              "abilityDescription": "creates a static field around the tower when attacking dealing explosive to all nearby enemies. every upgrade level increases the damage dealt by the field.",
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
            Object {
              "abilityDescription": "increases the maximum number of targets that the bolt arcs to. base is 3 targets. every upgrade level increase the number of maximum targets.",
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

const returnValue: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default returnValue
