module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'myrefill',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
  },
];
