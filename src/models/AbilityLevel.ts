import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm"
import { Ability } from "./Ability"

@Entity()
export class AbilityLevel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    level: number

    @Column()
    cost: number

    @ManyToOne(_type => Ability, ability => ability.levels, {
        onDelete: "CASCADE",
        nullable: false,
    })
    @JoinColumn()
    ability: Ability
}
