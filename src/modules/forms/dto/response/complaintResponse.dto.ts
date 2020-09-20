import {ResponseBase} from "../../../../common/dto/responseBase.dto";
import {IsUUID} from "class-validator";
import {Exclude, Expose} from "class-transformer";

export class ComplaintResponse extends ResponseBase{
    @IsUUID()
    readonly id: string;

    @Expose()
    readonly comment: string;

    @IsUUID()
    readonly stationId: string;

    @IsUUID()
    @Exclude()
    readonly userId: string;
}
