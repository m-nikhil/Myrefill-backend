import { UUID } from '../decorators/combined.decorator';

export class IdParam {
  @UUID()
  id: string;
}
