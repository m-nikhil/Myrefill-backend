import { Request, Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { atomic } from 'src/common/database/transaction';
import { JWT } from 'src/common/decorators/jwt.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AwsService } from './aws.service';
import { Connection } from 'typeorm';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { SignedURLRequest } from './dto/request/signedUrlRequest.dto';
import { SignedUrlResponse } from './dto/response/signedUrlResponse.dto';

@Controller('aws')
@ApiTags('aws')
@ApiResponse({
    status: 404,
    type: ErrorResponse,
    description: 'Entity not found.',
})
export class AwsController {
    
  constructor(
      private awsService: AwsService,
      private connection: Connection,
  ) {}

  /**
   * creates signed URL
   */
  @Post('signedURL')
  @JWT()
  @Roles('admin','user')
  async create(
    @Request() req,
    @Body() signedUrlRequest: SignedURLRequest
  ): Promise<SignedUrlResponse[]> {
    return await atomic(
        this.connection,
        this.awsService.signedURL,
        req.user.userId,
        signedUrlRequest
    )
  }
}
