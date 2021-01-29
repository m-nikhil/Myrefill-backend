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
import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CouponListOption } from './dto/query/couponListOption.dto';
import { CouponService } from './coupon.service';
import { CreateCouponRequest } from './dto/request/createCouponRequest.dto';
import { CouponResponse } from './dto/response/couponResponse.dto';  
import { IdParam } from 'src/common/param/id.param';

@Controller('coupon')
@ApiTags('coupon')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private connection: Connection,
  ) {}

  /**
   * create or update a coupon's points by user
   */
  @Post()
  @JWT()
  async createOrUpdateCouponByUser(
    @Request() req,
    @Body() createCouponRequest: CreateCouponRequest,
  ): Promise<CouponResponse> {
    return CouponResponse.fromEntity(
      await atomic(
        this.connection,
        this.couponService.updateCoupon,
        req.user.userId,
        createCouponRequest,
        ),
    );
  }
  
  /**
   * Redeem coupons for a user in station
   */
  @Post("redeem")
  @JWT()
  async redeemCoupons(
    @Request() req,
    @Body('couponId') couponId: string,
  ): Promise<CouponResponse> {
    return CouponResponse.fromEntity(
      await atomic(
        this.connection,
        this.couponService.redeemCoupon,
        req.user.userId,
        couponId,
        ),
    );
  }

  /**
   * query all user coupon points
   */
  @Get()
  @JWT()
  async query(
    @Query() couponListOption: CouponListOption,
  ): Promise<CouponResponse[]> {
    return CouponResponse.fromEntityList(
      await atomic(this.connection, this.couponService.query, couponListOption),
    );
  }

  /**
   * get a coupon by userid
   */
  @Get(':id')
  @JWT()
  async find(@Param() params: IdParam): Promise<CouponResponse> {
    return CouponResponse.fromEntity(
      await atomic(this.connection, this.couponService.getCouponPoints, params.id),
    );
  }
}
