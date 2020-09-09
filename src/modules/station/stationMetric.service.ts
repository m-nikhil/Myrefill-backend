import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { StationMetric } from 'src/entities/stationMetric.entity';
import { CreateStationMetricRequest } from './dto/request/createStationMetricRequest.dto';
import { UpdateStationMetricRequest } from './dto/request/updateStationMetricRequest.dto';

@Injectable()
export class StationMetricService extends CRUDService<
  StationMetric,
  CreateStationMetricRequest,
  UpdateStationMetricRequest
> {
  Entity = StationMetric;
}
