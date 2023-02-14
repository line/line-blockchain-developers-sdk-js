import { describe, it } from "mocha";
import { HrpPrefix } from "../lib/constants";
import {
  LbdTxResultAdapterV1,
  TxResultAdapter,
} from "../lib/tx-result-adapters";
import { RawTransactionResult } from "../lib/tx-raw-models";
import { TxResult, TxSigner } from "../lib/tx-core-models";
import {
  accountMsgEmptyTxResult,
  baseCoinTransferTxResult,
  createAccountTxResult,
} from "./test-data";
import { expect } from "chai";
import _ from "lodash";

describe("LbdTxResultAdapterV1 test", () => {
  let underTest: TxResultAdapter<RawTransactionResult, TxResult> = new LbdTxResultAdapterV1(
    HrpPrefix.TEST_NET);

  it("test baseCoinTransferTxResult", () => {
    let inputRawTxResult = baseCoinTransferTxResult;
    let lbdTxResult = underTest.adapt(inputRawTxResult);
    expect(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
    expect(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
    expect(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
    expect(lbdTxResult.summary.timestamp).to.equal(inputRawTxResult.timestamp);
    expect(lbdTxResult.summary.signers)
      .to
      .deep
      .include(new TxSigner("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"));
    expect(lbdTxResult.messages).to.be.not.empty;
    expect(lbdTxResult.events).to.be.not.empty;
    expect(_.first(Array.from(lbdTxResult.events))["eventName"])
      .to
      .equal("EventCoinTransferred");
  });

  it("test createAccountTxResult", () => {
    let inputRawTxResult = createAccountTxResult;
    let lbdTxResult = underTest.adapt(inputRawTxResult);
    expect(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
    expect(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
    expect(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
    expect(lbdTxResult.summary.timestamp).to.equal(inputRawTxResult.timestamp);
    expect(lbdTxResult.messages).to.be.not.empty;
    expect(lbdTxResult.events).to.be.not.empty;
    expect(_.first(Array.from(lbdTxResult.events))["eventName"])
      .to
      .equal("EventAccountCreated");
  });

  it("test accountMsgEmptyTxResult", () => {
    let inputRawTxResult = accountMsgEmptyTxResult;
    let lbdTxResult = underTest.adapt(inputRawTxResult);
    expect(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
    expect(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
    expect(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
    expect(lbdTxResult.summary.timestamp).to.equal(inputRawTxResult.timestamp);
    expect(lbdTxResult.messages).to.be.not.empty;
    expect(lbdTxResult.events).to.be.not.empty;
    expect(_.first(Array.from(lbdTxResult.events))["eventName"])
      .to
      .equal("EventEmptyMsgCreated");
  });
});


