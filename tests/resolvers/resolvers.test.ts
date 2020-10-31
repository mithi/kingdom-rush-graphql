import { createConnection, getConnection } from "typeorm"
import sAcase1 from "./__CASES__/singleAbility/case1"
import sTcase1 from "./__CASES__/singleTower/case1"
import { executeTest } from "./utils"
import VARIOUS_CASES from "./__CASES__/various"

const CASES = [sTcase1, sAcase1, ...VARIOUS_CASES]
beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test.each(CASES)("%s", async (_description, { testQuery, result }) => {
    await executeTest(testQuery, result())
})
