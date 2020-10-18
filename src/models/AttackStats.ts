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
export class AttackStats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "real", comment: "Number of seconds between each attack" })
    fireInterval: number

    @Column({ type: "real" })
    range: number

    @OneToOne(_type => Tower, tower => tower.attackStats, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    tower: Tower
}
