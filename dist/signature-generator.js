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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9zaWduYXR1cmUtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDBEQUFpQztBQUNqQyxvREFBdUI7QUFDdkIscUVBQWdFO0FBQ2hFOztFQUVFO0FBQ0YsTUFBYSxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FDZCxTQUFpQixFQUNqQixNQUFjLEVBQ2QsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLEtBQWEsRUFDYixhQUFxQixFQUFFLEVBQUUsZUFBZTtJQUN4QyxPQUFlLEVBQUU7UUFFakIsSUFBSSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLGFBQWEsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUMsSUFBSSxVQUFVLElBQUksYUFBYSxFQUFFO1lBQy9CLFVBQVUsSUFBSSw2Q0FBb0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLElBQUksSUFBSSxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLFVBQVUsSUFBSSxHQUFHLEdBQUcsNkNBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLFVBQVUsSUFBSSw2Q0FBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEQ7U0FDRjtRQUNELElBQUksSUFBSSxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RCxPQUFPLG1CQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDN0IsTUFBYyxFQUNkLElBQVksRUFDWixTQUFpQixFQUNqQixLQUFhLEVBQ2IsYUFBcUIsRUFBRSxFQUFFLGVBQWU7SUFDeEMsT0FBZSxFQUFFO1FBRWpCLElBQUksVUFBVSxHQUFHLEdBQUcsS0FBSyxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsSUFBSSxnQkFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4RSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixVQUFVLElBQUksR0FBRyxDQUFBO2FBQ2xCO2lCQUFNO2dCQUNMLFVBQVUsSUFBSSxHQUFHLENBQUE7YUFDbEI7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQTVDRCxnREE0Q0MifQ==