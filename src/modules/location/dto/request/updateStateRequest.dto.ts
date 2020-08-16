import { Word } from 'src/common/decorators/combined.decorator';
import { IsOptional } from 'class-validator';

export class UpdateStateRequest {
  @Word()
  @IsOptional()
  readonly name: string;
}
