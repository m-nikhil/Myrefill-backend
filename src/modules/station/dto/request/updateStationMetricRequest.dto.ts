import { IsInt } from 'class-validator';

export class UpdateStationMetricRequest {
  @IsInt()
  numberOfUsers: number;

  @IsInt()
  lifetimeHalfLitres: number;
}
