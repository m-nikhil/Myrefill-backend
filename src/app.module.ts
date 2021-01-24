import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/location/location.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StationModule } from './modules/station/station.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { FormsModule } from './modules/forms/forms.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    UserModule,
    StationModule,
    TransactionModule,
    FormsModule,
    CouponModule,
    AwsModule,
  ],
})
export class AppModule {}
