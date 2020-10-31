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

test("1. After populating Towers and MainStats, they should have the expected number of entries", async () => {
    let towerCount = await getRepository(Tower, DB_NAME).count()
    let mainStatsCount = await getRepository(MainStats, DB_NAME).count()
    expect(towerCount).toBe(0)
    expect(mainStatsCount).toBe(0)

    await populateTowers({ dbName: DB_NAME, verbose: false })
    towerCount = await getRepository(Tower, DB_NAME).count()
    mainStatsCount = await getRepository(MainStats, DB_NAME).count()
    expect(towerCount).toBe(104)
    expect(mainStatsCount).toBe(104)
})

test("2. After populating BarracksStats and AttackStats, they should have the expected number of entries", async () => {
    let barracksCount = await getRepository(BarracksStats, DB_NAME).count()
    let attackCount = await getRepository(AttackStats, DB_NAME).count()

    expect(barracksCount).toBe(0)
    expect(attackCount).toBe(0)

    await populateBarracksStats({ dbName: DB_NAME, verbose: false })
    await populateAttackStats({ dbName: DB_NAME, verbose: false })

    barracksCount = await getRepository(BarracksStats, DB_NAME).count()
    attackCount = await getRepository(AttackStats, DB_NAME).count()
    expect(barracksCount).toBe(27)
    expect(attackCount).toBe(77)
})

test("3. After populating abilities and ability levels, they should have the expected number of entries", async () => {
    let abilityCount = await getRepository(Ability, DB_NAME).count()
    let abilityLevelCount = await getRepository(AbilityLevel, DB_NAME).count()
    expect(abilityCount).toBe(0)
    expect(abilityLevelCount).toBe(0)

    await populateAbilities({ dbName: DB_NAME, verbose: false })

    abilityCount = await getRepository(Ability, DB_NAME).count()
    abilityLevelCount = await getRepository(AbilityLevel, DB_NAME).count()
    expect(abilityCount).toBe(87)
    expect(abilityLevelCount).toBe(228)
})

test("4. After populating build sequences, they should have the expected number of entries", async () => {
    let buildSequenceCount = await getRepository(BuildSequence, DB_NAME).count()
    expect(buildSequenceCount).toBe(0)

    await populateBuildSequence({ dbName: DB_NAME, verbose: false })

    buildSequenceCount = await getRepository(BuildSequence, DB_NAME).count()
    expect(buildSequenceCount).toBe(35)
})
