import {expect} from "chai";
import {describe, it} from "mocha";
import {
  CollectionAttribute,
  EventAccountCreated,
  EventCoinTransferred,
  EventCollectionCreated,
  EventCollectionFtBurned,
  EventCollectionFtIssued,
  EventCollectionFtMinted,
  EventCollectionFtModified,
  EventCollectionFtTransferred,
  EventCollectionModified,
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
  EventTokenTransferred,
  TokenAttribute,
} from "../lib/tx-core-models";
import {
  RawTransactionEvent,
  RawTransactionEventAttribute,
} from "../lib/tx-raw-models";
import {LbdTxEventConverterV1} from "../lib/tx-result-adapters";

describe("LbdTxEventConverterV1 tests", () => {
  let underTest: LbdTxEventConverterV1 = new LbdTxEventConverterV1();
  it("test emptyMsgCreated", () => {
    let memoRawTxResultEvent = new RawTransactionEvent(
      "message",
      [
        new RawTransactionEventAttribute(
          "sender",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("module", "account"),
        new RawTransactionEventAttribute("action", "empty"),
      ],
    );
    let actualValue = underTest.emptyMsgCreated(0, memoRawTxResultEvent);
    let expectedValue = new EventEmptyMsgCreated(
      0,
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test accountCreated", () => {
    let createAccountRawTxResultEvent = new RawTransactionEvent(
      "create_account",
      [
        new RawTransactionEventAttribute(
          "create_account_from",
          "link1e9xfq4gkjdredmyka98qes3m4g6xtzqn403vf9",
        ),
        new RawTransactionEventAttribute(
          "create_account_target",
          "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd",
        ),
      ],
    );
    let actualValue = underTest.accountCreated(
      0,
      createAccountRawTxResultEvent,
    );
    let expectedValue = new EventAccountCreated(
      0,
      "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test coinTransferred", () => {
    let coinTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer",
      [
        new RawTransactionEventAttribute(
          "sender",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "recipient",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute("amount", "1tcony"),
      ],
    );
    let actualValue = underTest.coinTransferred(
      0,
      coinTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCoinTransferred(
      0,
      "tcony",
      "1",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenIssued", () => {
    let tokenIssuedRawTxResultEvent = new RawTransactionEvent(
      "issue",
      [
        new RawTransactionEventAttribute("contract_id", "9be17165"),
        new RawTransactionEventAttribute("name", "Gamja"),
        new RawTransactionEventAttribute("symbol", "GAMJA"),
        new RawTransactionEventAttribute(
          "owner",
          "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
        ),
        new RawTransactionEventAttribute("amount", "1"),
        new RawTransactionEventAttribute("mintable", "true"),
        new RawTransactionEventAttribute("decimals", "6"),
      ],
    );
    let actualValue = underTest.tokenIssued(0, tokenIssuedRawTxResultEvent);
    let expectedValue = new EventTokenIssued(
      0,
      "9be17165",
      "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
      "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
      "Gamja",
      "GAMJA",
      6,
      "1",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenMinted", () => {
    let tokenMintedRawTxResultEvent = new RawTransactionEvent(
      "mint",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute("amount", "1000"),
      ],
    );
    let actualValue = underTest.tokenMinted(0, tokenMintedRawTxResultEvent);
    let expectedValue = new EventTokenMinted(
      0,
      "9636a07e",
      "1000",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenBurned", () => {
    let tokenMintedRawTxResultEvent = new RawTransactionEvent(
      "burn",
      [
        new RawTransactionEventAttribute("contract_id", "9be17165"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
        ),
        new RawTransactionEventAttribute("amount", "1000"),
      ],
    );
    let actualValue = underTest.tokenBurned(0, tokenMintedRawTxResultEvent);
    let expectedValue = new EventTokenBurned(
      0,
      "9be17165",
      "1000",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenBurned with burnFrom", () => {
    let tokenMintedRawTxResultEvent = new RawTransactionEvent(
      "burn",
      [
        new RawTransactionEventAttribute("contract_id", "9be17165"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute("amount", "1000"),
      ],
    );
    let actualValue = underTest.tokenBurned(0, tokenMintedRawTxResultEvent);
    let expectedValue = new EventTokenBurned(
      0,
      "9be17165",
      "1000",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenModified", () => {
    let tokenMintedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("name", "STname"),
        new RawTransactionEventAttribute("meta", "meta"),
      ],
    );

    let emptyMessageEvent = new RawTransactionEvent(
      "message",
      [
        new RawTransactionEventAttribute("module", "token"),
        new RawTransactionEventAttribute("action", "modify_token"),
        new RawTransactionEventAttribute(
          "sender",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
      ],
    );
    let actualValue = underTest.tokenModified(
      0,
      emptyMessageEvent,
      tokenMintedRawTxResultEvent,
    );
    let expectedValue = new EventTokenModified(
      0,
      "9636a07e",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      [
        new TokenAttribute("name", "STname"),
        new TokenAttribute("meta", "meta"),
      ],
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenTransferred", () => {
    let tokenTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer",
      [
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("amount", "1000"),
      ],
    );

    let actualValue = underTest.tokenTransferred(
      0,
      tokenTransferredRawTxResultEvent,
    );
    let expectedValue = new EventTokenTransferred(
      0,
      "9636a07e",
      "1000",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test tokenTransferred with transferFrom", () => {
    let tokenTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer",
      [
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("amount", "1000"),
      ],
    );

    let actualValue = underTest.tokenTransferred(
      0,
      tokenTransferredRawTxResultEvent,
    );
    let expectedValue = new EventTokenTransferred(
      0,
      "9636a07e",
      "1000",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionCreated", () => {
    let collectionCreatedRawTxResultEvent = new RawTransactionEvent(
      "create_collection",
      [
        new RawTransactionEventAttribute("name", "testContract"),
        new RawTransactionEventAttribute(
          "owner",
          "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
        ),
        new RawTransactionEventAttribute("contract_id", "fee15a74"),
      ],
    );

    let permissionGrantedRawTxResultEvent = new RawTransactionEvent(
      "grant_perm",
      [
        new RawTransactionEventAttribute(
          "to",
          "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
        ),
      ],
    );

    let actualValue = underTest.collectionCreated(
      0,
      collectionCreatedRawTxResultEvent,
      permissionGrantedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionCreated(
      0,
      "fee15a74",
      "testContract",
      "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionCreated without permission granted", () => {
    let collectionCreatedRawTxResultEvent = new RawTransactionEvent(
      "create_collection",
      [
        new RawTransactionEventAttribute("name", "testContract"),
        new RawTransactionEventAttribute(
          "owner",
          "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
        ),
        new RawTransactionEventAttribute("contract_id", "fee15a74"),
      ],
    );

    let actualValue = underTest.collectionCreated(
      0,
      collectionCreatedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionCreated(
      0,
      "fee15a74",
      "testContract",
      "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtBurned", () => {
    let collectionCreatedRawTxResultEvent = new RawTransactionEvent(
      "burn_ft",
      [
        new RawTransactionEventAttribute("amount", "1:0000000100000000"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("contract_id", "61e14383"),
      ],
    );

    let actualValue = underTest.collectionFtBurned(
      0,
      collectionCreatedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtBurned(
      0,
      "61e14383",
      "00000001",
      "0000000100000000",
      "1",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtBurned with BurnFrom", () => {
    let collectionCreatedRawTxResultEvent = new RawTransactionEvent(
      "burn_ft",
      [
        new RawTransactionEventAttribute("amount", "1:0000000100000000"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("contract_id", "61e14383"),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
      ],
    );

    let actualValue = underTest.collectionFtBurned(
      0,
      collectionCreatedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtBurned(
      0,
      "61e14383",
      "00000001",
      "0000000100000000",
      "1",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtIssued", () => {
    let collectionFtIssuedRawTxResultEvent = new RawTransactionEvent(
      "issue_ft",
      [
        new RawTransactionEventAttribute("amount", "100"),
        new RawTransactionEventAttribute(
          "owner",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("contract_id", "61e14383"),
        new RawTransactionEventAttribute("name", "TestFT"),
        new RawTransactionEventAttribute("token_id", "0000003100000000"),
        new RawTransactionEventAttribute("decimals", "0"),
        new RawTransactionEventAttribute("mintable", "true"),
        new RawTransactionEventAttribute("meta", "test"),
      ],
    );

    let actualValue = underTest.collectionFtIssued(
      0,
      collectionFtIssuedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtIssued(
      0,
      "61e14383",
      "00000031",
      "TestFT",
      "100",
      0,
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "test",
      true
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtMinted", () => {
    let collectionFtMintedRawTxResultEvent = new RawTransactionEvent(
      "mint_ft",
      [
        new RawTransactionEventAttribute("amount", "100:0000003100000000"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("contract_id", "61e14383"),
      ],
    );

    let actualValue = underTest.collectionFtMinted(
      0,
      collectionFtMintedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtMinted(
      0,
      "61e14383",
      "00000031",
      "0000003100000000",
      "100",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtModified", () => {
    let collectionFtModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "61e14383"),
        new RawTransactionEventAttribute("name", "TestFT"),
        new RawTransactionEventAttribute("token_id", "0000003100000000"),
      ],
    );
    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionFtModified(
      0,
      collectionFtModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionFtModified(
      0,
      "61e14383",
      "00000031",
      [new CollectionAttribute("name", "TestFT")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftTypeModified", () => {
    let collectionNftTypeModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "61e14383"),
        new RawTransactionEventAttribute("name", "TestFT"),
        new RawTransactionEventAttribute("token_id", "1000003100000001"),
      ],
    );
    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionNftTypeModified(
      0,
      collectionNftTypeModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionNftTypeModified(
      0,
      "61e14383",
      "10000031",
      [new CollectionAttribute("name", "TestFT")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });


  it("test collectionNftModified", () => {
    let collectionNftModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "61e14383"),
        new RawTransactionEventAttribute("name", "TestFT"),
        new RawTransactionEventAttribute("token_id", "1000003100000001"),
      ],
    );
    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionNftModified(
      0,
      collectionNftModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionNftModified(
      0,
      "61e14383",
      "1000003100000001",
      [new CollectionAttribute("name", "TestFT")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtTransferred", () => {
    let tokenTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer_ft",
      [
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("amount", "100:0000000100000000"),
      ],
    );

    let actualValue = underTest.collectionFtTransferred(
      0,
      tokenTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtTransferred(
      0,
      "9636a07e",
      "00000001",
      "0000000100000000",
      "100",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionFtTransferred with tranferFrom", () => {
    let tokenTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer_ft",
      [
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
        ),
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("amount", "100:0000000100000000"),
      ],
    );

    let actualValue = underTest.collectionFtTransferred(
      0,
      tokenTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCollectionFtTransferred(
      0,
      "9636a07e",
      "00000001",
      "0000000100000000",
      "100",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionModified with modify_collection", () => {
    let collectionModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_collection",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("name", "TestCollection"),
      ],
    );

    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionModified(
      0,
      collectionModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionModified(
      0,
      "9636a07e",
      [new CollectionAttribute("name", "TestCollection")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionModified with modify fungible token", () => {
    let collectionModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("name", "TestFT"),
        new RawTransactionEventAttribute("token_id", "0000000100000000"),
      ],
    );

    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionModified(
      0,
      collectionModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionFtModified(
      0,
      "9636a07e",
      "00000001",
      [new CollectionAttribute("name", "TestFT")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionModified with modify non-fungible token type ", () => {
    let collectionModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token_type",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("name", "TestNFT_Type"),
        new RawTransactionEventAttribute("token_type", "10000001"),
      ],
    );

    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionModified(
      0,
      collectionModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionNftTypeModified(
      0,
      "9636a07e",
      "10000001",
      [new CollectionAttribute("name", "TestNFT_Type")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionModified with modify non-fungible token itself ", () => {
    let collectionModifiedRawTxResultEvent = new RawTransactionEvent(
      "modify_token",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("name", "TestNFT"),
        new RawTransactionEventAttribute("token_id", "1000000100000001"),
      ],
    );

    let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";

    let actualValue = underTest.collectionModified(
      0,
      collectionModifiedRawTxResultEvent,
      senderAddress,
    );
    let expectedValue = new EventCollectionNftModified(
      0,
      "9636a07e",
      "1000000100000001",
      [new CollectionAttribute("name", "TestNFT")],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });


  it("test collectionNftBurned", () => {
    let collectionNftBurnedRawTxResultEvent = new RawTransactionEvent(
      "burn_nft",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000001"),
      ],
    );

    let operationBurnNftRawTxResultEvent = new RawTransactionEvent(
      "operation_burn_nft",
      [
        new RawTransactionEventAttribute("token_id", "1000000100000001"),
      ],
    );

    let actualValue = underTest.collectionNftBurned(
      0,
      collectionNftBurnedRawTxResultEvent,
      operationBurnNftRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftBurned(
      0,
      "9636a07e",
      ["1000000100000001"],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftAttached", () => {
    let collectionNftAttachedRawTxResultEvent = new RawTransactionEvent(
      "attach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("to_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000003",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000002",
        ),
      ],
    );

    let actualValue = underTest.collectionNftAttached(
      0,
      collectionNftAttachedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftAttached(
      0,
      "9636a07e",
      "1000000100000003",
      "1000000100000002",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftAttached with attach-from", () => {
    let collectionNftAttachedRawTxResultEvent = new RawTransactionEvent(
      "attach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("to_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000003",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000002",
        ),
      ],
    );

    let actualValue = underTest.collectionNftAttached(
      0,
      collectionNftAttachedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftAttached(
      0,
      "9636a07e",
      "1000000100000003",
      "1000000100000002",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftDetached", () => {
    let collectionNftDetachedRawTxResultEvent = new RawTransactionEvent(
      "detach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("from_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000002",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000003",
        ),
      ],
    );

    let actualValue = underTest.collectionNftDetached(
      0,
      collectionNftDetachedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftDetached(
      0,
      "9636a07e",
      "1000000100000003",
      "1000000100000002",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftDetached with attach-from", () => {
    let collectionNftDetachedRawTxResultEvent = new RawTransactionEvent(
      "detach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("from_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000002",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000003",
        ),
      ],
    );

    let actualValue = underTest.collectionNftDetached(
      0,
      collectionNftDetachedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftDetached(
      0,
      "9636a07e",
      "1000000100000003",
      "1000000100000002",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftHolderChanged", () => {
    let collectionNftTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer_nft",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink1rrjua8zktmqnr6hlsqz7qyx5gxm5z96yt8f5ae",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
      ],
    );

    let collectionOperationNftTransferredRawTxResultEvent = new RawTransactionEvent(
      "operation_transfer_nft",
      [
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
      ],
    );

    let actualValue = underTest.collectionNftHolderChanged(
      0,
      collectionNftTransferredRawTxResultEvent,
      collectionOperationNftTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftHolderChanged(
      0,
      "9636a07e",
      ["1000000100000003"],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink1rrjua8zktmqnr6hlsqz7qyx5gxm5z96yt8f5ae",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftIssued", () => {
    let collectionNftIssuedRawTxResultEvent = new RawTransactionEvent(
      "issue_nft",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("token_type", "10000001"),
      ],
    );

    let issuerAddress = "tlink1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4";

    let actualValue = underTest.collectionNftIssued(
      0,
      collectionNftIssuedRawTxResultEvent,
      issuerAddress,
    );
    let expectedValue = new EventCollectionNftIssued(
      0,
      "9636a07e",
      "10000001",
      "tlink1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftMinted", () => {
    let collectionNftMintedRawTxResultEvent = new RawTransactionEvent(
      "mint_nft",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl",
        ),
      ],
    );

    let actualValue = underTest.collectionNftMinted(
      0,
      collectionNftMintedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftMinted(
      0,
      "9636a07e",
      ["1000000100000003"],
      "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftRootChanged with detach", () => {
    let collectionNftAttachedRawTxResultEvent = new RawTransactionEvent(
      "detach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("from_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000002",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000003",
        ),
      ],
    );
    let collectionNftRootChangedRawTxResultEvent = new RawTransactionEvent(
      "detach",
      [
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
      ],
    );

    let actualValue = underTest.collectionNftRootChanged(
      0,
      collectionNftAttachedRawTxResultEvent,
      collectionNftRootChangedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftRootChanged(
      0,
      "9636a07e",
      ["1000000100000003"],
      "1000000100000002",
      "1000000100000003",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftRootChanged with attach", () => {
    let collectionNftAttachedRawTxResultEvent = new RawTransactionEvent(
      "attach",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("to_token_id", "1000000100000002"),
        new RawTransactionEventAttribute(
          "old_root_token_id",
          "1000000100000003",
        ),
        new RawTransactionEventAttribute(
          "new_root_token_id",
          "1000000100000002",
        ),
      ],
    );
    let collectionNftRootChangedRawTxResultEvent = new RawTransactionEvent(
      "detach",
      [
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
      ],
    );

    let actualValue = underTest.collectionNftRootChanged(
      0,
      collectionNftAttachedRawTxResultEvent,
      collectionNftRootChangedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftRootChanged(
      0,
      "9636a07e",
      ["1000000100000003"],
      "1000000100000003",
      "1000000100000002",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftTransferred", () => {
    let collectionNftTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer_nft_from",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
      ],
    );

    let actualValue = underTest.collectionNftTransferred(
      0,
      collectionNftTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftTransferred(
      0,
      "9636a07e",
      ["1000000100000003"],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionNftTransferred from batch", () => {
    let collectionNftTransferredRawTxResultEvent = new RawTransactionEvent(
      "transfer_nft_from",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "from",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "to",
          "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
        ),
        new RawTransactionEventAttribute("token_id", "1000000100000003"),
        new RawTransactionEventAttribute("token_id", "1000000100000004"),
      ],
    );

    let actualValue = underTest.collectionNftTransferred(
      0,
      collectionNftTransferredRawTxResultEvent,
    );
    let expectedValue = new EventCollectionNftTransferred(
      0,
      "9636a07e",
      ["1000000100000003", "1000000100000004"],
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionProxyApproved from batch", () => {
    let collectionProxyApprovedRawTxResultEvent = new RawTransactionEvent(
      "approve_collection",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "approver",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
        ),
      ],
    );

    let actualValue = underTest.collectionProxyApproved(
      0,
      collectionProxyApprovedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionProxyApproved(
      0,
      "9636a07e",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });

  it("test collectionProxyDisapproved from batch", () => {
    let collectionProxyDisapprovedRawTxResultEvent = new RawTransactionEvent(
      "disapprove_collection",
      [
        new RawTransactionEventAttribute("contract_id", "9636a07e"),
        new RawTransactionEventAttribute(
          "approver",
          "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        ),
        new RawTransactionEventAttribute(
          "proxy",
          "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
        ),
      ],
    );

    let actualValue = underTest.collectionProxyDisapproved(
      0,
      collectionProxyDisapprovedRawTxResultEvent,
    );
    let expectedValue = new EventCollectionProxyDisapproved(
      0,
      "9636a07e",
      "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p",
    );
    expect(expectedValue).to.deep.equal(actualValue);
  });
});
