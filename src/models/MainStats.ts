import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Tower } from "./Tower"

@Entity()
export class MainStats {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "real" })
    damageMinimum: number

    @Column({ type: "real" })
    damageMaximum: number

    @Column({ type: "real" })
    buildCost: number

    @OneToOne(_ => Tower, tower => tower.mainStats, { onDelete: "CASCADE" })
    @JoinColumn()
    tower: Tower
}
