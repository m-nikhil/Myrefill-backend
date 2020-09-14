import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from 'src/entities/station.entity';
import { StationMetric } from 'src/entities/stationMetric.entity';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { StationMetricService } from './stationMetric.service';
import { StationMetricController } from './stationMetric.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Station, StationMetric])],
  providers: [StationService, StationMetricService],
  controllers: [StationController, StationMetricController],
  exports: [StationMetricService],
})
export class StationModule {}
