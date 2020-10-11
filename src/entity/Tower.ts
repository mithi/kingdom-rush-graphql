import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

export enum TowerType {
    ARCHER = "archer",
    BARRACKS = "barracks",
    MAGE = "mage",
    ARTILLERY = "artillery",
}

export enum TowerCategory {
    SPECIAL = "special",
    BASIC = "basic",
}

export enum TowerLevel {
    LVL1 = 1,
    LVL2 = 2,
    LVL3 = 3,
    LVL4 = 4,
}

export enum TowerKingdom {
    KR = "kingdom rush",
    KRF = "kingdom rush: frontiers",
    KRO = "kingdom rush: origin",
    KRV = "kingdom rush: vengeance",
}

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
