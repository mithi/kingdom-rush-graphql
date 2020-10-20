import { createConnection, getConnection, getRepository } from "typeorm"
import {
    Tower,
    MainStats,
    BarracksStats,
    AttackStats,
    Ability,
    AbilityLevel,
} from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/enums/TowerEnums"
import seed from "../src/seed"

const getExampleTower = (): Tower => {
    let tower = new Tower()
    tower.name = "dwarven bombard"
    tower.kingdom = TowerKingdom.KR
    tower.towerType = TowerType.ARTILLERY
    tower.level = TowerLevel.LVL1
    return tower
}

const getExampleMainStats = (): MainStats => {
    let mainStats = new MainStats()
    mainStats.buildCost = 125
    mainStats.damageMinimum = 8
    mainStats.damageMaximum = 15
    return mainStats
}

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Store tower and fetch it", async () => {
    const TOWER_REPO = getRepository(Tower, "test")

    const exampleTowerData = {
        name: "Militia Barracks",
        towerType: TowerType.BARRACKS,
        level: TowerLevel.LVL1,
        kingdom: TowerKingdom.KR,
    }

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: exampleTowerData.name,
        },
    })

    expect(retrievedTowers.length).toBe(0)

    await TOWER_REPO.insert(exampleTowerData)
    retrievedTowers = await TOWER_REPO.find({
        where: {
            name: exampleTowerData.name,
        },
    })

    expect(retrievedTowers.length).toBe(1)

    const retrievedTower = retrievedTowers[0]
    expect(retrievedTower.name).toBe(exampleTowerData.name)

    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
})

test("Store a tower and add main stats, deleting the tower would also delete main stats", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const MAIN_STATS_REPO = getRepository(MainStats, "test")

    let tower = getExampleTower()
    let mainStats = getExampleMainStats()
    tower.mainStats = mainStats

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
    })

    expect(retrievedTowers.length).toBe(0)

    await TOWER_REPO.save(tower)

    retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
        relations: ["mainStats"],
    })

    expect(retrievedTowers.length).toBe(1)

    const retrievedTower = retrievedTowers[0]
    expect(retrievedTower.name).toBe(tower.name)
    expect(retrievedTower.mainStats.buildCost).toBe(tower.mainStats.buildCost)

    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await MAIN_STATS_REPO.count()).toBe(0)
})

test("Be able to store abilities and ability levels of a tower", async () => {
    const TOWER_REPO = getRepository(Tower, "test")
    const ABILITY_REPO = getRepository(Ability, "test")
    const ABILITY_LEVEL_REPO = getRepository(AbilityLevel, "test")

    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)

    let tower = getExampleTower()

    let ability1 = new Ability()
    ability1.name = "poison arrows"
    ability1.description =
        "Poisons anemies, causing them to take True damage over a three of seconds. Effects does not stack. True damage ignores any armore or magic resistance that an enemy has. Every upgrade level increases the damage dealt per second."

    let ability1level1 = new AbilityLevel()
    ability1level1.level = 1
    ability1level1.cost = 250
    ability1.levels = [ability1level1]
    tower.abilities = [ability1]

    await TOWER_REPO.save(tower)

    expect(await TOWER_REPO.count()).toBe(1)
    expect(await ABILITY_REPO.count()).toBe(1)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(1)

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: tower.name,
        },
        relations: ["abilities"],
    })

    expect(retrievedTowers.length).toBe(1)

    let retrievedTower = retrievedTowers[0]
    let abilities = await ABILITY_REPO.find({
        where: {
            name: retrievedTower.abilities[0].name,
        },
        relations: ["levels"],
    })

    expect(retrievedTower.name).toBe(tower.name)
    expect(retrievedTower.abilities[0].name).toBe(ability1.name)
    expect(abilities[0].levels[0].cost).toBe(250)

    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)
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
