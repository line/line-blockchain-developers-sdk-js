import _ from "lodash";
import { HrpPrefix } from "./constants";
import { LogResponse, TxResultResponse } from "./response";
import {
  EventAttributeTypes,
  RawMessageEventKeyType,
  RawMessageEventKeyTypes,
  RawMessageEventKeyTypeUtil,
  RawTransactionEvent,
  RawTransactionEventAttribute,
  RawTransactionEventUtil,
  RawTransactionLog,
  RawTransactionLogUtil,
  RawTransactionRequest,
  RawTransactionRequestAmount,
  RawTransactionRequestFee,
  RawTransactionRequestMessage,
  RawTransactionRequestPubKey,
  RawTransactionRequestValue,
  RawTransactionResult,
  RawTransactionSignerAddressUtil,
  RawTxSignature,
} from "./tx-raw-models";

import {
  CollectionAttribute,
  EventAccountCreated,
  EventCoinTransferred,
  EventCollectionCreated,
  EventCollectionFtBurned,
  EventCollectionFtIssued,
  EventCollectionFtMinted,
  EventCollectionFtModified,
  EventCollectionFtTransferred,
  EventCollectionModified,
  EventCollectionNftAttached,
  EventCollectionNftBurned,
  EventCollectionNftDetached,
  EventCollectionNftHolderChanged,
  EventCollectionNftIssued,
  EventCollectionNftMinted,
  EventCollectionNftModified,
  EventCollectionNftRootChanged,
  EventCollectionNftTransferred,
  EventCollectionNftTypeModified,
  EventCollectionProxyApproved,
  EventCollectionProxyDisapproved,
  EventEmptyMsgCreated,
  EventTokenBurned,
  EventTokenIssued,
  EventTokenMinted,
  EventTokenModified,
  EventTokenProxyApproved,
  EventTokenTransferred,
  TokenAttribute,
  TransactionEvent,
  TxMessage,
  TxResult,
  TxResultSummary,
  TxSigner,
  TxStatusResult,
  UnknownTransactionEvent,
} from "./tx-core-models";
import { StringUtil } from "./string-util";
import { TokenUtil } from "./token-util";

export const EMPTY_TX_EVENTS: Array<TransactionEvent> = [];

export interface TxResultAdapter<T, R> {
  adapt(input: T): R;
}

// TODO adapting to RawTransactionResult
export class V1JsonRawTransactionResultAdapter implements TxResultAdapter<string, RawTransactionResult> {
  public adapt(input: string): any {
    return JSON.parse(input);
  }
}

// TODO adapting to RawTransactionResult
export class RawTransactionResultAdapter implements TxResultAdapter<TxResultResponse, RawTransactionResult> {
  public adapt(input: TxResultResponse) {
    let txMessages = _.map(input.tx.value.msg, it => {
      return new RawTransactionRequestMessage(it.type, it.value);
    });
    let txFeeAmounts = _.map(input.tx.value.fee.amount, it => {
      return new RawTransactionRequestAmount(it.denom, it.amount.toString());
    });
    let rawTxSignatures = _.map(input.tx.value.signatures, it => {
      return new RawTxSignature(new RawTransactionRequestPubKey(it.pubKey.type, it.pubKey.value), it.signature);
    });
    let rawTransactionRequest: RawTransactionRequest = new RawTransactionRequest(
      input.tx.type,
      new RawTransactionRequestValue(
        txMessages,
        new RawTransactionRequestFee(input.tx.value.fee.gas, txFeeAmounts),
        input.tx.value.memo,
        rawTxSignatures,
      ),
    );
    let rawTransactionLogs = _.map(input.logs, log => {
      return new RawTransactionLog(log.msgIndex, log.log, this.extractEvents(log));
    });
    return new RawTransactionResult(
      input.height,
      input.index,
      input.code,
      input.txhash,
      input.timestamp,
      input.gasWanted || 0,
      input.gasUsed,
      rawTransactionLogs,
      rawTransactionRequest,
      input.codespace,
      input.data,
      input.info,
    );
  }

