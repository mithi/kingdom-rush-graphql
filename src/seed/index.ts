import populateAttackStats from "./AttackStats"
import populateBarracksStats from "./BarracksStats"
import { populateTowers, populateMainStats } from "./Tower"

const seed = async () => {
    await populateTowers()
    await populateMainStats()
    await populateBarracksStats()
    await populateAttackStats()
}
export default seed
