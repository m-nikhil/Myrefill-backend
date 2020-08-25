import { QueryRunner, Connection } from 'typeorm';

export async function atomic(
  connection: Connection,
  task: Function,
  ...args: any[]
) {
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  let result: any;
  try {
    result = await task(queryRunner, ...args);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }
  finally {
    await queryRunner.release();
  }

  return result;
}
