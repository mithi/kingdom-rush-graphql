import { InputType, Field } from "type-graphql"
import { TowerType, TowerKingdom, TowerLevel, TowerCategory } from "../enums/TowerEnums"

@InputType()
export class CreateTowerInput {
    @Field()
    name: string

    @Field()
    notes: string

    @Field(_ => TowerType)
    towerType: TowerType

    @Field(_ => TowerLevel)
    level: TowerLevel

    @Field(_ => TowerKingdom)
    kingdom: TowerKingdom

    @Field(_ => TowerCategory, { nullable: true })
    towerCategory: TowerCategory
}
