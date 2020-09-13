import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionController } from './tansaction.controller';
import { TransactionService } from './transaction.service';
import { ThirdpartyModule } from '../thirdparty/thirdparty.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), ThirdpartyModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
