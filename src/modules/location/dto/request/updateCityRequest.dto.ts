import { Word } from 'src/common/decorators/combined.decorator';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateCityRequest {
  @Word()
  @IsOptional()
  readonly name: string;

  @IsUUID()
  @IsOptional()
  readonly stateId: string;
}
