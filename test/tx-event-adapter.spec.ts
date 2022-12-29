import { expect } from "chai";
import { describe, it } from "mocha";
import { EventAccountCreated, EventCoinTransferred, EventEmptyMsgCreated, EventTokenBurned, EventTokenIssued, EventTokenMinted, EventTokenModified, EventTokenTransferred, TokenAttribute } from "../lib/tx-core-models";
import { RawTransactionEvent, RawTransactionEventAttribute } from "../lib/tx-raw-models";
import { LbdTxEventConverterV1 } from "../lib/tx-result-adapters";

describe("LbdTxEventConverterV1 tests", () => {
    let underTest: LbdTxEventConverterV1 = new LbdTxEventConverterV1();
    it("test emptyMsgCreated", () => {
        let memoRawTxResultEvent = new RawTransactionEvent(
            "message",
            [
                new RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
                new RawTransactionEventAttribute("module", "account"),
                new RawTransactionEventAttribute("action", "empty"),
            ]
        )
        let actualValue = underTest.emptyMsgCreated(memoRawTxResultEvent, 0);
        let expectedValue = new EventEmptyMsgCreated(0, "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq");
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test accountCreated", () => {
        let createAccountRawTxResultEvent = new RawTransactionEvent(
            "create_account",
            [
                new RawTransactionEventAttribute("create_account_from", "link1e9xfq4gkjdredmyka98qes3m4g6xtzqn403vf9"),
                new RawTransactionEventAttribute("create_account_target", "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd"),
            ]
        )
        let actualValue = underTest.accountCreated(createAccountRawTxResultEvent, 0);
        let expectedValue = new EventAccountCreated(0, "link16p22ehyh478fjjwc49pcm5srn2fxaezfsf25gd");
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test coinTransferred", () => {
        let coinTransferredRawTxResultEvent = new RawTransactionEvent(
            "transfer",
            [
                new RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
                new RawTransactionEventAttribute("recipient", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
                new RawTransactionEventAttribute("amount", "1tcony"),
            ]
        )
        let actualValue = underTest.coinTransferred(coinTransferredRawTxResultEvent, 0);
        let expectedValue = new EventCoinTransferred(0, "tcony", "1", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww");
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test tokenIssued", () => {
        let tokenIssuedRawTxResultEvent = new RawTransactionEvent(
            "issue",
            [
                new RawTransactionEventAttribute("contract_id", "9be17165"),
                new RawTransactionEventAttribute("name", "Gamja"),
                new RawTransactionEventAttribute("symbol", "GAMJA"),
                new RawTransactionEventAttribute("owner", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"),
                new RawTransactionEventAttribute("to", "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"),
                new RawTransactionEventAttribute("amount", "1"),
                new RawTransactionEventAttribute("mintable", "true"),
                new RawTransactionEventAttribute("decimals", "6"),
            ]
        )
        let actualValue = underTest.tokenIssued(tokenIssuedRawTxResultEvent, 0);
        let expectedValue = new EventTokenIssued(
            0,
            "9be17165",
            "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
            "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
            "Gamja",
            "GAMJA",
            6,
            "1"

        );
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test tokenMinted", () => {
        let tokenMintedRawTxResultEvent = new RawTransactionEvent(
            "mint",
            [
                new RawTransactionEventAttribute("contract_id", "9636a07e"),
                new RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
                new RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
                new RawTransactionEventAttribute("amount", "1000"),
            ]
        )
        let actualValue = underTest.tokenMinted(tokenMintedRawTxResultEvent, 0);
        let expectedValue = new EventTokenMinted(
            0,
            "9636a07e",
            "1000",
            "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"

        );
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test tokenBurned", () => {
        let tokenMintedRawTxResultEvent = new RawTransactionEvent(
            "burn",
            [
                new RawTransactionEventAttribute("contract_id", "9be17165"),
                new RawTransactionEventAttribute("from", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"),
                new RawTransactionEventAttribute("amount", "1000"),
            ]
        )
        let actualValue = underTest.tokenBurned(tokenMintedRawTxResultEvent, 0);
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
                new RawTransactionEventAttribute("from", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"),
                new RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
                new RawTransactionEventAttribute("amount", "1000"),
            ]
        )
        let actualValue = underTest.tokenBurned(tokenMintedRawTxResultEvent, 0);
        let expectedValue = new EventTokenBurned(
            0,
            "9be17165",
            "1000",
            "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"
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
            ]
        )

        let emptyMessageEvent = new RawTransactionEvent(
            "message",
            [
                new RawTransactionEventAttribute("module", "token"),
                new RawTransactionEventAttribute("action", "modify_token"),
                new RawTransactionEventAttribute("sender", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
            ]
        )
        let actualValue = underTest.tokenModified(tokenMintedRawTxResultEvent, emptyMessageEvent, 0);
        let expectedValue = new EventTokenModified(
            0,
            "9636a07e",
            "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            new Set([
                new TokenAttribute("name", "STname"),
                new TokenAttribute("meta", "meta"),
            ])
        );
        expect(expectedValue).to.deep.equal(actualValue);
    });

    it("test tokenTransferred", () => {
        let tokenTransferredRawTxResultEvent = new RawTransactionEvent(
            "transfer",
            [
                new RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
                new RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
                new RawTransactionEventAttribute("contract_id", "9636a07e"),
                new RawTransactionEventAttribute("amount", "1000"),
            ]
        )

        let actualValue = underTest.tokenTransferred(tokenTransferredRawTxResultEvent, 0);
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
                new RawTransactionEventAttribute("from", "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"),
                new RawTransactionEventAttribute("to", "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"),
                new RawTransactionEventAttribute("proxy", "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"),
                new RawTransactionEventAttribute("contract_id", "9636a07e"),
                new RawTransactionEventAttribute("amount", "1000"),
            ]
        )

        let actualValue = underTest.tokenTransferred(tokenTransferredRawTxResultEvent, 0);
        let expectedValue = new EventTokenTransferred(
            0,
            "9636a07e",
            "1000",
            "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe8"
        );
        expect(expectedValue).to.deep.equal(actualValue);
    });
});