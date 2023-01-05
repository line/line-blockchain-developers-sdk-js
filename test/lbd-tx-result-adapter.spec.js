"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const constants_1 = require("../lib/constants");
const tx_result_adapters_1 = require("../lib/tx-result-adapters");
const tx_core_models_1 = require("../lib/tx-core-models");
const test_data_1 = require("./test-data");
const chai_1 = require("chai");
const lodash_1 = __importDefault(require("lodash"));
(0, mocha_1.describe)("LbdTxResultAdapterV1 test", () => {
    let underTest = new tx_result_adapters_1.LbdTxResultAdapterV1(constants_1.HrpPrefix.TEST_NET);
    (0, mocha_1.it)("test baseCoinTransferTxResult", () => {
        let inputRawTxResult = test_data_1.baseCoinTransferTxResult;
        let lbdTxResult = underTest.adapt(inputRawTxResult);
        (0, chai_1.expect)(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
        (0, chai_1.expect)(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
        (0, chai_1.expect)(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
        (0, chai_1.expect)(lbdTxResult.summary.signers).to.deep.include(new tx_core_models_1.TxSigner("tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"));
        (0, chai_1.expect)(lbdTxResult.txMessages).to.be.not.empty;
        (0, chai_1.expect)(lbdTxResult.txEvents).to.be.not.empty;
        (0, chai_1.expect)(lodash_1.default.first(Array.from(lbdTxResult.txEvents))["eventName"]).to.equal("EventCoinTransferred");
    });
    (0, mocha_1.it)("test createAccountTxResult", () => {
        let inputRawTxResult = test_data_1.createAccountTxResult;
        let lbdTxResult = underTest.adapt(inputRawTxResult);
        (0, chai_1.expect)(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
        (0, chai_1.expect)(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
        (0, chai_1.expect)(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
        (0, chai_1.expect)(lbdTxResult.txMessages).to.be.not.empty;
        (0, chai_1.expect)(lbdTxResult.txEvents).to.be.not.empty;
        (0, chai_1.expect)(lodash_1.default.first(Array.from(lbdTxResult.txEvents))["eventName"]).to.equal("EventAccountCreated");
    });
    (0, mocha_1.it)("test accountMsgEmptyTxResult", () => {
        let inputRawTxResult = test_data_1.accountMsgEmptyTxResult;
        let lbdTxResult = underTest.adapt(inputRawTxResult);
        (0, chai_1.expect)(lbdTxResult.summary.height).to.equal(inputRawTxResult.height);
        (0, chai_1.expect)(lbdTxResult.summary.txHash).to.equal(inputRawTxResult.txhash);
        (0, chai_1.expect)(lbdTxResult.summary.txIndex).to.equal(inputRawTxResult.index);
        (0, chai_1.expect)(lbdTxResult.txMessages).to.be.not.empty;
        (0, chai_1.expect)(lbdTxResult.txEvents).to.be.not.empty;
        (0, chai_1.expect)(lodash_1.default.first(Array.from(lbdTxResult.txEvents))["eventName"]).to.equal("EventEmptyMsgCreated");
    });
});
