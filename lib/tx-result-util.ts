import * as _ from "lodash";
import jsonpath from "jsonpath";
import { TokenUtil } from "./token-util";
import { TxResultResponse } from "./response";
import {
    TokenChange,
    IssuedServiceToken,
    CreatedItemToken,
    MintedFungibleToken,
    BurnedFungibleToken,
    IssuedNonFungibleToken,
    IssuedFungibleToken,
    MintedNonFungibleToken,
    NonFungibleToken,
    BaseCoinAmount,
    TransferredFungibleTokenAmount,
} from "./transaction-messages";

export class TxResultUtil {
    private constructor() { }
    static findFromWalletAddress(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "from",
            "",
        );
    }

    static findOwnerWalletAddress(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "owner",
            "",
        );
    }

    static findProxyWalletAddress(txResultResponse: TxResultResponse): string {
        const proxyAddress = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "proxy",
            "",
        );
        if (!proxyAddress || proxyAddress.length < 1) {
            return TxResultUtil.findValueFromLogEvents(
                txResultResponse,
                "proxy"
            );
        } else {
            return proxyAddress;
        }
    }

    static findSenderWalletAddress(txResultResponse: TxResultResponse): any {
        const senderAddress = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "sender",
            "",
        );
        if (!senderAddress || senderAddress.length < 1) {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "sender");
        } else {
            return senderAddress;
        }
    }
    static findApproverWalletAddress(txResultResponse: TxResultResponse): string {
        const approverAddress = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "approver",
            "",
        );
        if (!approverAddress || approverAddress.length < 1) {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "approver");
        } else {
            return approverAddress;
        }
    }

    static findChanges(txResultResponse: TxResultResponse): Array<TokenChange> {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "changes",
            "",
        );
    }

    static findToWalletAddress(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "to",
            "",
        );
    }

    static findContractId(txResultResponse: TxResultResponse): string {
        const contractId =
            TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "contractId", "");

        if (contractId && contractId.length > 1) {
            return contractId
        } else {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "contract_id")
        }
    }

    static findAmount(txResultResponse: TxResultResponse): string {
        let amount = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "amount",
            "",
        ) as string;
        if (!amount || amount.length < 1) {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "amount").toString();
        } else {
            return amount.toString();
        }
    }

    static findCreatedItemToken(txResultResponse: TxResultResponse): CreatedItemToken {
        return new CreatedItemToken(
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findTokenName(txResultResponse),
            TxResultUtil.findTokenMeta(txResultResponse),
            TxResultUtil.findBaseImgUri(txResultResponse)
        );
    }

    static findTransferredFungibleTokenAmount(txResultResponse: TxResultResponse): TransferredFungibleTokenAmount {
        const amounts = TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "amount", []);
        const tokenId = amounts[0]["tokenId"]
        const amount = amounts[0]["amount"]
        return new TransferredFungibleTokenAmount(
            TxResultUtil.findContractId(txResultResponse),
            TokenUtil.tokenTypeFrom(tokenId),
            (amount || "0").toString()
        )
    }

    static findBaseImgUri(txResultResponse: TxResultResponse): string {
        const baseImgUri = TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "base_img_uri", "");
        if (!baseImgUri || baseImgUri.length < 1) {
            return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "baseImgUri", "");
        } else {
            return baseImgUri
        }
    }

    static findImgUri(txResultResponse: TxResultResponse): string {
        const imgUri = TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "img_uri", "");
        if (!imgUri || imgUri.length < 1) {
            return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "imgUri", "");
        } else {
            return imgUri
        }
    }

    static findIssuedServiceToken(txResultResponse: TxResultResponse): IssuedServiceToken {
        return new IssuedServiceToken(
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findTokenName(txResultResponse),
            TxResultUtil.findTokenSymbol(txResultResponse),
            TxResultUtil.findTokenMeta(txResultResponse),
            TxResultUtil.findBaseImgUri(txResultResponse),
            TxResultUtil.findTokenDecimals(txResultResponse)
        );
    }

    static findMintedFungibleTokens(
        txResultResponse: TxResultResponse,
    ): Array<MintedFungibleToken> {
        // array of object
        let amounts: Array<any> = TxResultUtil.findValueFromMessages(
            txResultResponse,
            "amount",
        );
        return amounts.map(it => {
            const tokenId = it["tokenId"];
            const tokenType = TokenUtil.tokenTypeFrom(tokenId);
            return new MintedFungibleToken(
                TxResultUtil.findContractId(txResultResponse),
                tokenType,
                (it["amount"] || "0").toString(),
            );
        });
    }

    static findBurnedFungibleTokens(
        txResultResponse: TxResultResponse,
    ): Array<MintedFungibleToken> {
        // array of object
        let amounts: Array<any> = TxResultUtil.findValueFromMessages(
            txResultResponse,
            "amount",
        );
        return amounts.map(it => {
            const tokenId = it["tokenId"];
            const tokenType = TokenUtil.tokenTypeFrom(tokenId);
            return new BurnedFungibleToken(
                TxResultUtil.findContractId(txResultResponse),
                tokenType,
                (it["amount"] || "0").toString(),
            );
        });
    }

    static findIssuedFungibleToken(
        txResultResponse: TxResultResponse,
    ): IssuedFungibleToken {
        const tokenId = TxResultUtil.findTokenIdFromEvents(txResultResponse);
        const tokenType = TokenUtil.tokenTypeFrom(tokenId);
        return new IssuedFungibleToken(
            TxResultUtil.findContractId(txResultResponse),
            tokenType,
            TxResultUtil.findTokenName(txResultResponse),
            TxResultUtil.findTokenMeta(txResultResponse),
            TxResultUtil.findTokenDecimals(txResultResponse),
        )
    }

    static findIssuedNonFungibleToken(txResultResponse: TxResultResponse): IssuedNonFungibleToken {
        return new IssuedNonFungibleToken(
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findTokenType(txResultResponse),
            TxResultUtil.findTokenName(txResultResponse),
            TxResultUtil.findTokenMeta(txResultResponse)
        )
    }

    static findMintedNonFungibleToken(txResultResponse: TxResultResponse): MintedNonFungibleToken {
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        const tokenType = TokenUtil.tokenTypeFrom(tokenId)
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId)
        return new MintedNonFungibleToken(
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderWalletAddress(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            tokenType,
            tokenIndex,
            TxResultUtil.findTokenNameFromMintNFT(txResultResponse),
            TxResultUtil.findTokenMetaFromMintNFT(txResultResponse)
        )
    }

    static findMintedNonFungibleTokens(txResultResponse: TxResultResponse): Array<MintedNonFungibleToken> {
        const senderAddresses = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'sender')].value`)
        const fromAddresses = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'from')].value`)
        const toAddresses = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'to')].value`)
        const contractIdList = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'contract_id')].value`)
        const tokenIdList = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'token_id')].value`)
        const params = jsonpath.query(txResultResponse.tx.value.msg, "$..params[0]")

        return tokenIdList.map((it, index) => {
            const tokenType = TokenUtil.tokenTypeFrom(it)
            const tokenIndex = TokenUtil.tokenIndexFrom(it)
            return new MintedNonFungibleToken(
                fromAddresses[index],
                senderAddresses[index],
                toAddresses[index],
                contractIdList[index],
                tokenType,
                tokenIndex,
                params[index]["name"],
                params[index]["meta"]
            )
        });
    }

    static findBurnedNonFungibleToken(txResultResponse: TxResultResponse): NonFungibleToken {
        return TxResultUtil.findNonFungibleToken(txResultResponse)
    }

    static findTransferredNonFungibleToken(txResultResponse: TxResultResponse): Array<NonFungibleToken> {
        const contractId = TxResultUtil.findContractId(txResultResponse);
        const tokenIdList = TxResultUtil.findMultiTokenIds(txResultResponse)

        return tokenIdList.map((it, _) => {
            const tokenType = TokenUtil.tokenTypeFrom(it)
            const tokenIndex = TokenUtil.tokenIndexFrom(it)
            return new NonFungibleToken(
                contractId,
                tokenType,
                tokenIndex
            )
        })
    }

    static findTransferredFromNonFungibleTokens(txResultResponse: TxResultResponse): Array<NonFungibleToken> {
        const tokenIdList = jsonpath.query(txResultResponse.logs, `$..[?(@.key === 'token_id')].value`);
        const contractId = TxResultUtil.findContractId(txResultResponse);
        return tokenIdList.map((it, _) => {
            const tokenType = TokenUtil.tokenTypeFrom(it)
            const tokenIndex = TokenUtil.tokenIndexFrom(it)
            return new NonFungibleToken(
                contractId,
                tokenType,
                tokenIndex
            )
        })

    }

    static findMultiTokenIds(txResultResponse: TxResultResponse): Array<string> {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenIds",
            [],
        )
    }

    static findNonFungibleToken(txResultResponse: TxResultResponse): NonFungibleToken {
        const tokenId = TxResultUtil.findTokenIdList(txResultResponse)[0];
        const tokenType = TokenUtil.tokenTypeFrom(tokenId)
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId)
        return new NonFungibleToken(
            TxResultUtil.findContractId(txResultResponse),
            tokenType,
            tokenIndex
        )
    }

    static findTokenIdList(txResultResponse: TxResultResponse): Array<string> {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenIds",
            [],
        )
    }

    static findTokenNameFromMintNFT(txResultResponse: TxResultResponse): string {
        return txResultResponse.tx.value.msg[0].value["params"][0]["name"].toString()
    }
    static findTokenMetaFromMintNFT(txResultResponse: TxResultResponse): string {
        return txResultResponse.tx.value.msg[0].value["params"][0]["meta"].toString()
    }

    static findTokenId(txResultResponse: TxResultResponse): string {
        let tokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenId",
            "",
        ) as string;
        if (tokenId && tokenId.length == 16) {
            return tokenId;
        } else {
            tokenId = TxResultUtil.findValueFromLogEvents(txResultResponse, "token_id")
            if (tokenId && tokenId.length == 16) {
                return tokenId;
            } else {
                return `${TxResultUtil.findTokenType(
                    txResultResponse,
                )}${TxResultUtil.findTokenIndex(txResultResponse)}`;
            }
        }
    }

    static findTokenIdFromEvents(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromLogEvents(txResultResponse, "token_id");
    }

    static findParentTokenId(txResultResponse: TxResultResponse): string {
        const parentTokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "toTokenId",
            "",
        ) as string;
        if (parentTokenId && parentTokenId.length > 1) {
            return parentTokenId;
        } else {
            return TxResultUtil.findValueFromLogEvents(
                txResultResponse,
                "to_token_id",
            );
        }
    }

    static findOldParentTokenId(txResultResponse: TxResultResponse): string {
        const oldParentTokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "oldRootTokenId",
            "",
        ) as string;
        if (oldParentTokenId && oldParentTokenId.length > 1) {
            return oldParentTokenId;
        } else {
            return TxResultUtil.findValueFromLogEvents(
                txResultResponse,
                "old_root_token_id",
            );
        }
    }

    static findParentTokenIdFromDetach(
        txResultResponse: TxResultResponse,
    ): string {
        return TxResultUtil.findValueFromLogEvents(
            txResultResponse,
            "from_token_id",
        );
    }

    static findTokenType(txResultResponse: TxResultResponse): string {
        const tokenType = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenType",
            "",
        )
        if (tokenType && tokenType.length == 8) {
            return tokenType
        } else {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "token_type")
        }
    }

    static findTokenIndex(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenIndex",
            "",
        );
    }

    static findTokenName(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "name",
            "",
        );
    }

    static findTokenSymbol(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "symbol",
            "",
        );
    }

    static findTokenDecimals(txResultResponse: TxResultResponse): number {
        const decimals = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "decimals",
            0,
        );

        if (!decimals || decimals.toString().length < 1) {
            return TxResultUtil.findValueFromLogEvents(txResultResponse, "decimals");
        } else {
            return decimals;
        }
    }

    static findTokenMeta(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "meta",
            "",
        );
    }

    static findBaseCoinAmount(txResultResponse: TxResultResponse): BaseCoinAmount {
        const amount = txResultResponse.tx.value.msg[0].value.amount[0]
        return new BaseCoinAmount(
            amount["denom"],
            (amount["amount"] || "0").toString(),
        )
    }


    static findValueFromMessagesWithDefaultValue(
        txResultResponse: TxResultResponse,
        key: string,
        defaultValue: any,
    ): any {
        const value = TxResultUtil.findValueFromMessages(txResultResponse, key);
        if (value) {
            return value;
        } else {
            return defaultValue;
        }
    }

    static findValueFromMessages(
        txResultResponse: TxResultResponse,
        key: string,
    ): any {
        if (txResultResponse.tx.value.msg.length < 1) {
            return "";
        } else {
            const msg = _.head(
                _.filter(txResultResponse.tx.value.msg, it => !!it.value[key]),
            );
            if (msg && msg.value) {
                return msg.value[key];
            } else {
                return null;
            }
        }
    }

    static findValueFromLogEvents(
        txResultResponse: TxResultResponse,
        key: string,
    ): any {
        let targetAttribute = _.head(
            jsonpath.query(txResultResponse.logs, `$..[?(@.key === '${key}')]`),
        );
        if (targetAttribute && targetAttribute["value"]) {
            return targetAttribute["value"];
        } else {
            return "";
        }
    }
}
