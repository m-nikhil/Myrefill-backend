import { Controller, Post, Request, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
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
}
