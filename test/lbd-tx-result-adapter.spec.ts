import _ from "lodash";
import { expect } from "chai";
import { describe, it } from "mocha";
import { HrpPrefix } from "../lib/constants";
import {
  TxResultAdapter,
  LbdTxResultAdapterV1
} from "../lib/tx-result-adapters";
import { RawTransactionResult } from "../lib/tx-raw-models";
import { TxResult, TxSigner } from "../lib/tx-core-models";
import { baseCoinTransferTxResult } from "./test-data";

describe("LbdTxResultAdapterV1 test", () => {
  let underTest: TxResultAdapter<RawTransactionResult, TxResult> = new LbdTxResultAdapterV1(HrpPrefix.TEST_NET);

  it("test baseCoinTransferTxResult", () => {
    let inputRawTxResult = baseCoinTransferTxResult;
    let lbdTxResult = underTest.adapt(inputRawTxResult);
    expect(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
    expect(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
    expect(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
    expect(lbdTxResult.summary.signers).to.deep.include(new TxSigner("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"));
    expect(lbdTxResult.txMessages).to.be.not.empty;
    expect(lbdTxResult.txEvents).to.be.not.empty;
    expect(_.first(Array.from(lbdTxResult.txEvents))["type"]).to.equal("CoinMsgSend");
  });
});
