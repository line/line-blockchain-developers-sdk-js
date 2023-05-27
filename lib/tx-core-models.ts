// noinspection JSUnusedGlobalSymbols

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
  ) {
  }

  readonly details: any = { }; // details are always empty.
}

export class TxStatusResult {
  constructor(
    readonly code: number = 0,
    readonly codeSpace: string = "",
  ) {
    if (this.code==0) {
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
    readonly signers: Array<TxSigner>,
    readonly result: TxStatusResult,
  ) {
  }
}

export class TxResult {
  constructor(
    readonly summary: TxResultSummary,
    readonly txMessages: Array<TxMessage>,
    readonly txEvents: Array<TransactionEvent>,
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
      "txEvents": [...this.txEvents],
    };
  }
}

// events
export class UnknownTransactionEvent implements TransactionEvent {
  constructor(
    readonly type: string,
    readonly attributes: Array<string>,
    readonly extraMessage: string,
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
    readonly msgIndex: number,
    readonly createdAddress: string,
  ) {
  }

  eventName: string = "EventAccountCreated";
}

export class EventEmptyMsgCreated implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly senderAddress: string,
  ) {
  }

  eventName: string = "EventEmptyMsgCreated";
}

// bank events
export class EventCoinTransferred implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly denomination: string,
    readonly amount: string,
    readonly fromAddress: string,
    readonly toAddress: string,
  ) {
  }

  eventName: string = "EventCoinTransferred";
}

export class EventTokenIssued implements TransactionEvent {
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

export class EventTokenMinted implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly amount: string,
    readonly minterAddress: string,
    readonly toAddress: string,
  ) {
  }

  eventName: string = "EventTokenMinted";
}

export class EventTokenBurned implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly amount: string,
    readonly fromAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventTokenBurned";
}

export class EventTokenModified implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly modifierAddress: string,
    readonly tokenAttributes: Array<TokenAttribute>,
  ) {
  }

  eventName: string = "EventTokenModified";
}

enum TokenPermission {
  UNDEFINED = "UNDEFINED",
  TOKEN_MODIFY = "TOKEN_MODIFY",
  TOKEN_MINT = "TOKEN_MINT",
  TOKEN_BURN = "TOKEN_BURN"
}

export class EventTokenPermissionGranted implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly permission: TokenPermission,
    readonly granteeAddress: string,
    readonly granterAddress: string,
  ) {
  }

  eventName: string = "EventTokenPermissionGranted";
}

export class EventTokenPermissionRenounced implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly permission: TokenPermission,
    readonly granteeAddress: string,
  ) {
  }

  eventName: string = "EventTokenPermissionRenounced";
}

export class EventTokenProxyApproved implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly approverAddress: string,
    readonly proxyAddress: string,
  ) {
  }

  eventName: string = "EventTokenProxyApproved";
}

export class EventTokenProxyDisapproved implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly approverAddress: TokenPermission,
    readonly proxyAddress: string,
  ) {
  }

  eventName: string = "EventTokenProxyDisapproved";
}

export class EventTokenTransferred implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly amount: string,
    readonly fromAddress: string,
    readonly toAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventTokenTransferred";
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

export class CollectionAttribute {
  constructor(
    readonly key: string,
    readonly value: any,
  ) {
  }
}

export class EventCollectionCreated implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly name: string,
    readonly creatorAddress: string,
  ) {
  }

  eventName: string = "EventCollectionCreated";
}

export class EventCollectionModified implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenAttributes: Array<CollectionAttribute>,
    readonly modifierAddress: string,
  ) {
  }

  eventName: string = "EventCollectionModified";
}

export class EventCollectionFtBurned implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly tokenId: string,
    readonly amount: string,
    readonly fromAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionFtBurned";
}

export class EventCollectionFtIssued implements TransactionEvent {
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
  }

  eventName: string = "EventCollectionFtIssued";
}

export class EventCollectionFtMinted implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly tokenId: string,
    readonly amount: string,
    readonly toAddress: string,
    readonly minterAddress: string,
  ) {
  }

  eventName: string = "EventCollectionFtMinted";
}

export class EventCollectionFtModified implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly tokenAttributes: Array<CollectionAttribute>,
    readonly modifierAddress: string,
  ) {
  }

  eventName: string = "EventCollectionFtModified";
}

export class EventCollectionFtTransferred implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly tokenId: string,
    readonly amount: string,
    readonly fromAddress: string,
    readonly toAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionFtTransferred";
}

export class EventCollectionNftAttached implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly childTokenId: string,
    readonly parentTokenId: string,
    readonly holderAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionNftAttached";
}

export class EventCollectionNftBurned implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenIds: Array<string>,
    readonly fromAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionNftBurned";
}

export class EventCollectionNftDetached implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly exChildTokenId: string,
    readonly exParentTokenId: string,
    readonly holderAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionNftDetached";
}

export class EventCollectionNftHolderChanged implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenIds: Array<string>,
    readonly fromAddress: string,
    readonly toAddress: string,
  ) {
  }

  eventName: string = "EventCollectionNftHolderChanged";
}

export class EventCollectionNftIssued implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly issuerAddress: string,
  ) {
  }

  eventName: string = "EventCollectionNftIssued";
}

export class EventCollectionNftMinted implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenIds: Array<string>,
    readonly toAddress: string,
    readonly minterAddress: string,
  ) {
  }

  eventName: string = "EventCollectionNftMinted";
}

export class EventCollectionNftModified implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenId: string,
    readonly tokenAttributes: Array<CollectionAttribute>,
    readonly modifierAddress: string,
  ) {
  }

  eventName: string = "EventCollectionNftModified";
}

export class EventCollectionNftRootChanged implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenIds: Array<string>,
    readonly oldRootTokenId: string,
    readonly newRootTokenId: string,
  ) {
  }

  eventName: string = "EventCollectionNftRootChanged";
}

export class EventCollectionNftTransferred implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenIds: Array<string>,
    readonly fromAddress: string,
    readonly toAddress: string,
    readonly proxyAddress: string = "",
  ) {
  }

  eventName: string = "EventCollectionNftTransferred";

}

export class EventCollectionNftTypeModified implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly tokenType: string,
    readonly tokenAttributes: Array<CollectionAttribute>,
    readonly modifierAddress: string,
  ) {
  }

  eventName: string = "EventCollectionNftTypeModified";
}

export class EventCollectionPermissionGranted implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly permission: ItemTokenPermission,
    readonly granteeAddress: string,
    readonly granterAddress?: string,
  ) {
  }

  eventName: string = "EventCollectionPermissionGranted";

}

export class EventCollectionPermissionRenounced implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly permission: ItemTokenPermission,
    readonly granteeAddress: string,
  ) {
  }

  eventName: string = "EventCollectionPermissionRenounced";
}

export class EventCollectionProxyApproved implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly approverAddress: string,
    readonly proxyAddress: string,
  ) {
  }

  eventName: string = "EventCollectionProxyApproved";
}

export class EventCollectionProxyDisapproved implements TransactionEvent {
  constructor(
    readonly msgIndex: number,
    readonly contractId: string,
    readonly approverAddress: string,
    readonly proxyAddress: string,
  ) {
  }

  eventName: string = "EventCollectionProxyDisapproved";
}
