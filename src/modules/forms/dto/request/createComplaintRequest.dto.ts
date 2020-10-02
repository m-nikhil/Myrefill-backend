import { IsUUID, IsString } from 'class-validator';

export class CreateComplaintRequest {
  @IsString()
  readonly comment: string;

  @IsUUID()
  readonly stationId: string;
}
