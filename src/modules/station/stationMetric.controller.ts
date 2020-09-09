import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { Connection } from 'typeorm';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { StationMetricResponse } from './dto/response/stationMetricResponse.dto';
import { StationMetricService } from './stationMetric.service';
import { atomic } from 'src/common/database/transaction';
import { IdParam } from 'src/common/param/id.param';

@Controller('stationMetric')
@ApiTags('stationMetric')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class StationMetricController {
  constructor(
    private readonly stationMetricService: StationMetricService,
    private connection: Connection,
  ) {}

  /**
   * query all stationMetric
   */
  @Get()
  @JWT()
  @Roles('admin')
  async query(): Promise<StationMetricResponse[]> {
    return StationMetricResponse.fromEntityList(
      await atomic(this.connection, this.stationMetricService.query),
    );
  }

  /**
   * query all stationMetric including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin')
  async queryAll(): Promise<StationMetricResponse[]> {
    return StationMetricResponse.fromEntityList(
      await atomic(this.connection, this.stationMetricService.queryAll),
    );
  }

  /**
   * get a stationMetric by id
   */
  @Get(':id')
  @JWT()
  async find(@Param() params: IdParam): Promise<StationMetricResponse> {
    return StationMetricResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationMetricService.getById,
        params.id,
      ),
    );
  }
}
