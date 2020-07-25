import { Word } from 'src/common/decorators/combined.decorator';

export class CreateCityRequest {
  @Word()
  readonly name: string;
}
