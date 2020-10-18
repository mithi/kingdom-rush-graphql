import populateAttackStats from "./AttackStats"
import populateBarracksStats from "./BarracksStats"
import { populateTowers, populateMainStats } from "./Tower"

const seed = async ({ dbName = "default", verbose=true } = {}) => {
    await populateTowers({ dbName, verbose})
    await populateMainStats({ dbName, verbose })
    await populateBarracksStats({ dbName, verbose})
    await populateAttackStats({ dbName, verbose})
}
export default seed
