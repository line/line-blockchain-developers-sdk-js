"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const tx_core_models_1 = require("../lib/tx-core-models");
const tx_raw_models_1 = require("../lib/tx-raw-models");
const tx_result_adapters_1 = require("../lib/tx-result-adapters");
(0, mocha_1.describe)("LbdTxEventConverterV1 tests", () => {
    let underTest = new tx_result_adapters_1.LbdTxEventConverterV1();
    (0, mocha_1.it)("test emptyMsgCreated", () => {
        let memoRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("message", [
            new tx_raw_models_1.RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("module", "account"),
            new tx_raw_models_1.RawTransactionEventAttribute("action", "empty"),
        ]);
        let actualValue = underTest.emptyMsgCreated(0, memoRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventEmptyMsgCreated(0, "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test accountCreated", () => {
        let createAccountRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("create_account", [
            new tx_raw_models_1.RawTransactionEventAttribute("create_account_from", "link1e9xfq4gkjdredmyka98qes3m4g6xtzqn403vf9"),
            new tx_raw_models_1.RawTransactionEventAttribute("create_account_target", "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd"),
        ]);
        let actualValue = underTest.accountCreated(0, createAccountRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventAccountCreated(0, "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test coinTransferred", () => {
        let coinTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer", [
            new tx_raw_models_1.RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("recipient", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1tcony"),
        ]);
        let actualValue = underTest.coinTransferred(0, coinTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCoinTransferred(0, "tcony", "1", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenIssued", () => {
        let tokenIssuedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("issue", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9be17165"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "Gamja"),
            new tx_raw_models_1.RawTransactionEventAttribute("symbol", "GAMJA"),
            new tx_raw_models_1.RawTransactionEventAttribute("owner", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1"),
            new tx_raw_models_1.RawTransactionEventAttribute("mintable", "true"),
            new tx_raw_models_1.RawTransactionEventAttribute("decimals", "6"),
        ]);
        let actualValue = underTest.tokenIssued(0, tokenIssuedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenIssued(0, "9be17165", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558", "Gamja", "GAMJA", 6, "1");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenMinted", () => {
        let tokenMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("mint", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1000"),
        ]);
        let actualValue = underTest.tokenMinted(0, tokenMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenMinted(0, "9636a07e", "1000", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenBurned", () => {
        let tokenMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("burn", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9be17165"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1000"),
        ]);
        let actualValue = underTest.tokenBurned(0, tokenMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenBurned(0, "9be17165", "1000", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenBurned with burnFrom", () => {
        let tokenMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("burn", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9be17165"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1000"),
        ]);
        let actualValue = underTest.tokenBurned(0, tokenMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenBurned(0, "9be17165", "1000", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenModified", () => {
        let tokenMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "STname"),
            new tx_raw_models_1.RawTransactionEventAttribute("meta", "meta"),
        ]);
        let emptyMessageEvent = new tx_raw_models_1.RawTransactionEvent("message", [
            new tx_raw_models_1.RawTransactionEventAttribute("module", "token"),
            new tx_raw_models_1.RawTransactionEventAttribute("action", "modify_token"),
            new tx_raw_models_1.RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
        ]);
        let actualValue = underTest.tokenModified(0, emptyMessageEvent, tokenMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenModified(0, "9636a07e", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", new Set([
            new tx_core_models_1.TokenAttribute("name", "STname"),
            new tx_core_models_1.TokenAttribute("meta", "meta"),
        ]));
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenTransferred", () => {
        let tokenTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer", [
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1000"),
        ]);
        let actualValue = underTest.tokenTransferred(0, tokenTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenTransferred(0, "9636a07e", "1000", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test tokenTransferred with transferFrom", () => {
        let tokenTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer", [
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1000"),
        ]);
        let actualValue = underTest.tokenTransferred(0, tokenTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventTokenTransferred(0, "9636a07e", "1000", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionCreated", () => {
        let collectionCreatedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("create_collection", [
            new tx_raw_models_1.RawTransactionEventAttribute("name", "testContract"),
            new tx_raw_models_1.RawTransactionEventAttribute("owner", "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "fee15a74"),
        ]);
        let permissionGrantedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("grant_perm", [
            new tx_raw_models_1.RawTransactionEventAttribute("to", "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"),
        ]);
        let actualValue = underTest.collectionCreated(0, collectionCreatedRawTxResultEvent, permissionGrantedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionCreated(0, "fee15a74", "testContract", "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionCreated without permission granted", () => {
        let collectionCreatedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("create_collection", [
            new tx_raw_models_1.RawTransactionEventAttribute("name", "testContract"),
            new tx_raw_models_1.RawTransactionEventAttribute("owner", "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "fee15a74"),
        ]);
        let actualValue = underTest.collectionCreated(0, collectionCreatedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionCreated(0, "fee15a74", "testContract", "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtBurned", () => {
        let collectionCreatedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("burn_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1:0000000100000000"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
        ]);
        let actualValue = underTest.collectionFtBurned(0, collectionCreatedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtBurned(0, "61e14383", "00000001", "0000000100000000", "1", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtBurned with BurnFrom", () => {
        let collectionCreatedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("burn_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "1:0000000100000000"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
        ]);
        let actualValue = underTest.collectionFtBurned(0, collectionCreatedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtBurned(0, "61e14383", "00000001", "0000000100000000", "1", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtIssued", () => {
        let collectionFtIssuedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("issue_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "100"),
            new tx_raw_models_1.RawTransactionEventAttribute("owner", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "0000003100000000"),
            new tx_raw_models_1.RawTransactionEventAttribute("decimals", "0"),
            new tx_raw_models_1.RawTransactionEventAttribute("mintable", "true"),
        ]);
        let actualValue = underTest.collectionFtIssued(0, collectionFtIssuedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtIssued(0, "61e14383", "00000031", "TestFT", "100", 0, "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtMinted", () => {
        let collectionFtMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("mint_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "100:0000003100000000"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
        ]);
        let actualValue = underTest.collectionFtMinted(0, collectionFtMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtMinted(0, "61e14383", "00000031", "0000003100000000", "100", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtModified", () => {
        let collectionFtModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "0000003100000000"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionFtModified(0, collectionFtModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionFtModified(0, "61e14383", "00000031", new Set([new tx_core_models_1.CollectionAttribute("name", "TestFT")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftTypeModified", () => {
        let collectionNftTypeModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000003100000001"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionNftTypeModified(0, collectionNftTypeModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionNftTypeModified(0, "61e14383", "10000031", new Set([new tx_core_models_1.CollectionAttribute("name", "TestFT")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftModified", () => {
        let collectionNftModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "61e14383"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000003100000001"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionNftModified(0, collectionNftModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionNftModified(0, "61e14383", "1000003100000001", new Set([new tx_core_models_1.CollectionAttribute("name", "TestFT")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtTransferred", () => {
        let tokenTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "100:0000000100000000"),
        ]);
        let actualValue = underTest.collectionFtTransferred(0, tokenTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtTransferred(0, "9636a07e", "00000001", "0000000100000000", "100", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionFtTransferred with tranferFrom", () => {
        let tokenTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer_ft", [
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("amount", "100:0000000100000000"),
        ]);
        let actualValue = underTest.collectionFtTransferred(0, tokenTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionFtTransferred(0, "9636a07e", "00000001", "0000000100000000", "100", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionModified with modify_collection", () => {
        let collectionModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_collection", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestCollection"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionModified(0, collectionModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionModified(0, "9636a07e", new Set([new tx_core_models_1.CollectionAttribute("name", "TestCollection")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionModified with modify fungible token", () => {
        let collectionModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "0000000100000000"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionModified(0, collectionModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionFtModified(0, "9636a07e", "00000001", new Set([new tx_core_models_1.CollectionAttribute("name", "TestFT")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionModified with modify non-fungible token type ", () => {
        let collectionModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token_type", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestNFT_Type"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_type", "10000001"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionModified(0, collectionModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionNftTypeModified(0, "9636a07e", "10000001", new Set([new tx_core_models_1.CollectionAttribute("name", "TestNFT_Type")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionModified with modify non-fungible token itself ", () => {
        let collectionModifiedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("modify_token", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("name", "TestNFT"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000001"),
        ]);
        let senderAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        let actualValue = underTest.collectionModified(0, collectionModifiedRawTxResultEvent, senderAddress);
        let expectedValue = new tx_core_models_1.EventCollectionNftModified(0, "9636a07e", "1000000100000001", new Set([new tx_core_models_1.CollectionAttribute("name", "TestNFT")]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftBurned", () => {
        let collectionNftBurnedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("burn_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000001"),
        ]);
        let operationBurnNftRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("operation_burn_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000001"),
        ]);
        let actualValue = underTest.collectionNftBurned(0, collectionNftBurnedRawTxResultEvent, operationBurnNftRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftBurned(0, "9636a07e", new Set(["1000000100000001"]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftAttached", () => {
        let collectionNftAttachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("attach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("to_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000002"),
        ]);
        let actualValue = underTest.collectionNftAttached(0, collectionNftAttachedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftAttached(0, "9636a07e", "1000000100000003", "1000000100000002", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftAttached with attach-from", () => {
        let collectionNftAttachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("attach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("to_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000002"),
        ]);
        let actualValue = underTest.collectionNftAttached(0, collectionNftAttachedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftAttached(0, "9636a07e", "1000000100000003", "1000000100000002", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftDetached", () => {
        let collectionNftDetachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("detach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("from_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftDetached(0, collectionNftDetachedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftDetached(0, "9636a07e", "1000000100000003", "1000000100000002", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftDetached with attach-from", () => {
        let collectionNftDetachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("detach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("from_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftDetached(0, collectionNftDetachedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftDetached(0, "9636a07e", "1000000100000003", "1000000100000002", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftHolderChanged", () => {
        let collectionNftTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink1rrjua8zktmqnr6hlsqz7qyx5gxm5z96yt8f5ae"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
        ]);
        let collectionOperationNftTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("operation_transfer_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftHolderChanged(0, collectionNftTransferredRawTxResultEvent, collectionOperationNftTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftHolderChanged(0, "9636a07e", new Set(["1000000100000003"]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1rrjua8zktmqnr6hlsqz7qyx5gxm5z96yt8f5ae");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftIssued", () => {
        let collectionNftIssuedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("issue_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_type", "10000001"),
        ]);
        let issuerAddress = "tlink1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4";
        let actualValue = underTest.collectionNftIssued(0, collectionNftIssuedRawTxResultEvent, issuerAddress);
        let expectedValue = new tx_core_models_1.EventCollectionNftIssued(0, "9636a07e", "10000001", "tlink1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftMinted", () => {
        let collectionNftMintedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("mint_nft", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl"),
        ]);
        let actualValue = underTest.collectionNftMinted(0, collectionNftMintedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftMinted(0, "9636a07e", new Set(["1000000100000003"]), "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftRootChanged with detach", () => {
        let collectionNftAttachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("detach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("from_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000003"),
        ]);
        let collectionNftRootChangedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("detach", [
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftRootChanged(0, collectionNftAttachedRawTxResultEvent, collectionNftRootChangedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftRootChanged(0, "9636a07e", new Set(["1000000100000003"]), "1000000100000002", "1000000100000003");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftRootChanged with attach", () => {
        let collectionNftAttachedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("attach", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("to_token_id", "1000000100000002"),
            new tx_raw_models_1.RawTransactionEventAttribute("old_root_token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("new_root_token_id", "1000000100000002"),
        ]);
        let collectionNftRootChangedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("detach", [
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftRootChanged(0, collectionNftAttachedRawTxResultEvent, collectionNftRootChangedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftRootChanged(0, "9636a07e", new Set(["1000000100000003"]), "1000000100000003", "1000000100000002");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftTransferred", () => {
        let collectionNftTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer_nft_from", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
        ]);
        let actualValue = underTest.collectionNftTransferred(0, collectionNftTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftTransferred(0, "9636a07e", new Set(["1000000100000003"]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionNftTransferred from batch", () => {
        let collectionNftTransferredRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("transfer_nft_from", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("to", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000003"),
            new tx_raw_models_1.RawTransactionEventAttribute("token_id", "1000000100000004"),
        ]);
        let actualValue = underTest.collectionNftTransferred(0, collectionNftTransferredRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionNftTransferred(0, "9636a07e", new Set(["1000000100000003", "1000000100000004"]), "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionProxyApproved from batch", () => {
        let collectionProxyApprovedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("approve_collection", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("approver", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p"),
        ]);
        let actualValue = underTest.collectionProxyApproved(0, collectionProxyApprovedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionProxyApproved(0, "9636a07e", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
    (0, mocha_1.it)("test collectionProxyDisapproved from batch", () => {
        let collectionProxyDisapprovedRawTxResultEvent = new tx_raw_models_1.RawTransactionEvent("disapprove_collection", [
            new tx_raw_models_1.RawTransactionEventAttribute("contract_id", "9636a07e"),
            new tx_raw_models_1.RawTransactionEventAttribute("approver", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            new tx_raw_models_1.RawTransactionEventAttribute("proxy", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p"),
        ]);
        let actualValue = underTest.collectionProxyDisapproved(0, collectionProxyDisapprovedRawTxResultEvent);
        let expectedValue = new tx_core_models_1.EventCollectionProxyDisapproved(0, "9636a07e", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p");
        (0, chai_1.expect)(expectedValue).to.deep.equal(actualValue);
    });
});
