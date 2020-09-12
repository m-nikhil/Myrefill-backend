import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/location/location.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StationModule } from './modules/station/station.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { FormsModule } from './modules/forms/forms.module';
import { ComplaintController } from './modules/forms/complaint.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    UserModule,
    StationModule,
    TransactionModule,
    FormsModule,
  ],
  controllers: [ComplaintController],
})
export class AppModule {}
