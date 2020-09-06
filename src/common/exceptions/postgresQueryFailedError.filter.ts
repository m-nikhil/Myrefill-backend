import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../dto/error.dto';
import { QueryFailedError } from 'typeorm';
import { PostgresQueryFailedError } from './postgresQueryFailedErrorType';

/**
 * Exception Filter to catch `QueryFailedError` typeorm expection.
 *
 * status code ref: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10
 * postgres error code ref: https://www.postgresql.org/docs/10/errcodes-appendix.html
 */
@Catch(QueryFailedError)
export class QueryFailedErrorExceptionFilter implements ExceptionFilter {
  catch(exception: PostgresQueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status;
    let errorResponse;

    console.log(exception);

    switch (exception.code) {
      case '23505': {
        // unique_violation
        status = HttpStatus.CONFLICT;
        errorResponse = new ErrorResponse(
          status,
          request.url,
          'Entity already exists',
        );
        break;
      }
      case '23503': {
        // foreign_key_violation
        status = HttpStatus.BAD_REQUEST;
        let tableName = exception.detail.match(/\([a-zA-Z]*\)/)[0];
        tableName = tableName.substring(1, tableName.length - 1);
        errorResponse = new ErrorResponse(
          status,
          request.url,
          'Invalid ' + tableName,
        );
        break;
      }
      default: {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorResponse = new ErrorResponse(
          status,
          request.url,
          'Please Contact Admin if the error persists',
        );
      }
    }

    response.status(status).json(errorResponse);
  }
}
