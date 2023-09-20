import { Logger } from "tslog";
import _ from "lodash";
import { LoggerWrapper } from "./logger-wrapper";

const DEFAULT_LOG_LEVEL = process.env.log_level || "debug";

export class LoggerFactory {
  static logger(name: string, config: { [key: string]: any } = {}): LoggerWrapper {
    const loggerConfig = config
      ? _.cloneDeep(config)
      : {
          name: name,
          exposeErrorCodeFrame: false,
          displayFilePath: "hidden",
          minLevel: DEFAULT_LOG_LEVEL,
        };
    loggerConfig["name"] = name;
    return new LoggerWrapper(new Logger(loggerConfig));
  }
}
