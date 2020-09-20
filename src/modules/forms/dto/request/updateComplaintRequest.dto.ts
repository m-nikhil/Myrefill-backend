import {IsEmpty, IsOptional, IsUUID} from 'class-validator';

export class UpdateComplaintRequest {
    @IsOptional()
    readonly comment: string;

    @IsUUID()
    readonly stationId: string;

    @IsOptional()
    @IsEmpty()
    userId: string
}
