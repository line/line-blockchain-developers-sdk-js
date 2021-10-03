import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultMessageParserFactory } from "../lib/transaction-message-parser";
import {
    MessageType,
    ServiceTokenModifyMessage,
    ServiceTokenMintMessage,
    ServiceTokenBurnMessage,
    ServiceTokenTransferMessage,
    ServiceTokenTransferFromMessage,
    ItemTokenModifyMessage
} from "../lib/transaction-messages";

import {
    serviceTokenMintTxResult,
    serviceTokenModifyTxResult,
    genericServiceTokenModifyTxResultResponse,
    serviceTokenBurnTxResult,
    serviceTokenTransferTxResult,
    serviceTokenTransferFromTxResult,
    fungibleTokenModifyTxResult,
} from "./test-data";

describe("txResultMessageParserFactory-test", () => {
    it("test parsing to ServiceTokenModifyMessage", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MODIFY);
        const serviceTokenModifyMessage = parser.parse(
            serviceTokenModifyTxResult,
        ) as ServiceTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.from
        );
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.owner,
        );
        expect("9636a07e").to.equal(
            serviceTokenModifyMessage.contractId
        );

        const expectedChanges = [{ field: "name", value: "STname", }, { field: "meta", value: "meta" }]
        const changes = serviceTokenModifyMessage.changes
        expectedChanges.forEach((it, index) => {
            expect(it.field).to.equal(changes[index].field);
            expect(it.value).to.equal(changes[index].value);
        });
    });

    it("test parsing to genericServiceTokenModifyTxResultResponse", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MODIFY);
        const serviceTokenModifyMessage = parser.parseGenericTxResultResponse(
            genericServiceTokenModifyTxResultResponse,
        ) as ServiceTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.from
        );
    });

    it("test parsing to serviceTokenMintTxResult", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MINT);
        const serviceTokenMintMessage = parser.parse(serviceTokenMintTxResult) as ServiceTokenMintMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenMintMessage.from
        );

        expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(
            serviceTokenMintMessage.to
        );
        expect("9636a07e").to.equal(
            serviceTokenMintMessage.contractId
        );

        expect("1000").to.equal(
            serviceTokenMintMessage.amount
        );
    });

    it("test parsing to serviceTokenBurnTxResult", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MINT);
        const serviceTokenBurnMessage = parser.parse(serviceTokenBurnTxResult) as ServiceTokenBurnMessage;
        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenBurnMessage.from
        );

        expect("9be17165").to.equal(
            serviceTokenBurnMessage.contractId
        );

        expect("1000").to.equal(
            serviceTokenBurnMessage.amount
        );
    });

    it("test parsing to serviceTokenTransferMessage", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_TRANSFER);
        const serviceTokenTransferMessage = parser.parse(serviceTokenTransferTxResult) as ServiceTokenTransferMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenTransferMessage.from
        );

        expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(
            serviceTokenTransferMessage.to
        );

        expect("9636a07e").to.equal(
            serviceTokenTransferMessage.contractId
        );

        expect("1000").to.equal(
            serviceTokenTransferMessage.amount
        );
    });

    it("test parsing to serviceTokenTransferFromMessage", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_TRANSFER_FROM);
        const serviceTokenTransferMessage = parser.parse(serviceTokenTransferFromTxResult) as ServiceTokenTransferFromMessage;
        expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(
            serviceTokenTransferMessage.from
        );

        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenTransferMessage.proxy
        );

        expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(
            serviceTokenTransferMessage.to
        );

        expect("9be17165").to.equal(
            serviceTokenTransferMessage.contractId
        );

        expect("1").to.equal(
            serviceTokenTransferMessage.amount
        );
    });

    it("test parsing to serviceTokenTransferFromMessage", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_TRANSFER_FROM);
        const serviceTokenTransferMessage = parser.parse(serviceTokenTransferFromTxResult) as ServiceTokenTransferFromMessage;
        expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(
            serviceTokenTransferMessage.from
        );

        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenTransferMessage.proxy
        );

        expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(
            serviceTokenTransferMessage.to
        );

        expect("9be17165").to.equal(
            serviceTokenTransferMessage.contractId
        );

        expect("1").to.equal(
            serviceTokenTransferMessage.amount
        );
    });

    it("test parsing to fungibleTokenModifyTxResult", () => {
        const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MODIFY);
        const itemTokenModifyMessage = parser.parse(fungibleTokenModifyTxResult) as ItemTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender
        );

        expect("tlink16vm77f7sevz78r2aewnwfwj36uxtf9z5zztm2y").to.equal(
            itemTokenModifyMessage.owner
        );

        expect("678c146a").to.equal(
            itemTokenModifyMessage.contractId
        );

        expect(true).to.equal(
            itemTokenModifyMessage.isFungible
        );
    });

    //


});