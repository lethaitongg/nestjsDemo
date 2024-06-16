import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string | object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log('tai ', exception.getResponse());

    const errorResponse: ErrorResponse = {
      message: exception.getResponse(),
      error: exception.name,
      statusCode: status,
    };
    response.status(status).json(errorResponse);

    // {
    //   message: exception.message,
    //   statusCode: status,
    //   error: exception.name,
    // }
  }
}
