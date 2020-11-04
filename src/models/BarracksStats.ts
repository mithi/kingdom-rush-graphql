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
export class BarracksStats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    numberOfUnits: number

    @Column({ type: "real", comment: "The number of seconds to respawn units" })
    respawnInterval: number

    @Column({ type: "real" })
    health: number

    @Column({
        type: "real",
        comment:
            "The amount of resistance against physical attacks in percent. \
             An armor of 20 means the effective damage done to your unit will be reduced by 20 percent.",
    })
    armor: number

    @Index("UNIQUE_INDEX_barracks_stats__tower_id", { unique: true })
    @OneToOne(_type => Tower, tower => tower.barracksStats, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    tower: Tower
}
