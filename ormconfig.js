require("dotenv").config()
module.exports = [
    {
        name: "default",
        type: "postgres",
        url: `${process.env.DATABASE_URL}`,
        entities: ["dist/models/*.js"],
        logging: false,
        synchronize: false,
        dropSchema: false,
        migrations: ["dist/migrations/*.js"],
        cli: {
            migrationsDir: "src/migrations",
        },
    },
    {
        name: "test",
        type: "postgres",
        url: `${process.env.DB_TEST_URL}`,
        entities: ["src/models/*.ts"],
        logging: false,
        synchronize: false,
        dropSchema: false,
        migrations: ["src/migrations/*.ts"],
        cli: {
            migrationsDir: "src/migrations",
        },
    },
    {
        name: "empty_test",
        type: "postgres",
        url: `${process.env.DB_EMPTY_TEST_URL}`,
        entities: ["src/models/*.ts"],
        logging: false,
        synchronize: true,
        dropSchema: true,
    },
]
