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
export class MainStats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "real" })
    damageMinimum: number

    @Column({ type: "real" })
    damageMaximum: number

    @Column({ type: "real" })
    buildCost: number

    @Index("UNIQUE_INDEX_main_stats__tower_id", { unique: true })
    @OneToOne(_type => Tower, tower => tower.mainStats, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    tower: Tower
}
