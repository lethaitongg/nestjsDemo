import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ErrorResponse } from './common/filters/HttpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(3000);
}
bootstrap();

const validationPipeOptions: ValidationPipeOptions = {
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const errorsMap = {};

    for (const error of errors) {
      errorsMap[error.property] = Object.values(error.constraints)[0];
    }

    const ErrorResponse: ErrorResponse = {
      error: 'Bad Request',
      message: errorsMap,
      statusCode: 400,
    };

    return new BadRequestException(ErrorResponse);
  },
};
