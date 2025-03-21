import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './infrastructure/ioc/app.module';
import { GCPLogger } from './infrastructure/logger';
import { join } from 'path';
import { AllExceptionsFilter } from './infrastructure/http/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration Service Instance
  const configService: ConfigService = app.get(ConfigService);
  // Logger Service Initalization
  const logger: GCPLogger = app.get(GCPLogger);
  app.useLogger(logger);
  // Exception Filter Configuration
  app.useGlobalFilters(app.get(AllExceptionsFilter));
  // Static configuration for Views.
  app.useStaticAssets(join(__dirname, 'infrastructure/http', 'public'));
  app.setBaseViewsDir(join(__dirname, 'infrastructure/http', 'views'));
  app.setViewEngine('hbs');
  // Swagger Configuration
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
