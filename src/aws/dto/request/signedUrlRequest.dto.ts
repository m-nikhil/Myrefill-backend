import {
  Text,
} from 'src/common/decorators/combined.decorator';
import {
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum UploadFor {
  STATION,
}
export class SignedURLRequest {
  @Text()
  @IsOptional()
  readonly id: string;

  @IsEnum(UploadFor)
  readonly uploadFor: UploadFor;

  @IsArray()
  readonly data: [FileInput];
}

export class FileInput {
  @Text()
  readonly fileName: string;

  @Text()
  readonly contentType: string;
}
