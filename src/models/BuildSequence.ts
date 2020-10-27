import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm"
import { Tower } from "./Tower"

@Entity()
export class BuildSequence extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tower)
    @JoinColumn()
    level1: Tower

    @ManyToOne(() => Tower)
    @JoinColumn()
    level2: Tower

    @ManyToOne(() => Tower)
    @JoinColumn()
    level3: Tower

    @ManyToOne(() => Tower)
    @JoinColumn()
    level4: Tower
}
