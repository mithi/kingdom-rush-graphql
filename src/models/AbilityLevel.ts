import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    Unique,
} from "typeorm"
import { Ability } from "./Ability"

@Entity()
@Unique("UNIQUE_ability_level__ability_level", ["ability", "level"])
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
