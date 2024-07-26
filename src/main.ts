import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './infrastructure/ioc/app.module';
import { GCPLogger } from './infrastructure/logger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: GCPLogger = app.get(GCPLogger);
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(configService.get('APP_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT: number = configService.get('PORT') || 3000;
  await app.listen(PORT, () => logger.log(`Listening on port ${PORT}`));
}

bootstrap();
