import { Logger } from "tslog";

export class LoggerWrapper {
  private logger: Logger;
  private on: boolean = true;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  public logOn(): LoggerWrapper {
    this.on = true;
    return this;
  }
  public logOff(): LoggerWrapper {
    this.on = false;
    return this;
  }
  public silly(...args: unknown[]): void {
    this.on ? this.logger.silly(...args) : null;
  }
  public trace(...args: unknown[]): void {
    this.on ? this.logger.trace(...args) : null;
  }
  public debug(...args: unknown[]): void {
    this.on ? this.logger.debug(...args) : null;
  }
  public info(...args: unknown[]): void {
    this.on ? this.logger.info(...args) : null;
  }
  public warn(...args: unknown[]): void {
    this.on ? this.logger.warn(...args) : null;
  }
  public error(...args: unknown[]): void {
    this.on ? this.logger.error(...args) : null;
  }
  public fatal(...args: unknown[]): void {
    this.on ? this.logger.fatal(...args) : null;
  }
}