import _ from "lodash";
import * as chai from "chai";
const expect = chai.expect;
import { Constant } from "../lib/constants";
import { PageRequest } from "../lib/request";

export class HttpTestUtil {
    private constructor() { }

    public static assertHeaders(headers: any) {
        expect(headers).to.have.any.keys(Constant.SERVICE_API_KEY_HEADER);
        expect(headers).to.have.any.keys(Constant.NONCE_HEADER);
        expect(headers).to.have.any.keys(Constant.SIGNATURE_HEADER);
        expect(headers).to.have.any.keys(Constant.TIMESTAMP_HEADER);
    }

    public static assertPageParameters(pageParameters: any, pageRequest: PageRequest) {
        expect(pageParameters["page"]).to.equal(pageRequest.page);
        expect(pageParameters["limit"]).to.equal(pageRequest.limit);
        expect(pageParameters["orderBy"]).to.equal(pageRequest.orderBy);
    }

    public static assertParameters(configParams: any, params: any) {
        console.log("configParams: " + JSON.stringify(configParams));
        _.forOwn(params, (value, key) => {
            console.log(`key:${key}, value: ${value}`);
            expect(configParams[key]).to.equal(value);
        });
    }
}
