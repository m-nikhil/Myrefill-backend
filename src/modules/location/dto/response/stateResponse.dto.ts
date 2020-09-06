import { Word } from 'src/common/decorators/combined.decorator';
import { IsUUID } from 'class-validator';
import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class StateResponse extends ResponseBase {
  @IsUUID()
  @Expose()
  readonly id: string;

  @Word()
  @Expose()
  readonly name: string;
}
