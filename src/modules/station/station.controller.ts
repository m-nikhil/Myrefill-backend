import {
  Request,
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { atomic } from 'src/common/database/transaction';
import { Connection } from 'typeorm';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { IdParam } from 'src/common/param/id.param';

import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { StationService } from './station.service';
import { CreateStationRequest } from './dto/request/createStationRequest.dto';
import { StationResponse } from './dto/response/stationResponse.dto';
import { UpdateStationRequest } from './dto/request/updateStationRequest.dto';
import { StationLimitedResponse } from './dto/response/stationResponseLimited.dto';

@Controller('station')
@ApiTags('station')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class StationController {
  constructor(
    private readonly stationService: StationService,
    private connection: Connection,
  ) {}

  /**
   * create a new station
   */
  @Post()
  @JWT()
  @Roles('admin')
  async create(
    @Request() req,
    @Body() createStationRequest: CreateStationRequest,
  ): Promise<StationResponse> {
    return StationResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationService.create,
        req.user.userId,
        createStationRequest,
      ),
    );
  }

  /**
   * query all station
   * Based on roles response will vary.
   * Users can see limited fields
   */
  @Get()
  @JWT()
  async query(
    @Request() req,
  ): Promise<StationResponse[] | StationLimitedResponse[]> {
    if (req.user.roles.includes('admin')) {
      return StationResponse.fromEntityList(
        await atomic(this.connection, this.stationService.query),
      );
    }

    return StationLimitedResponse.fromEntityList(
      await atomic(this.connection, this.stationService.query),
    );
  }

  /**
   * query all station including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin')
  async queryAll(): Promise<StationResponse[]> {
    return StationResponse.fromEntityList(
      await atomic(this.connection, this.stationService.queryAll),
    );
  }

  /**
   * get a station by id
   * Based on roles response will vary
   * Users can see limited fields
   */
  @Get(':id')
  @JWT()
  async find(
    @Request() req,
    @Param() params: IdParam,
  ): Promise<StationResponse | StationLimitedResponse> {
    if (req.user.roles.includes('admin')) {
      return StationResponse.fromEntity(
        await atomic(this.connection, this.stationService.getById, params.id),
      );
    }

    return StationLimitedResponse.fromEntity(
      await atomic(this.connection, this.stationService.getById, params.id),
    );
  }

  /**
   * update a station by id
   */
  @Put(':id')
  @JWT()
  @Roles('admin')
  async update(
    @Request() req,
    @Param() params: IdParam,
    @Body() updateStationRequest: UpdateStationRequest,
  ): Promise<StationResponse> {
    return StationResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationService.update,
        req.user.userId,
        params.id,
        updateStationRequest,
      ),
    );
  }

  /**
   * delete a station by id
   */
  @Delete(':id')
  @JWT()
  @Roles('admin')
  async delete(@Request() req, @Param() params: IdParam): Promise<string> {
    return atomic(
      this.connection,
      this.stationService.delete,
      req.user.userId,
      params.id,
    );
  }
}
