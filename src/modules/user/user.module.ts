import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './authStrategies/local.strategy';
import { JwtStrategy } from './authStrategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThirdpartyModule } from '../thirdparty/thirdparty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '60 days',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    ThirdpartyModule,
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [UserController, AuthController],
  exports: [UserService]
})
export class UserModule {}
