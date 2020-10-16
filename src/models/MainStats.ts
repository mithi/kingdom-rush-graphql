import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
