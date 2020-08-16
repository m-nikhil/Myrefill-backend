import { Word, UUID } from 'src/common/decorators/combined.decorator';
import { IsOptional } from 'class-validator';

export class UpdateCityRequest {
  @Word()
  @IsOptional()
  readonly name: string;

  @UUID()
  @IsOptional()
  readonly stateId: string;
}
