import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import Pino, { Logger } from 'pino';

@Injectable()
export class GCPLogger implements LoggerService {
  private _logger: Logger;

  constructor() {
    this._logger = Pino({
      formatters: {
        level(label) {
          return { severity: label };
        },
      },
      messageKey: 'message',
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug?.(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace?.(message, ...optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not supported.');
  }

  public get logger(): Logger {
    return this._logger;
  }
}