  private extractEvents(log: LogResponse): Array<RawTransactionEvent> {
    return _.map(log.events, event => {
      return new RawTransactionEvent(
        event.type,
        _.map(event.attributes, att => {
          return new RawTransactionEventAttribute(att.key, att.value);
        }),
      );
    });
  }
}

export class LbdTxResultAdapterV1 implements TxResultAdapter<RawTransactionResult, TxResult> {
  private txResultSummaryAdapter: TxResultAdapter<RawTransactionResult, TxResultSummary>;
  private txResultMessagesAdapter: TxResultAdapter<RawTransactionResult, Array<TxMessage>>;
  private txResultEventsAdapter: TxResultAdapter<RawTransactionResult, Array<TransactionEvent>>;

  constructor(
    readonly hrpPrefix: HrpPrefix,
    txResultSummaryAdapter?: TxResultAdapter<RawTransactionResult, TxResultSummary>,
    txResultMessagesAdapter?: TxResultAdapter<RawTransactionResult, Array<TxMessage>>,
    txResultEventsAdapter?: TxResultAdapter<RawTransactionResult, Array<TransactionEvent>>,
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

    return new TxResult(txResultSummary, txResultMessages, txResultEvents);
  }
}

export class LbdTxSummaryAdapterV1 implements TxResultAdapter<RawTransactionResult, TxResultSummary> {
  constructor(readonly hrpPrefix: HrpPrefix) {}

  adapt(input: RawTransactionResult): TxResultSummary {
    let signerAddresses = RawTransactionSignerAddressUtil.getSignerAddresses(this.hrpPrefix, input.tx);
    let signers = _.map(signerAddresses, it => {
      return new TxSigner(it);
    });
    return new TxResultSummary(
      input.height,
      input.index,
      input.txhash,
      signers,
      new TxStatusResult(input.code),
    );
  }
}

export class LbdTxMessageAdapterV1 implements TxResultAdapter<RawTransactionResult, Array<TxMessage>> {
  adapt(input: RawTransactionResult): Array<TxMessage> {
    let tx = input.tx;
    let rawMessages = tx.value.msg;
    let txMessages = _.map(rawMessages, (rawMessage, index) => {
      let type = rawMessage.type;
      return new TxMessage(index, type);
    });
    return txMessages;
  }
}

export class LbdTxEventsAdapterV1 implements TxResultAdapter<RawTransactionResult, Array<TransactionEvent>> {
  txEVentConverter: LbdTxEventConverterV1;

  constructor() {
    this.txEVentConverter = new LbdTxEventConverterV1();
  }

  adapt(input: RawTransactionResult): Array<TransactionEvent> {
    let logs = input.logs;

    if (input.code !== 0 || _(logs).isEmpty()) {
      return EMPTY_TX_EVENTS;
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
      return events;
    }
  }

