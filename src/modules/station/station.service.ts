import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Station } from 'src/entities/station.entity';
import { QueryRunner } from 'typeorm';
import { StationMetricService } from './stationMetric.service';
import { Builder } from 'builder-pattern';
import { CreateStationMetricRequest } from './dto/request/createStationMetricRequest.dto';
import { StationListOption } from './dto/query/stationListOption.dto';
import { StationResponse } from './dto/response/stationResponse.dto';

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

  getNearByStations= async (
    queryRunner: QueryRunner,
    data
  ): Promise<StationResponse>=>{
    let nearbyStationsQry=`select * from (select s.*,(((acos(sin(( '${data.latitude}' * pi() / 180))*sin(( cast(latitude as double precision) * pi() / 180)) 
    + cos(( '${data.latitude}' * pi() /180 ))*cos(( cast(latitude as double precision) * pi() / 180)) 
    * cos((( '${data.longitude}' - cast(longitude as double precision)) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344) as "distanceInKms"
    from station s where latitude is not null and longitude is not null ) station where abs("distanceInKms")<=${(data.radiusInMetres/1000)} 
    order by "distanceInKms" asc`;

    // console.log(nearbyStationsQry);
    return await queryRunner.manager.query(nearbyStationsQry);
  }
}
