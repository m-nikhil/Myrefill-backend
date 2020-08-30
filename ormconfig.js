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
    "entities": ["dist/**/*.entity.js"],
    "migrations": [
        "dist/migrations/**/*.js"
      ],
      "cli": {
        "migrationsDir": "src/migrations"
      }
  }
]