import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { AuthService } from './auth.service';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { ConfigService } from '@nestjs/config';
import { AdminLoginRequest } from './dto/request/adminLoginRequest.dto';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiBody({ type: LoginRequest })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('admin-login')
  async adminLogin(
    @Request() req,
    @Body() adminLoginRequest: AdminLoginRequest,
  ) {
    if (
      adminLoginRequest.password != this.configService.get<string>('ADMIN_PASS')
    ) {
      throw new UnauthorizedException();
    }
    return this.authService.adminLogin();
  }

  @JWT()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
