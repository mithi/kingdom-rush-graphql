import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    Unique,
    OneToOne,
} from "typeorm"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"
import { ObjectType, Field, ID } from "type-graphql"
import { MainStats } from "./MainStats"
import { BarracksStats } from "./BarracksStats"
import { AttackStats } from "./AttackStats"

@ObjectType()
@Entity({ name: "Towers" })
@Unique("unique_tower", ["name", "kingdom"])
export class Tower extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string

    @Field(_ => TowerType)
    @Column({
        type: "enum",
        enum: TowerType,
    })
    towerType: TowerType

    @Field(_ => TowerLevel)
    @Column({
        type: "enum",
        enum: TowerLevel,
    })
    level: TowerLevel

    @Field(_ => TowerKingdom)
    @Column({
        type: "enum",
        enum: TowerKingdom,
    })
    kingdom: TowerKingdom

    // ALL towers have this
    @OneToOne(_type => MainStats, mainStats => mainStats.tower, { cascade: true })
    mainStats: MainStats

    // Only towers of towerType Barracks have this
    @OneToOne(_type => BarracksStats, barracksStats => barracksStats.tower, {
        cascade: true,
    })
    barracksStats: BarracksStats

    // Only towers that are NOT Barracks have this
    @OneToOne(_type => AttackStats, attackStats => attackStats.tower, { cascade: true })
    attackStats: AttackStats
}
