import { IsUUID, IsOptional, IsEnum } from 'class-validator';

enum Status {
  unrecognized,
  success,
  failure,
}

export class TransactionListOption {
  @IsEnum(Status)
  @IsOptional()
  readonly status?: Status;

  @IsUUID()
  @IsOptional()
  readonly stationId?: string;

  @IsUUID()
  @IsOptional()
  readonly userId?: string;
}
