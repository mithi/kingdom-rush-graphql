import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    Unique,
    JoinColumn,
    OneToOne,
} from "typeorm"
import { TowerType, TowerKingdom, TowerLevel } from "../enums/TowerEnums"
import { ObjectType, Field, ID } from "type-graphql"
import { MainStats } from "./MainStats"
import { BarracksStats } from "./BarracksStats"

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

    @OneToOne(_ => MainStats, { nullable: true })
    @JoinColumn()
    mainStats: MainStats

    @OneToOne(_ => BarracksStats, { nullable: true })
    @JoinColumn()
    barracksStats: BarracksStats
}
