import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Feedback } from 'src/entities/feedback.entity';
import { QueryRunner } from 'typeorm';
import { FeedbackListOption } from './dto/request/feedbackListOption.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

/**
 * FeedbackService has the CRUD operation for the complaint entity.
 */
@Injectable()
export class FeedbackService extends CRUDService<Feedback, FeedbackListOption> {
  Entity = Feedback;

  queryAllWithTranscationDetails = async (
    queryRunner: QueryRunner,
    listOption?: FeedbackListOption,
  ): Promise<Feedback[]> => {
    let query = queryRunner.manager
      .createQueryBuilder(this.Entity, 'feedback')
      .leftJoinAndSelect('feedback.transaction', 'transaction')
      .select()
      .withDeleted();

    if (listOption.stationId) {
      query = query.where('transaction.stationId = :stationId', {
        stationId: listOption.stationId,
      });
    }

    if (listOption.userId) {
      query = query.andWhere('transaction.userId = :userId', {
        userId: listOption.userId,
      });
    }

    const result = await query.getMany();

    if (result.length == 0) {
      throw new EntityNotFoundError(this.Entity, null);
    }
    return result;
  };
}
