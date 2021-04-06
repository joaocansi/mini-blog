module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "migrations": [ process.env.MIGRATIONS_PATH ],
  "entities": [ process.env.ENTITIES_PATH ],
  "cli": {
    "migrationsDir": "./src/shared/database/migrations"
  }
}