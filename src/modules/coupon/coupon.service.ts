import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coupon } from 'src/entities/coupon.entity';
import { CRUDService } from 'src/common/class/crud';
import { CouponListOption } from './dto/query/couponListOption.dto';
import { MoreThanOrEqual, QueryRunner } from 'typeorm';
import { Builder } from 'builder-pattern';
import { CouponResponse } from './dto/response/couponResponse.dto';
import { RedeemHistory } from 'src/entities/redeemHistory.entity';
import { CreateCouponRequest } from './dto/request/createCouponRequest.dto';
import { Constants } from 'src/common/constants';

/**
 * CouponService has the CRUD operation for the coupon entity.
 */
@Injectable()
export class CouponService extends CRUDService<Coupon, CouponListOption> {
  Entity = Coupon;

  superUpdate = this.update;
  updateCoupon = async (
    queryRunner: QueryRunner,
    updatedBy: string,
    createCouponRequestDto: Partial<Coupon>,
  ): Promise<CouponResponse> => {

    let record=await queryRunner.manager.findOne(Coupon, { userId: createCouponRequestDto.userId });
    if(record){
      return await this.superUpdate(
        queryRunner,
        updatedBy,
        record.id,
        Builder<Partial<Coupon>>()
          .points(record.points+createCouponRequestDto.points)
          .build()
      )
    }
  };

  getCouponPoints = async (
    queryRunner: QueryRunner,
    userId: string
  ):Promise<number> => {
    let record=await queryRunner.manager.findOne(this.Entity,{userId: userId});
    return record.points;
  }

  redeemCoupon = async (
    queryRunner: QueryRunner,
    updatedBy: string,
    createCouponRequestDto: CreateCouponRequest,
  ):Promise<Coupon> => {

    let record=await queryRunner.manager.findOne(Coupon, { userId: createCouponRequestDto.userId });
    if(record.points<createCouponRequestDto.points){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Coupon Points are not enough to redeem.',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }else if(createCouponRequestDto.points> Constants.REDEEM_LIMIT){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Coupon Redeem exceeds daily limit.',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let history=await queryRunner.manager.find(RedeemHistory,{
      userId: createCouponRequestDto.userId,
      // stationId: createCouponRequestDto.stationId,
      createdAt: MoreThanOrEqual(new Date().toISOString().split("T")[0])
    });
    let total=0;
    history.map(hist=>{
      total+=hist.redeemPoints;
    });
    if(total>=Constants.REDEEM_LIMIT){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Today's Redeem Limit exceeded.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if(record){
      await queryRunner.manager.insert(RedeemHistory,{
        userId: createCouponRequestDto.userId,
        stationId: createCouponRequestDto.stationId,
        redeemPoints: createCouponRequestDto.points,
        lastUpdatedBy: updatedBy
      });
      return await this.superUpdate(
        queryRunner,
        updatedBy,
        record.id,
        Builder<Partial<Coupon>>()
          .points(record.points-createCouponRequestDto.points)
          .build()
      )
    }else{
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `No Coupon found for user.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
