import { Word, UUID } from 'src/common/decorators/combined.decorator';
import { City } from 'src/entities/city.entity';
import { Builder } from 'builder-pattern';

export class CityResponse {
  static fromEntity(city: City) {
    return Builder(CityResponse)
      .id(city.id)
      .name(city.name)
      .stateId(city.stateId)
      .build();
  }

  static fromEntityList(cityList: City[]) {
    const cityDtoList: CityResponse[] = [];
    cityList.forEach(city => {
      cityDtoList.push(CityResponse.fromEntity(city));
    });
    return cityDtoList;
  }

  @UUID()
  readonly id: string;

  @Word()
  readonly name: string;

  @UUID()
  readonly stateId: string;
}
