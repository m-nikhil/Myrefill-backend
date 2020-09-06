import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from 'src/entities/station.entity';
import { StationMetric } from 'src/entities/stationMetric.entity';
import { StationService } from './station.service';
import { StationController } from './station.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Station, StationMetric])],
  providers: [StationService],
  controllers: [StationController],
})
export class StationModule {}
