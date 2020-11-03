import { createConnection, getConnection } from "typeorm"
import ABILITY_CASES from "./__CASES__/ability/"
import BUILD_SEQUENCE_CASES from "./__CASES__/buildSequence"
import { executeTest } from "./utils"
import TOWER_CASES from "./__CASES__/tower"

const CASES = [...ABILITY_CASES, ...BUILD_SEQUENCE_CASES, ...TOWER_CASES]
beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test.each(CASES)("%s", async (_description, { testQuery, result }) => {
    await executeTest(testQuery, result())
})
