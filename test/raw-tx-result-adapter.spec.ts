import { expect } from "chai";
import { describe, it } from "mocha";
import { baseCoinTransferTxResult } from "./test-data";
import { LbdTxEventsAdapterV1, RawTransactionResultAdapter } from "../lib/tx-result-adapters";
import { EventCoinTransferred } from "../lib/tx-core-models";

describe("raw-tx-result-adapter test", () => {
  it("with baseCoinTransferTxResult", () => {
    let inputTxResultResponse = baseCoinTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let adapter = new LbdTxEventsAdapterV1();

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCoinTransferred.name).to.equal(event.constructor.name);
    let eventCoinTransferred: EventCoinTransferred = event;

    let expectedValue = new EventCoinTransferred(
      0,
      "tcony",
      "1",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
    );

    expect(expectedValue).to.deep.equal(eventCoinTransferred);
  });
});
