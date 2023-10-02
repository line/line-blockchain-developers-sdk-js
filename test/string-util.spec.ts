import { expect } from "chai";
import { describe, it } from "mocha";
import { StringUtil } from "../lib/string-util";

describe("StringUtil tests", () => {
  it("test parseAmount", () => {
    var testAmount = "1:tcony";
    var parseAmount = StringUtil.parseAmount(testAmount);
    expect("1").to.equal(parseAmount.amount);
    expect("tcony").to.equal(parseAmount.denomination);

    testAmount = "1000000:tcony";
    parseAmount = StringUtil.parseAmount(testAmount);
    expect("1000000").to.equal(parseAmount.amount);
    expect("tcony").to.equal(parseAmount.denomination);

    testAmount = "1000000tcony";
    parseAmount = StringUtil.parseAmount(testAmount);
    expect("1000000").to.equal(parseAmount.amount);
    expect("tcony").to.equal(parseAmount.denomination);
  });
});
