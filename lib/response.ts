export class GenericResponse<T> {
  constructor(
    readonly responseTime: number,
    readonly statusCode: number,
    readonly statusMessage: string,
    readonly responseData?: T) { }
}

export class ServiceDetail {
  constructor(
    readonly serviceId: string,
    readonly name: string,
    readonly category: string,
    readonly description?: string
  ) { }
}

export class UserRequestStatus {
  constructor(readonly status: RequestSessionTokenStatus) { }
}

export enum RequestSessionTokenStatus {
  Authorized,
  Unauthorized
}


export class ServiceToken {
  constructor(
    readonly contractId: string,
    readonly ownerAddress: string,
    readonly createdAt: number,
    readonly serviceId: string,
    readonly decimals: number,
    readonly name: string,
    readonly symbol: string,
    readonly meta: string,
    readonly imgUri: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string
  ) { }
}

export class ServiceTokenHolder {
  constructor(
    readonly address: string,
    readonly amount: string,
    readonly userId?: string
  ) { }
}

export class TransactionResponse {
  constructor(readonly txHash: string) { }
}

export class TxResultResponse {
  constructor(
    readonly height: number,
    readonly txhash: string,
    readonly code: number,
    readonly index: number,
    readonly gasUsed: number,
    readonly tx: TypedValueResponse<StdTxResponse>,
    readonly timestamp: number,
    readonly codespace?: string,
    readonly data?: string,
    readonly logs?: Array<LogResponse>,
    readonly info?: string,
    readonly gasWanted?: number,
  ) { }
}


export class LogResponse {
  constructor(
    readonly msgIndex: number,
    readonly log: string,
    readonly events?: Array<EventResponse>
  ) { }
}

export class EventResponse {
  constructor(
    readonly type: string,
    readonly attributes: Array<KeyValueResponse<String>>
  ) { }
}

export class KeyValueResponse<T>{
  constructor(readonly key: string, readonly value?: T) { }
}
export class TypedValueResponse<T>{
  constructor(readonly type: String, readonly value: T) { }
}

export class StdTxResponse {
  constructor(
    readonly msg: Array<TypedValueResponse<any>>,
    readonly fee: FeeResponse,
    readonly memo: string,
    readonly signatures: Array<SignatureResponse>
  ) { }
}

export class FeeResponse {
  constructor(readonly gas: BigInteger, readonly amount: Array<CoinResponse>) { }
}
export class SignatureResponse {
  constructor(
    readonly signature: ArrayBuffer,
    readonly pubKey?: TypedValueResponse<ArrayBuffer>
  ) { }
}

export class BaseCoinBalance {
  constructor(
    readonly symbol: string,
    readonly decimals: number,
    readonly amount: string
  ) { }
}

export class CoinResponse {
  constructor(readonly denom: string, readonly amount: BigInt) { }
  toString(): String {
    return this.amount.toString() + this.denom
  }
}

export class Memo {
  constructor(readonly memo: string) { }
}

export class WalletResponse {
  constructor(
    readonly name: string,
    readonly walletAddress: string,
    readonly createdAt: number
  ) { }
}

export class ServiceTokenBalance {
  constructor(
    readonly contractId: string,
    readonly name: string,
    readonly symbol: string,
    readonly imgUri: string,
    readonly decimals: number,
    readonly amount: string
  ) { }
}

export class FungibleBalance {
  constructor(
    readonly tokenType: string,
    readonly name: string,
    readonly meta: string,
    readonly amount: string
  ) { }
}

export class NonFungibleBalance {
  constructor(
    readonly tokenType: string,
    readonly name: string,
    readonly meta: string,
    readonly numberOfIndex: string
  ) { }
}

export class TokenIndex {
  constructor(readonly tokenIndex: string, readonly name: string, readonly meta: string) { }
}

export class ItemToken {
  constructor(
    readonly contractId: string,
    readonly baseImgUri: string,
    readonly ownerAddress: string,
    readonly serviceId: string,
    readonly createdAt: number
  ) { }
}

export class FungibleToken {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string,
    readonly createdAt: number
  ) { }
}

export class FungibleTokenHolder {
  constructor(
    readonly walletAddress: string,
    readonly amount: string,
    readonly userId?: string
  ) { }
}

export class ItemTokenType {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string,
    readonly createdAt: number
  ) { }
}

export class NonFungibleTokenType {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: BigInteger,
    readonly totalMint: BigInteger,
    readonly totalBurn: BigInteger,
    readonly createdAt: number,
    readonly tokens: Array<NonFungibleIndex>
  ) { }
}

export class NonFungibleIndex {
  constructor(
    readonly tokenIndex: string,
    readonly name: string,
    readonly meta: string,
    readonly createdAt: number,
    readonly burnedAt?: number
  ) { }
}

export class NonFungibleId {
  constructor(
    readonly tokenId: string,
    readonly name: string,
    readonly meta: string,
    readonly createdAt: number,
    readonly burnedAt?: number
  ) { }
}

export class NonFungibleTokenTypeHolder {
  constructor(
    readonly walletAddress: string,
    readonly numberOfIndex: string,
    readonly userId?: string
  ) { }
}

export class NonFungibleTokenHolder {
  constructor(
    readonly tokenId: string,
    readonly walletAddress: string,
    readonly amount: string,
    readonly userId?: string,
  ) { }
}

export class UserIdAddress {
  constructor(readonly userId: string, readonly address: string) { }
}
export class SessionTokenResponse {
  constructor(readonly requestSessionToken: string, readonly redirectUri: string) { }
}

export class RequestSessionStatus {
  constructor(readonly status: RequestSessionTokenStatus) {}
}
