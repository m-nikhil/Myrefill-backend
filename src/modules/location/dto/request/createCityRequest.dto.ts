import { Word } from 'src/common/decorators/combined.decorator';
import { IsUUID } from 'class-validator';

export class CreateCityRequest {
  @Word()
  readonly name: string;

  @IsUUID()
  readonly stateId: string;
}
