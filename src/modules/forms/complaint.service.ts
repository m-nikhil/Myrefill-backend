import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Complaint } from '../../entities/complaint.entity';
import { ComplaintListOption } from './dto/request/complaintListOption.dto';

/**
 * ComplaintService has the CRUD operation for the complaint entity.
 */
@Injectable()
export class ComplaintService extends CRUDService<
  Complaint,
  ComplaintListOption
> {
  Entity = Complaint;
}
