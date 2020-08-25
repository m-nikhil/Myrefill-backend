import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CityResponse } from './dto/response/cityResponse.dto';
import { CreateCityRequest } from './dto/request/createCityRequest.dto';
import { atomic } from 'src/common/database/transaction';
import { CityService } from './city.service';
import { Connection } from 'typeorm';
import { UpdateCityRequest } from './dto/request/updateCityRequest.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { IdParam } from 'src/common/param/id.param';

@Controller('city')
@ApiTags('city')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class CityController {
  constructor(
    private readonly cityService: CityService,
    private connection: Connection,
  ) {}

  /**
   * create a new city
   */
  @Post()
  async create(
    @Body() createCityRequest: CreateCityRequest,
  ): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(this.connection, this.cityService.create, createCityRequest),
    );
  }

  /**
   * query all city
   */
  @Get()
  async query(@Query('stateId') stateId: IdParam): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.query, stateId),
    );
  }

  /**
   * query all city including deleted
   */
  @Get('all')
  async queryAll(): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.queryAll),
    );
  }

  /**
   * get a city by id
   */
  @Get(':id')
  async find(@Param() params: IdParam): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(this.connection, this.cityService.getById, params.id),
    );
  }

  /**
   * update a city by id
   */
  @Put(':id')
  async update(
    @Param() params: IdParam,
    @Body() updateCityRequest: UpdateCityRequest,
  ): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(
        this.connection,
        this.cityService.update,
        params.id,
        updateCityRequest,
      ),
    );
  }

  /**
   * delete a city by id
   */
  @Delete(':id')
  async delete(@Param() params: IdParam): Promise<string> {
    return atomic(this.connection, this.cityService.delete, params.id);
  }
}
