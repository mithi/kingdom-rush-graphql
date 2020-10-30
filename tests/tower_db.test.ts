import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower, MainStats, Ability, AbilityLevel } from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/definitions/enums"

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

const EXAMPLE_TOWER_DATA = {
    name: "Militia Barracks",
    towerType: TowerType.BARRACKS,
    level: TowerLevel.LVL1,
    kingdom: TowerKingdom.KR,
}

beforeAll(async () => {
    await createConnection("test")
})

afterAll(async () => {
    await getConnection("test").close()
})

test("Be able to store, fetch, and remove a tower", async () => {
    const TOWER_REPO = getRepository(Tower, "test")

    let retrievedTowers = await TOWER_REPO.find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(retrievedTowers.length).toBe(0)

    await TOWER_REPO.insert(EXAMPLE_TOWER_DATA)
    expect(await TOWER_REPO.count()).toBe(1)

    retrievedTowers = await TOWER_REPO.find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(retrievedTowers.length).toBe(1)

    const retrievedTower = retrievedTowers[0]
    expect(retrievedTower.name).toBe(EXAMPLE_TOWER_DATA.name)

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
    expect(await TOWER_REPO.count()).toBe(1)
    expect(await MAIN_STATS_REPO.count()).toBe(1)

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

test("Be able to store abilities and ability levels of a tower, deleting tower would remove ability and ability levels", async () => {
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

    expect(await TOWER_REPO.count()).toBe(1)
    expect(await ABILITY_REPO.count()).toBe(1)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(1)

    await TOWER_REPO.remove(retrievedTower)
    expect(await TOWER_REPO.count()).toBe(0)
    expect(await ABILITY_REPO.count()).toBe(0)
    expect(await ABILITY_LEVEL_REPO.count()).toBe(0)
})
