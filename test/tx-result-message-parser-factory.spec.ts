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
    ItemTokenModifyMessage,
    NonFungibleTokenAttachMessage,
    NonFungibleTokenAttachFromMessage,
    NonFungibleTokenDetachMessage,
    NonFungibleTokenDetachFromMessage,
    FungibleTokenIssueMessage,
    FungibleTokenMintMessage,
    FungibleTokenBurnMessage,
    NonFungibleTokenIssueMessage,
    NonFungibleTokenMintMessage,
    NonFungibleTokenBurnMessage,
} from "../lib/transaction-messages";

import {
    serviceTokenMintTxResult,
    serviceTokenModifyTxResult,
    genericServiceTokenModifyTxResultResponse,
    serviceTokenBurnTxResult,
    serviceTokenTransferTxResult,
    serviceTokenTransferFromTxResult,
    fungibleTokenModifyTxResult,
    nonFungibleTokenTypeModifyTxResult,
    nonFungibleTokenModifyTxResult,
    attachFromNFTTxResult,
    attachNFTTxResult,
    detachNFTTxResult,
    detachNFTFromTxResult,
    issueFungibleTxResult,
    mintFungibleTxResult,
    burnFungibleTxResult,
    issueNonFungibleTypeTxResult,
    mintNonFungibleTxResult,
    burnNonFungibleTxResult
} from "./test-data";

