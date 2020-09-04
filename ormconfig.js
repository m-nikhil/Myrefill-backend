require('dotenv').config()

module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "myrefill",
    "entities": ["src/**/*.entity.ts"],
    "migrations": [
        "src/migrations/**/*.ts"
      ],
      "cli": {
        "migrationsDir": "src/migrations"
      }
  }
]