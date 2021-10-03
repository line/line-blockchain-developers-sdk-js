import { expect } from "chai";
import { describe, it } from "mocha";
import { TxResultUtil } from "../lib/tx-result-util"
import { singleTransactionResult, nftDetachTxResultResponse, nftUpdateTxResultResponse, memoTxResultResponse } from "./test-data"

describe("tx-result-util test", () => {
    const singleTransactionResultResponse = singleTransactionResult.responseData
    it("findFromWalletAddress test", () => {
        const fromAddress =
            TxResultUtil.findFromWalletAddress(getSingleTxResult(singleTransactionResultResponse));
        expect("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq").to.equal(fromAddress);
    });

    it("findToWalletAddress test", () => {
        const toAddress =
            TxResultUtil.findToWalletAddress(getSingleTxResult(singleTransactionResultResponse));
        expect("tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv").to.equal(toAddress);
    });

    it("give no to wallet address, then findToWalletAddress return empty ", () => {
        const toAddress =
            TxResultUtil.findToWalletAddress(getSingleTxResult(nftDetachTxResultResponse));
        expect("").to.equal(toAddress);
    });

    it("given required value in messages, then findValueFromMessages return the value ", () => {
        const contractId =
            TxResultUtil.findValueFromMessages(getSingleTxResult(nftDetachTxResultResponse), "contractId");
        expect("61e14383").to.equal(contractId);
    });

    it("given no required value in messages, then findValueFromMessages return the value ", () => {
        const not_exist_but_required =
            TxResultUtil.findValueFromMessages(getSingleTxResult(nftDetachTxResultResponse), "not_exist_but_required");
        expect(null).to.equal(not_exist_but_required);
    });

    it("given messages have message with contractId, then findContractId returns the contractId", () => {
        const contractId =
            TxResultUtil.findContractId(getSingleTxResult(nftUpdateTxResultResponse));
        expect("61e14383").to.equal(contractId);
    });

    it("given messages doesn't have message with contractId, then findContractId returns the contractId", () => {
        const contractId =
            TxResultUtil.findContractId(getSingleTxResult(memoTxResultResponse));
        expect("").to.equal(contractId);
    });

    it("given messages have message with tokenType, then findTokenType returns the tokenType", () => {
        const tokenType =
            TxResultUtil.findTokenType(getSingleTxResult(nftUpdateTxResultResponse));
        expect("10000001").to.equal(tokenType);
    });

    it("given messages doesn't have message with contractId, then findTokenType returns the tokenType", () => {
        const tokenType =
            TxResultUtil.findTokenType(getSingleTxResult(memoTxResultResponse));
        expect("").to.equal(tokenType);
    });

    it("given messages have message with tokenId, then findTokenId returns the tokenId", () => {
        const tokenId =
            TxResultUtil.findTokenId(getSingleTxResult(nftUpdateTxResultResponse));
        expect("1000000100000001").to.equal(tokenId);
    });

    it("given messages doesn't have message with tokenId, then findTokenId returns the tokenId", () => {
        const tokenId =
            TxResultUtil.findTokenId(getSingleTxResult(memoTxResultResponse));
        expect("").to.equal(tokenId);
    });

    it("given messages have message with tokenIndex, then findTokenId returns the tokenIndex", () => {
        const tokenIndex =
            TxResultUtil.findTokenIndex(getSingleTxResult(nftUpdateTxResultResponse));
        expect("00000001").to.equal(tokenIndex);
    });

    it("given messages doesn't have message with tokenIndex, then findTokenId returns the tokenIndex", () => {
        const tokenIndex =
            TxResultUtil.findTokenIndex(getSingleTxResult(memoTxResultResponse));
        expect("").to.equal(tokenIndex);
    });
})

// this because of type cast error e.g number -> BigInteger
function getSingleTxResult(txResultResponse: any) {
    return JSON.parse(JSON.stringify(txResultResponse))
}