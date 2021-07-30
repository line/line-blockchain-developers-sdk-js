export declare class GenericResponse<T> {
    readonly responseTime: number;
    readonly statusCode: number;
    readonly statusMessage: string;
    readonly responseData?: T;
    constructor(responseTime: number, statusCode: number, statusMessage: string, responseData?: T);
}
export declare class ServiceDetail {
    readonly serviceId: string;
    readonly name: string;
    readonly category: string;
    readonly description?: string;
    constructor(serviceId: string, name: string, category: string, description?: string);
}
export declare class UserRequestStatus {
    readonly status: RequestSessionTokenStatus;
    constructor(status: RequestSessionTokenStatus);
}
export declare enum RequestSessionTokenStatus {
    Authorized = 0,
    Unauthorized = 1
}
export declare class ServiceToken {
    readonly contractId: string;
    readonly ownerAddress: string;
    readonly createdAt: number;
    readonly serviceId: string;
    readonly decimals: number;
    readonly name: string;
    readonly symbol: string;
    readonly meta: string;
    readonly imgUri: string;
    readonly totalSupply: string;
    readonly totalMint: string;
    readonly totalBurn: string;
    constructor(contractId: string, ownerAddress: string, createdAt: number, serviceId: string, decimals: number, name: string, symbol: string, meta: string, imgUri: string, totalSupply: string, totalMint: string, totalBurn: string);
}
export declare class ServiceTokenHolder {
    readonly address: string;
    readonly amount: string;
    readonly userId?: string;
    constructor(address: string, amount: string, userId?: string);
}
export declare class TransactionResponse {
    readonly txHash: string;
    constructor(txHash: string);
}
export declare class TxResultResponse {
    readonly height: number;
    readonly txhash: string;
    readonly code: number;
    readonly index: number;
    readonly gasUsed: number;
    readonly tx: TypedValueResponse<StdTxResponse>;
    readonly timestamp: number;
    readonly codespace?: string;
    readonly data?: string;
    readonly logs?: Array<LogResponse>;
    readonly info?: string;
    readonly gasWanted?: number;
    constructor(height: number, txhash: string, code: number, index: number, gasUsed: number, tx: TypedValueResponse<StdTxResponse>, timestamp: number, codespace?: string, data?: string, logs?: Array<LogResponse>, info?: string, gasWanted?: number);
}
export declare class LogResponse {
    readonly msgIndex: number;
    readonly log: string;
    readonly events?: Array<EventResponse>;
    constructor(msgIndex: number, log: string, events?: Array<EventResponse>);
}
export declare class EventResponse {
    readonly type: string;
    readonly attributes: Array<KeyValueResponse<String>>;
    constructor(type: string, attributes: Array<KeyValueResponse<String>>);
}
export declare class KeyValueResponse<T> {
    readonly key: string;
    readonly value?: T;
    constructor(key: string, value?: T);
}
export declare class TypedValueResponse<T> {
    readonly type: String;
    readonly value: T;
    constructor(type: String, value: T);
}
export declare class StdTxResponse {
    readonly msg: Array<TypedValueResponse<any>>;
    readonly fee: FeeResponse;
    readonly memo: string;
    readonly signatures: Array<SignatureResponse>;
    constructor(msg: Array<TypedValueResponse<any>>, fee: FeeResponse, memo: string, signatures: Array<SignatureResponse>);
}
export declare class FeeResponse {
    readonly gas: BigInteger;
    readonly amount: Array<CoinResponse>;
    constructor(gas: BigInteger, amount: Array<CoinResponse>);
}
export declare class SignatureResponse {
    readonly signature: ArrayBuffer;
    readonly pubKey?: TypedValueResponse<ArrayBuffer>;
    constructor(signature: ArrayBuffer, pubKey?: TypedValueResponse<ArrayBuffer>);
}
export declare class BaseCoinBalance {
    readonly symbol: string;
    readonly decimals: number;
    readonly amount: string;
    constructor(symbol: string, decimals: number, amount: string);
}
export declare class CoinResponse {
    readonly denom: string;
    readonly amount: BigInt;
    constructor(denom: string, amount: BigInt);
    toString(): String;
}
export declare class Memo {
    readonly memo: string;
    constructor(memo: string);
}
export declare class WalletResponse {
    readonly name: string;
    readonly walletAddress: string;
    readonly createdAt: number;
    constructor(name: string, walletAddress: string, createdAt: number);
}
export declare class ServiceTokenBalance {
    readonly contractId: string;
    readonly name: string;
    readonly symbol: string;
    readonly imgUri: string;
    readonly decimals: number;
    readonly amount: string;
    constructor(contractId: string, name: string, symbol: string, imgUri: string, decimals: number, amount: string);
}
export declare class FungibleBalance {
    readonly tokenType: string;
    readonly name: string;
    readonly meta: string;
    readonly amount: string;
    constructor(tokenType: string, name: string, meta: string, amount: string);
}
export declare class NonFungibleBalance {
    readonly tokenType: string;
    readonly name: string;
    readonly meta: string;
    readonly numberOfIndex: string;
    constructor(tokenType: string, name: string, meta: string, numberOfIndex: string);
}
export declare class TokenIndex {
    readonly tokenIndex: string;
    readonly name: string;
    readonly meta: string;
    constructor(tokenIndex: string, name: string, meta: string);
}
export declare class ItemToken {
    readonly contractId: string;
    readonly baseImgUri: string;
    readonly ownerAddress: string;
    readonly serviceId: string;
    readonly createdAt: number;
    constructor(contractId: string, baseImgUri: string, ownerAddress: string, serviceId: string, createdAt: number);
}
export declare class FungibleToken {
    readonly name: string;
    readonly meta: string;
    readonly tokenType: string;
    readonly totalSupply: string;
    readonly totalMint: string;
    readonly totalBurn: string;
    readonly createdAt: number;
    constructor(name: string, meta: string, tokenType: string, totalSupply: string, totalMint: string, totalBurn: string, createdAt: number);
}
export declare class FungibleTokenHolder {
    readonly walletAddress: string;
    readonly amount: string;
    readonly userId?: string;
    constructor(walletAddress: string, amount: string, userId?: string);
}
export declare class ItemTokenType {
    readonly name: string;
    readonly meta: string;
    readonly tokenType: string;
    readonly totalSupply: string;
    readonly totalMint: string;
    readonly totalBurn: string;
    readonly createdAt: number;
    constructor(name: string, meta: string, tokenType: string, totalSupply: string, totalMint: string, totalBurn: string, createdAt: number);
}
export declare class NonFungibleTokenType {
    readonly name: string;
    readonly meta: string;
    readonly tokenType: string;
    readonly totalSupply: BigInteger;
    readonly totalMint: BigInteger;
    readonly totalBurn: BigInteger;
    readonly createdAt: number;
    readonly tokens: Array<NonFungibleIndex>;
    constructor(name: string, meta: string, tokenType: string, totalSupply: BigInteger, totalMint: BigInteger, totalBurn: BigInteger, createdAt: number, tokens: Array<NonFungibleIndex>);
}
export declare class NonFungibleIndex {
    readonly tokenIndex: string;
    readonly name: string;
    readonly meta: string;
    readonly createdAt: number;
    readonly burnedAt?: number;
    constructor(tokenIndex: string, name: string, meta: string, createdAt: number, burnedAt?: number);
}
export declare class NonFungibleId {
    readonly tokenId: string;
    readonly name: string;
    readonly meta: string;
    readonly createdAt: number;
    readonly burnedAt?: number;
    constructor(tokenId: string, name: string, meta: string, createdAt: number, burnedAt?: number);
}
export declare class NonFungibleTokenTypeHolder {
    readonly walletAddress: string;
    readonly numberOfIndex: string;
    readonly userId?: string;
    constructor(walletAddress: string, numberOfIndex: string, userId?: string);
}
export declare class NonFungibleTokenHolder {
    readonly tokenId: string;
    readonly walletAddress: string;
    readonly amount: string;
    readonly userId?: string;
    constructor(tokenId: string, walletAddress: string, amount: string, userId?: string);
}
export declare class UserIdAddress {
    readonly userId: string;
    readonly address: string;
    constructor(userId: string, address: string);
}
export declare class SessionTokenResponse {
    readonly requestSessionToken: string;
    readonly redirectUri: string;
    constructor(requestSessionToken: string, redirectUri: string);
}
export declare class RequestSessionStatus {
    readonly status: RequestSessionTokenStatus;
    constructor(status: RequestSessionTokenStatus);
}
