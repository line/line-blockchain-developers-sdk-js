import { Logger } from "tslog";

export class LoggerController {
  private logger: Logger;
  private fakeLogger: FakeLogger = new FakeLogger();
  private on: boolean = true;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  public exec(): Logger | FakeLogger {
    return this.on ? this.logger : this.fakeLogger;
  }
  public logOn(): LoggerController {
    this.on = true;
    return this;
  }
  public logOff(): LoggerController {
    this.on = false;
    return this;
  }
}

class FakeLogger {
  silly(...args: unknown[]): void {
    args;
    return
  }
  trace(...args: unknown[]): void {
    args;
    return
  }
  debug(...args: unknown[]): void {
    args;
    return
  }
  info(...args: unknown[]): void {
    args;
    return
  }
  warn(...args: unknown[]): void {
    args;
    return
  }
  error(...args: unknown[]): void {
    args;
    return
  }
  fatal(...args: unknown[]): void {
    args;
    return
  }
}