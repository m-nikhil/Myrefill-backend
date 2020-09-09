require('dotenv').config()

let entities = ["dist/**/*.entity.js"]
let migrations = [
  "dist/migrations/**/*.js"
]

if (process.env.TS_NODE) {
  entities = ["src/**/*.entity.ts"]
  migrations = [
    "src/migrations/**/*.ts"
  ]
}

module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": entities,
    "migrations": migrations,
    "cli": {
      "migrationsDir": "src/migrations"
    }
  }
]