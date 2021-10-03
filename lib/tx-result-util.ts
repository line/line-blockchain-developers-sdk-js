import { TxResultResponse } from "./response"
import * as _ from "lodash"

export class TxResultUtil {
    private constructor() { }
    static findFromWalletAddress(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "from", "")
    }

    static findToWalletAddress(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "to", "")
    }

    static findContractId(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "contractId", "")
    }

    static findTokenId(txResultResponse: TxResultResponse): string {
        const tokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "tokenId", "")
        if (tokenId) {
            return tokenId
        } else {
            return `${TxResultUtil.findTokenType(txResultResponse)}${TxResultUtil.findTokenIndex(txResultResponse)}`
        }

    }

    static findTokenType(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "tokenType", "")
    }

    static findTokenIndex(txResultResponse: TxResultResponse): string {
        return TxResultUtil.findValueFromMessagesWithDefaultValue(txResultResponse, "tokenIndex", "")
    }


    static findValueFromMessagesWithDefaultValue(txResultResponse: TxResultResponse, key: string, defaultValue: any): any {
        const value = TxResultUtil.findValueFromMessages(txResultResponse, key)
        if (value) {
            return value
        } else {
            return defaultValue
        }
    }


    static findValueFromMessages(txResultResponse: TxResultResponse, key: string): any {
        if (txResultResponse.tx.value.msg.length < 1) {
            return ""
        } else {
            const msg = _.head(_.filter(txResultResponse.tx.value.msg, (it => !!it.value[key])))
            if (msg && msg.value) {
                return msg.value[key]
            } else {
                return null
            }
        }
    }



}