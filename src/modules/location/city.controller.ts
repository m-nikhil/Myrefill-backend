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
import { CityResponse } from './dto/response/cityResponse.dto';
import { CreateCityRequest } from './dto/request/createCityRequest.dto';
import { atomic } from 'src/common/database/transaction';
import { CityService } from './city.service';
import { Connection } from 'typeorm';
import { UpdateCityRequest } from './dto/request/updateCityRequest.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { IdParam } from 'src/common/param/id.param';
import { JWT } from 'src/common/decorators/jwt.decorator';

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
  @JWT()
  async create(
    @Request() req,
    @Body() createCityRequest: CreateCityRequest,
  ): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(
        this.connection,
        this.cityService.create,
        req.user.userId,
        createCityRequest,
      ),
    );
  }

  /**
   * query all city
   */
  @Get()
  async query(): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.query.bind(this)),
    );
  }

  /**
   * query all city including deleted
   */
  @Get('all')
  async queryAll(): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.queryAll.bind(this)),
    );
  }

  /**
   * get a city by id
   */
  @Get(':id')
  async find(@Param() params: IdParam): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(
        this.connection,
        this.cityService.getById.bind(this),
        params.id,
      ),
    );
  }

  /**
   * update a city by id
   */
  @Put(':id')
  @JWT()
  async update(
    @Request() req,
    @Param() params: IdParam,
    @Body() updateCityRequest: UpdateCityRequest,
  ): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(
        this.connection,
        this.cityService.update.bind(this),
        req.user.userId,
        params.id,
        updateCityRequest,
      ),
    );
  }

  /**
   * delete a city by id
   */
  @Delete(':id')
  @JWT()
  async delete(@Request() req, @Param() params: IdParam): Promise<string> {
    return atomic(
      this.connection,
      this.cityService.delete.bind(this),
      req.user.userId,
      params.id,
    );
  }
}
