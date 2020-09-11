import { IsUUID, IsOptional, IsBooleanString } from 'class-validator';

export class StationListOption {
  @IsBooleanString()
  @IsOptional()
  readonly open?: boolean;

  @IsUUID()
  @IsOptional()
  readonly stateId?: string;

  @IsUUID()
  @IsOptional()
  readonly cityId?: string;
}
