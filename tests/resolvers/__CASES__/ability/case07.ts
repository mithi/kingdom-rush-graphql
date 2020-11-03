import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilitiesByTowerName: When tower name exists and has abilities"
const testQuery = gql`
    {
        abilitiesByTowerName(name: "high elven mage") {
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
        "abilitiesByTowerName": Array [
          Object {
            "abilityDescription": "Phases enemies out of the battlefield for 5 seconds, dealing magical damage. Every upgrade level increases maximum number of targets and damage dealt.",
            "abilityId": 49,
            "abilityName": "Timelapse",
            "kingdom": "KRO",
            "levelCosts": Array [
              225,
              225,
              225,
            ],
            "numberOfLevels": 3,
            "totalAbilityCost": 675,
            "totalCostWithTowers": 1485,
            "towerId": 30,
            "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-magic-4a-high-elven-mage.png",
            "towerName": "high elven mage",
            "towerType": "MAGE",
          },
          Object {
            "abilityDescription": "Summons magic sentinels that seek and attack nearby enemies at long range. Every upgrade level increases damage per bolt and the number of sentinels.",
            "abilityId": 50,
            "abilityName": "Arcane Sentinel",
            "kingdom": "KRO",
            "levelCosts": Array [
              300,
              300,
            ],
            "numberOfLevels": 2,
            "totalAbilityCost": 600,
            "totalCostWithTowers": 1410,
            "towerId": 30,
            "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-magic-4a-high-elven-mage.png",
            "towerName": "high elven mage",
            "towerType": "MAGE",
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
