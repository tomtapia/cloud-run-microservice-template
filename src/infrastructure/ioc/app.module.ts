import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnv } from '../env';
import { InfrastructureModule } from './infrastructure.module';
import { GCPLogger, RequestLogger } from '../logger';
import { CompressionMiddleware } from '../middleware/compression.middleware';
import { HelmetMiddleware } from '../middleware/helmet.middleware';

const gcpProjectIdValue = {
  provide: 'GCP_PROJECT_ID',
  useFactory: (configService: ConfigService) => {
    return configService.get('GOOGLE_CLOUD_PROJECT');
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: getEnv(),
    }),
  ],
  providers: [gcpProjectIdValue, GCPLogger, RequestLogger],
  exports: [gcpProjectIdValue, GCPLogger, RequestLogger],
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
