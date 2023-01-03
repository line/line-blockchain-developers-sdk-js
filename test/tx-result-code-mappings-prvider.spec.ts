import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultCodeMappingsProvider, TxResultType } from "../lib/tx-result-codes";
import { transferFromNonFungibleTxResult, failedTransferFromNonFungibleTxResult } from "./test-data";


describe("txResultMessageParserFactory-test", () => {
    it("test get tx-result-codes", () => {
        expect(false, TxResultCodeMappingsProvider.codes("bank")[0].isSuccess());
        expect(TxResultType.FAIL, TxResultCodeMappingsProvider.codes("bank")[0].txResultType());
        expect(1, TxResultCodeMappingsProvider.codes("bank")[0].code);
        expect("No \"inputs\" for \"send\" type transaction", TxResultCodeMappingsProvider.codes("bank")[0].description);
    });

    it("test get tx-result-code from successful txResult", () => {
        const txResultCode = TxResultCodeMappingsProvider.code(transferFromNonFungibleTxResult);
        expect(true, txResultCode.isSuccess);
        expect(TxResultType.SUCCESS, txResultCode.txResultType)
        expect(0, txResultCode.code);
        expect("", txResultCode.description);
    });

    it("test get tx-result-code from failed txResult", () => {
        const txResultCode = TxResultCodeMappingsProvider.code(failedTransferFromNonFungibleTxResult);
        expect(false, txResultCode.isSuccess);
        expect(TxResultType.FAIL, txResultCode.txResultType)
        expect(23, txResultCode.code);
        expect("Token is being not owned.", txResultCode.description);
    });
});
