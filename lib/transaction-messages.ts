export enum MessageType {
    // SERVICE TOKEN MESSAGE TYPES
    SERVICE_TOKEN_ISSUE = "token/MsgIssue",
    SERVICE_TOKEN_MODIFY = "token/MsgModify",
    SERVICE_TOKEN_MINT = "token/MsgMint",
    SERVICE_TOKEN_BURN = "token/MsgBurn",
    SERVICE_TOKEN_BURN_FROM = "token/MsgBurnFrom",
    SERVICE_TOKEN_TRANSFER = "token/MsgTransfer",
    SERVICE_TOKEN_TRANSFER_FROM = "token/MsgTransferFrom",

    // ITEM TOKEN MESSAGE TYPES
    // ITEM_TOKEN_CREATE = "collection/MsgCreate",
    ITEM_TOKEN_MODIFY = "collection/MsgModify",
    ITEM_TOKEN_APPROVE = "collection/MsgApprove",
    ITEM_TOKEN_DISAPPROVE = "collection/MsgDisapprove",
    ITEM_TOKEN_GRANT_PERMISSION = "collection/MsgGrantPermission",
    ITEM_TOKEN_REVOKE_PERMISSION = "collection/MsgRevokePermission",
    ITEM_TOKEN_ISSUE_FT = "collection/MsgIssueFT",
    ITEM_TOKEN_MINT_FT = "collection/MsgMintFT",
    ITEM_TOKEN_BURN_FT = "collection/MsgBurnFT",
    ITEM_TOKEN_BURN_FROM_FT = "collection/MsgBurnFromFT",
    ITEM_TOKEN_TRANSFER_FT = "collection/MsgTransferFT",
    ITEM_TOKEN_TRANSFER_FROM_FT = "collection/MsgTransferFTFrom",
    ITEM_TOKEN_ISSUE_NFT = "collection/MsgIssueNFT",
    ITEM_TOKEN_MINT_NFT = "collection/MsgMintNFT",
    ITEM_TOKEN_BURN_NFT = "collection/MsgBurnNFT",
    ITEM_TOKEN_BURN_FROM_NFT = "collection/MsgBurnNFTFrom",
    ITEM_TOKEN_TRANSFER_NFT = "collection/MsgTransferNFT",
    ITEM_TOKEN_TRANSFER_FROM_NFT = "collection/MsgTransferNFTFrom",
    ITEM_TOKEN_ATTACH = "collection/MsgAttach",
    ITEM_TOKEN_ATTACH_FROM = "collection/MsgAttachFrom",
    ITEM_TOKEN_DETACH = "collection/MsgDetach",
    ITEM_TOKEN_DETACH_FROM = "collection/MsgDetachFrom",

    //BASE COIN - CASHEW ONLY
    COIN_SEND = "coin/MsgSend",
}

// data classes(value objects) from tx-results

export abstract class TxResultMessage {
    constructor(
        readonly height: number,
        readonly txHash: string,
        readonly from: string,
        readonly proxy?: string, // transaction come from proxy wallet
    ) { }

    isProxyTransaction(): boolean {
        return !!this.proxy;
    }
}

export class IssuedServiceToken {
    constructor(
        readonly contractId: string,
        readonly name: string,
        readonly symbol: string,
        readonly meta: string,
        readonly imUri: string,
        readonly decimal: number,
    ) { }
}

export class CreatedItemToken {
    constructor(
        readonly contractId: string,
        readonly name: string,
        readonly meta: string,
        readonly baseImgUri: string,
    ) { }
}

export class FungibleToken {
    constructor(readonly contractId: string, readonly tokenType: string) { }
}

export class IssuedFungibleToken extends FungibleToken {
    constructor(
        contractId: string,
        tokenType: string,
        readonly name: string,
        readonly meta: string,
        readonly decimal: number,
    ) {
        super(contractId, tokenType);
    }
}

export class MintedFungibleToken extends FungibleToken {
    constructor(contractId: string, tokenType: string, readonly amount: string) {
        super(contractId, tokenType);
    }
}

export class BurnedFungibleToken extends FungibleToken {
    constructor(contractId: string, tokenType: string, readonly amount: string) {
        super(contractId, tokenType);
    }
}

export class TransferredFungibleTokenAmount extends FungibleToken {
    constructor(contractId: string, tokenType: string, readonly amount: string) {
        super(contractId, tokenType);
    }
}

export class NonFungibleToken {
    constructor(
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenIndex?: string,
    ) { }
}

export class BaseCoinAmount {
    constructor(readonly contractId: string, readonly amount: string) { }
}

export class IssuedNonFungibleToken extends NonFungibleToken {
    constructor(
        readonly contractId: string,
        readonly tokenType: string,
        readonly name: string,
        readonly meta: string,
    ) {
        super(contractId, tokenType);
    }
}

export class MintedNonFungibleToken extends NonFungibleToken {
    constructor(
        readonly from: string,
        readonly sender: string,
        readonly to: string,
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenIndex: string,
        readonly name: string,
        readonly meta: string,
    ) {
        super(contractId, tokenType, tokenIndex);
    }
}

export class TransferredNonFungibleToken extends NonFungibleToken {
    constructor(
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenIndex: string,
    ) {
        super(contractId, tokenType, tokenIndex);
    }
}

