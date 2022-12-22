import { expect } from "chai";
import { describe, it } from "mocha";
import { RawEventType, RawEventTypes, RawEventTypesUtil } from "../lib/tx-raw-models";

describe("RawEventTypesUtil tests", () => {
    it("test convertToEventType with AccountMsgCreateAccount", () => {
        let matchedTypeValue = "account/MsgCreateAccount";
        let actualValue: RawEventType = RawEventTypesUtil.convertToEventType(matchedTypeValue);

        let expectedValue: RawEventType = RawEventTypes.getInstance().AccountMsgCreateAccount;
        expect(expectedValue).to.equal(actualValue);
    });
});