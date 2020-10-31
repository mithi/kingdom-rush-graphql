import { createConnection, getConnection, getRepository } from "typeorm"
import { Tower, MainStats, Ability, AbilityLevel } from "../src/models/"
import { TowerType, TowerLevel, TowerKingdom } from "../src/definitions/enums"

const DB_NAME = "empty_test"

const getExampleTower = (): Tower => {
    let t = new Tower()
    t.name = "dwarven bombard"
    t.kingdom = TowerKingdom.KR
    t.towerType = TowerType.ARTILLERY
    t.level = TowerLevel.LVL1
    return t
}

const getExampleMainStats = (): MainStats => {
    let m = new MainStats()
    m.buildCost = 125
    m.damageMinimum = 8
    m.damageMaximum = 15
    return m
}

const EXAMPLE_TOWER_DATA = {
    name: "Militia Barracks",
    towerType: TowerType.BARRACKS,
    level: TowerLevel.LVL1,
    kingdom: TowerKingdom.KR,
}

beforeAll(async () => {
    await createConnection("empty_test")
})

afterAll(async () => {
    await getConnection("empty_test").close()
})

const expectCount = async (entity: Function, expectedCount: number) => {
    const actualCount = await getRepository(entity, DB_NAME).count()
    expect(actualCount).toBe(expectedCount)
}

const getTowerRepo = () => getRepository(Tower, DB_NAME)

test("1. Be able to store, fetch, and remove a tower", async () => {
    /********************
     * Our example tower shouldn't exist yet in our empty test database
     ********************/
    let towers = await getTowerRepo().find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(towers.length).toBe(0)

    /********************
     * We should be able to successfully insert the tower increasing entry count of table by one
     ********************/
    await getTowerRepo().insert(EXAMPLE_TOWER_DATA)
    await expectCount(Tower, 1)

    /********************
     * We should able to find our inserted tower by name
     ********************/
    towers = await getTowerRepo().find({
        where: {
            name: EXAMPLE_TOWER_DATA.name,
        },
    })

    expect(towers.length).toBe(1)
    const tower = towers[0]
    expect(tower.name).toBe(EXAMPLE_TOWER_DATA.name)

    /********************
     * We should be able to remove the tower we inserted
     ********************/
    await getTowerRepo().remove(tower)
    await expectCount(Tower, 0)
})

test("2. Store a tower and add main stats deleting the tower would also delete main stats", async () => {
    /********************
     * Our example tower shouldn't exist in our empty database yet It is currently just in memory
     ********************/
    let exampleTower = getExampleTower()
    exampleTower.mainStats = getExampleMainStats()

    let towers = await getTowerRepo().find({
        where: {
            name: exampleTower.name,
        },
    })

    await expectCount(Tower, 0)
    expect(towers.length).toBe(0)

    /********************
     * Saving our tower should also save its main stats
     ********************/
    await getTowerRepo().save(exampleTower)
    await expectCount(Tower, 1)
    await expectCount(MainStats, 1)

    /********************
     * Querying the tower should also load its main stats with the expected column entries
     ********************/
    towers = await getTowerRepo().find({
        where: {
            name: exampleTower.name,
        },
        relations: ["mainStats"],
    })

    expect(towers.length).toBe(1)

    const tower = towers[0]
    expect(tower.name).toBe(tower.name)
    expect(tower.mainStats.buildCost).toBe(tower.mainStats.buildCost)

    /********************
     * Removing the tower should also remove its mainstats
     ********************/
    await getTowerRepo().remove(tower)
    await expectCount(Tower, 0)
    await expectCount(MainStats, 0)
})

test("3. Be able to store abilities and ability levels of a tower, deleting tower would remove ability and ability levels", async () => {
    /********************
     * We should start with an empty database
     ********************/
    await expectCount(Tower, 0)
    await expectCount(Ability, 0)
    await expectCount(AbilityLevel, 0)

    /********************
     * Saving a tower should also save its ability and ability levels
     ********************/
    let tower = getExampleTower()

    let a1 = new Ability()
    a1.name = "poison arrows"
    a1.description = "Poisons enemies"

    let lev1a1 = new AbilityLevel()
    lev1a1.level = 1
    lev1a1.cost = 250

    a1.levels = [lev1a1]

    let a2 = new Ability()
    a2.name = "poison arrow2s"
    a2.description = "Poisons enemies2"

    let lev1a2 = new AbilityLevel()
    lev1a2.level = 1
    lev1a2.cost = 175

    let lev2a2 = new AbilityLevel()
    lev2a2.level = 2
    lev2a2.cost = 200
    a2.levels = [lev1a2, lev2a2]

    tower.abilities = [a1, a2]

    await getTowerRepo().save(tower)

    await expectCount(Tower, 1)
    await expectCount(Ability, 2)
    await expectCount(AbilityLevel, 3)

    /********************
     * Querying the tower should also load its abilities
     ********************/
    let dbTowers = await getTowerRepo().find({
        where: {
            name: tower.name,
        },
        relations: ["abilities"],
    })

    expect(dbTowers.length).toBe(1)
    let dbTower = dbTowers[0]

    expect(dbTower.name).toBe(tower.name)
    expect(dbTower.abilities[0].name).toBe(a1.name)
    expect(dbTower.abilities[1].name).toBe(a2.name)

    /********************
     * Querying an ability should also load its levels
     ********************/

    const abilityRepo = getRepository(Ability, DB_NAME)

    let abilities = await abilityRepo.find({
        where: {
            name: a2.name,
        },
        relations: ["levels"],
    })

    expect(abilities[0].levels[0].cost).toBe(lev1a2.cost)
    expect(abilities[0].levels[1].cost).toBe(lev2a2.cost)

    /********************
     * Removing a tower should also remove its ability and ability levels
     ********************/
    await getTowerRepo().remove(dbTower)
    await expectCount(Tower, 0)
    await expectCount(Ability, 0)
    await expectCount(AbilityLevel, 0)
})