export class TokenChange {
    constructor(readonly field: string, readonly value: string) { }
}

export class ServiceTokenIssueMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string,
        readonly to: string, // receiver
        readonly issuedServiceToken: IssuedServiceToken,
        readonly amount: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenModifyMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        sender: string, // sender
        readonly owner: string,
        readonly contractId: string,
        readonly changes: Array<TokenChange>,
    ) {
        super(height, txHash, sender);
    }
}

export class ServiceTokenMintMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly to: string, // receiver
        readonly contractId: string,
        readonly amount: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenBurnMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string,
        readonly contractId: string,
        readonly amount: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenBurnFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly proxy: string,
        readonly contractId: string,
        readonly amount: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenGrantPermissionMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly permission: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenRevokePermissionMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly permission: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenTransferMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly amount: string,
    ) {
        super(height, txHash, from);
    }
}

export class ServiceTokenTransferFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly amount: string,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class ItemTokenCreateMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly createdItemToken: CreatedItemToken,
    ) {
        super(height, txHash, from);
    }
}

export class ItemTokenModifyMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string, // sender
        readonly sender: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenIndex: string, // if fungible then '00000000'
        readonly tokenId: string,
        readonly changes: Array<TokenChange>,
        readonly isFungible: boolean = false,
    ) {
        super(height, txHash, from);
        if (!this.tokenId || this.tokenId.length < 1) {
            this.tokenId = `${tokenType}${tokenIndex}`;
        }
    }
}

export class ItemTokenApproveMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly approver: string, // from
        readonly contractId: string,
        readonly proxy: string, // approve to
    ) {
        super(height, txHash, from);
    }
}

export class ItemTokenDisapproveMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly approver: string, // from
        readonly contractId: string,
        readonly proxy: string,
    ) {
        super(height, txHash, from);
    }
}

export class ItemTokenGrantPermissionMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly permission: string,
    ) {
        super(height, txHash, from);
    }
}

export class ItemTokenRevokePermissionMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly permission: string,
    ) {
        super(height, txHash, from);
    }
}

export class FungibleTokenIssueMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        readonly sender: string,
        readonly owner: string,
        readonly to: string, // receiver
        readonly issuedFungibleToken: IssuedFungibleToken,
        readonly amount: string,
    ) {
        super(height, txHash, sender);
    }
}

export class FungibleTokenModifyMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string,
        readonly contractId: string,
        readonly tokenType: string,
        readonly changes: Array<TokenChange>,
    ) {
        super(height, txHash, from);
    }
}

export class FungibleTokenMintMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly sender: string,
        readonly to: string, // receiver
        readonly mintedFungibleTokens: Array<MintedFungibleToken>,
    ) {
        super(height, txHash, from);
    }
}

export class FungibleTokenBurnMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly sender: string,
        readonly contractId: string,
        readonly burnedFungibleTokens: Array<BurnedFungibleToken>,
    ) {
        super(height, txHash, from);
    }
}

export class FungibleTokenBurnFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly burnedFungibleTokens: Array<BurnedFungibleToken>,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class FungibleTokenTransferMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly transferredFungibleTokenAmount: TransferredFungibleTokenAmount,
    ) {
        super(height, txHash, from);
    }
}

export class FungibleTokenTransferFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly to: string,
        readonly transferredFungibleTokenAmount: TransferredFungibleTokenAmount,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class NonFungibleTokenIssueMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        readonly sender: string,
        readonly contractId: string,
        readonly issuedNonFungibleToken: IssuedNonFungibleToken,
    ) {
        super(height, txHash, sender);
    }
}

export class NonFungibleTokenMintMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string = "",
        readonly mintedNonFungibleTokens: Array<MintedNonFungibleToken>,
    ) {
        super(height, txHash, from);
    }
}

export class NonFungibleTokenBurnMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly sender: string,
        readonly contractId: string,
        readonly burnedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from);
    }
}

export class NonFungibleTokenBurnFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly owner: string, // from
        readonly contractId: string,
        readonly burnedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class NonFungibleTokenTransferMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly transferredNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from);
    }
}

export class NonFungibleTokenTransferFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly owner: string, // from
        readonly transferredNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class NonFungibleTokenAttachMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly sender: string,
        readonly parentNonFungibleToken: NonFungibleToken,
        readonly attachedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from);
    }
}

export class NonFungibleTokenAttachFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly sender: string,
        readonly parentNonFungibleToken: NonFungibleToken,
        readonly attachedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class NonFungibleTokenDetachMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly sender: string,
        readonly parentNonFungibleToken: NonFungibleToken,
        readonly attachedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from);
    }
}

export class NonFungibleTokenDetachFromMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        proxy: string,
        readonly sender: string,
        readonly parentNonFungibleToken: NonFungibleToken,
        readonly attachedNonFungibleToken: NonFungibleToken,
    ) {
        super(height, txHash, from, proxy);
    }
}

export class BaseCoinTransferMessage extends TxResultMessage {
    constructor(
        height: number,
        txHash: string,
        from: string,
        readonly owner: string, // from
        readonly to: string,
        readonly baseCoinAmount: BaseCoinAmount,
    ) {
        super(height, txHash, from);
    }
}
