import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as compression from 'compression';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private compression: any;

  constructor() {
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
