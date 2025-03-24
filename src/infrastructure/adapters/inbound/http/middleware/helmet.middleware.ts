import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private helmet: any;

  constructor() {
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
