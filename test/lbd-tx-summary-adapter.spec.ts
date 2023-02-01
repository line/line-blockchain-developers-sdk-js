import { expect } from "chai";
import { describe, it } from "mocha";
import { HrpPrefix } from "../lib/constants";
import { TxSigner, TxSuccessResult } from "../lib/tx-core-models";
import { LbdTxSummaryAdapterV1 } from "../lib/tx-result-adapters";
import { baseCoinTransferTxResult } from "./test-data";


describe("lbd-tx-result-summary-adapter test", () => {
    it("with baseCoinTransferTxResult", () => {
        let inputRawTxResult = baseCoinTransferTxResult;
        let lbdTxResultSummary = new LbdTxSummaryAdapterV1(HrpPrefix.TEST_NET).adapt(inputRawTxResult);

        expect(inputRawTxResult.height).to.equal(lbdTxResultSummary.height);
        expect(inputRawTxResult.txhash).to.equal(lbdTxResultSummary.txHash);
        expect(inputRawTxResult.index).to.equal(lbdTxResultSummary.txIndex);
        expect(inputRawTxResult.code).to.equal(lbdTxResultSummary.result.code);
        expect(inputRawTxResult.codespace).to.equal(lbdTxResultSummary.result.codeSpace);
        expect(TxSuccessResult.SUCCEEDED).to.equal(lbdTxResultSummary.result.result);

        let expectedSigners = [new TxSigner("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq")]
        expect(expectedSigners).to.deep.equal(lbdTxResultSummary.signers);
    });
});
