import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Render,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { TransactionService } from './transaction.service';
import { CreateRazorpayOrderRequest } from './dto/request/createRazorpayOrderRequest.dto';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { RazorypayOrderResponse } from './dto/response/razorypayOrderResponse.dto';
import { atomic } from 'src/common/database/transaction';
import { Connection } from 'typeorm';
import { TransactionResponse } from './dto/response/transactionResponse.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { IdParam } from 'src/common/param/id.param';
import { CreateTransactionRequest } from './dto/request/createTransactionRequest.dto';
import { TransactionListOption } from './query/transactionListOption.dto';
import { Mutable } from 'src/common/type/mutable';

@Controller('transaction')
@ApiTags('transaction')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class TransactionController {
  constructor(
    private connection: Connection,
    private readonly tansactionService: TransactionService,
  ) {}

  /**
   * create a new razorpay order
   */
  @JWT()
  @Post('/razorpay-order')
  async createRazorpayOrder(
    @Request() req,
    @Body() createRazorpayOrderRequest: CreateRazorpayOrderRequest,
  ): Promise<RazorypayOrderResponse> {
    return await atomic(
      this.connection,
      this.tansactionService.createRazorpayOrder,
      req.user.userId,
      createRazorpayOrderRequest,
    );
  }

  /**
   * razorpay web payment page
   * The order of this function must occur before get(:id)
   */
  @ApiOperation({
    summary: 'Open the path (/transaction/razorpay-payment) in a browser tab.',
  })
  @Get('/razorpay-payment')
  @Render('razorpayPayment')
  razorpayWebPayment() {
    return {};
  }

  /**
   * create a new transaction
   */
  @Post()
  @JWT()
  async create(
    @Request() req,
    @Body() createTransactionRequest: CreateTransactionRequest,
  ): Promise<TransactionResponse> {
    return TransactionResponse.fromEntity(
      await atomic(
        this.connection,
        this.tansactionService.create,
        req.user.userId,
        createTransactionRequest,
      ),
    );
  }

  /**
   * query all transaction
   */
  @Get()
  @JWT()
  async query(
    @Request() req,
    @Query() transactionListOption: TransactionListOption,
  ): Promise<TransactionResponse[]> {
    const transactionListOptionMutable: Mutable<TransactionListOption> = transactionListOption;
    if (!req.user.roles.includes('admin')) {
      transactionListOptionMutable.userId = req.user.userId;
    }
    return TransactionResponse.fromEntityList(
      await atomic(
        this.connection,
        this.tansactionService.getTransactions,
        transactionListOptionMutable,
      ),
    );
  }

  /**
   * query all transaction including deleted
   */
  @Get('all')
  @JWT()
  @Roles('admin')
  async queryAll(
    @Query() transactionListOption: TransactionListOption,
  ): Promise<TransactionResponse[]> {
    return TransactionResponse.fromEntityList(
      await atomic(
        this.connection,
        this.tansactionService.queryAll,
        transactionListOption,
      ),
    );
  }

  /**
   * get transaction summary for current user
   */
  @Get('summary')
  @JWT()
  @Roles('admin','user')
  async getDashboard(
    @Request() req,
  ): Promise<JSON> {
    return await atomic(
      this.connection, 
      this.tansactionService.getSummary,
      req.user.userId
    )
  }

  /**
   * get a transaction by id
   */
  @Get(':id')
  @JWT()
  @Roles('admin','user')
  async find(@Param() params: IdParam): Promise<TransactionResponse> {
    return TransactionResponse.fromEntity(
      await atomic(this.connection, this.tansactionService.getById, params.id),
    );
  }
}
