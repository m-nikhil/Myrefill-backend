import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Complaint} from "../../entities/complaint.entity";
import {ComplaintController} from "./complaint.controller";
import {ComplaintService} from "./complaint.service";

@Module({
    imports: [TypeOrmModule.forFeature([Complaint])],
    providers: [ComplaintService],
    controllers: [ComplaintController]
})
export class FormsModule {}
