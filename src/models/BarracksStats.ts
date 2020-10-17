import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Tower } from "./Tower"

@Entity()
export class BarracksStats {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    numberOfUnits: number

    @Column({ type: "real" })
    respawnInterval: number

    @Column({ type: "real" })
    health: number

    @Column({ type: "real" })
    armor: number

    @OneToOne(_ => Tower, tower => tower.barracksStats, {
        onDelete: "CASCADE",
    })
    barracksStats: BarracksStats
}
