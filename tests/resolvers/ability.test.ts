import { createConnection, getConnection } from "typeorm"
import { gql } from "apollo-server"
import ABILITY_BY_ID_RESULT from "./__snapshots__/ABILITY_BY_ID"
import { executeTest } from "./utils"

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test("1. Be able to get ability data by its id", async () => {
    const testQuery = gql`
        {
            abilityById(id: 85) {
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
    await executeTest(testQuery, ABILITY_BY_ID_RESULT())
})
