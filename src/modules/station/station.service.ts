import { Injectable } from '@nestjs/common';
import { State } from 'src/entities/state.entity';
import { CRUDService } from 'src/common/class/crud';
import { Station } from 'src/entities/station.entity';
import { CreateStationRequest } from './dto/request/createStationRequest.dto';
import { UpdateStationRequest } from './dto/request/updateStationRequest.dto';

@Injectable()
export class StationService extends CRUDService<
  State,
  CreateStationRequest,
  UpdateStationRequest
> {
  Entity = Station;
}
