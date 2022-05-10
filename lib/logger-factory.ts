import { Logger } from "tslog";
import _ from "lodash";

const DEFAULT_LOG_LEVEL = process.env.log_level || "debug";
export class LoggerFactory {
  static logger(name: string, config: object = {}): Logger {
    const loggerConfig = config
      ? _.cloneDeep(config)
      : {
          name: name,
          exposeErrorCodeFrame: false,
          displayFilePath: "hidden",
          minLevel: DEFAULT_LOG_LEVEL,
        };
    loggerConfig["name"] = name;
    return new Logger(loggerConfig);
  }
}
