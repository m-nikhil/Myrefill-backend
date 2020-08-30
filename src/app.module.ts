import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './modules/location/location.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    UserModule,
  ],
})
export class AppModule {}
