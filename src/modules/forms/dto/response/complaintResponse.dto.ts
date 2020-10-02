import { ResponseBase } from '../../../../common/dto/responseBase.dto';
import { IsUUID, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ComplaintResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsString()
  @Expose()
  readonly comment: string;

  @IsUUID()
  @Expose()
  readonly stationId: string;

  @IsUUID()
  @Expose()
  readonly userId: string;
}
