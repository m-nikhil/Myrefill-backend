import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { State } from 'src/entities/state.entity';
import { StateService } from './state.service';
import { StateController } from './state.controller';

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  providers: [CityService, StateService],
  controllers: [CityController, StateController],
})
export class LocationModule {}
