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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvbG9nZ2VyLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQStCO0FBQy9CLG9EQUF1QjtBQUV2QixNQUFhLGFBQWE7SUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRTtRQUU3QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDckosWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixPQUFPLElBQUksY0FBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQVBELHNDQU9DIn0=