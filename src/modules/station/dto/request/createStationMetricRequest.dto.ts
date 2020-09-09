import { IsUUID, IsInt } from 'class-validator';

export class CreateStationMetricRequest {
  @IsUUID()
  id: string;

  @IsInt()
  numberOfUsers: number;

  @IsInt()
  lifetimeHalfLitres: number;
}
