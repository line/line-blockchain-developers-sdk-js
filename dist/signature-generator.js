"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureGenerator = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const lodash_1 = __importDefault(require("lodash"));
const request_body_flattener_1 = require("./request-body-flattener");
/**
reference site: https://jokecamp.wordpress.com/2012/10/21/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/#js
*/
class SignatureGenerator {
    static signature(apiSecret, method, path, timestamp, nonce, parameters = {}, // query string
    body = {}) {
        let signTarget = SignatureGenerator.createSignTarget(method, path, timestamp, nonce, parameters, body);
        let hasQueryParam = lodash_1.default.size(parameters) > 0;
        if (parameters && hasQueryParam) {
            signTarget += request_body_flattener_1.RequestBodyFlattener.flatten(parameters);
        }
        if (body && lodash_1.default.size(body) > 0) {
            if (hasQueryParam) {
                signTarget += "&" + request_body_flattener_1.RequestBodyFlattener.flatten(body);
            }
            else {
                signTarget += request_body_flattener_1.RequestBodyFlattener.flatten(body);
            }
        }
        let hash = crypto_js_1.default.HmacSHA512(signTarget, apiSecret);
        return crypto_js_1.default.enc.Base64.stringify(hash);
    }
    static createSignTarget(method, path, timestamp, nonce, parameters = {}, // query string
    body = {}) {
        let signTarget = `${nonce}${timestamp}${method}${path}`;
        if ((parameters && lodash_1.default.size(parameters) > 0) || (body && lodash_1.default.size(body) > 0)) {
            if (signTarget.indexOf('?') < 0) {
                signTarget += '?';
            }
            else {
                signTarget += '&';
            }
        }
        return signTarget;
    }
}
exports.SignatureGenerator = SignatureGenerator;
