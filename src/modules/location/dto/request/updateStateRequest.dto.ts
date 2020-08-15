import { Word } from 'src/common/decorators/combined.decorator';

export class UpdateStateRequest {
  @Word()
  readonly name: string;
}
