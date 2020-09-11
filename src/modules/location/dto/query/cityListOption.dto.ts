import { IsUUID, IsOptional } from 'class-validator';

export class CityListOption {
  @IsUUID()
  @IsOptional()
  readonly stateId?: string;
}
