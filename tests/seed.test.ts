import { createConnection, getConnection, getRepository } from "typeorm"
import {
    Tower,
    MainStats,
    BarracksStats,
    AttackStats,
    Ability,
    AbilityLevel,
} from "../src/models/"
import { BuildSequence } from "../src/models/BuildSequence"
import populateAttackStats from "../src/seed/AttackStats"
import populateBarracksStats from "../src/seed/BarracksStats"
import { populateTowers, populateAbilities } from "../src/seed/Tower"
import populateBuildSequence from "../src/seed/BuildSequence"

const DB_NAME = "empty_test"

beforeAll(async () => {
    await createConnection(DB_NAME)
})

afterAll(async () => {
    await getConnection(DB_NAME).close()
})

const expectCount = async (entity: Function, expectedCount: number) => {
    const actualCount = await getRepository(entity, DB_NAME).count()
    expect(actualCount).toBe(expectedCount)
}

test("1. After populating Towers and MainStats, they should have the expected number of entries", async () => {
    await expectCount(Tower, 0)
    await expectCount(MainStats, 0)

    await populateTowers({ dbName: DB_NAME, verbose: false })
    await expectCount(Tower, 104)
    await expectCount(MainStats, 104)
})

test("2. After populating BarracksStats and AttackStats, they should have the expected number of entries", async () => {
    await expectCount(BarracksStats, 0)
    await expectCount(AttackStats, 0)

    await populateBarracksStats({ dbName: DB_NAME, verbose: false })
    await populateAttackStats({ dbName: DB_NAME, verbose: false })

    await expectCount(BarracksStats, 27)
    await expectCount(AttackStats, 77)
})

test("3. After populating abilities and ability levels, they should have the expected number of entries", async () => {
    await expectCount(Ability, 0)
    await expectCount(AbilityLevel, 0)

    await populateAbilities({ dbName: DB_NAME, verbose: false })

    await expectCount(Ability, 87)
    await expectCount(AbilityLevel, 228)
})

test("4. After populating build sequences, it should have the expected number of entries", async () => {
    await expectCount(BuildSequence, 0)
    await populateBuildSequence({ dbName: DB_NAME, verbose: false })
    await expectCount(BuildSequence, 35)
})
