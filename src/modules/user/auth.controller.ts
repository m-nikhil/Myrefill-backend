import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { LoginRequest } from './dto/request/loginRequest.dto';
import { UserResponse } from './dto/response/userResponse.dto';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class AuthController {
  @ApiBody({ type: LoginRequest })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<UserResponse> {
    return UserResponse.fromEntity(req.user);
  }
}
