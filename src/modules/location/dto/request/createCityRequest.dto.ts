import { Word, UUID } from 'src/common/decorators/combined.decorator';

export class CreateCityRequest {
  @Word()
  readonly name: string;

  @UUID()
  readonly stateId: string;
}
