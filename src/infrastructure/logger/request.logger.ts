import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import PinoHttp, { HttpLogger } from 'pino-http';
import { GCPLogger } from './gcp.logger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestLogger implements NestMiddleware {
  private _pinoHttp: HttpLogger;

  constructor(
    private _logger: GCPLogger,
    private readonly configService: ConfigService,
  ) {
    const _projectId = this.configService.get('PROJECT_ID');
    this._pinoHttp = PinoHttp({
      logger: _logger.logger,
      customProps: (req: Request) => {
        try {
          const traceHeader = req.headers['X-Cloud-Trace-Context'] as string;
          let trace;
          if (traceHeader) {
            const [traceId] = traceHeader.split('/');
            trace = `projects/${_projectId}/traces/${traceId}`;
          }
          return {
            'logging.googleapis.com/trace': trace,
          };
        } catch (e) {
          throw new Error('Something went wrong.' + e);
        }
      },
    });
  }
  use(
    req: Request,
    res: Response,
    next: (error?: Error | NextFunction) => void,
  ) {
    this._pinoHttp(req, res);
    next();
  }

  public get pinoHttp(): HttpLogger {
    return this._pinoHttp;
  }
}
