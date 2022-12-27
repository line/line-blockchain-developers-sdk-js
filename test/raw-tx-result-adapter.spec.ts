import { expect } from "chai";
import { describe, it } from "mocha";
import { baseCoinTransferTxResult } from "./test-data";
import { RawTransactionResultAdapter } from "../lib/tx-result-adapters"

describe("raw-tx-result-adapter test", () => {
    it("with baseCoinTransferTxResult", () => {
        let inputTxResultResponse = baseCoinTransferTxResult;
        let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
        expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);
    });
});