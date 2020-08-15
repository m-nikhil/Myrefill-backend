import { Word } from 'src/common/decorators/combined.decorator';

export class CreateStateRequest {
  @Word()
  readonly name: string;
}
