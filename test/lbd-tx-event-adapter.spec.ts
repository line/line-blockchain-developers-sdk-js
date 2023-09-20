import _ from "lodash";
import { expect } from "chai";
import { describe, it } from "mocha";
import {
  accountMsgEmptyTxResult,
  attachFromNFTTxResult,
  attachNFTTxResult,
  baseCoinTransferTxResult,
  burnFromFungibleTxResult,
  burnFromNonFungibleTxResult,
  burnFungibleTxResult,
  burnNonFungibleTxResult,
  createAccountTxResult,
  detachNFTFromTxResult,
  detachNFTTxResult,
  fungibleTokenTransferFromTxResult,
  fungibleTokenTransferTxResult,
  issueFungibleTxResult,
  issueNonFungibleTypeTxResult,
  issueServiceTokenTxResult,
  itemTokenApproveTxResult,
  itemTokenCreateTxResult,
  itemTokenDisapproveTxResult,
  mintFungibleTxResult,
  mintNonFungibleTxResult,
  nftUpdateTxResultResponse,
  nonFungibleTokenTypeModifyTxResult,
  serviceTokenBurnFromTxResult,
  serviceTokenBurnTxResult,
  serviceTokenMintTxResult,
  serviceTokenModifyTxResult,
  serviceTokenProxyApprovedTxResult,
  serviceTokenTransferFromTxResult,
  serviceTokenTransferTxResult,
  transferFromNonFungibleTxResult,
  transferNonFungibleTxResult,
} from "./test-data";
import { LbdTxEventsAdapterV1, RawTransactionResultAdapter } from "../lib/tx-result-adapters";
import {
  CollectionAttribute,
  EventAccountCreated,
  EventCoinTransferred,
  EventCollectionCreated,
  EventCollectionFtBurned,
  EventCollectionFtIssued,
  EventCollectionFtMinted,
  EventCollectionFtTransferred,
  EventCollectionNftAttached,
  EventCollectionNftBurned,
  EventCollectionNftDetached,
  EventCollectionNftHolderChanged,
  EventCollectionNftIssued,
  EventCollectionNftMinted,
  EventCollectionNftModified,
  EventCollectionNftRootChanged,
  EventCollectionNftTransferred,
  EventCollectionNftTypeModified,
  EventCollectionProxyApproved,
  EventCollectionProxyDisapproved,
  EventEmptyMsgCreated,
  EventTokenBurned,
  EventTokenIssued,
  EventTokenMinted,
  EventTokenModified,
  EventTokenProxyApproved,
  EventTokenTransferred,
  TokenAttribute,
} from "../lib/tx-core-models";

