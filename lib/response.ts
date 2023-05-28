export class GenericResponse<T> {
  constructor(
    readonly responseTime: number,
    readonly statusCode: number,
    readonly statusMessage: string,
    readonly responseData?: T,
  ) {
  }
}

export class ServiceDetail {
  constructor(
    readonly serviceId: string,
    readonly name: string,
    readonly category: string,
    readonly description?: string,
  ) {
  }
}

export class UserRequestStatus {
  constructor(readonly status: RequestSessionTokenStatus) {
  }
}

export enum RequestSessionTokenStatus {
  Authorized,
  Unauthorized,
}

export class IssuedServiceToken {
  constructor(
    readonly contractId: string,
    readonly ownerAddress?: string,
    readonly createdAt?: number,
    readonly serviceId?: string,
    readonly decimals?: number,
    readonly name?: string,
    readonly symbol?: string,
    readonly meta?: string,
    readonly imgUri?: string,
  ) {
  }
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
    readonly totalBurn: string,
  ) {
  }
}

export class ServiceTokenHolder {
  constructor(
    readonly address: string,
    readonly amount: string,
    readonly userId?: string,
  ) {
  }
}

export class TransactionResponse {
  constructor(readonly txHash: string) {
  }
}

export class TokenMediaResourceUpdateResponse {
  constructor(readonly requestId: string) {
  }
}

export class FungibleTokenMediaResourceUpdateStatusResponse {
  constructor(
    readonly tokenType: string,
    readonly status: TokenMediaResourceUpdateStatus,
    readonly url?: string,
    readonly detailStatus?: string,
  ) {
  }
}

export class NonFungibleTokenMediaResourceUpdateStatusResponse {
  constructor(
    readonly tokenType: string,
    readonly tokenIndex: string,
    readonly status: TokenMediaResourceUpdateStatus,
    readonly url?: string,
    readonly detailStatus?: string,
  ) {
  }
}

export enum TokenMediaResourceUpdateStatus {
  COMPLETED,
  INCOMPLETE,
  ERROR,
  NONE,
}

export class TxHashResponse {
  constructor(readonly txHash: string) {
  }
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
  ) {
  }
}

export class LogResponse {
  constructor(
    readonly msgIndex: number,
    readonly log: string,
    readonly events?: Array<EventResponse>,
  ) {
  }
}

export class EventResponse {
  constructor(
    readonly type: string,
    readonly attributes: Array<KeyValueResponse<string>>,
  ) {
  }
}

export class KeyValueResponse<T> {
  constructor(readonly key: string, readonly value?: T) {
  }
}

export class TypedValueResponse<T> {
  constructor(readonly type: string, readonly value: T) {
  }
}

export class StdTxResponse {
  constructor(
    readonly msg: Array<TypedValueResponse<any>>,
    readonly fee: FeeResponse,
    readonly memo: string,
    readonly signatures: Array<SignatureResponse>,
  ) {
  }
}

export class FeeResponse {
  constructor(readonly gas: number, readonly amount: Array<CoinResponse>) {
  }
}

export class SignatureResponse {
  constructor(
    readonly signature: string,
    readonly pubKey?: TypedValueResponse<string>,
  ) {
  }
}

export class BaseCoinBalance {
  constructor(
    readonly symbol: string,
    readonly decimals: number,
    readonly amount: string,
  ) {
  }
}

export class CoinResponse {
  constructor(readonly denom: string, readonly amount: number) {
  }

  toString(): string {
    return this.amount.toString() + this.denom;
  }
}

export class Memo {
  constructor(readonly memo: string) {
  }
}

export class WalletResponse {
  constructor(
    readonly name: string,
    readonly walletAddress: string,
    readonly createdAt: number,
  ) {
  }
}

export class ServiceTokenBalance {
  constructor(
    readonly contractId: string,
    readonly name: string,
    readonly symbol: string,
    readonly imgUri: string,
    readonly decimals: number,
    readonly amount: string,
  ) {
  }
}

export class FungibleBalance {
  constructor(
    readonly tokenType: string,
    readonly name: string,
    readonly meta: string,
    readonly amount: string,
  ) {
  }
}

export class NonFungibleBalance {
  constructor(
    readonly tokenType: string,
    readonly name: string,
    readonly meta: string,
    readonly numberOfIndex: string,
  ) {
  }
}

