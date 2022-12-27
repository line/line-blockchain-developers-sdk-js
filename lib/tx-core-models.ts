// noinspection JSUnusedGlobalSymbols

import { TokenUtil } from "./token-util";
import _ from "lodash";
import { EMPTY_SET } from "./constants";

export enum TxSuccessResult {
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED"
}

export interface TransactionEvent {
    eventName: string;
}

export class TxMessage {
    constructor(
        readonly msgIndex: number,
        readonly requestType: string,
        readonly details: any,
    ) {
    }
}

export class TxStatusResult {
    constructor(
        readonly code: number = 0,
        readonly codeSpace: string = "",
    ) {
        if (this.code == 0) {
            this.result = TxSuccessResult.SUCCEEDED;
        } else {
            this.result = TxSuccessResult.FAILED;
        }
    }

    result: TxSuccessResult;
}

export class TxSigner {
    constructor(
        readonly address: string,
    ) {
    }
}

export class TxResultSummary {
    constructor(
        readonly height: number,
        readonly txIndex: number,
        readonly txHash: string,
        readonly signers: Set<TxSigner>,
        readonly result: TxStatusResult,
    ) {
    }
}

export class TxResult {
    constructor(
        readonly summary: TxResultSummary,
        readonly txMessages: Set<TxMessage>,
        readonly txEvents: Set<TransactionEvent>,
    ) {
    }

    toJson(): any {
        return {
            "summary": {
                "height": this.summary.height,
                "txIndex": this.summary.txIndex,
                "txHash": this.summary.txHash,
                "signers": [...this.summary.signers],
                "result": this.summary.result,

            },
            "txMessages": [...this.txMessages],
            "txEvents": [...this.txEvents]
        }
    }
}

// events
export class UnknownTransactionEvent implements TransactionEvent {
    constructor(
        readonly type: string,
        readonly attributes: Array<string>,
        readonly extraMessage: string
    ) {
        if (!attributes) {
            this.attributes = [];
        }
        if (!extraMessage) {
            this.extraMessage = "";
        }
    }

    eventName: string = "UnknownTransactionEvent";
}

export class EventAccountCreated implements TransactionEvent {
    constructor(
        readonly createdAddress: string,
        readonly msgIndex: number,
    ) {
    }

    eventName: string = "EventAccountCreated";
}

export class EventEmptyMsgCreated implements TransactionEvent {
    constructor(
        readonly senderAddress: string,
        readonly msgIndex: number,
    ) {
    }

    eventName: string = "EventEmptyMsgCreated";
}

// bank events
export class EventCoinTransferred implements TransactionEvent {
    constructor(
        readonly denomination: string,
        readonly amount: string,
        readonly fromAddress: string,
        readonly toAddress: string,
        readonly msgIndex: number,
    ) {
    }

    eventName: string = "EventCoinTransferred";
}

// service token events
export class ServiceTokenEvent implements TransactionEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
    ) {
    }

    eventName: string = "";
}

export class EventTokenBurned extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly amount: string,
        readonly fromAddress: string,
        readonly proxyAddress?: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenBurned";
}

export class EventTokenIssued extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly issuerAddress: string,
        readonly receiverAddress: string,
        readonly name: string,
        readonly symbol: string,
        readonly decimals: number,
        readonly amount: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenIssued";
}

export class TokenAttribute {
    constructor(
        readonly key: string,
        readonly value: any,
    ) {
    }
}

export class EventTokenMinted extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly amount: string,
        readonly minterAddress: string,
        readonly toAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenMinted";
}

export class EventTokenModified extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly modifierAddress: string,
        readonly minterAddress: string,
        readonly tokenAttributes: Set<TokenAttribute>,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenModified";
}

enum TokenPermission {
    UNDEFINED = "UNDEFINED",
    TOKEN_MODIFY = "TOKEN_MODIFY",
    TOKEN_MINT = "TOKEN_MINT",
    TOKEN_BURN = "TOKEN_BURN"
}

export class EventTokenPermissionGranted extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly permission: TokenPermission,
        readonly granteeAddress: string,
        readonly granterAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenPermissionGranted";
}

