import { createConnection } from "typeorm"
import { TowerType, TowerLevel, TowerKingdom, Tower } from "./entity/Tower"

createConnection().then(async connection => {
    let tower = new Tower()
    tower.name = "Militia Barracks"
    tower.towerType = TowerType.BARRACKS
    tower.level = TowerLevel.LVL1
    tower.kingdom = TowerKingdom.KR
    tower.notes =
        " This tower spawns three militia which block and attack enemies. Militia are the most basic soldier available, merely civilians with very little training, armor, and weapons. However, with additional tower support, they can hold their own against even a much larger army. They can fall pretty quickly to Orcs, so it appears that they aren't as tough as the tower description says."

    await connection.manager.save(tower)
    console.log("Tower has been saved")

    let savedTowers = await connection.manager.find(Tower)
    console.log("All towers from the db: ", savedTowers)

    await connection
        .createQueryBuilder()
        .delete()
        .from(Tower)
        .where("id <= :id", { id: 20 })
        .execute()

    let savedTowers2 = await connection.manager.find(Tower)
    console.log("All towers from the db after deleting ", savedTowers2)
})
