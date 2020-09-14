import { Injectable } from '@nestjs/common';
import { State } from 'src/entities/state.entity';
import { CRUDService } from 'src/common/class/crud';

@Injectable()
export class StateService extends CRUDService<State> {
  Entity = State;
}
