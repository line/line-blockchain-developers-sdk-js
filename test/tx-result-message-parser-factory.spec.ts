import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultMessageParserFactory } from "../lib/transaction-message-parser";
import {
  BaseCoinTransferMessage,
  FungibleTokenBurnFromMessage,
  FungibleTokenBurnMessage,
  FungibleTokenIssueMessage,
  FungibleTokenMintMessage,
  FungibleTokenTransferFromMessage,
  FungibleTokenTransferMessage,
  ItemTokenApproveMessage,
  ItemTokenCreateMessage,
  ItemTokenDisapproveMessage,
  ItemTokenModifyMessage,
  MessageType,
  NonFungibleTokenAttachFromMessage,
  NonFungibleTokenAttachMessage,
  NonFungibleTokenBurnFromMessage,
  NonFungibleTokenBurnMessage,
  NonFungibleTokenDetachFromMessage,
  NonFungibleTokenDetachMessage,
  NonFungibleTokenIssueMessage,
  NonFungibleTokenMintMessage,
  NonFungibleTokenTransferFromMessage,
  NonFungibleTokenTransferMessage,
  ServiceTokenApprovedMessage,
  ServiceTokenBurnFromMessage,
  ServiceTokenBurnMessage,
  ServiceTokenIssueMessage,
  ServiceTokenMintMessage,
  ServiceTokenModifyMessage,
  ServiceTokenTransferFromMessage,
  ServiceTokenTransferMessage,
} from "../lib/transaction-messages";

