import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Station } from 'src/entities/station.entity';
import { QueryRunner } from 'typeorm';
import { StationMetricService } from './stationMetric.service';
import { Builder } from 'builder-pattern';
import { CreateStationMetricRequest } from './dto/request/createStationMetricRequest.dto';
import { StationListOption } from './dto/query/stationListOption.dto';

/**
 * Arrow func can't be called with super. Use this.
 * Ref: https://stackoverflow.com/questions/57561473/how-to-invoke-arrow-functions-on-a-superclass-with-super-in-subclass
 */
@Injectable()
export class StationService extends CRUDService<Station, StationListOption> {
  Entity = Station;

  constructor(private readonly stationMetricService: StationMetricService) {
    super();
  }

  /**
   * create new entity
   */
  superCreate = this.create;
  create = async (
    queryRunner: QueryRunner,
    userId: string,
    createStationRequestDto: Partial<Station>,
  ): Promise<Station> => {
    const stationResponse = await this.superCreate(
      queryRunner,
      userId,
      createStationRequestDto,
    );

    /** create station metric */
    this.stationMetricService.create(
      queryRunner,
      userId,
      Builder(CreateStationMetricRequest)
        .id(stationResponse.id)
        .build(),
    );

    return stationResponse;
  };

  /**
   * create new entity
   */
  superDelete = this.delete;
  delete = async (
    queryRunner: QueryRunner,
    userId: string,
    id: string,
  ): Promise<string> => {
    /** delete station metric */
    await this.stationMetricService.delete(queryRunner, userId, id);
    return await this.superDelete(queryRunner, userId, id);
  };
}
