import { NestFactory } from '@nestjs/core';
import { EntityNotFoundExceptionFilter } from './common/exceptions/entityNotFound.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { QueryFailedErrorExceptionFilter } from './common/exceptions/postgresQueryFailedError.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * Swagger configuations
   */
  const options = new DocumentBuilder()
    .setTitle('MyrefillServer')
    .setDescription('Myrefill Server API description')
    .setVersion('0.1')
    .addBearerAuth()
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

  /**
   *  View engine configuation
   */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
