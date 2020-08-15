import { Word } from 'src/common/decorators/combined.decorator';

export class UpdateCityRequest {
  @Word()
  readonly name: string;
}
