import { Logger } from "tslog";
import _ from "lodash";

export class LoggerFactory {
  static logger(name: string, config: object = {}): Logger {

    const loggerConfig = config ? _.cloneDeep(config) : { "name": name, "exposeErrorCodeFrame": false, "displayFilePath": "hidden", "minLevel": "info" };
    loggerConfig["name"] = name;
    return new Logger(loggerConfig);
  }
}