  private resolveTransactionEvents(
    eventType: RawMessageEventKeyType,
    event: RawTransactionEvent,
    log: RawTransactionLog,
  ): ReadonlyArray<TransactionEvent> {
    switch (eventType) {
      // account
      case RawMessageEventKeyTypes.AccountMsgCreateAccount:
        return [this.txEVentConverter.accountCreated(log.msgIndex, event)];
      case RawMessageEventKeyTypes.AccountMsgEmpty:
        return [this.txEVentConverter.emptyMsgCreated(log.msgIndex, event)];

      // coin
      case RawMessageEventKeyTypes.CoinMsgSend:
        return [this.txEVentConverter.coinTransferred(log.msgIndex, event)];

      // token
      case RawMessageEventKeyTypes.TokenMsgIssue:
        return [this.txEVentConverter.tokenIssued(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgMint:
        return [this.txEVentConverter.tokenMinted(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgBurn:
        return [this.txEVentConverter.tokenBurned(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgBurnFrom:
        return [this.txEVentConverter.tokenBurned(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgModify: {
        let messageEvent = _.find(log.events, it => it.type == "message");
        if (!messageEvent) {
          throw new Error("Cannot find message from events.")
        }
        return [this.txEVentConverter.tokenModified(log.msgIndex, messageEvent, event)];
      }
      case RawMessageEventKeyTypes.TokenMsgTransfer:
        return [this.txEVentConverter.tokenTransferred(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgTransferFrom:
        return [this.txEVentConverter.tokenTransferred(log.msgIndex, event)];
      case RawMessageEventKeyTypes.TokenMsgApprove:
        return [this.txEVentConverter.tokenProxyApproved(log.msgIndex, event)];

      // collection
      case RawMessageEventKeyTypes.CollectionMsgCreate: {
        let eventGrantPermission = RawTransactionLogUtil.findEvent(log, RawMessageEventKeyTypes.GrantPermission);
        return [this.txEVentConverter.collectionCreated(log.msgIndex, event, eventGrantPermission)];
      }
      case RawMessageEventKeyTypes.CollectionMsgIssueFT:
        return [this.txEVentConverter.collectionFtIssued(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgIssueNFT: {
        let messageEvent = _.find(log.events, it => it.type == "message");
        if (!messageEvent) {
          throw new Error("Cannot find message from events.")
        }
        let senderAddress = RawTransactionEventUtil.findAttribute(messageEvent, EventAttributeTypes.Sender);
        return [this.txEVentConverter.collectionNftIssued(log.msgIndex, event, senderAddress)];
      }
      case RawMessageEventKeyTypes.CollectionMsgMintFT:
        return [this.txEVentConverter.collectionFtMinted(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgMintNFT:
        return [this.txEVentConverter.collectionNftMinted(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgBurnFT:
        return [this.txEVentConverter.collectionFtBurned(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgBurnFTFrom:
        return [this.txEVentConverter.collectionFtBurned(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgBurnNFT: {
        let eventOperationBurnNft = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationBurnNFT,
        );
        return [this.txEVentConverter.collectionNftBurned(log.msgIndex, event, eventOperationBurnNft)];
      }
      case RawMessageEventKeyTypes.CollectionMsgBurnNFTFrom: {
        let eventOperationBurnNft = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationBurnNFT,
        );
        return [this.txEVentConverter.collectionNftBurned(log.msgIndex, event, eventOperationBurnNft)];
      }
      case RawMessageEventKeyTypes.CollectionMsgModify: {
        let messageEvent = _.find(log.events, it => it.type == "message");
        if (!messageEvent) {
          throw new Error("Cannot find message from events.")
        }
        let senderAddress = RawTransactionEventUtil.findAttribute(messageEvent, EventAttributeTypes.Sender);
        return [this.txEVentConverter.collectionModified(log.msgIndex, event, senderAddress)];
      }
      case RawMessageEventKeyTypes.CollectionMsgTransferFT:
        return [this.txEVentConverter.collectionFtTransferred(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgTransferFTFrom:
        return [this.txEVentConverter.collectionFtTransferred(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgTransferNFT: {
        let eventOperationTransferNFT = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationTransferNFT,
        );
        return [
          this.txEVentConverter.collectionNftTransferred(log.msgIndex, event),
          this.txEVentConverter.collectionNftHolderChanged(log.msgIndex, event, eventOperationTransferNFT),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgTransferNFTFrom: {
        let eventOperationTransferNFT = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationTransferNFT,
        );
        return [
          this.txEVentConverter.collectionNftTransferred(log.msgIndex, event),
          this.txEVentConverter.collectionNftHolderChanged(log.msgIndex, event, eventOperationTransferNFT),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgAttach: {
        let eventOperationRootChanged = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationRootChanged,
        );
        return [
          this.txEVentConverter.collectionNftAttached(log.msgIndex, event),
          this.txEVentConverter.collectionNftRootChanged(log.msgIndex, event, eventOperationRootChanged),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgAttachFrom: {
        let eventOperationRootChanged = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationRootChanged,
        );
        return [
          this.txEVentConverter.collectionNftAttached(log.msgIndex, event),
          this.txEVentConverter.collectionNftRootChanged(log.msgIndex, event, eventOperationRootChanged),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgDetach: {
        let eventOperationRootChanged = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationRootChanged,
        );
        return [
          this.txEVentConverter.collectionNftDetached(log.msgIndex, event),
          this.txEVentConverter.collectionNftRootChanged(log.msgIndex, event, eventOperationRootChanged),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgDetachFrom: {
        let eventOperationRootChanged = RawTransactionLogUtil.findEvent(
          log,
          RawMessageEventKeyTypes.CollectionOperationRootChanged,
        );
        return [
          this.txEVentConverter.collectionNftDetached(log.msgIndex, event),
          this.txEVentConverter.collectionNftRootChanged(log.msgIndex, event, eventOperationRootChanged),
        ];
      }
      case RawMessageEventKeyTypes.CollectionMsgApprove:
        return [this.txEVentConverter.collectionProxyApproved(log.msgIndex, event)];
      case RawMessageEventKeyTypes.CollectionMsgDisapprove:
        return [this.txEVentConverter.collectionProxyDisapproved(log.msgIndex, event)];
      default:
        return [];
    }
  }

  private unknownTransactionEvent(type: string, extraMessage?: string): UnknownTransactionEvent {
    return new UnknownTransactionEvent(type, [], extraMessage);
  }
}

export class LbdTxEventConverterV1 {
  constructor() {}

  public accountCreated(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let createdAccountAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.CreateAccountTarget);
    return new EventAccountCreated(msgIndex, createdAccountAddress);
  }

  public emptyMsgCreated(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let senderAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Sender);
    return new EventEmptyMsgCreated(msgIndex, senderAddress);
  }

  public coinTransferred(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let denomAmount = StringUtil.parseAmount(amount);
    let senderAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Sender);
    let recipientAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Recipient);
    return new EventCoinTransferred(
      msgIndex,
      denomAmount.denomination,
      denomAmount.amount,
      senderAddress,
      recipientAddress,
    );
  }

  public tokenIssued(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let issuerAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Owner);
    let name = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Name);
    let symbol = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Symbol);
    let receiverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let decimals = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Decimals);
    return new EventTokenIssued(
      msgIndex,
      contractId,
      issuerAddress,
      receiverAddress,
      name,
      symbol,
      Number.parseInt(decimals),
      amount,
    );
  }

  public tokenMinted(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let minterAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);

    return new EventTokenMinted(msgIndex, contractId, amount, minterAddress, toAddress);
  }

  public tokenBurned(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);

    return new EventTokenBurned(msgIndex, contractId, amount, fromAddress, proxyAddress);
  }

  public tokenModified(
    msgIndex: number,
    emptyMessageEvent: RawTransactionEvent,
    event: RawTransactionEvent,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let modifierAddress = RawTransactionEventUtil.findAttribute(emptyMessageEvent, EventAttributeTypes.Sender);
    let rawModifiedAttributes = RawTransactionEventUtil.attributesExclude(event, EventAttributeTypes.ContractId);
    let tokenAttributes = _.map([...rawModifiedAttributes]).map(it => {
      return new TokenAttribute(it.key, it.value);
    });

    return new EventTokenModified(msgIndex, contractId, modifierAddress, tokenAttributes);
  }

  public tokenTransferred(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let receiverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventTokenTransferred(msgIndex, contractId, amount, fromAddress, receiverAddress, proxyAddress);
  }

  public tokenProxyApproved(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let approverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Approver);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventTokenProxyApproved(msgIndex, contractId, approverAddress, proxyAddress);
  }

  public collectionCreated(
    msgIndex: number,
    eventCollectionCreated: RawTransactionEvent,
    eventGrantPerm?: RawTransactionEvent,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(eventCollectionCreated, EventAttributeTypes.ContractId);
    let name = RawTransactionEventUtil.findAttribute(eventCollectionCreated, EventAttributeTypes.Name);
    let creatorAddress = eventGrantPerm ? RawTransactionEventUtil.findAttributeOrNull(eventGrantPerm, EventAttributeTypes.To) : null;
    if (!creatorAddress || creatorAddress === "") {
      creatorAddress = RawTransactionEventUtil.findAttribute(eventCollectionCreated, EventAttributeTypes.Owner);
    }
    return new EventCollectionCreated(msgIndex, contractId, name, creatorAddress);
  }

  public collectionFtBurned(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let tokenIdAmount = StringUtil.parseTokenIdAmount(amount);
    let tokenId = tokenIdAmount.tokenId;
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventCollectionFtBurned(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenId),
      tokenId,
      tokenIdAmount.amount,
      fromAddress,
      proxyAddress,
    );
  }

  public collectionFtIssued(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let name = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Name);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    let decimals = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Decimals);
    let issuerAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Owner);
    let receiverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);

    let meta = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Meta);

    let mintable = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Mintable);

    return new EventCollectionFtIssued(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenId),
      name,
      amount,
      Number.parseInt(decimals),
      issuerAddress,
      receiverAddress,
      meta,
      Boolean(mintable),
    );
  }

  public collectionFtMinted(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let tokenIdAmount = StringUtil.parseTokenIdAmount(amount);
    let tokenId = tokenIdAmount.tokenId;

    let minterAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);

    return new EventCollectionFtMinted(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenId),
      tokenId,
      tokenIdAmount.amount,
      toAddress,
      minterAddress,
    );
  }

  public collectionFtTransferred(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);
    let amount = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Amount);
    let tokenIdAmount = StringUtil.parseTokenIdAmount(amount);
    let tokenId = tokenIdAmount.tokenId;
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventCollectionFtTransferred(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenId),
      tokenId,
      tokenIdAmount.amount,
      fromAddress,
      toAddress,
      proxyAddress,
    );
  }

  public collectionFtModified(msgIndex: number, event: RawTransactionEvent, senderAddress: string): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    let modifierAddress = senderAddress;
    let rawTokenAttributes = RawTransactionEventUtil.attributesExclude(
      event,
      EventAttributeTypes.ContractId,
      EventAttributeTypes.TokenId,
    );
    let tokenAttributes = _.map([...rawTokenAttributes]).map(it => {
      return new CollectionAttribute(it.key, it.value);
    });

    return new EventCollectionFtModified(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenId),
      tokenAttributes,
      modifierAddress,
    );
  }

  public collectionNftTypeModified(
    msgIndex: number,
    event: RawTransactionEvent,
    senderAddress: string,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenType);
    if (!tokenType || StringUtil.isBlank(tokenType)) {
      let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
      tokenType = TokenUtil.tokenTypeFrom(tokenId);
    }
    let modifierAddress = senderAddress;
    let rawTokenAttributes = RawTransactionEventUtil.attributesExclude(
      event,
      EventAttributeTypes.ContractId,
      EventAttributeTypes.TokenType,
      EventAttributeTypes.TokenId,
    );
    let tokenAttributes = _.map([...rawTokenAttributes]).map(it => {
      return new CollectionAttribute(it.key, it.value);
    });

    return new EventCollectionNftTypeModified(
      msgIndex,
      contractId,
      TokenUtil.tokenTypeFrom(tokenType),
      tokenAttributes,
      modifierAddress,
    );
  }

