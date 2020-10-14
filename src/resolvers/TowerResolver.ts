import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { Tower } from "../entity/Tower"
import { CreateTowerInput } from "../inputs/CreateTowerInput"

@Resolver()
export class TowerResolver {
    @Query(() => String)
    hello() {
        return "world"
    }

    @Query(() => [Tower])
    towers() {
        return Tower.find()
    }

    @Mutation(() => Tower)
    async createTower(@Arg("data") data: CreateTowerInput) {
        const tower = Tower.create(data)
        await tower.save()
        return tower
    }
}
