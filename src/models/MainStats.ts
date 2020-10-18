import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm"
import { Tower } from "./Tower"

@Entity()
export class MainStats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "real" })
    damageMinimum: number

    @Column({ type: "real" })
    damageMaximum: number

    @Column({ type: "real" })
    buildCost: number

    @OneToOne(_type => Tower, tower => tower.mainStats, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    tower: Tower
}
