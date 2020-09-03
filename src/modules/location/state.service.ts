import { Injectable } from '@nestjs/common';
import { CreateStateRequest } from './dto/request/createStateRequest.dto';
import { State } from 'src/entities/state.entity';
import { UpdateStateRequest } from './dto/request/updateStateRequest.dto';
import { CRUDService } from 'src/common/class/crud';

@Injectable()
export class StateService extends CRUDService<
  State,
  CreateStateRequest,
  UpdateStateRequest
> {
  Entity = State;
}
