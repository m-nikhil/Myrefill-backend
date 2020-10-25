import { ResponseBase } from '../../../../common/dto/responseBase.dto';
import { IsUUID, IsString } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';

type Constructor<T> = { new (): T };

export class FeedbackResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsString()
  @Expose()
  readonly comment: string;

  @IsString()
  @Expose()
  readonly rating: string;

  @IsUUID()
  @Expose()
  readonly transactionId: string;

  @IsUUID()
  @Expose()
  readonly stationId: string;

  @IsUUID()
  @Expose()
  readonly userId: string;

  public static fromEntityJoinTransactionList<FeedbackResponse>(
    this: Constructor<FeedbackResponse>,
    objList: Record<string, any>[],
  ): FeedbackResponse[] {
    return objList
      .map(data => ({
        ...data,
        stationId: data.transaction.stationId,
        userId: data.transaction.userId,
      }))
      .map(data =>
        plainToClass(this, data, {
          excludeExtraneousValues: true,
        }),
      );
  }
}
