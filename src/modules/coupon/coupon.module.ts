import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/coupon.entity';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

@Module({
    imports: [TypeOrmModule.forFeature([Coupon])],
    providers: [CouponService],
    controllers: [CouponController],
    exports: [CouponService]
})
export class CouponModule {}
