import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ErrorResponse } from '../dto/error.dto';

/**
 * Exception Filter to catch `EntityNotFoundError` typeorm expection and set status as 404.
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.NOT_FOUND;

    const errorResponse = new ErrorResponse(
      status,
      request.url,
      'Entity not found',
    );

    response.status(status).json(errorResponse);
  }
}
