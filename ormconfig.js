require("dotenv").config()
module.exports = [
    {
        name: "default",
        type: "postgres",
        url: `${process.env.DB_DEFAULT_URL}`,
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
        url: `${process.env.DB_TEST_URL}`,
        name: "test",
        type: "postgres",
        entities: ["src/models/*.ts"],
        logging: false,
        synchronize: true,
        dropSchema: true,
    },
]
