import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { AuthService } from './auth.service';
import { JWT } from 'src/common/decorators/jwt.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginRequest })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @JWT()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
