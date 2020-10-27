import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    Unique,
    OneToOne,
} from "typeorm"
import { TowerType, TowerKingdom, TowerLevel } from "../definitions/TowerEnums"
import { MainStats } from "./MainStats"
import { BarracksStats } from "./BarracksStats"
import { AttackStats } from "./AttackStats"
import { Ability } from "./Ability"

@Entity({ name: "Towers" })
@Unique("unique_tower", ["name", "kingdom"])
export class Tower extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    imageUrl: string

    @Column({
        type: "enum",
        enum: TowerType,
    })
    towerType: TowerType

    @Column({
        type: "enum",
        enum: TowerLevel,
    })
    level: TowerLevel

    @Column({
        type: "enum",
        enum: TowerKingdom,
    })
    kingdom: TowerKingdom

    // ALL towers have this
    @OneToMany(_type => Ability, ability => ability.tower, { cascade: true })
    abilities: Ability[]

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
