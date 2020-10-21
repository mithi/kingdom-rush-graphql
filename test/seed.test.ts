import { createConnection, getConnection, getRepository } from "typeorm"
import {
    Tower,
    MainStats,
    BarracksStats,
    AttackStats,
    Ability,
    AbilityLevel,
} from "../src/models/"
import seed from "../src/seed"

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Seed() should populate distinct rows in the tables: Towers, main_stats, barracks_stats", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const MAIN_STATS_REPO = getRepository(MainStats, "test")
    const BARRACKS_STATS_REPO = getRepository(BarracksStats, "test")
    const ATTACK_STATS_REPO = getRepository(AttackStats, "test")
    const ABILITY_REPO = getRepository(Ability, "test")
    const ABILITY_LEVEL_REPO = getRepository(AbilityLevel, "test")

    await seed({ dbName: "test", verbose: false })

    const towerCountQueryResult = await TOWER_REPO.query(
        `SELECT COUNT(*) FROM (SELECT DISTINCT name, kingdom FROM "Towers") as kingdom`
    )
    const mainStatsCountQueryResult = await MAIN_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM main_stats`
    )

    const barracksCountQueryResult = await BARRACKS_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM barracks_stats`
    )

    const attackStatsCountQuery = await ATTACK_STATS_REPO.query(
        `SELECT COUNT(DISTINCT "towerId") FROM attack_stats`
    )

    const towerCount = Number(towerCountQueryResult[0].count)
    const mainStatsCount = Number(mainStatsCountQueryResult[0].count)
    const barracksStatsCount = Number(barracksCountQueryResult[0].count)
    const attackStatsCount = Number(attackStatsCountQuery[0].count)

    const abilitiesCount = await ABILITY_REPO.count()
    const abilitiesLevelCount = await ABILITY_LEVEL_REPO.count()
    expect(abilitiesCount).not.toBe(0)
    expect(abilitiesLevelCount).not.toBe(0)

    expect(attackStatsCount).toBe(await ATTACK_STATS_REPO.count())

    expect(towerCount).toBe(104)
    expect(mainStatsCount).toBe(104)
    expect(barracksStatsCount).toBe(27)
    expect(attackStatsCount).toBe(77)

    // reseeding shouldn't change the rows
    // because the table wouldn't allow for duplication
    await seed({ dbName: "test", verbose: false })
    expect(towerCount).toBe(await TOWER_REPO.count())
    expect(mainStatsCount).toBe(await MAIN_STATS_REPO.count())
    expect(barracksStatsCount).toBe(await BARRACKS_STATS_REPO.count())
    expect(attackStatsCount).toBe(await ATTACK_STATS_REPO.count())
    expect(abilitiesCount).toBe(await ABILITY_REPO.count())
    expect(abilitiesLevelCount).toBe(await ABILITY_LEVEL_REPO.count())
})
