import { createConnection, getConnection, getRepository } from "typeorm"
import {
    Tower,
    MainStats,
    BarracksStats,
    AttackStats,
    Ability,
    AbilityLevel,
} from "../src/models/"
import populateAttackStats from "../src/seed/AttackStats"
import populateBarracksStats from "../src/seed/BarracksStats"
import { populateTowers, populateAbilities } from "../src/seed/Tower"

beforeEach(async () => {
    await createConnection("test")
})

afterEach(async () => {
    await getConnection("test").close()
})

test("1. After populating Towers and MainStats, they should have the expected number of entries", async () => {
    let towerCount = await getRepository(Tower, "test").count()
    let mainStatsCount = await getRepository(MainStats, "test").count()
    expect(towerCount).toBe(0)
    expect(mainStatsCount).toBe(0)

    await populateTowers({ dbName: "test", verbose: false })
    towerCount = await getRepository(Tower, "test").count()
    mainStatsCount = await getRepository(MainStats, "test").count()
    expect(towerCount).toBe(104)
    expect(mainStatsCount).toBe(104)
})

test("2. After populating BarracksStats and AttackStats, they should have the expected number of entries", async () => {
    let barracksCount = await getRepository(BarracksStats, "test").count()
    let attackCount = await getRepository(AttackStats, "test").count()

    expect(barracksCount).toBe(0)
    expect(attackCount).toBe(0)

    await populateTowers({ dbName: "test", verbose: false })
    await populateBarracksStats({ dbName: "test", verbose: false })
    await populateAttackStats({ dbName: "test", verbose: false })

    barracksCount = await getRepository(BarracksStats, "test").count()
    attackCount = await getRepository(AttackStats, "test").count()
    expect(barracksCount).toBe(27)
    expect(attackCount).toBe(77)
})

test("3. After populating abilities and ability levels, they should have the expected number of entries", async () => {
    let abilityCount = await getRepository(Ability, "test").count()
    let abilityLevelCount = await getRepository(AbilityLevel, "test").count()
    expect(abilityCount).toBe(0)
    expect(abilityLevelCount).toBe(0)

    await populateTowers({ dbName: "test", verbose: false })
    await populateAbilities({ dbName: "test", verbose: false })

    abilityCount = await getRepository(Ability, "test").count()
    abilityLevelCount = await getRepository(AbilityLevel, "test").count()
    expect(abilityCount).toBe(87)
    expect(abilityLevelCount).toBe(228)
})