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
import { StationListOption } from './dto/query/stationListOption.dto';
import { stationLocationParams } from './dto/request/stationLocationParams.dto';
import { StationOfferResponse } from './dto/response/stationOfferResponse.dto';
import { StationCouponRequest } from './dto/request/createStationCouponRequest.dto';
import { StationCouponUpdateRequest } from './dto/request/updateStationCouponRequest.dto';

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
    @Query() stationListOption: StationListOption,
    @Request() req,
  ): Promise<StationResponse[] | StationLimitedResponse[]> {
    if (req.user.roles.includes('admin')) {
      return StationResponse.fromEntityList(
        await atomic(
          this.connection,
          this.stationService.queryStationDetails,
          stationListOption,
        ),
      );
    }

    return StationLimitedResponse.fromEntityList(
      await atomic(
        this.connection,
        this.stationService.queryStationDetails,
        stationListOption,
      ),
    );
  }

  /**
   * query all station including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin','user')
  async queryAll(
    @Query() stationListOption: StationListOption,
  ): Promise<StationResponse[]> {
    return StationResponse.fromEntityList(
      await atomic(
        this.connection,
        this.stationService.queryAll,
        stationListOption,
      ),
    );
  }

  /**
   * query all station offers
   */
  @Get('coupons')
  @JWT()
  @Roles('admin','user')
  async queryOffers(
    @Query('searchKey') searchKey: string
  ): Promise<StationOfferResponse[]> {
    return StationOfferResponse.fromEntityList(
      await atomic(
        this.connection,
        this.stationService.getOffers,
        searchKey
      ),
    );
  }
  
  /**
   * query station coupon by id
   */
  @Get('coupon/:id')
  @JWT()
  @Roles('admin')
  async getStationCouponById(
    @Param() params: IdParam,
  ): Promise<StationOfferResponse> {
    return StationOfferResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationService.getStationCouponById,
        params.id
      ),
    );
  }

  /**
   * create a new offer
   */
  @Post('coupon')
  @JWT()
  @Roles('admin','user')
  async createOffer(
    @Request() req,
    @Body() createCouponRequest: StationCouponRequest,
  ): Promise<StationOfferResponse> {
    return StationOfferResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationService.createOffer,
        req.user.userId,
        createCouponRequest,
      ),
    );
  }

  /**
   * update a station coupon by id
   */
  @Put('coupon')
  @JWT()
  @Roles('admin')
  async updateCoupon(
    @Request() req,
    @Body() updateCouponRequest: StationCouponUpdateRequest,
  ): Promise<StationOfferResponse> {
    return StationOfferResponse.fromEntity(
      await atomic(
        this.connection,
        this.stationService.updateOffer,
        req.user.userId,
        updateCouponRequest,
      ),
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
        await atomic(this.connection, this.stationService.getStationById, params.id),
      );
    }

    return StationLimitedResponse.fromEntity(
      await atomic(this.connection, this.stationService.getStationById, params.id),
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

  @Post('nearby')
  @JWT()
  @Roles('admin','user')
  async getNearByPlaces(
    @Body()
    locationParams: stationLocationParams
  ): Promise<StationResponse[]> {
    return StationResponse.fromEntityList(
      await atomic(
        this.connection,
        this.stationService.getNearByStations,
        locationParams,
      ),
    );
  }
}
