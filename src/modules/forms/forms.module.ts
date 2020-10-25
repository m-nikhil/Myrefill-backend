import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '../../entities/complaint.entity';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from 'src/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, Feedback])],
  providers: [ComplaintService, FeedbackService],
  controllers: [ComplaintController, FeedbackController],
})
export class FormsModule {}
