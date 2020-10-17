import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
