import {
  Request,
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
import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CityListOption } from './dto/query/cityListOption.dto';

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
  @Roles('admin')
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
  async query(
    @Query() cityListOption: CityListOption,
  ): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.query, cityListOption),
    );
  }

  /**
   * query all city including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin','user')
  async queryAll(
    @Query() cityListOption: CityListOption,
  ): Promise<CityResponse[]> {
    return CityResponse.fromEntityList(
      await atomic(this.connection, this.cityService.queryAll, cityListOption),
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
  @JWT()
  @Roles('admin')
  async update(
    @Request() req,
    @Param() params: IdParam,
    @Body() updateCityRequest: UpdateCityRequest,
  ): Promise<CityResponse> {
    return CityResponse.fromEntity(
      await atomic(
        this.connection,
        this.cityService.update,
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
  @Roles('admin')
  async delete(@Request() req, @Param() params: IdParam): Promise<string> {
    return atomic(
      this.connection,
      this.cityService.delete,
      req.user.userId,
      params.id,
    );
  }
}
