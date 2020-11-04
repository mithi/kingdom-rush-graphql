import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BaseEntity,
    Index,
} from "typeorm"
import { Tower } from "./Tower"

@Entity()
@Index("UNIQUE_INDEX_attack_stats__tower_id", ["tower"], { unique: true })
export class AttackStats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "real", comment: "Number of seconds between each attack" })
    fireInterval: number

    @Column({ type: "real" })
    range: number

    // Tower is unique and indexed
    @OneToOne(_type => Tower, tower => tower.attackStats, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    tower: Tower
}
