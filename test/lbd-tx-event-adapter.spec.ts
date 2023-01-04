import { expect } from "chai";
import { describe, it } from "mocha";
import {
  accountMsgEmptyTxResult,
  baseCoinTransferTxResult,
  createAccountTxResult,
  issueServiceTokenTxResult,
  serviceTokenBurnTxResult,
  serviceTokenMintTxResult,
  serviceTokenModifyTxResult,
  serviceTokenProxyApprovedTxResult,
  serviceTokenTransferFromTxResult,
  serviceTokenTransferTxResult
} from "./test-data";
import {
  LbdTxEventsAdapterV1,
  RawTransactionResultAdapter
} from "../lib/tx-result-adapters";
import {
  EventAccountCreated,
  EventCoinTransferred,
  EventEmptyMsgCreated,
  EventTokenBurned,
  EventTokenIssued,
  EventTokenMinted,
  EventTokenModified,
  EventTokenProxyApproved,
  EventTokenTransferred
} from "../lib/tx-core-models";


describe("lbd-tx-event-adapter test", () => {

  let adapter = new LbdTxEventsAdapterV1();

  // account
  it("with createAccountTxResult", () => {
    let inputTxResultResponse = createAccountTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventAccountCreated.name).to.equal(event.constructor.name);
    let eventAccountCreated: EventAccountCreated = event
    expect(0, eventAccountCreated.msgIndex)
    expect("link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd").to.equals(eventAccountCreated.createdAddress)
    expect(0).to.equals(eventAccountCreated.msgIndex)
    expect("EventAccountCreated").to.equals(eventAccountCreated.eventName)
  });

  it("with accountMsgEmptyTxResult", () => {
    let inputTxResultResponse = accountMsgEmptyTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventEmptyMsgCreated.name).to.equal(event.constructor.name);
    let eventEmptyMsgCreated: EventEmptyMsgCreated = event
    expect(0, eventEmptyMsgCreated.msgIndex)
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equals(eventEmptyMsgCreated.senderAddress)
    expect("EventEmptyMsgCreated").to.equals(eventEmptyMsgCreated.eventName)
  });

  // coin
  it("with baseCoinTransferTxResult", () => {
    let inputTxResultResponse = baseCoinTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventCoinTransferred.name).to.equal(event.constructor.name);
    let eventCoinTransferred: EventCoinTransferred = event
    expect(0, eventCoinTransferred.msgIndex)
    expect("tcony").to.equals(eventCoinTransferred.denomination)
    expect("1").to.equals(eventCoinTransferred.amount)
    expect(0).to.equals(eventCoinTransferred.msgIndex)
    expect("EventCoinTransferred").to.equals(eventCoinTransferred.eventName)
  });

  // token
  it("with issueServiceTokenTxResult", () => {
    let inputTxResultResponse = issueServiceTokenTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenIssued.name).to.equal(event.constructor.name);
    let eventTokenIssued: EventTokenIssued = event
    expect(0, eventTokenIssued.msgIndex)
    expect("Gamja", eventTokenIssued.name)
    expect("987654321", eventTokenIssued.amount)
    expect("9be17165", eventTokenIssued.contractId)
    expect("GAMJA", eventTokenIssued.symbol)
    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558", eventTokenIssued.issuerAddress)
    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558", eventTokenIssued.receiverAddress)
    expect(6, eventTokenIssued.decimals)
    expect(0, eventTokenIssued.msgIndex)
    expect("EventTokenIssued", eventTokenIssued.eventName)
  });

  it("with serviceTokenMintTxResult", () => {
    let inputTxResultResponse = serviceTokenMintTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenMinted.name).to.equal(event.constructor.name);
    let eventTokenMinted: EventTokenMinted = event
    expect(0, eventTokenMinted.msgIndex)
    expect("1000", eventTokenMinted.amount)
    expect("9636a07e", eventTokenMinted.contractId)
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", eventTokenMinted.minterAddress)
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww", eventTokenMinted.toAddress)
    expect(0, eventTokenMinted.msgIndex)
    expect("EventTokenMinted", eventTokenMinted.eventName)
  });

  it("with serviceTokenBurnTxResult", () => {
    let inputTxResultResponse = serviceTokenBurnTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenBurned.name).to.equal(event.constructor.name);
    let eventTokenBurned: EventTokenBurned = event
    expect(0, eventTokenBurned.msgIndex)
    expect("9be17165", eventTokenBurned.contractId)
    expect("1000", eventTokenBurned.amount)
    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9", eventTokenBurned.fromAddress)
    expect(0, eventTokenBurned.msgIndex)
    expect("EventTokenBurned", eventTokenBurned.eventName)
  });

  it("with serviceTokenBurnFromTxResult", () => {
    let inputTxResultResponse = serviceTokenBurnTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenBurned.name).to.equal(event.constructor.name);
    let eventTokenBurned: EventTokenBurned = event
    expect(0, eventTokenBurned.msgIndex)
    expect("678c146a", eventTokenBurned.contractId)
    expect("1", eventTokenBurned.amount)
    expect("link16mk739rd3r3q8a8dw7zr3h50xunxcq0wp80gtu", eventTokenBurned.fromAddress)
    expect("link17gx76scz3pe7gtqq8rmf46favtmxn3sgs6qa49", eventTokenBurned.proxyAddress)
    expect(0, eventTokenBurned.msgIndex)
    expect("EventTokenBurned", eventTokenBurned.eventName)
  });

  it("with serviceTokenModifyTxResult", () => {
    let inputTxResultResponse = serviceTokenModifyTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenModified.name).to.equal(event.constructor.name);
    let eventTokenModified: EventTokenModified = event
    expect(0, eventTokenModified.msgIndex)
    expect("9636a07e", eventTokenModified.contractId)
    expect("STname", eventTokenModified.tokenAttributes["name"])
    expect("meta", eventTokenModified.tokenAttributes["meta"])
    expect("EventTokenModified", eventTokenModified.eventName)
  });

  it("with serviceTokenTransferTxResult", () => {
    let inputTxResultResponse = serviceTokenTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenTransferred.name).to.equal(event.constructor.name);
    let eventTokenTransferred: EventTokenTransferred = event
    expect(0, eventTokenTransferred.msgIndex)
    expect("9636a07e", eventTokenTransferred.contractId)
    expect("1000", eventTokenTransferred.amount)
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", eventTokenTransferred.fromAddress)
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww", eventTokenTransferred.toAddress)
    expect(0, eventTokenTransferred.msgIndex)
    expect("EventTokenTransferred", eventTokenTransferred.eventName)
  });

  it("with serviceTokenTransferFromTxResult", () => {
    let inputTxResultResponse = serviceTokenTransferFromTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenTransferred.name).to.equal(event.constructor.name);
    let eventTokenTransferred: EventTokenTransferred = event
    expect(0, eventTokenTransferred.msgIndex)
    expect("9be17165", eventTokenTransferred.contractId)
    expect("1", eventTokenTransferred.amount)
    expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd", eventTokenTransferred.fromAddress)
    expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us", eventTokenTransferred.toAddress)
    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9", eventTokenTransferred.proxyAddress)
    expect(0, eventTokenTransferred.msgIndex)
    expect("EventTokenTransferred", eventTokenTransferred.eventName)
  });

  it("with serviceTokenProxyApprovedTxResult", () => {
    let inputTxResultResponse = serviceTokenProxyApprovedTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.size);

    let event = actual.values().next().value;
    expect(EventTokenProxyApproved.name).to.equal(event.constructor.name);
    let eventTokenProxyApproved: EventTokenProxyApproved = event
    expect(0, eventTokenProxyApproved.msgIndex)
    expect("f38bb8a6", eventTokenProxyApproved.contractId)
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd", eventTokenProxyApproved.approverAddress)
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu", eventTokenProxyApproved.proxyAddress)
    expect(0, eventTokenProxyApproved.msgIndex)
    expect("EventTokenProxyApproved", eventTokenProxyApproved.eventName)
  });
});
