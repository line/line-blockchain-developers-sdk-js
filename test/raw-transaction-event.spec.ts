import {expect} from "chai";
import {describe, it} from "mocha";
import {
  RawTransactionEvent,
  RawTransactionEventUtil,
  RawTransactionEventAttribute,
  EventAttributeType,
  EventAttributeUtil,
  EventAttributeTypes
} from "../lib/tx-raw-models";

describe("RawTransactionEvent test", () => {
  it("test findAttributeNotNull with unknown eventAttributeType", () => {
    let defaultValue = ""
    let attributes = [new RawTransactionEventAttribute("amount", "120000")];
    let rawTransactionEvent = new RawTransactionEvent(
      "test-type",
      attributes
    )

    let testEventAttributeType: EventAttributeType = {
      names: ["unknown"],
      matches(attributeName: string): boolean {
        return EventAttributeUtil.hasMatchedAttribute(this.names, attributeName);
      }
    }

    let actualValue = RawTransactionEventUtil.findAttributeNotNull(rawTransactionEvent, testEventAttributeType, defaultValue);
    let expectedValue = defaultValue;
    expect(expectedValue).to.equal(actualValue);
  });

  it("test findAttributeNotNull with amount eventAttributeType", () => {
    let attributes = [new RawTransactionEventAttribute("amount", "120000")];
    let rawTransactionEvent = new RawTransactionEvent(
      "test-type",
      attributes
    )

    let testEventAttributeType = EventAttributeTypes.Amount;
    let actualValue = RawTransactionEventUtil.findAttributeNotNull(rawTransactionEvent, testEventAttributeType, "")
    let expectedValue = "120000"
    expect(expectedValue).to.equal(actualValue);
  });

  it("test findAttributeNotNull with from eventAttributeType", () => {
    let attributes = [new RawTransactionEventAttribute("from", "test-from-address")];
    let rawTransactionEvent = new RawTransactionEvent(
      "from",
      attributes
    )

    let testEventAttributeType = EventAttributeTypes.From;
    let actualValue = RawTransactionEventUtil.findAttributeNotNull(rawTransactionEvent, testEventAttributeType, "")
    let expectedValue = "test-from-address"
    expect(expectedValue).to.equal(actualValue);
  });

  it("test findAttributeNotNull with approver eventAttributeType", () => {
    let attributes = [new RawTransactionEventAttribute("approver", "test-approver-address")];
    let rawTransactionEvent = new RawTransactionEvent(
      "approver",
      attributes
    )

    let testEventAttributeType = EventAttributeTypes.Approver;
    let actualValue = RawTransactionEventUtil.findAttributeNotNull(rawTransactionEvent, testEventAttributeType, "")
    let expectedValue = "test-approver-address"
    expect(expectedValue).to.equal(actualValue);
  });
});
