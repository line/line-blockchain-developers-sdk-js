import { TxResultResponse } from "./response";
import * as _ from "lodash";
import jsonpath from "jsonpath";
import { TokenChange } from "./transaction-messages";

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
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "proxy",
            "",
        );
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
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "contractId",
            "",
        );
    }

    static findAmount(txResultResponse: TxResultResponse): string {
        let amount = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "amount",
            "",
        ) as string;
        if (!amount || amount.length < 1) {
            return TxResultUtil.findValueFromLogEvents(
                txResultResponse,
                "amount",
            ).toString();
        } else {
            return amount.toString();
        }
    }

    static findTokenId(txResultResponse: TxResultResponse): string {
        const tokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenId",
            "",
        );
        if (tokenId) {
            return tokenId;
        } else {
            return `${TxResultUtil.findTokenType(
                txResultResponse,
            )}${TxResultUtil.findTokenIndex(txResultResponse)}`;
        }
    }

    static findTokenType(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenType",
            "",
        );
    }

    static findTokenIndex(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(
            txResultResponse,
            "tokenIndex",
            "",
        );
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

    static findSenderFromLogEvents(txResultResponse: TxResultResponse): any {
        return TxResultUtil.findValueFromLogEvents(txResultResponse, "sender");
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
