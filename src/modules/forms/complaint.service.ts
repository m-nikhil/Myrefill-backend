import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Complaint } from '../../entities/complaint.entity';

/**
 * ComplaintService has the CRUD operation for the complaint entity.
 */
@Injectable()
export class ComplaintService extends CRUDService<Complaint> {
  Entity = Complaint;
}