import {
  accountMsgEmptyTxResult,
  attachFromNFTTxResult,
  attachNFTTxResult,
  baseCoinTransferTxResult,
  burnFromFungibleTxResult,
  burnFromNonFungibleTxResult,
  burnFungibleTxResult,
  burnNonFungibleTxResult,
  detachNFTFromTxResult,
  detachNFTTxResult,
  fungibleTokenModifyTxResult,
  fungibleTokenTransferFromTxResult,
  fungibleTokenTransferTxResult,
  genericServiceTokenModifyTxResultResponse,
  issueFungibleTxResult,
  issueNonFungibleTypeTxResult,
  issueServiceTokenTxResult,
  itemTokenApproveTxResult,
  itemTokenCreateTxResult,
  itemTokenDisapproveTxResult,
  mintFungibleTxResult,
  mintNonFungibleTxResult,
  multiMintNonFungibleTxResult,
  nonFungibleTokenModifyTxResult,
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

describe("txResultMessageParserFactory-test", () => {
  it("test parsing to ServiceTokenModifyMessage", () => {
    const expectedChanges = [
      { field: "name", value: "STname" },
      { field: "meta", value: "meta" },
    ];

    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MODIFY);
    const serviceTokenModifyMessage = parser.parse(serviceTokenModifyTxResult) as ServiceTokenModifyMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.owner);
    expect("9636a07e").to.equal(serviceTokenModifyMessage.contractId);

    const changes = serviceTokenModifyMessage.changes;
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

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenModifyMessage.from);
  });

  it("test parsing to serviceTokenIssueTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_ISSUE);
    const serviceTokenIssueMessage = parser.parse(issueServiceTokenTxResult) as ServiceTokenIssueMessage;

    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(serviceTokenIssueMessage.from);
    expect("tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558").to.equal(serviceTokenIssueMessage.to);
    expect("9be17165").to.equal(serviceTokenIssueMessage.issuedServiceToken.contractId);
    expect("987654321").to.equal(serviceTokenIssueMessage.amount);
  });

  it("test parsing to serviceTokenMintTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_MINT);
    const serviceTokenMintMessage = parser.parse(serviceTokenMintTxResult) as ServiceTokenMintMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenMintMessage.from);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(serviceTokenMintMessage.to);
    expect("9636a07e").to.equal(serviceTokenMintMessage.contractId);
    expect("1000").to.equal(serviceTokenMintMessage.amount);
  });

  it("test parsing to serviceTokenBurnTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_BURN);
    const serviceTokenBurnMessage = parser.parse(serviceTokenBurnTxResult) as ServiceTokenBurnMessage;

    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(serviceTokenBurnMessage.from);
    expect("9be17165").to.equal(serviceTokenBurnMessage.contractId);
    expect("1000").to.equal(serviceTokenBurnMessage.amount);
  });

  it("test parsing to serviceTokenBurnFromTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_BURN_FROM);
    const serviceTokenBurnFromMessage = parser.parse(serviceTokenBurnFromTxResult) as ServiceTokenBurnFromMessage;

    expect("link16mk739rd3r3q8a8dw7zr3h50xunxcq0wp80gtu").to.equal(serviceTokenBurnFromMessage.from);
    expect("link17gx76scz3pe7gtqq8rmf46favtmxn3sgs6qa49").to.equal(serviceTokenBurnFromMessage.proxy);
    expect("678c146a").to.equal(serviceTokenBurnFromMessage.contractId);
    expect("1").to.equal(serviceTokenBurnFromMessage.amount);
  });

  it("test parsing to serviceTokenTransferMessage", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_TRANSFER);
    const serviceTokenTransferMessage = parser.parse(serviceTokenTransferTxResult) as ServiceTokenTransferMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(serviceTokenTransferMessage.from);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(serviceTokenTransferMessage.to);
    expect("9636a07e").to.equal(serviceTokenTransferMessage.contractId);
    expect("1000").to.equal(serviceTokenTransferMessage.amount);
  });

  it("test parsing to serviceTokenTransferFromMessage", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_TRANSFER_FROM);
    const serviceTokenTransferMessage = parser.parse(
      serviceTokenTransferFromTxResult,
    ) as ServiceTokenTransferFromMessage;

    expect("tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd").to.equal(serviceTokenTransferMessage.from);
    expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(serviceTokenTransferMessage.proxy);
    expect("tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us").to.equal(serviceTokenTransferMessage.to);
    expect("9be17165").to.equal(serviceTokenTransferMessage.contractId);
    expect("1").to.equal(serviceTokenTransferMessage.amount);
  });

  it("test parsing to ServiceTokenApprovedMessage", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.SERVICE_TOKEN_PROXY_APPROVED);
    const serviceTokenApprovedMessage = parser.parse(serviceTokenProxyApprovedTxResult) as ServiceTokenApprovedMessage;

    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.from);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.sender);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(serviceTokenApprovedMessage.proxy);
    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(serviceTokenApprovedMessage.approver);
    expect("f38bb8a6").to.equal(serviceTokenApprovedMessage.contractId);
  });

  it("test parsing to itemTokenCreateTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_CREATE);
    const itemTokenCreateMessage = parser.parse(itemTokenCreateTxResult) as ItemTokenCreateMessage;

    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.from);
    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.sender);
    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenCreateMessage.createdItemToken.owner);
    expect("fee15a74").to.equal(itemTokenCreateMessage.createdItemToken.contractId);
    expect("test").to.equal(itemTokenCreateMessage.createdItemToken.name);
    expect("").to.equal(itemTokenCreateMessage.createdItemToken.meta);
    expect("http://test-image-server.com").to.equal(itemTokenCreateMessage.createdItemToken.baseImgUri);
  });

  it("test parsing to fungibleTokenModifyTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MODIFY);
    const itemTokenModifyMessage = parser.parse(fungibleTokenModifyTxResult) as ItemTokenModifyMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
    expect("61e14383").to.equal(itemTokenModifyMessage.contractId);
    expect(true).to.equal(itemTokenModifyMessage.isFungible);
    expect("00000001").to.equal(itemTokenModifyMessage.tokenType);
  });

  it("test parsing to itemTokenApproveTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_APPROVE);
    const itemTokenApproveMessage = parser.parse(itemTokenApproveTxResult) as ItemTokenApproveMessage;

    expect("link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p").to.equal(itemTokenApproveMessage.approver);
    expect("link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz").to.equal(itemTokenApproveMessage.proxy);
    expect("fee15a74").to.equal(itemTokenApproveMessage.contractId);
  });

  it("test parsing to itemTokenDisapproveTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_DISAPPROVE);
    const itemTokenDisapproveMessage = parser.parse(itemTokenDisapproveTxResult) as ItemTokenDisapproveMessage;

    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(itemTokenDisapproveMessage.approver);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(itemTokenDisapproveMessage.proxy);
    expect("bf365bab").to.equal(itemTokenDisapproveMessage.contractId);
  });

  it("test parsing to nonFungibleTokenTypeModifyTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MODIFY);
    const itemTokenModifyMessage = parser.parse(nonFungibleTokenTypeModifyTxResult) as ItemTokenModifyMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
    expect("61e14383").to.equal(itemTokenModifyMessage.contractId);
    expect(false).to.equal(itemTokenModifyMessage.isFungible);
  });
  //

  it("test parsing to nonFungibleTokenModifyTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MODIFY);
    const itemTokenModifyMessage = parser.parse(nonFungibleTokenModifyTxResult) as ItemTokenModifyMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.owner);
    expect("61e14383").to.equal(itemTokenModifyMessage.contractId);
    expect("1000000100000001").to.equal(itemTokenModifyMessage.tokenId);
    expect(false).to.equal(itemTokenModifyMessage.isFungible);
  });

  it("test parsing to nonFungibleTokenAttachTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_ATTACH);
    const itemTokenModifyMessage = parser.parse(attachNFTTxResult) as NonFungibleTokenAttachMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
    expect("10000008").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
    expect("0000000f").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
    expect("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
    expect("10000008").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
    expect("0000000e").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
  });

  it("test parsing to nonFungibleTokenAttachFromTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_ATTACH_FROM);
    const itemTokenModifyMessage = parser.parse(attachFromNFTTxResult) as NonFungibleTokenAttachFromMessage;

    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenModifyMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.proxy);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
    expect("0000000c").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
    expect("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
    expect("0000000b").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
  });

  it("test parsing to nonFungibleTokenDetachTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_DETACH);
    const itemTokenModifyMessage = parser.parse(detachNFTTxResult) as NonFungibleTokenDetachMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
    expect("10000008").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
    expect("0000000f").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
    expect("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
    expect("10000008").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
    expect("0000000e").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
  });

  it("test parsing to nonFungibleTokenDetachFromTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_DETACH_FROM);
    const itemTokenModifyMessage = parser.parse(detachNFTFromTxResult) as NonFungibleTokenDetachFromMessage;

    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenModifyMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.proxy);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenModifyMessage.sender);
    expect("61e14383").to.equal(itemTokenModifyMessage.parentNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenType);
    expect("0000000c").to.equal(itemTokenModifyMessage.parentNonFungibleToken.tokenIndex);
    expect("61e14383").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenType);
    expect("0000000b").to.equal(itemTokenModifyMessage.attachedNonFungibleToken.tokenIndex);
  });

  it("test parsing to fungibleTokenIssueTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_ISSUE_FT);
    const itemTokenIssueMessage = parser.parse(issueFungibleTxResult) as FungibleTokenIssueMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.sender);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.owner);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenIssueMessage.to);
    expect("0").to.equal(itemTokenIssueMessage.amount);
    expect("61e14383").to.equal(itemTokenIssueMessage.issuedFungibleToken.contractId);
    expect("00000031").to.equal(itemTokenIssueMessage.issuedFungibleToken.tokenType);
    expect("0").to.equal(itemTokenIssueMessage.issuedFungibleToken.decimal);
    expect("FungibleName").to.equal(itemTokenIssueMessage.issuedFungibleToken.name);
    expect("FungibleMeta").to.equal(itemTokenIssueMessage.issuedFungibleToken.meta);
  });

  it("test parsing to fungibleTokenMintTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MINT_FT);
    const itemTokenMintMessage = parser.parse(mintFungibleTxResult) as FungibleTokenMintMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenMintMessage.from);
    expect("tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j").to.equal(itemTokenMintMessage.to);
    expect(1).to.equal(itemTokenMintMessage.mintedFungibleTokens.length);
    expect("61e14383").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].contractId);
    expect("00000001").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].tokenType);
    expect("3000").to.equal(itemTokenMintMessage.mintedFungibleTokens[0].amount);
  });

  it("test parsing to fungibleTokenBurnTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_BURN_FT);
    const itemTokenBurnMessage = parser.parse(burnFungibleTxResult) as FungibleTokenBurnMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
    expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
    expect("61e14383").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].contractId);
    expect("1").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].amount);
  });

  it("test parsing to fungibleTokenBurnFromTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_BURN_FROM_FT);
    const itemTokenBurnMessage = parser.parse(burnFromFungibleTxResult) as FungibleTokenBurnFromMessage;

    expect("link1yhjrm7zxn97eu5tnz76j32r76sfq02mtmjttuq").to.equal(itemTokenBurnMessage.from);
    expect("link1z9x3cnadjdvxlrlyl9myrau2uxqrpd0hfwslu4").to.equal(itemTokenBurnMessage.proxy);
    expect("2d8be688").to.equal(itemTokenBurnMessage.contractId);
    expect("2d8be688").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].contractId);
    expect("500").to.equal(itemTokenBurnMessage.burnedFungibleTokens[0].amount);
  });

  it("test parsing to fungibleTokenTransferTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_TRANSFER_FT);
    const fungibleTokenTransferMessage = parser.parse(fungibleTokenTransferTxResult) as FungibleTokenTransferMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(fungibleTokenTransferMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(fungibleTokenTransferMessage.sender);
    expect("tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww").to.equal(fungibleTokenTransferMessage.to);
    expect("61e14383").to.equal(fungibleTokenTransferMessage.contractId);

    expect("61e14383").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.contractId);
    expect("00000001").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.tokenType);
    expect("1").to.equal(fungibleTokenTransferMessage.transferredFungibleTokenAmount.amount);
  });

  it("test parsing to fungibleTokenTransferFromTxResult", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_TRANSFER_FROM_FT);
    const fungibleTokenTransferFromMessage = parser.parse(
      fungibleTokenTransferFromTxResult,
    ) as FungibleTokenTransferFromMessage;

    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(fungibleTokenTransferFromMessage.from);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(fungibleTokenTransferFromMessage.proxy);
    expect("link137pmnn2snxdcwa5kmg5rra6u3tf2y5c7emmm7p").to.equal(fungibleTokenTransferFromMessage.to);
    expect("bf365bab").to.equal(fungibleTokenTransferFromMessage.contractId);

    expect("bf365bab").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount.contractId);
    expect("00000001").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount.tokenType);
    expect("50").to.equal(fungibleTokenTransferFromMessage.transferredFungibleTokenAmount.amount);
  });

  it("test parsing to nonFungibleTypeIssueTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_ISSUE_NFT);
    const itemTokenBurnMessage = parser.parse(issueNonFungibleTypeTxResult) as NonFungibleTokenIssueMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
    expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
    expect("61e14383").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.contractId);
    expect("1000000c").to.equal(itemTokenBurnMessage.issuedNonFungibleToken.tokenType);
  });

  it("test parsing to nonFungibleTypeMintTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MINT_NFT);
    const itemTokenBurnMessage = parser.parse(mintNonFungibleTxResult) as NonFungibleTokenMintMessage;

    expect("").to.equal(itemTokenBurnMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
      itemTokenBurnMessage.mintedNonFungibleTokens[0].from,
    );
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
      itemTokenBurnMessage.mintedNonFungibleTokens[0].sender,
    );
    expect("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].contractId);
    expect("10000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenType);
    expect("00000007").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenIndex);
  });

  it("test parsing to nonFungibleTypeMultiMintTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_MINT_NFT);
    const itemTokenBurnMessage = parser.parse(multiMintNonFungibleTxResult) as NonFungibleTokenMintMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
      itemTokenBurnMessage.mintedNonFungibleTokens[0].from,
    );
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
      itemTokenBurnMessage.mintedNonFungibleTokens[0].sender,
    );
    expect("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].contractId);
    expect("61e14383").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].contractId);
    expect("10000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenType);
    expect("10000002").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].tokenType);
    expect("0000000a").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[0].tokenIndex);
    expect("00000001").to.equal(itemTokenBurnMessage.mintedNonFungibleTokens[1].tokenIndex);
  });

  it("test parsing to nonFungibleTypeBurnTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_BURN_NFT);
    const itemTokenBurnMessage = parser.parse(burnNonFungibleTxResult) as NonFungibleTokenBurnMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnMessage.sender);
    expect("61e14383").to.equal(itemTokenBurnMessage.contractId);
    expect("61e14383").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenType);
    expect("00000003").to.equal(itemTokenBurnMessage.burnedNonFungibleToken.tokenIndex);
  });

  it("test parsing to nonFungibleTypeBurnFromTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_BURN_FROM_NFT);
    const itemTokenBurnFromMessage = parser.parse(burnFromNonFungibleTxResult) as NonFungibleTokenBurnFromMessage;

    expect("tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph").to.equal(itemTokenBurnFromMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(itemTokenBurnFromMessage.proxy);
    expect("61e14383").to.equal(itemTokenBurnFromMessage.contractId);
    expect("61e14383").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.contractId);
    expect("10000001").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.tokenType);
    expect("00000005").to.equal(itemTokenBurnFromMessage.burnedNonFungibleToken.tokenIndex);
  });

  it("test parsing to nonFungibleTypeTransferTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_TRANSFER_NFT);
    const itemTokenTransferMessage = parser.parse(transferNonFungibleTxResult) as NonFungibleTokenTransferMessage;

    expect("tlink1uly93jzy4qlpf6k803uz4tke6auwl3ukhns90t").to.equal(itemTokenTransferMessage.from);

    expect("803820e6").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].contractId);
    expect("803820e6").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].contractId);
    expect("10000001").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].tokenType);
    expect("10000001").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].tokenType);
    expect("00000004").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[0].tokenIndex);
    expect("00000006").to.equal(itemTokenTransferMessage.transferredNonFungibleTokens[1].tokenIndex);
  });

  it("test parsing to nonFungibleTypeTransferFromTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ITEM_TOKEN_TRANSFER_FROM_NFT);
    const itemTokenTransferFromMessage = parser.parse(
      transferFromNonFungibleTxResult,
    ) as NonFungibleTokenTransferFromMessage;

    expect("link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd").to.equal(itemTokenTransferFromMessage.from);
    expect("link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu").to.equal(itemTokenTransferFromMessage.proxy);

    expect("bf365bab").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].contractId);
    expect("bf365bab").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].contractId);
    expect("10000001").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].tokenType);
    expect("10000001").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].tokenType);
    expect("0000000e").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[0].tokenIndex);
    expect("0000000f").to.equal(itemTokenTransferFromMessage.transferredNonFungibleTokens[1].tokenIndex);
  });

  it("test parsing to baseCoinSendTx", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.COIN_SEND);
    const baseCoinTransferMessage = parser.parse(baseCoinTransferTxResult) as BaseCoinTransferMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(baseCoinTransferMessage.from);
    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(baseCoinTransferMessage.sender);

    expect("tcony").to.equal(baseCoinTransferMessage.baseCoinAmount.contractId);
    expect("1").to.equal(baseCoinTransferMessage.baseCoinAmount.amount);
  });

  it("test parsing to accountMsgEmpty", () => {
    const parser = TxResultMessageParserFactory.create(MessageType.ACCOUNT_MSG_EMPTY);
    const accountMsgEmptyMessage = parser.parse(accountMsgEmptyTxResult) as BaseCoinTransferMessage;

    expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(accountMsgEmptyMessage.from);
  });
});
