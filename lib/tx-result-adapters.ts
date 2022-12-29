import _ from "lodash";
import { HrpPrefix } from "./constants";
import { TxResultResponse } from "./response";
import {
  RawTransactionResult,
  RawTransactionRequest,
  RawTransactionRequestFee,
  RawTransactionRequestMessage,
  RawTransactionRequestValue,
  RawTransactionRequestAmount,
  RawTxSignature,
  RawTransactionRequestPubKey,
  RawTransactionSignerAddressUtil,
  RawMessageEventKeyTypeUtil,
  RawTransactionLogUtil,
  RawMessageEventKeyType,
  RawTransactionEvent,
  RawTransactionLog,
} from "./tx-raw-models";
import {
  TransactionEvent,
  TxMessage,
  TxResult,
  TxResultSummary,
  TxSigner,
  TxStatusResult,
  UnknownTransactionEvent
} from "./tx-core-models";

export interface TxResultAdapter<T, R> {
  adapt(input: T): R
}

// TODO adapting to RawTransactionResult
export class V1JsonRawTransactionResultAdapter implements TxResultAdapter<string, RawTransactionResult> {
  public adapt(input: string): any {
    return JSON.parse(input)
  }
}

// TODO adapting to RawTransactionResult
export class RawTransactionResultAdapter implements TxResultAdapter<TxResultResponse, RawTransactionResult> {
  public adapt(input: TxResultResponse) {
    let txMessages = _(input.tx.value.msg).map(it => {
      return new RawTransactionRequestMessage(
        it.type,
        it.value
      )
    }).toArray;
    let txFeeAmounts = _(input.tx.value.fee.amount).map(it => {
      return new RawTransactionRequestAmount(
        it.denom,
        it.amount.toString()
      )
    }).toArray;
    let rawTxSignatures = _(input.tx.value.signatures).map(it => {
      return new RawTxSignature(
        new RawTransactionRequestPubKey(
          it.pubKey.type,
          it.pubKey.value
        ),
        it.signature
      )
    }).toArray
    let rawTransactionRequest: RawTransactionRequest = new RawTransactionRequest(
      input.tx.type,
      new RawTransactionRequestValue(
        _.toArray(txMessages),
        new RawTransactionRequestFee(
          input.tx.value.fee.gas,
          _.toArray(txFeeAmounts)
        ),
        input.tx.value.memo,
        _.toArray(rawTxSignatures)
      )
    )
    return new RawTransactionResult(
      input.height,
      input.index,
      input.code,
      input.txhash,
      input.timestamp,
      input.gasWanted,
      input.gasUsed,
      [],
      rawTransactionRequest,
      input.codespace,
      input.data,
      input.info
    );
  }
}

export class LbdTxResultAdapterV1 implements TxResultAdapter<RawTransactionResult, TxResult> {
  private txResultSummaryAdapter: TxResultAdapter<RawTransactionResult, TxResultSummary>;
  private txResultMessagesAdapter: TxResultAdapter<RawTransactionResult, Set<TxMessage>>;
  private txResultEventsAdapter: TxResultAdapter<RawTransactionResult, Set<TransactionEvent>>;

  constructor(
    readonly hrpPrefix: HrpPrefix,
    txResultSummaryAdapter?: TxResultAdapter<RawTransactionResult, TxResultSummary>,
    txResultMessagesAdapter?: TxResultAdapter<RawTransactionResult, Set<TxMessage>>,
    txResultEventsAdapter?: TxResultAdapter<RawTransactionResult, Set<TransactionEvent>>,
  ) {
    this.txResultSummaryAdapter = txResultSummaryAdapter ?? new LbdTxSummaryAdapterV1(hrpPrefix);
    this.txResultMessagesAdapter = txResultMessagesAdapter ?? new LbdTxMessageAdapterV1();
    this.txResultEventsAdapter = txResultEventsAdapter ?? new LbdTxEventsAdapterV1();
  }

  adapt(input: RawTransactionResult): TxResult {
    console.log(input);
    let txResultSummary = this.txResultSummaryAdapter.adapt(input);
    let txResultMessages = this.txResultMessagesAdapter.adapt(input);
    let txResultEvents = this.txResultEventsAdapter.adapt(input);

    return new TxResult(
      txResultSummary,
      txResultMessages,
      txResultEvents
    )
  }
}

export class LbdTxSummaryAdapterV1 implements TxResultAdapter<RawTransactionResult, TxResultSummary> {
  constructor(readonly hrpPrefix: HrpPrefix) {
  }

  adapt(input: RawTransactionResult): TxResultSummary {
    let signerAddresses = RawTransactionSignerAddressUtil.getSignerAddresses(this.hrpPrefix, input.tx);
    let signers = _.map(signerAddresses, it => {
      return new TxSigner(it)
    })
    return new TxResultSummary(
      input.height,
      input.index,
      input.txhash,
      new Set(signers),
      new TxStatusResult(
        input.code,
        input.codespace
      )
    )
  }
}

export class LbdTxMessageAdapterV1 implements TxResultAdapter<RawTransactionResult, Set<TxMessage>> {
  adapt(input: RawTransactionResult): Set<TxMessage> {
    let tx = input.tx;
    let rawMessages = tx.value.msg;
    let txMessages = _.map(rawMessages, (rawMessage, index) => {
      let type = rawMessage.type;
      return new TxMessage(index, type, rawMessage.value);
    });
    return new Set(txMessages)
  }
}

export class LbdTxEventsAdapterV1 implements TxResultAdapter<RawTransactionResult, Set<TransactionEvent>> {
  txEVentConverter: LbdTxEventConverterV1;

  constructor() {
    this.txEVentConverter = new LbdTxEventConverterV1();
  }

  adapt(input: RawTransactionResult): Set<TransactionEvent> {
    let logs = input.logs;

    if (input.code !== 0 || _(logs).isEmpty()) {
      // TODO create const empty
      console.warn("tx-result logs is empty");
      return new Set();
    } else {
      let events = _.flatMap(logs, log => {
        let msgIndex = log.msgIndex;
        let eventType = RawMessageEventKeyTypeUtil.convertToEventType(input.tx.value.msg[msgIndex].type);
        let event = RawTransactionLogUtil.findEvent(log, eventType);
        if (!event) {
          return [this.unknownTransactionEvent(eventType.name)];
        } else {
          return this.resolveTransactionEvents(eventType, event, log);
        }
      });
      return new Set(events);
    }
  }

  private resolveTransactionEvents(
    eventType: RawMessageEventKeyType,
    event: RawTransactionEvent,
    log: RawTransactionLog,
  ): Array<TransactionEvent> {
    console.log("eventType", eventType);
    console.log("event", event);
    console.log("log", log);
    // TODO resolving events
    return [];
  }

  private unknownTransactionEvent(type: string, extraMessage?: string): UnknownTransactionEvent {
    return new UnknownTransactionEvent(type, [], extraMessage)
  }

}

export class LbdTxEventConverterV1 {
  constructor() {
  }

  // TOOD add convertings of events
}
