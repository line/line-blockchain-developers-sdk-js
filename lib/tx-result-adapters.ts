import { TxResultResponse } from "./response"

export interface TxResultAdapter<T, R> {
    adapt(input: T): R
}

// TODO adapting to RawTransactionResult
export class V1JsonRawTransactionResultAdapter implements TxResultAdapter<string, any> {
    adapt(input: string): any {
        return JSON.parse(input)
    }
}

// TODO adapting to RawTransactionResult
export class TxResultResponseAdapter implements TxResultAdapter<TxResultResponse, any> {
    adapt(input: TxResultResponse) {
        throw new Error("Method not implemented.")
    }
}