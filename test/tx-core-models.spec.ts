import { expect } from "chai";
import { describe, it } from "mocha";

import {
  TransactionEvent,
  TxMessage,
  TxResult,
  TxResultSummary,
  TxSigner,
  TxStatusResult
} from "../lib/tx-core-models";

describe("core tx model tests", () => {
  it("build core models", () => {
    let txSigner = new TxSigner("tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7");

    let txStatusResult = new TxStatusResult(0, "");
    let txMessage = new TxMessage(
      0,
      "test",
    );
    let txEvent: TransactionEvent = {
      "eventName": "TestEvent",
    };

    let txResultSummary = new TxResultSummary(
      0,
      0,
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
      [txSigner],
      txStatusResult,
    );

    let txResult = new TxResult(txResultSummary, [txMessage], [txEvent]);

    let expectedTxResultJson = "{\"summary\":{\"height\":0,\"txIndex\":0,\"txHash\":\"D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A\",\"signers\":[{\"address\":\"tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7\"}],\"result\":{\"code\":0,\"codeSpace\":\"\",\"result\":\"SUCCEEDED\"}},\"txMessages\":[{\"msgIndex\":0,\"requestType\":\"test\",\"details\":{}}],\"txEvents\":[{\"eventName\":\"TestEvent\"}]}";
    expect(JSON.stringify(txResult.toJson())).to.equal(expectedTxResultJson);
  });
});
