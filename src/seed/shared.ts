type KingdomType =
    | "kingdom rush: vengeance"
    | "kingdom rush: origins"
    | "kingdom rush"
    | "kingdom rush: frontiers"

type TowerData = {
    name: string
    kingdom: KingdomType
    level: 1 | 2 | 3 | 4
    towerType: "magic" | "artillery" | "ranged" | "barracks"
    buildCost: number
    damage: {
        minimum: number
        maximum: number
    }
}

function logError(error: any) {
    if ("name" in error && "message" in error && "detail" in error) {
        console.log("ERROR START")
        console.log("ErrorName:", error.name)
        console.log("ErrorMessage:", error.message)
        console.log("ErrorDetails:", error.detail)
        console.log("ERROR END")
    }
}

const JSON_DATA_PATH = "../../data/generated/json"
export { TowerData, KingdomType, logError, JSON_DATA_PATH }
