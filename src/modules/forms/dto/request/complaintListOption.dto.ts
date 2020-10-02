import { IsUUID, IsOptional } from 'class-validator';

export class ComplaintListOption {
  @IsUUID()
  @IsOptional()
  readonly stationId?: string;

  @IsUUID()
  @IsOptional()
  readonly userId?: string;
}
