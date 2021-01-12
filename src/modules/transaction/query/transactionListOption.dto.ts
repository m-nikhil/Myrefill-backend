import { IsUUID, IsOptional, IsEnum, IsString } from 'class-validator';

enum Status {
  unrecognized,
  success,
  failure,
}

enum order {
  ASC,
  DESC
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

  @IsOptional()
  readonly limit: number = 10;

  @IsOptional()
  readonly page: number = 0;

  @IsString()
  @IsOptional()
  readonly orderCol: string = `"createdAt"`;

  @IsEnum(order)
  @IsOptional()
  readonly order: string = "DESC";
}
