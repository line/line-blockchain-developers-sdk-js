"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const transaction_message_parser_1 = require("../lib/transaction-message-parser");
const transaction_messages_1 = require("../lib/transaction-messages");
const test_data_1 = require("./test-data");
(0, mocha_1.describe)("txResultMessageParserFactory-test", () => {
    (0, mocha_1.it)("test parsing to ServiceTokenModifyMessage", () => {
        const expectedChanges = [
            { field: "name", value: "STname" },
            { field: "meta", value: "meta" },
        ];
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_MODIFY);
        const serviceTokenModifyMessage = parser.parse(test_data_1.serviceTokenModifyTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.owner);
        (0, chai_1.expect)("9636a07e").to.equal(serviceTokenModifyMessage.contractId);
        const changes = serviceTokenModifyMessage.changes;
        expectedChanges.forEach((it, index) => {
            (0, chai_1.expect)(it.field).to.equal(changes[index].field);
            (0, chai_1.expect)(it.value).to.equal(changes[index].value);
        });
    });
    (0, mocha_1.it)("test parsing to genericServiceTokenModifyTxResultResponse", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_MODIFY);
        const serviceTokenModifyMessage = parser.parseGenericTxResultResponse(test_data_1.genericServiceTokenModifyTxResultResponse);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.from);
    });
    (0, mocha_1.it)("test parsing to serviceTokenIssueTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_ISSUE);
        const serviceTokenIssueMessage = parser.parse(test_data_1.issueServiceTokenTxResult);
        (0, chai_1.expect)("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(serviceTokenIssueMessage.from);
        (0, chai_1.expect)("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(serviceTokenIssueMessage.to);
        (0, chai_1.expect)("9be17165").to.equal(serviceTokenIssueMessage.issuedServiceToken.contractId);
        (0, chai_1.expect)("987654321").to.equal(serviceTokenIssueMessage.amount);
    });
    (0, mocha_1.it)("test parsing to serviceTokenMintTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_MINT);
        const serviceTokenMintMessage = parser.parse(test_data_1.serviceTokenMintTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenMintMessage.from);
        (0, chai_1.expect)("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(serviceTokenMintMessage.to);
        (0, chai_1.expect)("9636a07e").to.equal(serviceTokenMintMessage.contractId);
        (0, chai_1.expect)("1000").to.equal(serviceTokenMintMessage.amount);
    });
    (0, mocha_1.it)("test parsing to serviceTokenBurnTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_BURN);
        const serviceTokenBurnMessage = parser.parse(test_data_1.serviceTokenBurnTxResult);
        (0, chai_1.expect)("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(serviceTokenBurnMessage.from);
        (0, chai_1.expect)("9be17165").to.equal(serviceTokenBurnMessage.contractId);
        (0, chai_1.expect)("1000").to.equal(serviceTokenBurnMessage.amount);
    });
    (0, mocha_1.it)("test parsing to serviceTokenBurnFromTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_BURN_FROM);
        const serviceTokenBurnFromMessage = parser.parse(test_data_1.serviceTokenBurnFromTxResult);
        (0, chai_1.expect)("link16mk739rd3r3q8a8dw7zr3h50xunxcq0wp80gtu").to.equal(serviceTokenBurnFromMessage.from);
        (0, chai_1.expect)("link17gx76scz3pe7gtqq8rmf46favtmxn3sgs6qa49").to.equal(serviceTokenBurnFromMessage.proxy);
        (0, chai_1.expect)("678c146a").to.equal(serviceTokenBurnFromMessage.contractId);
        (0, chai_1.expect)("1").to.equal(serviceTokenBurnFromMessage.amount);
    });
    (0, mocha_1.it)("test parsing to serviceTokenTransferMessage", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_TRANSFER);
        const serviceTokenTransferMessage = parser.parse(test_data_1.serviceTokenTransferTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenTransferMessage.from);
        (0, chai_1.expect)("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(serviceTokenTransferMessage.to);
        (0, chai_1.expect)("9636a07e").to.equal(serviceTokenTransferMessage.contractId);
        (0, chai_1.expect)("1000").to.equal(serviceTokenTransferMessage.amount);
    });
    (0, mocha_1.it)("test parsing to serviceTokenTransferFromMessage", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_TRANSFER_FROM);
        const serviceTokenTransferMessage = parser.parse(test_data_1.serviceTokenTransferFromTxResult);
        (0, chai_1.expect)("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(serviceTokenTransferMessage.from);
        (0, chai_1.expect)("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(serviceTokenTransferMessage.proxy);
        (0, chai_1.expect)("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(serviceTokenTransferMessage.to);
        (0, chai_1.expect)("9be17165").to.equal(serviceTokenTransferMessage.contractId);
        (0, chai_1.expect)("1").to.equal(serviceTokenTransferMessage.amount);
    });
    (0, mocha_1.it)("test parsing to ServiceTokenApprovedMessage", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.SERVICE_TOKEN_PROXY_APPROVED);
        const serviceTokenApprovedMessage = parser.parse(test_data_1.serviceTokenProxyApprovedTxResult);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.from);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.sender);
        (0, chai_1.expect)("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(serviceTokenApprovedMessage.proxy);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.approver);
        (0, chai_1.expect)("f38bb8a6").to.equal(serviceTokenApprovedMessage.contractId);
    });
    (0, mocha_1.it)("test parsing to itemTokenCreateTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_CREATE);
        const itemTokenCreateMessage = parser.parse(test_data_1.itemTokenCreateTxResult);
        (0, chai_1.expect)("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.from);
        (0, chai_1.expect)("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.sender);
        (0, chai_1.expect)("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.createdItemToken.owner);
        (0, chai_1.expect)("fee15a74").to.equal(itemTokenCreateMessage.createdItemToken.contractId);
        (0, chai_1.expect)("test").to.equal(itemTokenCreateMessage.createdItemToken.name);
        (0, chai_1.expect)("").to.equal(itemTokenCreateMessage.createdItemToken.meta);
        (0, chai_1.expect)("http://test-image-server.com").to.equal(itemTokenCreateMessage.createdItemToken.baseImgUri);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenModifyTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MODIFY);
        const itemTokenModifyMessage = parser.parse(test_data_1.fungibleTokenModifyTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.contractId);
        (0, chai_1.expect)(true).to.equal(itemTokenModifyMessage.isFungible);
        (0, chai_1.expect)("00000001").to.equal(itemTokenModifyMessage.tokenType);
    });
    (0, mocha_1.it)("test parsing to itemTokenApproveTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_APPROVE);
        const itemTokenApproveMessage = parser.parse(test_data_1.itemTokenApproveTxResult);
        (0, chai_1.expect)("link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p").to.equal(itemTokenApproveMessage.approver);
        (0, chai_1.expect)("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenApproveMessage.proxy);
        (0, chai_1.expect)("fee15a74").to.equal(itemTokenApproveMessage.contractId);
    });
    (0, mocha_1.it)("test parsing to itemTokenDisapproveTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_DISAPPROVE);
        const itemTokenDisapproveMessage = parser.parse(test_data_1.itemTokenDisapproveTxResult);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(itemTokenDisapproveMessage.approver);
        (0, chai_1.expect)("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(itemTokenDisapproveMessage.proxy);
        (0, chai_1.expect)("bf365bab").to.equal(itemTokenDisapproveMessage.contractId);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTokenTypeModifyTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MODIFY);
        const itemTokenModifyMessage = parser.parse(test_data_1.nonFungibleTokenTypeModifyTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.contractId);
        (0, chai_1.expect)(false).to.equal(itemTokenModifyMessage.isFungible);
    });
    //
    (0, mocha_1.it)("test parsing to nonFungibleTokenModifyTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MODIFY);
        const itemTokenModifyMessage = parser.parse(test_data_1.nonFungibleTokenModifyTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.contractId);
        (0, chai_1.expect)("1000000100000001").to.equal(itemTokenModifyMessage.tokenId);
        (0, chai_1.expect)(false).to.equal(itemTokenModifyMessage.isFungible);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTokenAttachTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_ATTACH);
        const itemTokenModifyMessage = parser.parse(test_data_1.attachNFTTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
        (0, chai_1.expect)("10000008").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000f").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000008").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000e").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTokenAttachFromTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_ATTACH_FROM);
        const itemTokenModifyMessage = parser.parse(test_data_1.attachFromNFTTxResult);
        (0, chai_1.expect)("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenModifyMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.proxy);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000c").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000b").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTokenDetachTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_DETACH);
        const itemTokenModifyMessage = parser.parse(test_data_1.detachNFTTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
        (0, chai_1.expect)("10000008").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000f").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000008").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000e").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTokenDetachFromTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_DETACH_FROM);
        const itemTokenModifyMessage = parser.parse(test_data_1.detachNFTFromTxResult);
        (0, chai_1.expect)("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenModifyMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.proxy);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000c").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
        (0, chai_1.expect)("0000000b").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenIssueTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_ISSUE_FT);
        const itemTokenIssueMessage = parser.parse(test_data_1.issueFungibleTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.sender);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.owner);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.to);
        (0, chai_1.expect)("0").to.equal(itemTokenIssueMessage.amount);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenIssueMessage.issuedFungibleToken.contractId);
        (0, chai_1.expect)("00000031").to.equal(itemTokenIssueMessage.issuedFungibleToken.tokenType);
        (0, chai_1.expect)("0").to.equal(itemTokenIssueMessage.issuedFungibleToken.decimal);
        (0, chai_1.expect)("FungibleName").to.equal(itemTokenIssueMessage.issuedFungibleToken.name);
        (0, chai_1.expect)("FungibleMeta").to.equal(itemTokenIssueMessage.issuedFungibleToken.meta);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenMintTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MINT_FT);
        const itemTokenMintMessage = parser.parse(test_data_1.mintFungibleTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenMintMessage.from);
        (0, chai_1.expect)("tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j").to.equal(itemTokenMintMessage.to);
        (0, chai_1.expect)(1).to.equal(itemTokenMintMessage.mintedFungibleTokens.length);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].contractId);
        (0, chai_1.expect)("00000001").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].tokenType);
        (0, chai_1.expect)("3000").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].amount);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenBurnTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_BURN_FT);
        const itemTokenBurnMessage = parser.parse(test_data_1.burnFungibleTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.contractId);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].contractId);
        (0, chai_1.expect)("1").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].amount);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenBurnFromTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_BURN_FROM_FT);
        const itemTokenBurnMessage = parser.parse(test_data_1.burnFromFungibleTxResult);
        (0, chai_1.expect)("link1yhjrm7zxn97eu5tnz76j32r76sfq02mtmjttuq").to.equal(itemTokenBurnMessage.from);
        (0, chai_1.expect)("link1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4").to.equal(itemTokenBurnMessage.proxy);
        (0, chai_1.expect)("2d8be688").to.equal(itemTokenBurnMessage.contractId);
        (0, chai_1.expect)("2d8be688").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].contractId);
        (0, chai_1.expect)("500").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].amount);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenTransferTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_TRANSFER_FT);
        const fungibleTokenTransferMessage = parser.parse(test_data_1.fungibleTokenTransferTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(fungibleTokenTransferMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(fungibleTokenTransferMessage.sender);
        (0, chai_1.expect)("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(fungibleTokenTransferMessage.to);
        (0, chai_1.expect)("61e14383").to.equal(fungibleTokenTransferMessage.contractId);
        (0, chai_1.expect)("61e14383").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.contractId);
        (0, chai_1.expect)("00000001").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.tokenType);
        (0, chai_1.expect)("1").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.amount);
    });
    (0, mocha_1.it)("test parsing to fungibleTokenTransferFromTxResult", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_TRANSFER_FROM_FT);
        const fungibleTokenTransferFromMessage = parser.parse(test_data_1.fungibleTokenTransferFromTxResult);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(fungibleTokenTransferFromMessage.from);
        (0, chai_1.expect)("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(fungibleTokenTransferFromMessage.proxy);
        (0, chai_1.expect)("link137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p").to.equal(fungibleTokenTransferFromMessage.to);
        (0, chai_1.expect)("bf365bab").to.equal(fungibleTokenTransferFromMessage.contractId);
        (0, chai_1.expect)("bf365bab").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount
            .contractId);
        (0, chai_1.expect)("00000001").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount.tokenType);
        (0, chai_1.expect)("50").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount.amount);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeIssueTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_ISSUE_NFT);
        const itemTokenBurnMessage = parser.parse(test_data_1.issueNonFungibleTypeTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.contractId);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.contractId);
        (0, chai_1.expect)("1000000c").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.tokenType);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeMintTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MINT_NFT);
        const itemTokenBurnMessage = parser.parse(test_data_1.mintNonFungibleTxResult);
        (0, chai_1.expect)("").to.equal(itemTokenBurnMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenType);
        (0, chai_1.expect)("00000007").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeMultiMintTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_MINT_NFT);
        const itemTokenBurnMessage = parser.parse(test_data_1.multiMintNonFungibleTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].contractId);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenType);
        (0, chai_1.expect)("10000002").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].tokenType);
        (0, chai_1.expect)("0000000a").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenIndex);
        (0, chai_1.expect)("00000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeBurnTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_BURN_NFT);
        const itemTokenBurnMessage = parser.parse(test_data_1.burnNonFungibleTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.contractId);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenType);
        (0, chai_1.expect)("00000003").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeBurnFromTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_BURN_FROM_NFT);
        const itemTokenBurnFromMessage = parser.parse(test_data_1.burnFromNonFungibleTxResult);
        (0, chai_1.expect)("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenBurnFromMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnFromMessage.proxy);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnFromMessage.contractId);
        (0, chai_1.expect)("61e14383").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.tokenType);
        (0, chai_1.expect)("00000005").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeTransferTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_TRANSFER_NFT);
        const itemTokenTransferMessage = parser.parse(test_data_1.transferNonFungibleTxResult);
        (0, chai_1.expect)("tlink1uly93jzy4qlpf6k803uz4tke6auwl3ukhns90t").to.equal(itemTokenTransferMessage.from);
        (0, chai_1.expect)("803820e6").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].contractId);
        (0, chai_1.expect)("803820e6").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].tokenType);
        (0, chai_1.expect)("10000001").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].tokenType);
        (0, chai_1.expect)("00000004").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].tokenIndex);
        (0, chai_1.expect)("00000006").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].tokenIndex);
    });
    (0, mocha_1.it)("test parsing to nonFungibleTypeTransferFromTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ITEM_TOKEN_TRANSFER_FROM_NFT);
        const itemTokenTransferFromMessage = parser.parse(test_data_1.transferFromNonFungibleTxResult);
        (0, chai_1.expect)("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(itemTokenTransferFromMessage.from);
        (0, chai_1.expect)("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(itemTokenTransferFromMessage.proxy);
        (0, chai_1.expect)("bf365bab").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].contractId);
        (0, chai_1.expect)("bf365bab").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].contractId);
        (0, chai_1.expect)("10000001").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].tokenType);
        (0, chai_1.expect)("10000001").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].tokenType);
        (0, chai_1.expect)("0000000e").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].tokenIndex);
        (0, chai_1.expect)("0000000f").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].tokenIndex);
    });
    (0, mocha_1.it)("test parsing to baseCoinSendTx", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.COIN_SEND);
        const baseCoinTransferMessage = parser.parse(test_data_1.baseCoinTransferTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(baseCoinTransferMessage.from);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(baseCoinTransferMessage.sender);
        (0, chai_1.expect)("tcony").to.equal(baseCoinTransferMessage.baseCoinAmount.contractId);
        (0, chai_1.expect)("1").to.equal(baseCoinTransferMessage.baseCoinAmount.amount);
    });
    (0, mocha_1.it)("test parsing to accountMsgEmpty", () => {
        const parser = transaction_message_parser_1.TxResultMessageParserFactory.create(transaction_messages_1.MessageType.ACCOUNT_MSG_EMPTY);
        const accountMsgEmptyMessage = parser.parse(test_data_1.accountMsgEmptyTxResult);
        (0, chai_1.expect)("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(accountMsgEmptyMessage.from);
    });
});
