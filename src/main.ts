import { NestFactory } from '@nestjs/core';
import { EntityNotFoundExceptionFilter } from './common/exceptions/entityNotFound.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { QueryFailedErrorExceptionFilter } from './common/exceptions/postgresQueryFailedError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger configuations
   */
  const options = new DocumentBuilder()
    .setTitle('MyrefillServer')
    .setDescription('Myrefill Server API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   *  Filter configurations
   */
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalFilters(new QueryFailedErrorExceptionFilter());

  /**
   *  Pipes configurations
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000,"0.0.0.0");
}
bootstrap();