describe("lbd-tx-event-adapter test", () => {
  let adapter = new LbdTxEventsAdapterV1();

  // account
  it("with createAccountTxResult", () => {
    let inputTxResultResponse = createAccountTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventAccountCreated.name).to.equal(event.constructor.name);
    let eventAccountCreated: EventAccountCreated = event;
    expect(0).to.equal(eventAccountCreated.msgIndex);
    expect("link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd").to.equals(eventAccountCreated.createdAddress);
    expect(0).to.equals(eventAccountCreated.msgIndex);
    expect("EventAccountCreated").to.equals(eventAccountCreated.eventName);
  });

  it("with accountMsgEmptyTxResult", () => {
    let inputTxResultResponse = accountMsgEmptyTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventEmptyMsgCreated.name).to.equal(event.constructor.name);
    let eventEmptyMsgCreated: EventEmptyMsgCreated = event;
    expect(0).to.equal(eventEmptyMsgCreated.msgIndex);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equals(eventEmptyMsgCreated.senderAddress);
    expect("EventEmptyMsgCreated").to.equals(eventEmptyMsgCreated.eventName);
  });

  // coin
  it("with baseCoinTransferTxResult", () => {
    let inputTxResultResponse = baseCoinTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let eventCoinTransferred: EventCoinTransferred = actual.values().next().value;
    expect(0).to.equal(eventCoinTransferred.msgIndex);
    expect("tcony").to.equals(eventCoinTransferred.denomination);
    expect("1").to.equals(eventCoinTransferred.amount);
    expect(0).to.equals(eventCoinTransferred.msgIndex);
    expect("EventCoinTransferred").to.equals(eventCoinTransferred.eventName);
  });

  // token
  it("with issueServiceTokenTxResult", () => {
    let inputTxResultResponse = issueServiceTokenTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenIssued.name).to.equal(event.constructor.name);
    let eventTokenIssued: EventTokenIssued = event;
    expect(0).to.equal(eventTokenIssued.msgIndex);
    expect("Gamja").to.equal(eventTokenIssued.name);
    expect("987654321").to.equal(eventTokenIssued.amount);
    expect("9be17165").to.equal(eventTokenIssued.contractId);
    expect("GAMJA").to.equal(eventTokenIssued.symbol);
    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(eventTokenIssued.issuerAddress);
    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(eventTokenIssued.receiverAddress);
    expect(6).to.equal(eventTokenIssued.decimals);
    expect(0).to.equal(eventTokenIssued.msgIndex);
    expect("EventTokenIssued").to.equal(eventTokenIssued.eventName);
  });

  it("with serviceTokenMintTxResult", () => {
    let inputTxResultResponse = serviceTokenMintTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenMinted.name).to.equal(event.constructor.name);
    let eventTokenMinted: EventTokenMinted = event;
    expect(0).to.equal(eventTokenMinted.msgIndex);
    expect("1000").to.equal(eventTokenMinted.amount);
    expect("9636a07e").to.equal(eventTokenMinted.contractId);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventTokenMinted.minterAddress);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(eventTokenMinted.toAddress);
    expect(0).to.equal(eventTokenMinted.msgIndex);
    expect("EventTokenMinted").to.equal(eventTokenMinted.eventName);
  });

  it("with serviceTokenBurnTxResult", () => {
    let inputTxResultResponse = serviceTokenBurnTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenBurned.name).to.equal(event.constructor.name);
    let eventTokenBurned: EventTokenBurned = event;
    expect(0).to.equal(eventTokenBurned.msgIndex);
    expect("9be17165").to.equal(eventTokenBurned.contractId);
    expect("1000").to.equal(eventTokenBurned.amount);
    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(eventTokenBurned.fromAddress);
    expect(0).to.equal(eventTokenBurned.msgIndex);
    expect("EventTokenBurned").to.equal(eventTokenBurned.eventName);
  });

  it("with serviceTokenBurnFromTxResult", () => {
    let inputTxResultResponse = serviceTokenBurnFromTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenBurned.name).to.equal(event.constructor.name);
    let eventTokenBurned: EventTokenBurned = event;
    expect(0).to.equal(eventTokenBurned.msgIndex);
    expect("678c146a").to.equal(eventTokenBurned.contractId);
    expect("1").to.equal(eventTokenBurned.amount);
    expect("link16mk739rd3r3q8a8dw7zr3h50xunxcq0wp80gtu").to.equal(eventTokenBurned.fromAddress);
    expect("link17gx76scz3pe7gtqq8rmf46favtmxn3sgs6qa49").to.equal(eventTokenBurned.proxyAddress);
    expect("EventTokenBurned").to.equal(eventTokenBurned.eventName);
  });

  it("with serviceTokenModifyTxResult", () => {
    let inputTxResultResponse = serviceTokenModifyTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenModified.name).to.equal(event.constructor.name);
    let eventTokenModified: EventTokenModified = event;
    expect(0).to.equal(eventTokenModified.msgIndex);
    expect("9636a07e").to.equal(eventTokenModified.contractId);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventTokenModified.modifierAddress);
    expect(new TokenAttribute("name", "STname")).to.deep.equal(
      _.find(Array.from(eventTokenModified.tokenAttributes), it => {
        return it.key === "name";
      }),
    );
    expect(new TokenAttribute("meta", "meta")).to.deep.equal(
      _.find(Array.from(eventTokenModified.tokenAttributes), it => {
        return it.key === "meta";
      }),
    );
    expect("EventTokenModified").to.equal(eventTokenModified.eventName);
  });

  it("with serviceTokenTransferTxResult", () => {
    let inputTxResultResponse = serviceTokenTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenTransferred.name).to.equal(event.constructor.name);
    let eventTokenTransferred: EventTokenTransferred = event;
    expect(0).to.equal(eventTokenTransferred.msgIndex);
    expect("9636a07e").to.equal(eventTokenTransferred.contractId);
    expect("1000").to.equal(eventTokenTransferred.amount);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventTokenTransferred.fromAddress);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(eventTokenTransferred.toAddress);
    expect(0).to.equal(eventTokenTransferred.msgIndex);
    expect("EventTokenTransferred").to.equal(eventTokenTransferred.eventName);
  });

  it("with serviceTokenTransferFromTxResult", () => {
    let inputTxResultResponse = serviceTokenTransferFromTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenTransferred.name).to.equal(event.constructor.name);
    let eventTokenTransferred: EventTokenTransferred = event;
    expect(0).to.equal(eventTokenTransferred.msgIndex);
    expect("9be17165").to.equal(eventTokenTransferred.contractId);
    expect("1").to.equal(eventTokenTransferred.amount);
    expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(eventTokenTransferred.fromAddress);
    expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(eventTokenTransferred.toAddress);
    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(eventTokenTransferred.proxyAddress);
    expect(0).to.equal(eventTokenTransferred.msgIndex);
    expect("EventTokenTransferred").to.equal(eventTokenTransferred.eventName);
  });

  it("with serviceTokenProxyApprovedTxResult", () => {
    let inputTxResultResponse = serviceTokenProxyApprovedTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventTokenProxyApproved.name).to.equal(event.constructor.name);
    let eventTokenProxyApproved: EventTokenProxyApproved = event;
    expect(0).to.equal(eventTokenProxyApproved.msgIndex);
    expect("f38bb8a6").to.equal(eventTokenProxyApproved.contractId);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(eventTokenProxyApproved.approverAddress);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(eventTokenProxyApproved.proxyAddress);
    expect(0).to.equal(eventTokenProxyApproved.msgIndex);
    expect("EventTokenProxyApproved").to.equal(eventTokenProxyApproved.eventName);
  });

  // collection
  it("with itemTokenCreateTxResult", () => {
    let inputTxResultResponse = itemTokenCreateTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionCreated.name).to.equal(event.constructor.name);
    let eventTokenProxyApproved: EventCollectionCreated = event;
    expect(0).to.equal(eventTokenProxyApproved.msgIndex);
    expect("fee15a74").to.equal(eventTokenProxyApproved.contractId);
    expect("BW Card").to.equal(eventTokenProxyApproved.name);
    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(eventTokenProxyApproved.creatorAddress);
    expect("EventCollectionCreated").to.equal(eventTokenProxyApproved.eventName);
  });
  it("with issueFungibleTxResult", () => {
    let inputTxResultResponse = issueFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtIssued.name).to.equal(event.constructor.name);
    let eventCollectionFtIssued: EventCollectionFtIssued = event;
    expect(0).to.equal(eventCollectionFtIssued.msgIndex);
    expect("61e14383").to.equal(eventCollectionFtIssued.contractId);
    expect("FungibleName").to.equal(eventCollectionFtIssued.name);
    expect(0).to.equal(eventCollectionFtIssued.decimals);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionFtIssued.issuerAddress);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionFtIssued.receiverAddress);
    expect("00000031").to.equal(eventCollectionFtIssued.tokenType);
    expect("EventCollectionFtIssued").to.equal(eventCollectionFtIssued.eventName);
    expect(true).to.equal(eventCollectionFtIssued.mintable);
    expect("test").to.equal(eventCollectionFtIssued.meta);
  });
  it("with issueNonFungibleTypeTxResult", () => {
    let inputTxResultResponse = issueNonFungibleTypeTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftIssued.name).to.equal(event.constructor.name);
    let eventCollectionNftIssued: EventCollectionNftIssued = event;
    expect(0).to.equal(eventCollectionNftIssued.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftIssued.contractId);
    expect("1000000c").to.equal(eventCollectionNftIssued.tokenType);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftIssued.issuerAddress);
    expect("EventCollectionNftIssued").to.equal(eventCollectionNftIssued.eventName);
  });
  it("with mintFungibleTxResult", () => {
    let inputTxResultResponse = mintFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtMinted.name).to.equal(event.constructor.name);
    let eventCollectionFtMinted: EventCollectionFtMinted = event;
    expect(0).to.equal(eventCollectionFtMinted.msgIndex);
    expect("61e14383").to.equal(eventCollectionFtMinted.contractId);
    expect("0000000100000000").to.equal(eventCollectionFtMinted.tokenId);
    expect("3000").to.equal(eventCollectionFtMinted.amount);
    expect("tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j").to.equal(eventCollectionFtMinted.toAddress);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionFtMinted.minterAddress);
    expect("EventCollectionFtMinted").to.equal(eventCollectionFtMinted.eventName);
  });
  it("with mintNonFungibleTxResult", () => {
    let inputTxResultResponse = mintNonFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftMinted.name).to.equal(event.constructor.name);
    let eventCollectionNftMinted: EventCollectionNftMinted = event;
    expect(0).to.equal(eventCollectionNftMinted.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftMinted.contractId);
    expect(["1000000100000007"]).to.deep.equals(eventCollectionNftMinted.tokenIds);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftMinted.minterAddress);
    expect("tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl").to.equal(eventCollectionNftMinted.toAddress);
    expect("EventCollectionNftMinted").to.equal(eventCollectionNftMinted.eventName);
  });
  it("with burnFungibleTxResult", () => {
    let inputTxResultResponse = burnFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtBurned.name).to.equal(event.constructor.name);
    let eventCollectionFtBurned: EventCollectionFtBurned = event;
    expect(0).to.equal(eventCollectionFtBurned.msgIndex);
    expect("61e14383").to.equal(eventCollectionFtBurned.contractId);
    expect("1").to.equal(eventCollectionFtBurned.amount);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionFtBurned.fromAddress);
    expect("EventCollectionFtBurned").to.equal(eventCollectionFtBurned.eventName);
  });
  it("with burnFromFungibleTxResult", () => {
    let inputTxResultResponse = burnFromFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtBurned.name).to.equal(event.constructor.name);
    let eventCollectionFtBurned: EventCollectionFtBurned = event;
    expect(0).to.equal(eventCollectionFtBurned.msgIndex);
    expect("2d8be688").to.equal(eventCollectionFtBurned.contractId);
    expect("00000001").to.equal(eventCollectionFtBurned.tokenType);
    expect("500").to.equal(eventCollectionFtBurned.amount);
    expect("link1yhjrm7zxn97eu5tnz76j32r76sfq02mtmjttuq").to.equal(eventCollectionFtBurned.fromAddress);
    expect("link1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4").to.equal(eventCollectionFtBurned.proxyAddress);
    expect("EventCollectionFtBurned").to.equal(eventCollectionFtBurned.eventName);
  });
  it("with burnNonFungibleTxResult", () => {
    let inputTxResultResponse = burnNonFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftBurned.name).to.equal(event.constructor.name);
    let eventCollectionNftBurned: EventCollectionNftBurned = event;
    expect(0).to.equal(eventCollectionNftBurned.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftBurned.contractId);
    expect(["1000000100000003"]).to.deep.equal(eventCollectionNftBurned.tokenIds);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftBurned.fromAddress);
    expect("EventCollectionNftBurned").to.equal(eventCollectionNftBurned.eventName);
  });
  it("with burnFromNonFungibleTxResult", () => {
    let inputTxResultResponse = burnFromNonFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftBurned.name).to.equal(event.constructor.name);
    let eventCollectionNftBurned: EventCollectionNftBurned = event;
    expect(0).to.equal(eventCollectionNftBurned.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftBurned.contractId);
    expect(["1000000100000005"]).to.deep.equal(eventCollectionNftBurned.tokenIds);
    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(eventCollectionNftBurned.fromAddress);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftBurned.proxyAddress);
    expect("EventCollectionNftBurned").to.equal(eventCollectionNftBurned.eventName);
  });
  it("with nonFungibleTokenTypeModifyTxResult", () => {
    let inputTxResultResponse = nonFungibleTokenTypeModifyTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftTypeModified.name).to.equal(event.constructor.name);
    let eventCollectionNftTypeModified: EventCollectionNftTypeModified = event;
    expect(0).to.equal(eventCollectionNftTypeModified.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftTypeModified.contractId);
    expect("10000001").to.equal(eventCollectionNftTypeModified.tokenType);
    expect(new CollectionAttribute("name", "NFT Name")).to.deep.equals(
      _.find(Array.from(eventCollectionNftTypeModified.tokenAttributes), it => {
        return it.key === "name";
      }),
    );
    expect(new CollectionAttribute("meta", "NFT meta")).to.deep.equals(
      _.find(Array.from(eventCollectionNftTypeModified.tokenAttributes), it => {
        return it.key === "meta";
      }),
    );
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftTypeModified.modifierAddress);
    expect("EventCollectionNftTypeModified").to.equal(eventCollectionNftTypeModified.eventName);
  });
  it("with nftUpdateTxResultResponse", () => {
    let inputTxResultResponse = nftUpdateTxResultResponse;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionNftModified.name).to.equal(event.constructor.name);
    let eventCollectionNftModified: EventCollectionNftModified = event;
    expect("61e14383").to.equal(eventCollectionNftModified.contractId);
    expect("1000000100000001").to.equal(eventCollectionNftModified.tokenId);
    expect(new CollectionAttribute("name", "NFT index name")).to.deep.equals(
      _.find(Array.from(eventCollectionNftModified.tokenAttributes), it => {
        return it.key === "name";
      }),
    );
    expect(new CollectionAttribute("meta", "NFT index meta")).to.deep.equals(
      _.find(Array.from(eventCollectionNftModified.tokenAttributes), it => {
        return it.key === "meta";
      }),
    );
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftModified.modifierAddress);
    expect(0).to.equal(eventCollectionNftModified.msgIndex);
    expect("EventCollectionNftModified").to.equal(eventCollectionNftModified.eventName);
  });

  it("with fungibleTokenTransferTxResult", () => {
    let inputTxResultResponse = fungibleTokenTransferTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtTransferred.name).to.equal(event.constructor.name);
    let eventCollectionFtTransferred: EventCollectionFtTransferred = event;
    expect(0).to.equal(eventCollectionFtTransferred.msgIndex);
    expect("61e14383").to.equal(eventCollectionFtTransferred.contractId);
    expect("00000001").to.equal(eventCollectionFtTransferred.tokenType);
    expect("1").to.equal(eventCollectionFtTransferred.amount);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionFtTransferred.fromAddress);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(eventCollectionFtTransferred.toAddress);
    expect("EventCollectionFtTransferred").to.equal(eventCollectionFtTransferred.eventName);
  });
  it("with fungibleTokenTransferFromTxResult", () => {
    let inputTxResultResponse = fungibleTokenTransferFromTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let event = actual.values().next().value;
    expect(EventCollectionFtTransferred.name).to.equal(event.constructor.name);
    let eventCollectionFtTransferred: EventCollectionFtTransferred = event;
    expect(0).to.equal(eventCollectionFtTransferred.msgIndex);
    expect("bf365bab").to.equal(eventCollectionFtTransferred.contractId);
    expect("00000001").to.equal(eventCollectionFtTransferred.tokenType);
    expect("50").to.equal(eventCollectionFtTransferred.amount);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(eventCollectionFtTransferred.fromAddress);
    expect("link137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p").to.equal(eventCollectionFtTransferred.toAddress);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(eventCollectionFtTransferred.proxyAddress);
    expect("EventCollectionFtTransferred").to.equal(eventCollectionFtTransferred.eventName);
  });
  it("with transferNonFungibleTxResult", () => {
    let inputTxResultResponse = transferNonFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftTransferred = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftTransferred";
    }) as EventCollectionNftTransferred;

    expect("803820e6", eventCollectionNftTransferred.contractId);
    expect(["1000000100000004", "1000000100000006"]).to.deep.equal(eventCollectionNftTransferred.tokenIds);
    expect("tlink1uly93jzy4qlpf6k803uz4tke6auwl3ukhns90t").to.equal(eventCollectionNftTransferred.fromAddress);
    expect("tlink1nq492tmyhcdz5dp52r7hht6f3w9f3m5wwxwyxv").to.equal(eventCollectionNftTransferred.toAddress);
    expect(0).to.equal(eventCollectionNftTransferred.msgIndex);
    expect("EventCollectionNftTransferred", eventCollectionNftTransferred.eventName);

    let eventCollectionNftHolderChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftHolderChanged";
    }) as EventCollectionNftHolderChanged;

    expect("803820e6").to.equal(eventCollectionNftHolderChanged.contractId);
    expect(["1000000100000004", "1000000100000006"]).to.deep.equal(eventCollectionNftHolderChanged.tokenIds);
    expect("tlink1uly93jzy4qlpf6k803uz4tke6auwl3ukhns90t").to.equal(eventCollectionNftHolderChanged.fromAddress);
    expect("tlink1nq492tmyhcdz5dp52r7hht6f3w9f3m5wwxwyxv").to.equal(eventCollectionNftHolderChanged.toAddress);
    expect(0).to.equal(eventCollectionNftHolderChanged.msgIndex);
    expect("EventCollectionNftHolderChanged").to.equal(eventCollectionNftHolderChanged.eventName);
  });

  it("with transferFromNonFungibleTxResult", () => {
    let inputTxResultResponse = transferFromNonFungibleTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftTransferred = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftTransferred";
    }) as EventCollectionNftTransferred;

    expect("bf365bab", eventCollectionNftTransferred.contractId);
    expect(["100000010000000e", "100000010000000f"]).to.deep.equal(eventCollectionNftTransferred.tokenIds);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(eventCollectionNftTransferred.fromAddress);
    expect("link137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p").to.equal(eventCollectionNftTransferred.toAddress);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(eventCollectionNftTransferred.proxyAddress);
    expect(0).to.equal(eventCollectionNftTransferred.msgIndex);
    expect("EventCollectionNftTransferred", eventCollectionNftTransferred.eventName);

    let eventCollectionNftHolderChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftHolderChanged";
    }) as EventCollectionNftHolderChanged;

    expect("bf365bab").to.equal(eventCollectionNftHolderChanged.contractId);
    expect(["100000010000000e", "100000010000000f"]).to.deep.equal(eventCollectionNftHolderChanged.tokenIds);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(eventCollectionNftHolderChanged.fromAddress);
    expect("link137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p").to.equal(eventCollectionNftHolderChanged.toAddress);
    expect(0).to.equal(eventCollectionNftHolderChanged.msgIndex);
    expect("EventCollectionNftHolderChanged").to.equal(eventCollectionNftHolderChanged.eventName);
  });

  it("with attachNFTTxResult", () => {
    let inputTxResultResponse = attachNFTTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftAttached = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftAttached";
    }) as EventCollectionNftAttached;

    expect("61e14383", eventCollectionNftAttached.contractId);
    expect("100000080000000e", eventCollectionNftAttached.parentTokenId);
    expect("100000080000000f", eventCollectionNftAttached.childTokenId);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", eventCollectionNftAttached.holderAddress);
    expect(0).to.equal(eventCollectionNftAttached.msgIndex);
    expect("EventCollectionNftAttached", eventCollectionNftAttached.eventName);

    let eventCollectionNftRootChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftRootChanged";
    }) as EventCollectionNftRootChanged;

    expect("61e14383", eventCollectionNftRootChanged.contractId);
    expect(1).to.equal(eventCollectionNftRootChanged.tokenIds.length);
    expect(["100000080000000e"]).to.deep.equal(eventCollectionNftRootChanged.tokenIds);
    expect("100000080000000e").to.equal(eventCollectionNftRootChanged.oldRootTokenId);
    expect("100000080000000f").to.equal(eventCollectionNftRootChanged.newRootTokenId);
    expect(0).to.equal(eventCollectionNftRootChanged.msgIndex);
    expect("EventCollectionNftRootChanged").to.equal(eventCollectionNftRootChanged.eventName);
  });

  it("with attachFromNFTTxResult", () => {
    let inputTxResultResponse = attachFromNFTTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftAttached = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftAttached";
    }) as EventCollectionNftAttached;

    expect(0).to.equal(eventCollectionNftAttached.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftAttached.contractId);
    expect("100000010000000c").to.equal(eventCollectionNftAttached.parentTokenId);
    expect("100000010000000b").to.equal(eventCollectionNftAttached.childTokenId);
    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(eventCollectionNftAttached.holderAddress);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftAttached.proxyAddress);
    expect("EventCollectionNftAttached").to.equal(eventCollectionNftAttached.eventName);

    let eventCollectionNftRootChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftRootChanged";
    }) as EventCollectionNftRootChanged;

    expect("61e14383").to.equal(eventCollectionNftRootChanged.contractId);
    expect(1).to.equal(eventCollectionNftRootChanged.tokenIds.length);
    expect(["100000010000000b"]).to.deep.equal(eventCollectionNftRootChanged.tokenIds);
    expect("100000010000000b").to.equal(eventCollectionNftRootChanged.oldRootTokenId);
    expect("100000010000000c").to.equal(eventCollectionNftRootChanged.newRootTokenId);
    expect(0).to.equal(eventCollectionNftRootChanged.msgIndex);
    expect("EventCollectionNftRootChanged").to.equal(eventCollectionNftRootChanged.eventName);
  });

  it("with detachNFTTxResult", () => {
    let inputTxResultResponse = detachNFTTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftDetached = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftDetached";
    }) as EventCollectionNftDetached;

    expect(0).to.equal(eventCollectionNftDetached.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftDetached.contractId);
    expect("100000080000000f").to.equal(eventCollectionNftDetached.exParentTokenId);
    expect("100000080000000e").to.equal(eventCollectionNftDetached.exChildTokenId);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftDetached.holderAddress);
    expect("EventCollectionNftDetached").to.equal(eventCollectionNftDetached.eventName);

    let eventCollectionNftRootChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftRootChanged";
    }) as EventCollectionNftRootChanged;

    expect(0).to.equal(eventCollectionNftRootChanged.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftRootChanged.contractId);
    expect(1).to.equal(eventCollectionNftRootChanged.tokenIds.length);
    expect(["100000080000000e"]).to.deep.equal(eventCollectionNftRootChanged.tokenIds);
    expect("100000080000000f").to.equal(eventCollectionNftRootChanged.oldRootTokenId);
    expect("100000080000000e").to.equal(eventCollectionNftRootChanged.newRootTokenId);
    expect("EventCollectionNftRootChanged").to.equal(eventCollectionNftRootChanged.eventName);
  });

  it("with detachNFTFromTxResult", () => {
    let inputTxResultResponse = detachNFTFromTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(2).to.equal(actual.length);

    let eventCollectionNftDetached = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftDetached";
    }) as EventCollectionNftDetached;

    expect(0).to.equal(eventCollectionNftDetached.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftDetached.contractId);
    expect("100000010000000c").to.equal(eventCollectionNftDetached.exParentTokenId);
    expect("100000010000000b").to.equal(eventCollectionNftDetached.exChildTokenId);
    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(eventCollectionNftDetached.holderAddress);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(eventCollectionNftDetached.proxyAddress);
    expect("EventCollectionNftDetached").to.equal(eventCollectionNftDetached.eventName);

    let eventCollectionNftRootChanged = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionNftRootChanged";
    }) as EventCollectionNftRootChanged;

    expect(0).to.equal(eventCollectionNftRootChanged.msgIndex);
    expect("61e14383").to.equal(eventCollectionNftRootChanged.contractId);
    expect(1).to.equal(eventCollectionNftRootChanged.tokenIds.length);
    expect(["100000010000000b"]).to.deep.equals(eventCollectionNftRootChanged.tokenIds);
    expect("100000010000000c").to.equal(eventCollectionNftRootChanged.oldRootTokenId);
    expect("100000010000000b").to.equal(eventCollectionNftRootChanged.newRootTokenId);
    expect("EventCollectionNftRootChanged").to.equal(eventCollectionNftRootChanged.eventName);
  });

  it("with itemTokenApproveTxResult", () => {
    let inputTxResultResponse = itemTokenApproveTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let eventCollectionProxyApproved = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionProxyApproved";
    }) as EventCollectionProxyApproved;

    expect(0).to.equal(eventCollectionProxyApproved.msgIndex);
    expect("fee15a74").to.equal(eventCollectionProxyApproved.contractId);
    expect("link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p").to.equal(eventCollectionProxyApproved.approverAddress);
    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(eventCollectionProxyApproved.proxyAddress);
    expect("EventCollectionProxyApproved").to.equal(eventCollectionProxyApproved.eventName);
  });

  it("with itemTokenDisapproveTxResult", () => {
    let inputTxResultResponse = itemTokenDisapproveTxResult;
    let rawTransactionResult = new RawTransactionResultAdapter().adapt(inputTxResultResponse);
    expect(inputTxResultResponse.height).to.equal(rawTransactionResult.height);

    let actual = adapter.adapt(rawTransactionResult);

    expect(1).to.equal(actual.length);

    let eventCollectionProxyDisapproved = _.find(Array.from(actual), it => {
      return it.eventName === "EventCollectionProxyDisapproved";
    }) as EventCollectionProxyDisapproved;

    expect(0).to.equal(eventCollectionProxyDisapproved.msgIndex);
    expect("bf365bab").to.equal(eventCollectionProxyDisapproved.contractId);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(eventCollectionProxyDisapproved.approverAddress);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(eventCollectionProxyDisapproved.proxyAddress);
    expect("EventCollectionProxyDisapproved").to.equal(eventCollectionProxyDisapproved.eventName);
  });
});
