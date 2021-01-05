import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/dto/error.dto';
import { Connection } from 'typeorm';
import { JWT } from '../../common/decorators/jwt.decorator';
import { atomic } from '../../common/database/transaction';
import { Roles } from '../../common/decorators/roles.decorator';
import { FeedbackService } from './feedback.service';
import { FeedbackResponse } from './dto/response/feedbackResponse.dto';
import { CreateFeedbackRequest } from './dto/request/createFeedbackRequest.dto';
import { FeedbackListOption } from './dto/request/feedbackListOption.dto';

@Controller('feedback')
@ApiTags('feedback')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private connection: Connection,
  ) {}

  /**
   * Create a new feedback
   */
  @Post()
  @JWT()
  async create(
    @Request() req,
    @Body() createFeedbackRequest: CreateFeedbackRequest,
  ): Promise<FeedbackResponse> {
    return FeedbackResponse.fromEntity(
      await atomic(
        this.connection,
        this.feedbackService.create,
        req.user.userId,
        createFeedbackRequest,
      ),
    );
  }

  /**
   * query all feedbacks
   */
  @Get('all')
  @JWT()
  @Roles('admin','user')
  async queryAll(
    @Query() feedbackListOption: FeedbackListOption,
  ): Promise<FeedbackResponse[]> {
    const x = FeedbackResponse.fromEntityJoinTransactionList(
      await atomic(
        this.connection,
        this.feedbackService.queryAllWithTranscationDetails,
        feedbackListOption,
      ),
    );

    console.log(x);

    return x;
  }
}
