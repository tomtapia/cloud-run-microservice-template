import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { GCPLogger } from '../logger/gcp.logger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private helmet: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: GCPLogger,
  ) {
    this.helmet = helmet();
  }

  use(
    request: Request,
    response: Response,
    next: (error?: Error | NextFunction) => void,
  ) {
    this.helmet(request, response, next);
  }
}
