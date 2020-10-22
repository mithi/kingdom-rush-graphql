import { Resolver, Query } from "type-graphql"
import { Tower } from "../models/Tower"

@Resolver()
export class TowerResolver {
    @Query(() => [Tower])
    towers() {
        return Tower.find()
    }
}