  public collectionNftModified(msgIndex: number, event: RawTransactionEvent, senderAddress: string): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    let modifierAddress = senderAddress;
    let rawTokenAttributes = RawTransactionEventUtil.attributesExclude(
      event,
      EventAttributeTypes.ContractId,
      EventAttributeTypes.TokenId,
    );
    let tokenAttributes = _.map([...rawTokenAttributes]).map(it => {
      return new CollectionAttribute(it.key, it.value);
    });

    return new EventCollectionNftModified(msgIndex, contractId, tokenId, tokenAttributes, modifierAddress);
  }

  public collectionModified(msgIndex: number, event: RawTransactionEvent, senderAddress: string): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenType);
    if (StringUtil.isBlank(tokenType)) {
      tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    }
    let isFungible = tokenType.startsWith("0");
    let modifierAddress = senderAddress;

    if (event.type === "modify_collection") {
      let rawTokenAttributes = RawTransactionEventUtil.attributesExclude(event, EventAttributeTypes.ContractId);
      let tokenAttributes = _.map([...rawTokenAttributes]).map(it => {
        return new CollectionAttribute(it.key, it.value);
      });
      return new EventCollectionModified(msgIndex, contractId, tokenAttributes, modifierAddress);
    } else if (event.type === "modify_token_type") {
      return this.collectionNftTypeModified(msgIndex, event, modifierAddress);
    } else if (isFungible) {
      return this.collectionFtModified(msgIndex, event, modifierAddress);
    } else {
      return this.collectionNftModified(msgIndex, event, modifierAddress);
    }
  }

  public collectionNftBurned(
    msgIndex: number,
    eventBurnNft: RawTransactionEvent,
    eventOperationBurnNft?: RawTransactionEvent,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(eventBurnNft, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(eventBurnNft, EventAttributeTypes.From);
    let proxyAddress = RawTransactionEventUtil.findAttribute(eventBurnNft, EventAttributeTypes.Proxy);
    let tokenIds: string[] = [];
    if (eventOperationBurnNft) {
      tokenIds = RawTransactionEventUtil.findAttributes(eventOperationBurnNft, EventAttributeTypes.TokenId);
    }

    return new EventCollectionNftBurned(msgIndex, contractId, tokenIds, fromAddress, proxyAddress);
  }

  public collectionNftAttached(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);
    let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    let parentTokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ParentTokenId);

    return new EventCollectionNftAttached(msgIndex, contractId, tokenId, parentTokenId, fromAddress, proxyAddress);
  }

  public collectionNftDetached(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);
    let tokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenId);
    let parentTokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ExParentTokenId);

    return new EventCollectionNftDetached(msgIndex, contractId, tokenId, parentTokenId, fromAddress, proxyAddress);
  }

  public collectionNftRootChanged(
    msgIndex: number,
    event: RawTransactionEvent,
    eventOperationRootChanged?: RawTransactionEvent,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenType);
    let oldRootTokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ExParentTokenId);
    let newRootTokenId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.NewRootTokenId);
    let tokenIds: string[] = [];
    if (eventOperationRootChanged) {
      tokenIds = RawTransactionEventUtil.findAttributes(eventOperationRootChanged, EventAttributeTypes.TokenId);
    }

    return new EventCollectionNftRootChanged(msgIndex, contractId, tokenIds, oldRootTokenId, newRootTokenId);
  }

  public collectionNftTransferred(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);
    let tokenIds: string[] = [];
    if (event) {
      tokenIds = RawTransactionEventUtil.findAttributes(event, EventAttributeTypes.TokenId);
    }
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventCollectionNftTransferred(msgIndex, contractId, tokenIds, fromAddress, toAddress, proxyAddress);
  }

  public collectionNftHolderChanged(
    msgIndex: number,
    eventTransferNFT: RawTransactionEvent,
    eventOperationTransferNft?: RawTransactionEvent,
  ): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(eventTransferNFT, EventAttributeTypes.ContractId);
    let fromAddress = RawTransactionEventUtil.findAttribute(eventTransferNFT, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(eventTransferNFT, EventAttributeTypes.To);
    let tokenIds: string[] = [];
    if (eventOperationTransferNft) {
      tokenIds = RawTransactionEventUtil.findAttributes(eventOperationTransferNft, EventAttributeTypes.TokenId);
    }

    return new EventCollectionNftHolderChanged(msgIndex, contractId, tokenIds, fromAddress, toAddress);
  }

  public collectionNftIssued(msgIndex: number, event: RawTransactionEvent, issuerAddress: string): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenType);

    return new EventCollectionNftIssued(msgIndex, contractId, tokenType, issuerAddress);
  }

  public collectionNftMinted(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let tokenType = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.TokenType);
    let tokenIds = RawTransactionEventUtil.findAttributes(event, EventAttributeTypes.TokenId);
    let minterAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.From);
    let toAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.To);

    return new EventCollectionNftMinted(msgIndex, contractId, tokenIds, toAddress, minterAddress);
  }

  public collectionProxyApproved(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let approverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Approver);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventCollectionProxyApproved(msgIndex, contractId, approverAddress, proxyAddress);
  }

  public collectionProxyDisapproved(msgIndex: number, event: RawTransactionEvent): TransactionEvent {
    let contractId = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.ContractId);
    let approverAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Approver);
    let proxyAddress = RawTransactionEventUtil.findAttribute(event, EventAttributeTypes.Proxy);

    return new EventCollectionProxyDisapproved(msgIndex, contractId, approverAddress, proxyAddress);
  }
}
