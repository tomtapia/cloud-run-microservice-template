import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnv } from '../env';
import { InfrastructureModule } from './infrastructure.module';
import { GCPLogger, RequestLogger } from '../logger';
import { CompressionMiddleware } from '../http/middleware/compression.middleware';
import { HelmetMiddleware } from '../http/middleware/helmet.middleware';
import { AllExceptionsFilter } from '../http/filters/http-exception.filter';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: getEnv(),
    }),
  ],
  providers: [GCPLogger, RequestLogger, AllExceptionsFilter],
  exports: [GCPLogger, RequestLogger, AllExceptionsFilter],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      RequestLogger,
      HelmetMiddleware,
      CompressionMiddleware,
    ];
    consumer
      .apply(...middlewares)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
