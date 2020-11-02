import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description = "abilityByName: When ability name exists"
const testQuery = gql`
    {
        abilityByName(name: "Biggarangs") {
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
        "abilityByName": Object {
          "abilityDescription": "Throws a massive boomerang which deals damage in an area of 70. In upgrade level increases the damage dealt.",
          "abilityId": 76,
          "abilityName": "Biggarangs",
          "kingdom": "KRV",
          "levelCosts": Array [
            200,
            100,
            100,
          ],
          "numberOfLevels": 3,
          "totalAbilityCost": 400,
          "totalCostWithTowers": 1100,
          "towerId": 68,
          "towerImageUrl": "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krv-goblirangs-4.png",
          "towerName": "goblirangs, 4",
          "towerType": "ARCHER",
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

const testCase: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default testCase
