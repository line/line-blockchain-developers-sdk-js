import { expect } from "chai";
import { describe, it } from "mocha";

import {
  TxMessage,
  TxSigner,
  TxStatusResult,
  TransactionEvent,
  TxResultSummary,
  TxResult,
} from "../lib/tx-core-models";

describe("core tx model tests", () => {
  it("build core models", () => {
    let txSigner = new TxSigner("tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7");

    let txStatusResult = new TxStatusResult(0, "");
    let txMessage = new TxMessage(
      0,
      "test",
      {
        "key": "test",
        "value": "test value",
      },
    );
    let txEvent: TransactionEvent = {
      "eventName": "TestEvent",
    };

    let timestamp = 1615593846507;

    let txResultSummary = new TxResultSummary(
      0,
      0,
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
      timestamp,
      [txSigner],
      txStatusResult,
    );

    let txResult = new TxResult(txResultSummary, [txMessage], [txEvent]);

    let expectedTxResultJson = "{\"summary\":{\"height\":0,\"txIndex\":0,\"txHash\":\"D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A\",\"timestamp\":1615593846507,\"signers\":[{\"address\":\"tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7\"}],\"result\":{\"code\":0,\"codeSpace\":\"\",\"result\":\"SUCCEEDED\"}},\"messages\":[{\"msgIndex\":0,\"requestType\":\"test\",\"details\":{\"key\":\"test\",\"value\":\"test value\"}}],\"events\":[{\"eventName\":\"TestEvent\"}]}";
    expect(JSON.stringify(txResult.toJson())).to.equal(expectedTxResultJson);
  });
});
