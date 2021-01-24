import { Text } from 'src/common/decorators/combined.decorator';
import { Expose } from 'class-transformer';
import { ResponseBase } from 'src/common/dto/responseBase.dto';

export class SignedUrlResponse extends ResponseBase {

  @Text()
  @Expose()
  readonly status: string;

  @Text()
  @Expose()
  readonly signedUrl: string;

  @Text()
  @Expose()
  readonly publicUrl: string;

  @Text()
  @Expose()
  readonly filename: string;

  @Text()
  @Expose()
  readonly fileKey: string;
  
  @Text()
  @Expose()
  readonly token: string;

}
