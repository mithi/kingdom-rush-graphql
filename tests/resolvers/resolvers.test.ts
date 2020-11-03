import { createConnection, getConnection } from "typeorm"
import ABILITY_CASES from "./__CASES__/ability/"
import BUILD_SEQUENCE_CASES from "./__CASES__/buildSequence"
import sTcase1 from "./__CASES__/singleTower/case01"
import { executeTest } from "./utils"
import VARIOUS_CASES from "./__CASES__/various"

const CASES = [sTcase1, ...ABILITY_CASES, ...BUILD_SEQUENCE_CASES, ...VARIOUS_CASES]
beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test.each(CASES)("%s", async (_description, { testQuery, result }) => {
    await executeTest(testQuery, result())
})
