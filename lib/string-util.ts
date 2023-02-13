import _ from "lodash";
import { DenomAmount, TokenIdAmount } from "./commonTypes";
export class StringUtil {
    private constructor() { }
    public static parseAmount(amountWithDenom: string): DenomAmount {
        const regex = /(\d+):?(\w+)/;
        const match = amountWithDenom.match(regex);
        return DenomAmount.create({
            "amount": match[1],
            "denom": match[2]
        })
    }

    public static parseTokenIdAmount(amountWithTokenId: string): TokenIdAmount {
        const regex = /(\d+):?(\d+)/;
        const match = amountWithTokenId.match(regex);
        return TokenIdAmount.create({
            "amount": match[1],
            "tokenId": match[2]
        })
    }

    public static isBlank(value: string): boolean {
        return _.isEmpty(value) && !_.isNumber(value) || _.isNaN(value);
    }
}
