import { gql } from "apollo-server"
import { DocumentNode } from "graphql"

const description =
    "attackTowers: Be able to get attack towers, sort by tower type then, sort by highest range first, then, sort by lowest fire interval first"

const testQuery = gql`
    {
        attackTowers(
            sortDefinition: [
                { column: towerType, sortOrder: ASCEND }
                { column: range, sortOrder: DESCEND }
                { column: fireInterval, sortOrder: ASCEND }
            ]
        ) {
            towerType
            range
            fireInterval
            name
        }
    }
`

const result = () => {
    return `
    Object {
      "data": Object {
        "attackTowers": Array [
          Object {
            "fireInterval": 1.5,
            "name": "golden longbows",
            "range": 600,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.5,
            "name": "musketeer garrison",
            "range": 470,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.4,
            "name": "rangers hideout",
            "range": 400,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.4,
            "name": "sentinel arbor",
            "range": 400,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "name": "shadow archers, 4",
            "range": 400,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "name": "arcane archers",
            "range": 400,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "name": "crossbow fort",
            "range": 396,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "name": "sharpshooter tower",
            "range": 360,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.5,
            "name": "sharpshooter tower",
            "range": 360,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "watcher arbor",
            "range": 360,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "name": "shadow archers, 3",
            "range": 360,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "name": "tribal axethrowers",
            "range": 358,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "name": "goblirangs, 3",
            "range": 350,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "name": "goblirangs, 4",
            "range": 350,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "name": "goblirangs, 1",
            "range": 350,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 1.4,
            "name": "goblirangs, 2",
            "range": 350,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "name": "shadow archers, 2",
            "range": 330,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "marksman tower",
            "range": 320,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "marksman tower",
            "range": 320,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "name": "hunter arbor",
            "range": 320,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "bone flingers, 2",
            "range": 300,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "bone flingers, 1",
            "range": 300,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "bone flingers, 4",
            "range": 300,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.6,
            "name": "bone flingers, 3",
            "range": 300,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.7,
            "name": "shadow archers, 1",
            "range": 300,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "name": "archer tower",
            "range": 280,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 0.8,
            "name": "archer tower",
            "range": 280,
            "towerType": "ARCHER",
          },
          Object {
            "fireInterval": 3.5,
            "name": "weirdwood",
            "range": 420,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 2.8,
            "name": "rocket riders, 4",
            "range": 390,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 1.7,
            "name": "arch-druid henge",
            "range": 380,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "menhir circle",
            "range": 380,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "rocket riders, 3",
            "range": 370,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwaarp",
            "range": 360,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven howitzer",
            "range": 360,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven howitzer",
            "range": 360,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3.5,
            "name": "500mm big bertha",
            "range": 360,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 1,
            "name": "battle-mecha t200",
            "range": 350,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "rocket riders, 2",
            "range": 350,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "boulder circle",
            "range": 340,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 2.2,
            "name": "tesla x104",
            "range": 330,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "rocket riders, 1",
            "range": 330,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven bombard",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven artillery",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven bombard",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "dwarven artillery",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "name": "melting furnace, 3",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "name": "melting furnace, 4",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "name": "melting furnace, 1",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 4,
            "name": "melting furnace, 2",
            "range": 320,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 3,
            "name": "stone circle",
            "range": 300,
            "towerType": "ARTILLERY",
          },
          Object {
            "fireInterval": 1.5,
            "name": "sorcerer mage",
            "range": 400,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2,
            "name": "arcane wizard",
            "range": 400,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1,
            "name": "necromancer tower",
            "range": 396,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "archmage tower",
            "range": 396,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "name": "orc shaman, 1",
            "range": 370,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "name": "orc shaman, 2",
            "range": 370,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "name": "orc shaman, 3",
            "range": 370,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 2.3,
            "name": "orc shaman, 4",
            "range": 370,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 0.3,
            "name": "wild magus",
            "range": 360,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "wizard tower",
            "range": 360,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "eldritch dais",
            "range": 360,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "wizard tower",
            "range": 360,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "high elven mage",
            "range": 360,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "name": "specters mausoleum, 1",
            "range": 350,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "name": "specters mausoleum, 2",
            "range": 350,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "name": "specters mausoleum, 4",
            "range": 350,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.45,
            "name": "specters mausoleum, 3",
            "range": 350,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "name": "infernal mage, 4",
            "range": 350,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "name": "infernal mage, 3",
            "range": 330,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "arcanist dais",
            "range": 320,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "adept tower",
            "range": 320,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "adept tower",
            "range": 320,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "name": "infernal mage, 2",
            "range": 315,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.8,
            "name": "infernal mage, 1",
            "range": 300,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "mage tower",
            "range": 280,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "mage tower",
            "range": 280,
            "towerType": "MAGE",
          },
          Object {
            "fireInterval": 1.5,
            "name": "mystic dais",
            "range": 280,
            "towerType": "MAGE",
          },
        ],
      },
      "errors": undefined,
      "extensions": undefined,
      "http": Object {
        "headers": Headers {
          Symbol(map): Object {},
        },
      },
    }
`
}

const testCase: [string, { testQuery: DocumentNode; result: Function }] = [
    description,
    { testQuery, result },
]

export default testCase
