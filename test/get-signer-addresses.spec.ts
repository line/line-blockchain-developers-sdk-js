import { expect } from "chai";
import { describe, it } from "mocha";
import { RawTransactionRequestPubKey, RawTxSignature, RawTransactionRequest, RawTransactionRequestValue, RawTransactionRequestFee, RawTransactionSignerAddressUtil } from "../lib/tx-raw-models";

describe("RawTransactionSignerAddressUtil test", () => {
    it("test getSignerAddresses", () => {
        let rawTransactionRequestValue: RawTransactionRequestValue = new RawTransactionRequestValue(
            [],
            new RawTransactionRequestFee(1, []),
            "",
            [
                new RawTxSignature(
                    new RawTransactionRequestPubKey(
                        "tendermint/PubKeySecp256k1",
                        "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"
                    ),
                    "AF71IQpmzGaJLrv8EJ0tCtrUNQdyo5vsgDpPNyLIePhqNnzObEo00efm+9ACLbXdI4ETEGe3DQ+B0AHt70sC4A=="
                )
            ]
        );
        let tx: RawTransactionRequest = new RawTransactionRequest("cosmos-sdk/StdTx", rawTransactionRequestValue);
        let actualSignerAddress = RawTransactionSignerAddressUtil.getSignerAddresses("tlink", tx);
        let expectedSignerAddress = "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq";
        expect(expectedSignerAddress).to.equal(actualSignerAddress[0]);
    });
});