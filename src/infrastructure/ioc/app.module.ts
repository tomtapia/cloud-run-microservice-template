import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure.module';
import { GCPLogger, RequestLogger } from '../logger';
import { CompressionMiddleware } from '../adapters/inbound/http/middleware/compression.middleware';
import { HelmetMiddleware } from '../adapters/inbound/http/middleware/helmet.middleware';
import { AllExceptionsFilter } from '../adapters/inbound/http/filters/http-exception.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { getEnv } from '../env';

/**
 * AppModule is the root module of the application.
 * It imports necessary modules and sets up global configurations.
 */
@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: getEnv(),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        throttlers: [
          {
            name: 'short',
            ttl: configService.get<number>('THROTTLER_SHORT_TTL_SEC', 1) * 1000,
            limit: configService.get<number>('THROTTLER_SHORT_LIMIT', 3),
          },
          {
            name: 'medium',
            ttl:
              configService.get<number>('THROTTLER_MEDIUM_TTL_SEC', 10) * 1000,
            limit: configService.get<number>('THROTTLER_MEDIUM_LIMIT', 5),
          },
          {
            name: 'long',
            ttl: configService.get<number>('THROTTLER_LONG_TTL_SEC', 60) * 1000,
            limit: configService.get<number>('THROTTLER_LONG_LIMIT', 10),
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    GCPLogger,
    RequestLogger,
    AllExceptionsFilter,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Applies rate limiting globally
    },
  ],
  exports: [GCPLogger, RequestLogger, AllExceptionsFilter],
})
export class AppModule implements NestModule {
  /**
   * Configures middleware for the application.
   * Applies RequestLogger, HelmetMiddleware, and CompressionMiddleware to all routes.
   * @param consumer The middleware consumer.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLogger, HelmetMiddleware, CompressionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
