import { expect } from "chai";
import { describe, it } from "mocha";
import { RawTransactionResult } from "../lib/tx-raw-models";
import { accountEmptyMsgTxResult, baseCoinTransferTxResult } from "./test-data";


describe("RawTransactionResult test", () => {

    it("test baseCoinTransferTxResult", () => {
        let rawTransactionResult: RawTransactionResult = baseCoinTransferTxResult;
        expect(53310).to.equal(rawTransactionResult.height);
    });

    it("test accountMsgEmptyTxResult", () => {
        let rawTransactionResult: RawTransactionResult = accountEmptyMsgTxResult;
        expect(1207045).to.equal(rawTransactionResult.height);
    });
});
