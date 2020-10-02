import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from '../../common/dto/error.dto';
import { Connection } from 'typeorm';
import { JWT } from '../../common/decorators/jwt.decorator';
import { atomic } from '../../common/database/transaction';
import { ComplaintService } from './complaint.service';
import { CreateComplaintRequest } from './dto/request/createComplaintRequest.dto';
import { ComplaintResponse } from './dto/response/complaintResponse.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { ComplaintListOption } from './dto/request/complaintListOption.dto';
import { Complaint } from 'src/entities/complaint.entity';

@Controller('complaint')
@ApiTags('complaint')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class ComplaintController {
  constructor(
    private readonly complaintService: ComplaintService,
    private connection: Connection,
  ) {}

  /**
   * Create a new complaint
   */
  @Post()
  @JWT()
  async create(
    @Request() req,
    @Body() createComplaintRequest: CreateComplaintRequest,
  ): Promise<ComplaintResponse> {
    const createComplaintRequestInternal = createComplaintRequest as Partial<
      Complaint
    >;
    createComplaintRequestInternal.userId = req.user.userId;
    return ComplaintResponse.fromEntity(
      await atomic(
        this.connection,
        this.complaintService.create,
        req.user.userId,
        createComplaintRequestInternal,
      ),
    );
  }

  /**
   * query all complaints
   */
  @Get('all')
  @JWT()
  @Roles('admin')
  async queryAll(
    @Query() complaintListOption: ComplaintListOption,
  ): Promise<ComplaintResponse[]> {
    return ComplaintResponse.fromEntityList(
      await atomic(
        this.connection,
        this.complaintService.queryAll,
        complaintListOption,
      ),
    );
  }
}
