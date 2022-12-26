export enum TxSuccessResult {
    SUCCEEDED, FAILED
}

export interface TransactionEvent {
    eventName: string;
}

export class TxMessage {
    constructor(
        readonly msgIndex: number,
        readonly requestType: string,
        readonly details: any,
    ) { }
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
    ) { }
}

export class TxResultSummary {
    constructor(
        readonly height: number,
        readonly txIndex: number,
        readonly txHash: string,
        readonly signers: Set<TxSigner>,
        readonly result: TxStatusResult,
    ) { }
}

export class TxResult {
    constructor(
        readonly summary: TxResultSummary,
        readonly txMessages: Set<TxMessage>,
        readonly txEvents: Set<TransactionEvent>,
    ) { }

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