import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import { GCPLogger } from '../logger/gcp.logger';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private compression: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: GCPLogger,
  ) {
    this.compression = compression();
  }

  use(
    request: Request,
    response: Response,
    next: (error?: Error | NextFunction) => void,
  ) {
    this.compression(request, response, next);
  }
}
