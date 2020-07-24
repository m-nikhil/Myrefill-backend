import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CityModule],
})
export class AppModule {}
