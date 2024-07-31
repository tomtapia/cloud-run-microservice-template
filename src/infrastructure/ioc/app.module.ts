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
import { CompressionMiddleware } from '../middleware/compression.middleware';
import { HelmetMiddleware } from '../middleware/helmet.middleware';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: getEnv(),
    }),
  ],
  providers: [GCPLogger, RequestLogger],
  exports: [GCPLogger, RequestLogger],
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
