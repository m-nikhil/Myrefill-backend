import { IsUUID, IsOptional } from 'class-validator';

export class FeedbackListOption {
  @IsUUID()
  @IsOptional()
  readonly stationId?: string;

  @IsUUID()
  @IsOptional()
  readonly userId?: string;
}