export class CursorPaginatedNonFungibleBalanceWithTypes {
  constructor(
    readonly list: Array<NonFungibleBalanceWithType>,
    readonly prePageToken?: string,
    readonly nextPageToken?: string,
  ) {
  }
}

export class NonFungibleBalanceWithType {
  constructor(
    readonly type: NonFungibleType,
    readonly token: NonFungibleToken,
  ) {
  }
}

export class NonFungibleType {
  constructor(
    readonly tokenType: string,
    readonly name: string,
    readonly meta: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string,
  ) {
  }
}

export class NonFungibleToken {
  constructor(
    readonly name: string,
    readonly tokenId: string,
    readonly meta: string,
    readonly createdAt: number,
    readonly burnedAt?: number,
  ) {
  }
}

export class TokenIndex {
  constructor(
    readonly tokenIndex: string,
    readonly name: string,
    readonly meta: string,
  ) {
  }
}

export class ItemToken {
  constructor(
    readonly contractId: string,
    readonly baseImgUri: string,
    readonly ownerAddress: string,
    readonly serviceId: string,
    readonly createdAt: number,
  ) {
  }
}

export class CreatedItemToken {
  constructor(
    readonly contractId: string,
    readonly baseImgUri?: string,
    readonly ownerAddress?: string,
    readonly serviceId?: string,
    readonly createdAt?: number,
  ) {
  }
}

export class FungibleToken {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string,
    readonly createdAt: number,
  ) {
  }
}

export class FungibleTokenHolder {
  constructor(
    readonly walletAddress: string,
    readonly amount: string,
    readonly userId?: string,
  ) {
  }
}

export class ItemTokenType {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: string,
    readonly totalMint: string,
    readonly totalBurn: string,
    readonly createdAt: number,
  ) {
  }
}

export class NonFungibleTokenType {
  constructor(
    readonly name: string,
    readonly meta: string,
    readonly tokenType: string,
    readonly totalSupply: number,
    readonly totalMint: number,
    readonly totalBurn: number,
    readonly createdAt: number,
    readonly token: Array<NonFungibleIndex>,
  ) {
  }
}

export class NonFungibleIndex {
  constructor(
    readonly tokenIndex: string,
    readonly name: string,
    readonly meta: string,
    readonly createdAt: number,
    readonly burnedAt?: number,
  ) {
  }
}

export class NonFungibleId {
  constructor(
    readonly tokenId: string,
    readonly name: string,
    readonly meta: string,
    readonly createdAt: number,
    readonly burnedAt?: number,
  ) {
  }
}

export class NonFungibleTokenTypeHolder {
  constructor(
    readonly walletAddress: string,
    readonly numberOfIndex: string,
    readonly userId?: string,
  ) {
  }
}

export class NonFungibleTokenTypeHolderList {
  constructor(
    readonly list: Array<NonFungibleTokenTypeHolder>,
    readonly prePageToken: string,
    readonly nextPageToken: string,
  ) {
  }
}

export class NonFungibleTokenHolder {
  constructor(
    readonly tokenId: string,
    readonly walletAddress: string,
    readonly amount: string,
    readonly userId?: string,
  ) {
  }
}

export class UserIdAddress {
  constructor(readonly userId: string, readonly walletAddress: string) {
  }
}

export class SessionTokenResponse {
  constructor(
    readonly requestSessionToken: string,
    readonly redirectUri: string,
  ) {
  }
}

export class RequestSessionStatus {
  constructor(readonly status: RequestSessionTokenStatus) {
  }
}

export class ProxyApprovedResponse {
  constructor(readonly isApproved: boolean) {
  }
}

export class IssueProxyResponse {
  constructor(
    readonly requestSessionToken: string,
    readonly redirectUri?: string,
  ) {
  }
}

export class TxMessageWithDetailResponse {
  constructor(
    readonly msgIndex: number,
    readonly requestType: string,
    readonly details: any,
  ) {
  }
}

export class TxMessageListResponse {
  constructor(
    readonly messages: Array<TxMessageWithDetailResponse>,
    readonly prePageToken: string = "",
    readonly nextPageToken: string = "",
  ) {
  }
}
