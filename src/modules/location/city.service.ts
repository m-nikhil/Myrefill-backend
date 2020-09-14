import { Injectable } from '@nestjs/common';
import { City } from 'src/entities/city.entity';
import { CRUDService } from 'src/common/class/crud';
import { CityListOption } from './dto/query/cityListOption.dto';

/**
 * CityService has the CRUD operation for the city entity.
 */
@Injectable()
export class CityService extends CRUDService<City, CityListOption> {
  Entity = City;
}
