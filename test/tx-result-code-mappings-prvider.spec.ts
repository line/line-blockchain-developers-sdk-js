import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultCodeMappingsProvider, TxResultType } from "../lib/tx-result-codes";
import { transferFromNonFungibleTxResult, failedTransferFromNonFungibleTxResult } from "./test-data";

describe("txResultMessageParserFactory-test", () => {
  it("test get tx-result-codes", () => {
    expect(TxResultCodeMappingsProvider.codes("bank")[1].isSuccess()).to.false;
    expect(TxResultType.FAIL).to.equal(TxResultCodeMappingsProvider.codes("bank")[1].txResultType());
    expect(1).to.equal(TxResultCodeMappingsProvider.codes("bank")[1].code);
    expect('No "inputs" for "send" type transaction', TxResultCodeMappingsProvider.codes("bank")[1].description);
  });

  it("test get tx-result-code from successful txResult", () => {
    const txResultCode = TxResultCodeMappingsProvider.code(transferFromNonFungibleTxResult);
    expect(txResultCode.isSuccess()).to.true;
    expect(TxResultType.SUCCESS).to.equal(txResultCode.txResultType());
    expect(0).to.equal(txResultCode.code);
    expect("").to.equal(txResultCode.description);
  });

  it("test get tx-result-code from failed txResult", () => {
    const txResultCode = TxResultCodeMappingsProvider.code(failedTransferFromNonFungibleTxResult);
    expect(txResultCode.isSuccess()).to.false;
    expect(TxResultType.FAIL).to.equal(txResultCode.txResultType());
    expect(23).to.equal(txResultCode.code);
    expect("Token is being not owned.").to.equal(txResultCode.description);
  });
});
