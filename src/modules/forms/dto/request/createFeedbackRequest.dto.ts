import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';

enum Rating {
  unrecognized,
  'one star',
  'two star',
  'three star',
  'four star',
  'five star',
}

export class CreateFeedbackRequest {
  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsEnum(Rating)
  readonly rating: Rating;

  @IsUUID()
  readonly transactionId: string;
}
