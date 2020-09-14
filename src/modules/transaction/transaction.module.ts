import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { ThirdpartyModule } from '../thirdparty/thirdparty.module';
import { StationModule } from '../station/station.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ThirdpartyModule,
    StationModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
