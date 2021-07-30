"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBodyFlattener = void 0;
const lodash_1 = __importDefault(require("lodash"));
const EMPTY = "";
class RequestBodyFlattener {
    static flatten(requestBody = {}) {
        const objBody = lodash_1.default.cloneDeep(requestBody);
        const flatPair = {}; // we're going to convert objBody to flatPair
        Object.keys(objBody).forEach(key => {
            const value = objBody[key];
            if (Array.isArray(value)) {
                // scan for all sub-keys
                let allSubKeys = [];
                value.forEach(elem => {
                    allSubKeys = lodash_1.default.union(allSubKeys, Object.keys(elem));
                });
                // now we have keys for elements. fill-in flatPair
                value.forEach(elem => {
                    allSubKeys.forEach(subKey => {
                        const flatKey = `${key}.${subKey}`;
                        const flatRawValue = elem[subKey] ? elem[subKey] : EMPTY;
                        const prevFlatValue = flatPair[flatKey];
                        flatPair[flatKey] =
                            lodash_1.default.isUndefined(prevFlatValue) ? flatRawValue : `${prevFlatValue},${flatRawValue}`;
                    });
                });
            }
            else {
                flatPair[key] = objBody[key];
            }
        });
        return Object.keys(flatPair).sort().map(key => `${key}=${flatPair[key]}`).join('&');
    }
}
exports.RequestBodyFlattener = RequestBodyFlattener;