describe("txResultMessageParserFactory-test", () => {
    it("test parsing to ServiceTokenModifyMessage", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_MODIFY,
        );
        const serviceTokenModifyMessage = parser.parse(
            serviceTokenModifyTxResult,
        ) as ServiceTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.from,
        );
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.owner,
        );
        expect("9636a07e").to.equal(serviceTokenModifyMessage.contractId);

        const expectedChanges = [
            { field: "name", value: "STname" },
            { field: "meta", value: "meta" },
        ];
        const changes = serviceTokenModifyMessage.changes;
        expectedChanges.forEach((it, index) => {
            expect(it.field).to.equal(changes[index].field);
            expect(it.value).to.equal(changes[index].value);
        });
    });

    it("test parsing to genericServiceTokenModifyTxResultResponse", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_MODIFY,
        );
        const serviceTokenModifyMessage = parser.parseGenericTxResultResponse(
            genericServiceTokenModifyTxResultResponse,
        ) as ServiceTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenModifyMessage.from,
        );
    });

    it("test parsing to serviceTokenMintTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_MINT,
        );
        const serviceTokenMintMessage = parser.parse(
            serviceTokenMintTxResult,
        ) as ServiceTokenMintMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenMintMessage.from,
        );

        expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(
            serviceTokenMintMessage.to,
        );
        expect("9636a07e").to.equal(serviceTokenMintMessage.contractId);

        expect("1000").to.equal(serviceTokenMintMessage.amount);
    });

    it("test parsing to serviceTokenBurnTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_MINT,
        );
        const serviceTokenBurnMessage = parser.parse(
            serviceTokenBurnTxResult,
        ) as ServiceTokenBurnMessage;
        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenBurnMessage.from,
        );

        expect("9be17165").to.equal(serviceTokenBurnMessage.contractId);

        expect("1000").to.equal(serviceTokenBurnMessage.amount);
    });

    it("test parsing to serviceTokenTransferMessage", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_TRANSFER,
        );
        const serviceTokenTransferMessage = parser.parse(
            serviceTokenTransferTxResult,
        ) as ServiceTokenTransferMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            serviceTokenTransferMessage.from,
        );

        expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(
            serviceTokenTransferMessage.to,
        );

        expect("9636a07e").to.equal(serviceTokenTransferMessage.contractId);

        expect("1000").to.equal(serviceTokenTransferMessage.amount);
    });

    it("test parsing to serviceTokenTransferFromMessage", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_TRANSFER_FROM,
        );
        const serviceTokenTransferMessage = parser.parse(
            serviceTokenTransferFromTxResult,
        ) as ServiceTokenTransferFromMessage;
        expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(
            serviceTokenTransferMessage.from,
        );

        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenTransferMessage.proxy,
        );

        expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(
            serviceTokenTransferMessage.to,
        );

        expect("9be17165").to.equal(serviceTokenTransferMessage.contractId);

        expect("1").to.equal(serviceTokenTransferMessage.amount);
    });

    it("test parsing to serviceTokenTransferFromMessage", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.SERVICE_TOKEN_TRANSFER_FROM,
        );
        const serviceTokenTransferMessage = parser.parse(
            serviceTokenTransferFromTxResult,
        ) as ServiceTokenTransferFromMessage;
        expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(
            serviceTokenTransferMessage.from,
        );

        expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(
            serviceTokenTransferMessage.proxy,
        );

        expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(
            serviceTokenTransferMessage.to,
        );

        expect("9be17165").to.equal(serviceTokenTransferMessage.contractId);

        expect("1").to.equal(serviceTokenTransferMessage.amount);
    });

    it("test parsing to fungibleTokenModifyTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_MODIFY,
        );
        const itemTokenModifyMessage = parser.parse(
            fungibleTokenModifyTxResult,
        ) as ItemTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.owner,
        );

        expect("61e14383").to.equal(itemTokenModifyMessage.contractId);

        expect(true).to.equal(itemTokenModifyMessage.isFungible);
        expect("00000001").to.equal(itemTokenModifyMessage.tokenType);

    });

    it("test parsing to nonFungibleTokenTypeModifyTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_MODIFY,
        );
        const itemTokenModifyMessage = parser.parse(
            nonFungibleTokenTypeModifyTxResult,
        ) as ItemTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.owner,
        );

        expect("61e14383").to.equal(itemTokenModifyMessage.contractId);

        expect(false).to.equal(itemTokenModifyMessage.isFungible);
    });
    //

    it("test parsing to nonFungibleTokenModifyTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_MODIFY,
        );
        const itemTokenModifyMessage = parser.parse(
            nonFungibleTokenModifyTxResult,
        ) as ItemTokenModifyMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.owner,
        );

        expect("61e14383").to.equal(itemTokenModifyMessage.contractId);

        expect("1000000100000001").to.equal(itemTokenModifyMessage.tokenId);

        expect(false).to.equal(itemTokenModifyMessage.isFungible);
    });

    it("test parsing to nonFungibleTokenAttachTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_ATTACH,
        );
        const itemTokenModifyMessage = parser.parse(
            attachNFTTxResult,
        ) as NonFungibleTokenAttachMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.from,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.contractId,
        );

        expect("10000008").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenType,
        );
        expect("0000000f").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenIndex,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.contractId,
        );

        expect("10000008").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenType,
        );
        expect("0000000e").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex,
        );
    });

    it("test parsing to nonFungibleTokenAttachFromTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_ATTACH_FROM,
        );
        const itemTokenModifyMessage = parser.parse(
            attachFromNFTTxResult,
        ) as NonFungibleTokenAttachFromMessage;
        expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(
            itemTokenModifyMessage.from,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.proxy,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.contractId,
        );

        expect("10000001").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenType,
        );
        expect("0000000c").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenIndex,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.contractId,
        );

        expect("10000001").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenType,
        );
        expect("0000000b").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex,
        );
    });

    it("test parsing to nonFungibleTokenDetachTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_DETACH,
        );
        const itemTokenModifyMessage = parser.parse(
            detachNFTTxResult,
        ) as NonFungibleTokenDetachMessage;
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.from,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.contractId,
        );

        expect("10000008").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenType,
        );
        expect("0000000f").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenIndex,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.contractId,
        );

        expect("10000008").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenType,
        );
        expect("0000000e").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex,
        );
    });

    it("test parsing to nonFungibleTokenDetachFromTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_DETACH_FROM,
        );
        const itemTokenModifyMessage = parser.parse(
            detachNFTFromTxResult,
        ) as NonFungibleTokenDetachFromMessage;

        expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(
            itemTokenModifyMessage.from,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.proxy,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenModifyMessage.sender,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.contractId,
        );

        expect("10000001").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenType,
        );
        expect("0000000c").to.equal(
            itemTokenModifyMessage.parentNonFungibleToken.tokenIndex,
        );

        expect("61e14383").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.contractId,
        );

        expect("10000001").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenType,
        );
        expect("0000000b").to.equal(
            itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex,
        );
    });

    it("test parsing to fungibleTokenIssueTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_ISSUE_FT,
        );
        const itemTokenIssueMessage = parser.parse(
            issueFungibleTxResult,
        ) as FungibleTokenIssueMessage;

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenIssueMessage.sender,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenIssueMessage.owner,
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenIssueMessage.to,
        );

        expect("0").to.equal(itemTokenIssueMessage.amount);

        expect("61e14383").to.equal(
            itemTokenIssueMessage.issuedFungibleToken.contractId,
        );

        expect("00000031").to.equal(
            itemTokenIssueMessage.issuedFungibleToken.tokenType,
        );

        expect("0").to.equal(itemTokenIssueMessage.issuedFungibleToken.decimal);

        expect("FungibleName").to.equal(
            itemTokenIssueMessage.issuedFungibleToken.name,
        );

        expect("FungibleMeta").to.equal(
            itemTokenIssueMessage.issuedFungibleToken.meta,
        );
    });

    it("test parsing to fungibleTokenMintTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_MINT_FT,
        );
        const itemTokenMintMessage = parser.parse(
            mintFungibleTxResult,
        ) as FungibleTokenMintMessage;

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenMintMessage.from,
        );

        expect("tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j").to.equal(
            itemTokenMintMessage.to,
        );

        expect(1).to.equal(itemTokenMintMessage.mintedFungibleTokens.length);
        expect("61e14383").to.equal(
            itemTokenMintMessage.mintedFungibleTokens[0].contractId,
        );
        expect("00000001").to.equal(
            itemTokenMintMessage.mintedFungibleTokens[0].tokenType,
        );
        expect("3000").to.equal(
            itemTokenMintMessage.mintedFungibleTokens[0].amount,
        );
    });

    it("test parsing to fungibleTokenBurnTxResult", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_BURN_FT,
        );
        const itemTokenBurnMessage = parser.parse(burnFungibleTxResult) as FungibleTokenBurnMessage

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.from,
        );
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.sender,
        );
        expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
        expect("61e14383").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].contractId);
        expect("1").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].amount);
    });

    it("test parsing to nonFungibleTypeIssueTx", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_ISSUE_NFT,
        );
        const itemTokenBurnMessage =
            parser.parse(issueNonFungibleTypeTxResult) as NonFungibleTokenIssueMessage;

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.from
        );
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.sender
        );
        expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
        expect("61e14383").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.contractId);
        expect("1000000c").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.tokenType)
    });

    it("test parsing to nonFungibleTypeMintTx", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_MINT_NFT,
        );
        const itemTokenBurnMessage =
            parser.parse(mintNonFungibleTxResult) as NonFungibleTokenMintMessage;

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.from
        );
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.sender
        );
        expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
        expect("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleToken.contractId);
        expect("10000001").to.equal(itemTokenBurnMessage.mintedNonFungibleToken.tokenType)
        expect("00000007").to.equal(itemTokenBurnMessage.mintedNonFungibleToken.tokenIndex);
    });


    it("test parsing to nonFungibleTypeBurnTx", () => {
        const parser = TxResultMessageParserFactory.create(
            MessageType.ITEM_TOKEN_BURN_NFT,
        );
        const itemTokenBurnMessage =
            parser.parse(burnNonFungibleTxResult) as NonFungibleTokenBurnMessage;

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.from
        );

        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
            itemTokenBurnMessage.sender
        );

        expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
        expect("61e14383").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.contractId);
        expect("10000001").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenType);
        expect("00000003").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenIndex);

    });

});
