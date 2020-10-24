import {
  Request,
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { atomic } from 'src/common/database/transaction';
import { Connection } from 'typeorm';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { IdParam } from 'src/common/param/id.param';
import { CreateUserRequest } from './dto/request/createUserRequest.dto';
import { UserResponse } from './dto/response/userResponse.dto';
import { UserService } from './user.service';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserRequest } from './dto/request/updateUserRequest.dto';

@Controller('user')
@ApiTags('user')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private connection: Connection,
  ) {}

  /**
   * create a new user
   */
  @Post()
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return UserResponse.fromEntity(
      await atomic(
        this.connection,
        this.userService.create,
        '', // no user
        createUserRequest,
      ),
    );
  }

  /**
   * query all user
   */
  @Get()
  @JWT()
  @Roles('admin')
  async query(): Promise<UserResponse[]> {
    return UserResponse.fromEntityList(
      await atomic(this.connection, this.userService.query),
    );
  }

  /**
   * update a user by id
   */
  @Put(':id')
  @JWT()
  @Roles('admin', 'self')
  @UseGuards(AuthGuard('local'))
  async update(
    @Request() req,
    @Param() params: IdParam,
    @Body()
    updateUserRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    return UserResponse.fromEntity(
      await atomic(
        this.connection,
        this.userService.update,
        req.user.userId,
        params.id,
        updateUserRequest,
      ),
    );
  }

  /**
   * query all user including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin')
  async queryAll(): Promise<UserResponse[]> {
    return UserResponse.fromEntityList(
      await atomic(this.connection, this.userService.queryAll),
    );
  }

  /**
   * get a user by id
   */
  @Get(':id')
  @JWT()
  @Roles('admin')
  async find(@Param() params: IdParam): Promise<UserResponse> {
    return UserResponse.fromEntity(
      await atomic(this.connection, this.userService.getById, params.id),
    );
  }

  /**
   * delete a user by id
   */
  @Delete(':id')
  @JWT()
  @Roles('admin')
  async delete(@Request() req, @Param() params: IdParam): Promise<string> {
    return atomic(
      this.connection,
      this.userService.delete,
      req.user.userId,
      params.id,
    );
  }
}
