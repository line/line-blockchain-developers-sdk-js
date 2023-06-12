import {expect} from "chai";
import {describe, it} from "mocha";
import {
  RawMessageEventKeyType,
  RawMessageEventKeyTypes,
  RawMessageEventKeyTypeUtil
} from "../lib/tx-raw-models";

describe("RawEventTypesUtil tests", () => {
  it("test convertToEventType with AccountMsgCreateAccount", () => {
    let matchedTypeValue = "account/MsgCreateAccount";
    let actualValue: RawMessageEventKeyType = RawMessageEventKeyTypeUtil.convertToEventType(matchedTypeValue);

    let expectedValue: RawMessageEventKeyType = RawMessageEventKeyTypes.AccountMsgCreateAccount;
    expect(expectedValue).to.equal(actualValue);
  });

});
