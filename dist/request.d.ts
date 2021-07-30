export declare class AbstractTokenBurnTransactionRequest {
    readonly fromUserId?: string;
    readonly fromAddress?: string;
    constructor(fromUserId?: string, fromAddress?: string);
}
export declare class AbstractTransactionRequest {
    readonly toAddress?: string;
    readonly toUserId?: string;
    constructor(toAddress?: string, toUserId?: string);
}
export declare class UpdateServiceTokenRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly name: string;
    readonly meta?: string;
    constructor(ownerAddress: string, ownerSecret: string, name: string, meta?: string);
}
export declare class BurnFromServiceTokenRequest extends AbstractTokenBurnTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, fromUserId?: string, fromAddress?: string);
}
export declare class MintServiceTokenRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class MemoRequest {
    readonly memo: string;
    readonly walletAddress: string;
    readonly walletSecret: string;
    constructor(memo: string, walletAddress: string, walletSecret: string);
}
export declare class TransferBaseCoinRequest extends AbstractTransactionRequest {
    readonly walletSecret: string;
    readonly amount: string;
    constructor(walletSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class TransferServiceTokenRequest extends AbstractTransactionRequest {
    readonly walletSecret: string;
    readonly amount: string;
    constructor(walletSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class TransferServiceTokenProxyRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class TransferFungibleTokenRequest extends AbstractTransactionRequest {
    readonly walletSecret: string;
    readonly amount: string;
    constructor(walletSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class TransferFungibleTokenProxyRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class TransferNonFungibleTokenRequest extends AbstractTransactionRequest {
    readonly walletSecret: string;
    constructor(walletSecret: string, toAddress?: string, toUserId?: string);
}
export declare class TransferNonFungibleTokenProxyRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    constructor(ownerAddress: string, ownerSecret: string, toAddress?: string, toUserId?: string);
}
export declare class BatchTransferNonFungibleTokenRequest extends AbstractTransactionRequest {
    readonly walletSecret: string;
    readonly transferList: Array<TokenId>;
    constructor(walletSecret: string, transferList: Array<TokenId>, toAddress?: string, toUserId?: string);
}
export declare class BatchTransferNonFungibleTokenProxyRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly transferList: Array<TokenId>;
    constructor(ownerAddress: string, ownerSecret: string, transferList: Array<TokenId>, toAddress?: string, toUserId?: string);
}
export declare class TokenId {
    readonly tokenId: string;
    private constructor();
    private static tokenIdFormat;
    static from(value: string): TokenId;
    static fromMulti(values: Array<string>): Array<TokenId>;
}
export declare class FungibleTokenCreateUpdateRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly name: string;
    readonly meta?: string;
    constructor(ownerAddress: string, ownerSecret: string, name: string, meta?: string);
}
export declare class FungibleTokenMintRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, toAddress?: string, toUserId?: string);
}
export declare class FungibleTokenBurnRequest extends AbstractTokenBurnTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly amount: string;
    readonly fromUserId?: string;
    readonly fromAddress?: string;
    constructor(ownerAddress: string, ownerSecret: string, amount: string, fromUserId?: string, fromAddress?: string);
}
export declare class NonFungibleTokenCreateUpdateRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly name: string;
    readonly meta?: string;
    constructor(ownerAddress: string, ownerSecret: string, name: string, meta?: string);
}
export declare class NonFungibleTokenMintRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly name: string;
    readonly meta: string;
    constructor(ownerAddress: string, ownerSecret: string, name: string, meta: string, toAddress?: string, toUserId?: string);
}
export declare class NonFungibleTokenMultiMintRequest extends AbstractTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly mintList: Array<MultiMintNonFungible>;
    constructor(ownerAddress: string, ownerSecret: string, mintList: Array<MultiMintNonFungible>, toAddress?: string, toUserId?: string);
}
export declare class MultiMintNonFungible {
    readonly tokenType: string;
    readonly name: string;
    readonly meta?: string;
    constructor(tokenType: string, name: string, meta?: string);
}
export declare class NonFungibleTokenBurnRequest extends AbstractTokenBurnTransactionRequest {
    readonly ownerAddress: string;
    readonly ownerSecret: string;
    readonly fromUserId?: string;
    readonly fromAddress?: string;
    constructor(ownerAddress: string, ownerSecret: string, fromUserId?: string, fromAddress?: string);
}
export declare class NonFungibleTokenAttachRequest {
    readonly parentTokenId: string;
    readonly serviceWalletAddress: string;
    readonly serviceWalletSecret: string;
    readonly tokenHolderAddress?: string;
    readonly tokenHolderUserId?: string;
    constructor(parentTokenId: string, serviceWalletAddress: string, serviceWalletSecret: string, tokenHolderAddress?: string, tokenHolderUserId?: string);
}
export declare class NonFungibleTokenDetachRequest {
    readonly serviceWalletAddress: string;
    readonly serviceWalletSecret: string;
    readonly tokenHolderAddress?: string;
    readonly tokenHolderUserId?: string;
    constructor(serviceWalletAddress: string, serviceWalletSecret: string, tokenHolderAddress?: string, tokenHolderUserId?: string);
}
export declare class UserServiceTokenTransferRequest extends AbstractTransactionRequest {
    readonly amount: string;
    readonly landingUri: string;
    constructor(amount: string, toAddress: string, toUserId: string, landingUri: string);
}
export declare class IssueTransferSessionTokenRequest extends AbstractTransactionRequest {
    readonly amount: string;
    readonly landingUri: string;
    constructor(amount: string, landingUri: string, toAddress?: string, toUserId?: string);
}
export declare class UserProxyRequest {
    readonly ownerAddress: string;
    readonly landingUri: string;
    constructor(ownerAddress: string, landingUri: string);
}
export declare enum OrderBy {
    ASC = "asc",
    DESC = "desc"
}
export declare enum RequestType {
    REDIRECT_URI = "redirect_uri",
    AOA = "aoa"
}
export declare class PageRequest {
    readonly page: number;
    readonly limit: number;
    readonly orderBy: OrderBy;
    constructor(page?: number, limit?: number, orderBy?: OrderBy);
}
export declare class OptionalTransactionSearchParameters {
    readonly after?: number;
    readonly before?: number;
    readonly msgType?: string;
    constructor(after?: number, before?: number, msgType?: string);
}
