import {
  createConnection,
  getConnection,
  QueryRunner,
  Connection,
} from 'typeorm';

export async function setupConnection(entities): Promise<QueryRunner> {
  await createConnection({
    type: 'postgres',
    synchronize: true,
    logging: false,
    url: 'postgres://postgres:mysecretpassword@localhost:5433/authserver',
    entities: entities,
  });

  const connection: Connection = await getConnection('default');
  const queryRunner: QueryRunner = await connection.createQueryRunner();

  await queryRunner.connect();

  return queryRunner;
}

export async function teardownConnection(queryRunner: QueryRunner) {
  await queryRunner.release();
  const connection: Connection = getConnection();
  await connection.close();
}
