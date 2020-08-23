## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# start in bg and save logs
$ yarn start > log.txt 2>&1 &
```

## Dev database setup (require docker)

```bash
# start development database
$ yarn db:dev
```

## Migrations

```bash
# autogenerate migrations
$ yarn typeorm migration:generate -n {migration name}

# runs all pending migrations.
$ yarn typeorm migration:run
```

## Linting & Formatting

```bash
# lint
$ yarn lint

# format
$ yarn format
```