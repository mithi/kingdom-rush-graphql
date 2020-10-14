import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { TowerType, TowerCategory, TowerKingdom, TowerLevel } from "../enums/TowerEnums"

@Entity({ name: "Towers" })
export class Tower extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    notes: string

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

    @Column({
        type: "enum",
        enum: TowerCategory,
        default: "basic",
    })
    towerCategory: TowerCategory
}
