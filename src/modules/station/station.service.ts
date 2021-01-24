import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/class/crud';
import { Station } from 'src/entities/station.entity';
import { QueryRunner } from 'typeorm';
import { StationMetricService } from './stationMetric.service';
import { Builder } from 'builder-pattern';
import { CreateStationMetricRequest } from './dto/request/createStationMetricRequest.dto';
import { StationListOption } from './dto/query/stationListOption.dto';
import { StationResponse } from './dto/response/stationResponse.dto';
import { StationOfferResponse } from './dto/response/stationOfferResponse.dto';
import { StationCoupon } from 'src/entities/stationCoupon.entity';

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

  getOffers = async (
    queryRunner: QueryRunner,
    searchKey
  ): Promise<StationOfferResponse>=>{
    let qmgr=await queryRunner.manager
      .createQueryBuilder()
      .select('offer.*')
      .from(StationCoupon,'offer')
      .leftJoinAndSelect(`station`,"s",`s.id=offer."stationId"`)
      .where(`offer."isActive"='true' and lower(s.name) like '%${String(searchKey).toLowerCase()}%'`)
    // console.log(qmgr.getSql());
    return qmgr.execute();
  }
  
  createOffer = async (
    queryRunner: QueryRunner,
    userId: string,
    createCouponRequest: Partial<StationOfferResponse>
  ): Promise<StationCoupon>=>{
    console.log('creating offer');
    console.log(createCouponRequest);

    const entity = Builder((createCouponRequest as unknown) as StationCoupon)
      .lastUpdatedBy(userId)
      .build();

    const generatedResult = (
      await queryRunner.manager.insert(StationCoupon, entity)
    ).generatedMaps[0];
    const entityInserted = Builder(entity)
      .id(generatedResult.id)
      .createdAt(generatedResult.createdAt)
      .updatedAt(generatedResult.updatedAt)
      .build();

    return entityInserted as StationCoupon;
  }
}
