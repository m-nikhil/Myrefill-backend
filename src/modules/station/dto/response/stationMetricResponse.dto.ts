import { IsUUID, IsInt } from 'class-validator';
import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class StationMetricResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @IsInt()
  @Expose()
  readonly numberOfUsers: number;

  @IsInt()
  @Expose()
  readonly lifetimeHalfLitres: number;
}
