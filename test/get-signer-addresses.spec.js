"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const tx_raw_models_1 = require("../lib/tx-raw-models");
(0, mocha_1.describe)("RawTransactionSignerAddressUtil test", () => {
    (0, mocha_1.it)("test getSignerAddresses", () => {
        let rawTransactionRequestValue = new tx_raw_models_1.RawTransactionRequestValue([], new tx_raw_models_1.RawTransactionRequestFee(1, []), "", [
            new tx_raw_models_1.RawTxSignature(new tx_raw_models_1.RawTransactionRequestPubKey("tendermint/PubKeySecp256k1", "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"), "AF71IQpmzGaJLrv8EJ0tCtrUNQdyo5vsgDpPNyLIePhqNnzObEo00efm+9ACLbXdI4ETEGe3DQ+B0AHt70sC4A==")
        ]);
        let tx = new tx_raw_models_1.RawTransactionRequest("cosmos-sdk/StdTx", rawTransactionRequestValue);
        let actualSignerAddress = tx_raw_models_1.RawTransactionSignerAddressUtil.getSignerAddresses("tlink", tx);
        let expectedSignerAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        (0, chai_1.expect)(expectedSignerAddress).to.equal(actualSignerAddress[0]);
    });
});
