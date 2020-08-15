import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { atomic } from 'src/common/database/transaction';
import { Connection } from 'typeorm';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { IdParam } from 'src/common/param/id.param';
import { StateService } from './state.service';
import { CreateStateRequest } from './dto/request/createStateRequest.dto';
import { StateResponse } from './dto/response/stateResponse.dto';
import { UpdateStateRequest } from './dto/request/updateStateRequest.dto';

@Controller('state')
@ApiTags('state')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class StateController {
  constructor(
    private readonly stateService: StateService,
    private connection: Connection,
  ) {}

  /**
   * create a new state
   */
  @Post()
  async create(
    @Body() createStateRequest: CreateStateRequest,
  ): Promise<StateResponse> {
    return StateResponse.fromEntity(
      await atomic(
        this.connection,
        this.stateService.create,
        createStateRequest,
      ),
    );
  }

  /**
   * query all state
   */
  @Get()
  async query(): Promise<StateResponse[]> {
    return StateResponse.fromEntityList(
      await atomic(this.connection, this.stateService.query),
    );
  }

  /**
   * query all state including deleted
   */
  @Get('all')
  async queryAll(): Promise<StateResponse[]> {
    return StateResponse.fromEntityList(
      await atomic(this.connection, this.stateService.queryAll),
    );
  }

  /**
   * get a state by id
   */
  @Get(':id')
  async find(@Param() params: IdParam): Promise<StateResponse> {
    return StateResponse.fromEntity(
      await atomic(this.connection, this.stateService.getById, params.id),
    );
  }

  /**
   * update a state by id
   */
  @Put(':id')
  async update(
    @Param() params: IdParam,
    @Body() updateStateRequest: UpdateStateRequest,
  ): Promise<StateResponse> {
    return StateResponse.fromEntity(
      await atomic(
        this.connection,
        this.stateService.update,
        params.id,
        updateStateRequest,
      ),
    );
  }

  /**
   * delete a state by id
   */
  @Delete(':id')
  async delete(@Param() params: IdParam): Promise<string> {
    return atomic(this.connection, this.stateService.delete, params.id);
  }
}
