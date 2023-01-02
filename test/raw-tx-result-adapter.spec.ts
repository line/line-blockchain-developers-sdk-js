import { expect } from "chai";
import { describe, it } from "mocha";
import {
  accountCreateMsgTxResult,
  accountEmptyMsgTxResult,
  baseCoinTransferTxResult
} from "./test-data";
import {
  LbdTxEventsAdapterV1,
  RawTransactionResultAdapter
} from "../lib/tx-result-adapters";
import {
  EventAccountCreated,
  EventCoinTransferred,
  EventEmptyMsgCreated
} from "../lib/tx-core-models";

describe("raw-tx-result-adapter test", () => {

    it("with accountCreateTxResult", () => {
      let inputTxResultResponse = accountCreateMsgTxResult;
      let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
      expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

      let adapter = new LbdTxEventsAdapterV1();

      let actual = adapter.adapt(rawTransactionResult);

      expect(1).to.equal(actual.size);

      let event = actual.values().next().value;
      expect(EventAccountCreated.name).to.equal(event.constructor.name);
      let eventAccountCreated: EventAccountCreated = event
      expect("link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd").to.equals(eventAccountCreated.createdAddress)
      expect(0).to.equals(eventAccountCreated.msgIndex)
      expect("EventAccountCreated").to.equals(eventAccountCreated.eventName)
    });

  it("with accountEmptyTxResult", () => {
    let inputTxResultResponse = accountEmptyMsgTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let adapter = new LbdTxEventsAdapterV1();

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventEmptyMsgCreated.name).to.equal(event.constructor.name);
    let eventEmptyMsgCreated: EventEmptyMsgCreated = event
    expect("EventEmptyMsgCreated").to.equals(eventEmptyMsgCreated.eventName)
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equals(eventEmptyMsgCreated.senderAddress)
  });

    it("with baseCoinTransferTxResult", () => {
        let inputTxResultResponse = baseCoinTransferTxResult;
        let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
        expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

        let adapter = new LbdTxEventsAdapterV1();

        let actual = adapter.adapt(rawTransactionResult);

        expect(1).to.equal(actual.size);

        let event = actual.values().next().value;
        expect(EventCoinTransferred.name).to.equal(event.constructor.name);
        let eventCoinTransferred: EventCoinTransferred = event
        expect("tcony").to.equals(eventCoinTransferred.denomination)
        expect("1").to.equals(eventCoinTransferred.amount)
        expect(0).to.equals(eventCoinTransferred.msgIndex)
        expect("EventCoinTransferred").to.equals(eventCoinTransferred.eventName)
    });
});


