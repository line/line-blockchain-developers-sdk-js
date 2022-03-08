import { Validations } from "./constants"

export class RequestParameterValidator {
    private constructor() { }
    static isValidTokenName(name: string): boolean {
        return Validations.TOKEN_NAME_REGEX.test(name)
    }

    static validTokenNamePattern(): string {
        return Validations.TOKEN_NAME_REGEX.source
    }

    static isValidSymbol(symbol: string): boolean {
        return Validations.SYMBOL_NAME_REGEX.test(symbol)
    }

    static validTokenSymbolPattern(): string {
        return Validations.SYMBOL_NAME_REGEX.source
    }

    static isValidInitialSupply(initialSupply: string): boolean {
        return Validations.NUMBER_FORMAT_REGEX.test(initialSupply)
    }

    static validTokenInitialSupplyPattern(): string {
        return Validations.NUMBER_FORMAT_REGEX.source
    }

    static isValidWalletAddress(walletAddress: string): boolean {
        return Validations.WALLET_ADDRESS_REGEX.test(walletAddress)
    }

    static validWalletAddressPattern(): string {
        return Validations.WALLET_ADDRESS_REGEX.source
    }

    static isValidBaseUri(baseUri: string): boolean {
        return Validations.BASE_URI_OR_EMPTY_REGEX.test(baseUri)
    }

    static validBaseUriPattern(): string {
        return Validations.BASE_URI_OR_EMPTY_REGEX.source
    }
}