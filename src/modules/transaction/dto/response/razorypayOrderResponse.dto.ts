import { ResponseBase } from 'src/common/dto/responseBase.dto';
import { Expose } from 'class-transformer';

export class RazorypayOrderResponse extends ResponseBase {
  @Expose()
  readonly id: string;

  @Expose()
  readonly amount: number;
}
