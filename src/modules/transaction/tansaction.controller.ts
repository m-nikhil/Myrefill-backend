import { Controller, Post, Request, Body, Get, Render } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { TransactionService } from './transaction.service';
import { CreateRazorpayOrderRequest } from './dto/request/createRazorpayOrderRequest.dto';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { RazorypayOrderResponse } from './dto/response/razorypayOrderResponse.dto';

@Controller('transaction')
@ApiTags('transaction')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class TransactionController {
  constructor(private readonly tansactionService: TransactionService) {}

  /**
   * create a new razorpay order
   */
  @JWT()
  @Post('/razorpay-order')
  async createRazorpayOrder(
    @Request() req,
    @Body() createRazorpayOrderRequest: CreateRazorpayOrderRequest,
  ): Promise<RazorypayOrderResponse> {
    return await this.tansactionService.createRazorpayOrder(
      req.user.userId,
      createRazorpayOrderRequest,
    );
  }

  @ApiOperation({
    summary:
      'Open the path (/transaction/razorpay-payment) in a browser tab.',
  })
  @Get('/razorpay-payment')
  @Render('razorpayPayment')
  razorpayWebPayment() {
    return {
      key: 'rzp_test_HbdgkZNaPBegQQ',
      amount: 600,
      orderId: 'order_FcSDMOxynKD8f3',
      customerId: 'cust_Fc2RRm3sBKPuZQ',
    };
  }
}
