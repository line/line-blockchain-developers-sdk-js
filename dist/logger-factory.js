"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const tslog_1 = require("tslog");
const lodash_1 = __importDefault(require("lodash"));
class LoggerFactory {
    static logger(name, config = {}) {
        const loggerConfig = config ? lodash_1.default.cloneDeep(config) : { "name": name, "exposeErrorCodeFrame": false, "displayFilePath": "hidden", "minLevel": "info" };
        loggerConfig["name"] = name;
        return new tslog_1.Logger(loggerConfig);
    }
}
exports.LoggerFactory = LoggerFactory;
