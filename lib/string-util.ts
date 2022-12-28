import { DenomAmount } from "./commonTypes";
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
}