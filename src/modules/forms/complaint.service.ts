import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import {Complaint} from "../../entities/complaint.entity";
import {CreateComplaintRequest} from "./dto/request/createComplaintRequest.dto";
import {UpdateComplaintRequest} from "./dto/request/updateComplaintRequest.dto";

/**
 * ComplaintService has the CRUD operation for the complaint entity.
 */
@Injectable()
export class ComplaintService extends CRUDService<
    Complaint,
    CreateComplaintRequest,
    UpdateComplaintRequest
    > {
    Entity = Complaint;
}
