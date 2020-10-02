import {Body, Controller, Get, Param, Post, Put, Query, Request} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorResponse} from "../../common/dto/error.dto";
import {Connection} from "typeorm";
import {JWT} from "../../common/decorators/jwt.decorator";
import {atomic} from "../../common/database/transaction";
import {ComplaintService} from "./complaint.service";
import {CreateComplaintRequest} from "./dto/request/createComplaintRequest.dto";
import {ComplaintResponse} from "./dto/response/complaintResponse.dto";
import {Roles} from "../../common/decorators/roles.decorator";
import {IdParam} from "../../common/param/id.param";
import {UpdateComplaintRequest} from "./dto/request/updateComplaintRequest.dto";
import {ComplaintListOption} from "./dto/request/complaintListOption.dto";

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
        createComplaintRequest.userId = req.user.userId;
        return ComplaintResponse.fromEntity(
            await atomic(
                this.connection,
                this.complaintService.create,
                req.user.userId,
                createComplaintRequest,
            ),
        );
    }

    @Get('all')
    @JWT()
    @Roles('admin')
    async queryAll(
        @Query() complaintListOption: ComplaintListOption,
    ): Promise<ComplaintResponse[]> {
        return ComplaintResponse.fromEntityList(
            await atomic(this.connection, this.complaintService.queryAll, complaintListOption),
        );
    }

    /**
     * Update a complaint by ID
     */
    @Put(':id')
    @JWT()
    @Roles('admin')
    async update(
        @Request() req,
        @Param() params: IdParam,
        @Body() updateComplaintRequest: UpdateComplaintRequest,
    ): Promise<ComplaintResponse> {
        return ComplaintResponse.fromEntity(
            await atomic(
                this.connection,
                this.complaintService.update,
                req.user.userId,
                params.id,
                updateComplaintRequest,
            ),
        );
    }
}
