import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilitiesByTowerId: When tower id exists and has abilities"
const testQuery = gql`
    {
        abilitiesByTowerId(id: 9) {
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
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "abilitiesByTowerId": Array [
          Object {
            "abilityDescription": "sends an automated mining drill towards an enemy, reducing it to a mound of gibs. every upgrade level decreases cooldown.",
            "abilityId": 33,
            "abilityName": "core drill",
            "kingdom": "KRF",
            "levelCosts": Array [
              400,
              200,
              200,
            ],
            "numberOfLevels": 3,
            "totalAbilityCost": 800,
            "totalCostWithTowers": 1865,
            "towerId": 9,
            "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-artillery-4b-dwaarp.png",
            "towerName": "dwaarp",
            "towerType": "ARTILLERY",
          },
          Object {
            "abilityDescription": "burns all enemies in close range over 4 seconds. every upgrade level increases maximum damage and damage per second",
            "abilityId": 34,
            "abilityName": "furnace blast",
            "kingdom": "KRF",
            "levelCosts": Array [
              300,
              250,
              250,
            ],
            "numberOfLevels": 3,
            "totalAbilityCost": 800,
            "totalCostWithTowers": 1865,
            "towerId": 9,
            "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-artillery-4b-dwaarp.png",
            "towerName": "dwaarp",
            "towerType": "ARTILLERY",
          },
        ],
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

const testCase: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default testCase