export class EventTokenPermissionRenounced extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly permission: TokenPermission,
        readonly granteeAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenPermissionRenounced";
}

export class EventTokenProxyApproved extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly approverAddress: TokenPermission,
        readonly proxyAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenProxyApproved";
}

export class EventTokenProxyDisapproved extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly approverAddress: TokenPermission,
        readonly proxyAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventTokenProxyDisapproved";
}

export class EventTokenTransferred extends ServiceTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly amount: TokenPermission,
        readonly fromAddress: string,
        readonly toAddress: string,
        readonly proxyAddress?: string,
    ) {
        super(msgIndex, contractId);
    }
}

// item token events
enum ItemTokenPermission {
    UNDEFINED = "UNDEFINED",
    COLLECTION_UNDEFINED = "COLLECTION_UNDEFINED",
    COLLECTION_ISSUE = "COLLECTION_ISSUE",
    COLLECTION_MODIFY = "COLLECTION_MODIFY",
    COLLECTION_MINT = "COLLECTION_MINT",
    COLLECTION_BURN = "COLLECTION_BURN",
}

export class ItemTokenEvent implements TransactionEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
    ) {
    }

    eventName: string = "";
}


export class ItemFungibleTokenEvent extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenType: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "";
}

export class ItemNonFungibleTokenEvent extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenTypes: Set<string>,
        readonly tokenIndices: Set<string>,
    ) {
        super(msgIndex, contractId);
    }
}

export class CollectionAttribute {
    constructor(
        readonly key: string,
        readonly value: any,
    ) {
    }
}

export class EventCollectionCreated extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly name: string,
        readonly creatorAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionCreated";
}

export class EventCollectionModified extends ItemTokenEvent {
    constructor(
        readonly contractId: string,
        readonly tokenAttributes: Set<CollectionAttribute>,
        readonly modifierAddress: string,
        readonly msgIndex: number,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionModified";
}

export class EventCollectionFtBurned extends ItemFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenId: string,
        readonly amount: string,
        readonly fromAddress: string,
        readonly proxyAddress?: string,
    ) {
        super(msgIndex, contractId, TokenUtil.tokenTypeFrom(tokenId));
    }

    eventName: string = "EventCollectionFtBurned";
}

export class EventCollectionFtIssued extends ItemFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenType: string,
        readonly name: string,
        readonly amount: string,
        readonly decimals: number = 0,
        readonly issuerAddress: string,
        readonly receiverAddress: string,
    ) {
        super(msgIndex, contractId, tokenType);
    }

    eventName: string = "EventCollectionFtIssued";
}


export class EventCollectionFtMinted extends ItemFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenId: string,
        readonly amount: string,
        readonly toAddress: string,
        readonly minterAddress: string,
    ) {
        super(msgIndex, contractId, TokenUtil.tokenTypeFrom(tokenId));
    }

    eventName: string = "EventCollectionFtMinted";
}

export class EventCollectionFtModified extends ItemFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenAttributes: Set<CollectionAttribute>,
        readonly modifierAddress: string,
    ) {
        super(msgIndex, contractId, tokenType);
    }

    eventName: string = "EventCollectionFtModified";
}

export class EventCollectionFtTransferred extends ItemFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenId: string,
        readonly amount: string,
        readonly fromAddress: string,
        readonly toAddress: string,
        readonly proxyAddress?: string,
    ) {
        super(msgIndex, contractId, TokenUtil.tokenTypeFrom(tokenId));
    }

    eventName: string = "EventCollectionFtTransferred";
}


export class EventCollectionNftAttached extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly childTokenId: string,
        readonly parentTokenId: string,
        readonly holderAddress: string,
        readonly proxyAddress?: string
    ) {
        super(
            msgIndex,
            contractId,
            new Set([TokenUtil.tokenTypeFrom(childTokenId)]),
            new Set([TokenUtil.tokenIndexFrom(childTokenId)])
        );
    }

    eventName: string = "EventCollectionNftAttached";
}


