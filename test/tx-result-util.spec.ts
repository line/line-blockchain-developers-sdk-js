import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultUtil } from "../lib/tx-result-util";
import {
  serviceTokenBurnFromTxResult,
  singleTransactionResult
} from "./test-data";

describe("tx-result-util test with tx message", () => {
  const singleTransactionResultResponse = singleTransactionResult.responseData;
  //   it("findFromWalletAddress test", () => {
  //     const fromAddress = TxResultUtil.findFromWalletAddress(
  //       singleTransactionResultResponse,
  //     );
  //     expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
  //       fromAddress,
  //     );
  //   });

  //   it("findFromWalletAddress test", () => {
  //     const ownerAddress = TxResultUtil.findOwnerWalletAddress(
  //       nftUpdateTxResultResponse,
  //     );
  //     expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
  //       ownerAddress,
  //     );
  //   });

  //   it("findChanges test", () => {
  //     const changes = TxResultUtil.findChanges(nftUpdateTxResultResponse);
  //     const expectedChanges = [
  //       { field: "name", value: "NFT index name" },
  //       { field: "meta", value: "NFT index meta" },
  //     ];
  //     expectedChanges.forEach((it, index) => {
  //       expect(it.field).to.equal(changes[index].field);
  //       expect(it.value).to.equal(changes[index].value);
  //     });
  //   });

  //   it("findAmount test", () => {
  //     const amount = TxResultUtil.findAmount(serviceTokenMintTxResult);
  //     expect("1000").to.equal(amount);
  //   });

  //   it("findToWalletAddress test", () => {
  //     const toAddress = TxResultUtil.findToWalletAddress(
  //       singleTransactionResultResponse,
  //     );
  //     expect("tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv").to.equal(toAddress);
  //   });

  //   it("findProxyWalletAddress test", () => {
  //     const toAddress = TxResultUtil.findProxyWalletAddress(
  //       serviceTokenTransferFromTxResult,
  //     );
  //     expect("tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9").to.equal(toAddress);
  //   });

  //   it("give no to wallet address, then findToWalletAddress return empty ", () => {
  //     const toAddress = TxResultUtil.findToWalletAddress(
  //       nftDetachTxResultResponse,
  //     );
  //     expect("").to.equal(toAddress);
  //   });

  //   it("given required value in messages, then findValueFromMessages return the value ", () => {
  //     const contractId = TxResultUtil.findValueFromMessages(
  //       nftDetachTxResultResponse,
  //       "contractId",
  //     );
  //     expect("61e14383").to.equal(contractId);
  //   });

  //   it("given no required value in messages, then findValueFromMessages return the value ", () => {
  //     const not_exist_but_required = TxResultUtil.findValueFromMessages(
  //       nftDetachTxResultResponse,
  //       "not_exist_but_required",
  //     );
  //     expect(null).to.equal(not_exist_but_required);
  //   });

  //   it("given messages have message with contractId, then findContractId returns the contractId", () => {
  //     const contractId = TxResultUtil.findContractId(nftUpdateTxResultResponse);
  //     expect("61e14383").to.equal(contractId);
  //   });

  //   it("given messages doesn't have message with contractId, then findContractId returns the contractId", () => {
  //     const contractId = TxResultUtil.findContractId(memoTxResultResponse);
  //     expect("").to.equal(contractId);
  //   });

  //   it("given messages have message with tokenType, then findTokenType returns the tokenType", () => {
  //     const tokenType = TxResultUtil.findTokenType(nftUpdateTxResultResponse);
  //     expect("10000001").to.equal(tokenType);
  //   });

  //   it("given messages doesn't have message with contractId, then findTokenType returns the tokenType", () => {
  //     const tokenType = TxResultUtil.findTokenType(memoTxResultResponse);
  //     expect("").to.equal(tokenType);
  //   });

  //   it("given messages have message with tokenId, then findTokenId returns the tokenId", () => {
  //     const tokenId = TxResultUtil.findTokenId(nftUpdateTxResultResponse);
  //     expect("1000000100000001").to.equal(tokenId);
  //   });

  //   it("given messages doesn't have message with tokenId, then findTokenId returns the tokenId", () => {
  //     const tokenId = TxResultUtil.findTokenId(memoTxResultResponse);
  //     expect("").to.equal(tokenId);
  //   });

  //   it("given messages have message with tokenIndex, then findTokenId returns the tokenIndex", () => {
  //     const tokenIndex = TxResultUtil.findTokenIndex(nftUpdateTxResultResponse);
  //     expect("00000001").to.equal(tokenIndex);
  //   });

  //   it("given messages doesn't have message with tokenIndex, then findTokenId returns the tokenIndex", () => {
  //     const tokenIndex = TxResultUtil.findTokenIndex(memoTxResultResponse);
  //     expect("").to.equal(tokenIndex);
  //   });
  // });

  // describe("tx-result-util test with logs and events", () => {
  //   it("given there is sender key and value, findValueFromLogEvents return the value", () => {
  //     const senderWalletAddress = TxResultUtil.findSenderFromLogEvents(
  //       nftUpdateTxResultResponse,
  //     );
  //     expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(
  //       senderWalletAddress,
  //     );
  //   });

  //   it("given there is contract_id key and value, findValueFromLogEvents return the value", () => {
  //     const senderWalletAddress = TxResultUtil.findValueFromLogEvents(
  //       nftUpdateTxResultResponse,
  //       "contract_id",
  //     );
  //     expect("61e14383").to.equal(senderWalletAddress);
  //   });

  //   it("given there is no required key and value, findValueFromLogEvents return empty", () => {
  //     const senderWalletAddress = TxResultUtil.findValueFromLogEvents(
  //       nftUpdateTxResultResponse,
  //       "not_exist_node",
  //     );
  //     expect("").to.equal(senderWalletAddress);
  //   });

  it("given service-token-burn-from message, find contractId", () => {
    const senderWalletAddress = TxResultUtil.findContractId(
      serviceTokenBurnFromTxResult,
    );
    expect("678c146a").to.equal(senderWalletAddress);
  });
});
