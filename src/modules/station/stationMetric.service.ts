import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { StationMetric } from 'src/entities/stationMetric.entity';

@Injectable()
export class StationMetricService extends CRUDService<StationMetric> {
  Entity = StationMetric;
}
