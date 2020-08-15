import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/city/location.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LocationModule],
})
export class AppModule {}