export class EventCollectionNftBurned extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenIds: Set<string>,
        readonly fromAddress: string,
        readonly proxyAddress?: string,
    ) {
        super(
            msgIndex,
            contractId,
            TokenUtil.tokenTypes(tokenIds),
            TokenUtil.tokenIndices(tokenIds)
        );
    }

    eventName: string = "EventCollectionNftBurned";
}

export class EventCollectionNftDetached extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly exChildTokenId: string,
        readonly exParentTokenId: string,
        readonly holderAddress: string,
        readonly proxyAddress?: string
    ) {
        super(
            msgIndex,
            contractId,
            new Set([TokenUtil.tokenTypeFrom(exChildTokenId)]),
            new Set([TokenUtil.tokenIndexFrom(exChildTokenId)])
        );
    }

    eventName: string = "EventCollectionNftDetached";
}

export class EventCollectionNftHolderChanged extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenIds: Set<string>,
        readonly fromAddress: string,
        readonly toAddress: string,
    ) {
        super(
            msgIndex,
            contractId,
            TokenUtil.tokenTypes(tokenIds),
            TokenUtil.tokenIndices(tokenIds)
        );
    }

    eventName: string = "EventCollectionNftHolderChanged";
}

export class EventCollectionNftIssued extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenType: string,
        readonly issuerAddress: string,
    ) {
        super(msgIndex, contractId, new Set([tokenType]), EMPTY_SET);
    }

    eventName: string = "EventCollectionNftIssued";
}

export class EventCollectionNftMinted extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenIds: Set<string>,
        readonly toAddress: string,
        readonly minterAddress: string,
    ) {
        super(
            msgIndex,
            contractId,
            TokenUtil.tokenTypes(tokenIds),
            TokenUtil.tokenIndices(tokenIds)
        );
    }

    eventName: string = "EventCollectionNftMinted";
}

export class EventCollectionNftModified extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenId: string,
        readonly tokenAttributes: Set<CollectionAttribute>,
        readonly modifierAddress: string,
    ) {
        super(
            msgIndex,
            contractId,
            new Set([TokenUtil.tokenTypeFrom(tokenId)]),
            new Set([TokenUtil.tokenIndexFrom(tokenId)]));
    }

    eventName: string = "EventCollectionNftModified";
}

export class EventCollectionNftRootChanged extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenIds: Set<string>,
        readonly oldRootTokenId: string,
        readonly newRootTokenId: string,
    ) {
        super(
            msgIndex,
            contractId,
            TokenUtil.tokenTypes(tokenIds),
            TokenUtil.tokenIndices(tokenIds)
        );
    }

    eventName: string = "EventCollectionNftRootChanged";
}

export class EventCollectionNftTransferred extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenIds: Set<string>,
        readonly fromAddress: string,
        readonly toAddress: string,
        readonly proxyAddress?: string
    ) {
        super(
            msgIndex,
            contractId,
            TokenUtil.tokenTypes(tokenIds),
            TokenUtil.tokenIndices(tokenIds)
        );
    }

    eventName: string = "EventCollectionNftTransferred";

}

export class EventCollectionNftTypeModified extends ItemNonFungibleTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly tokenType: string,
        readonly tokenAttributes: Set<CollectionAttribute>,
        readonly modifierAddress: string,
    ) {
        super(msgIndex, contractId, new Set([tokenType]), EMPTY_SET);
    }

    eventName: string = "EventCollectionNftTypeModified";
}

export class EventCollectionPermissionGranted extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly permission: ItemTokenPermission,
        readonly granteeAddress: string,
        readonly granterAddress?: string
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionPermissionGranted";

}

export class EventCollectionPermissionRenounced extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly permission: ItemTokenPermission,
        readonly granteeAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionPermissionRenounced";
}

export class EventCollectionProxyApproved extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly approverAddress: string,
        readonly proxyAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionProxyApproved";
}

export class EventCollectionProxyDisapproved extends ItemTokenEvent {
    constructor(
        readonly msgIndex: number,
        readonly contractId: string,
        readonly approverAddress: string,
        readonly proxyAddress: string,
    ) {
        super(msgIndex, contractId);
    }

    eventName: string = "EventCollectionProxyDisapproved";
}
