import { Base64 } from "js-base64";
import _ from "lodash";
import { pubkeyToAddress } from "@cosmjs/amino";
export class RawTransactionResult {
    constructor(
        readonly height: number,
        readonly index: number,
        readonly code: number,
        readonly txhash: string,
        readonly timestamp: number,
        readonly gasWanted: number,
        readonly gasUsed: number,
        readonly logs: Array<RawTransactionLog>,
        readonly tx: RawTransactionRequest,
        readonly codespace?: string | null,
        readonly data?: string | null,
        readonly info?: string | null,
    ) { }
}

export class RawTransactionSignerAddressUtil {
    private constructor() { }

    public static getSignerAddresses(hrpPrefix: string, tx: RawTransactionRequest): Array<string> {
        let signerAddresses = _.map(tx.value.signatures, it => {
            return pubkeyToAddress(it.pubKey, hrpPrefix)
        });
        return signerAddresses
    }
}

export class RawTransactionLog {
    constructor(
        readonly msgIndex: number,
        readonly log: string = "",
        readonly events: Array<RawTransactionEvent>,
    ) { }
}

export class RawTransactionLogUtil {
    private constructor() { }

    public static findEvent(rawTransactionLog: RawTransactionLog, rawMessageEventKeyType: RawMessageEventKeyType): RawTransactionEvent {
        return _(rawTransactionLog.events).find(it => {
            return it.type === rawMessageEventKeyType.type || _(rawMessageEventKeyType.candidateEventName).includes(it.type)
        });
    }
}

export class RawTransactionEvent {
    constructor(
        readonly type: string,
        readonly attributes: Array<RawTransactionEventAttribute>,
    ) { }
}

export class RawTransactionEventUtil {

    private constructor() { }

    private static hasMatchedType(typeName: string) {
        return !_.head(_.filter(EventAttributeTypes.getAllTypes(), type => type.matches(typeName)));
    }

    public static findAttributeNotNull(
        rawTransactionEvent: RawTransactionEvent,
        attributeType: EventAttributeType,
        defaultValue: string
    ) {
        let foundAttributeValue = RawTransactionEventUtil.findAttributeOrNull(rawTransactionEvent, attributeType);
        if (foundAttributeValue) {
            return foundAttributeValue
        } else {
            return defaultValue
        }
    }

    public static findAttributeOrNull(
        rawTransactionEvent: RawTransactionEvent,
        attributeType: EventAttributeType,
    ) {
        let foundAttributeValue = _.head(_.filter(rawTransactionEvent.attributes, it => attributeType.matches(it.key)));
        if (foundAttributeValue) {
            return foundAttributeValue.value
        } else {
            return null;
        }
    }

    public static findAttribute(
        rawTransactionEvent: RawTransactionEvent,
        attributeType: EventAttributeType,
        defaultValue: string = ""
    ) {
        return RawTransactionEventUtil.findAttributeNotNull(rawTransactionEvent, attributeType, defaultValue);
    }

    public static attributesExclude(event: RawTransactionEvent, ...eventTypesToExclude: EventAttributeType[]): Set<RawTransactionEventAttribute> {
        let foundAttributes: RawTransactionEventAttribute[] = _.filter(event.attributes, attribute => {
            return _.findIndex(eventTypesToExclude, eventType => eventType.matches(attribute.key)) < 0
        });
        return new Set(foundAttributes);
    }
}

export class RawTransactionEventAttribute {
    constructor(
        readonly key: string,
        readonly value: string,
    ) { }
}

export class RawTransactionRequest {
    constructor(
        readonly type: string,
        readonly value: RawTransactionRequestValue,
    ) { }
}


export class RawTransactionRequestValue {
    constructor(
        readonly msg: Array<RawTransactionRequestMessage>,
        readonly fee: RawTransactionRequestFee,
        readonly memo: string = "",
        readonly signatures: Array<RawTxSignature>,
    ) { }
}

export class RawTxSignature {
    constructor(
        readonly pubKey: RawTransactionRequestPubKey,
        readonly signature: string,
    ) { }
}

export class RawTransactionRequestPubKey {
    constructor(
        readonly type: string,
        readonly value: string,
    ) { }
}

export class RawTransactionRequestMessage {
    constructor(
        readonly type: string,
        readonly value: any,
    ) { }
}

export class RawTransactionRequestFee {
    constructor(
        readonly gas: number = 0,
        readonly amount: Array<RawTransactionRequestAmount> = [],
    ) { }
}

export class RawTransactionRequestAmount {
    constructor(
        readonly denomination?: string,
        readonly amount?: string,
    ) { }
}

export type EventAttributeType = {
    names: Array<string>
    matches(attributeName: string): boolean
}

export class EventAttributeTypes {
    // type properties
    static Amount: EventAttributeType = {
        names: ["amount"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static From: EventAttributeType = {
        names: ["from"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Approver: EventAttributeType = {
        names: ["approver"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Sender: EventAttributeType = {
        names: ["sender"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static To: EventAttributeType = {
        names: ["sender"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Proxy: EventAttributeType = {
        names: ["proxy"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static TokenId: EventAttributeType = {
        names: ["tokenId", "token_id"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static ParentTokenId: EventAttributeType = {
        names: ["to_token_id", "toTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static ExParentTokenId: EventAttributeType = {
        names: ["from_token_id", "fromTokenId", "old_root_token_id", "oldRootTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static NewRootTokenId: EventAttributeType = {
        names: ["new_root_token_id", "new_rootTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static TokenType: EventAttributeType = {
        names: ["tokenType", "token_type"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static ContractId: EventAttributeType = {
        names: ["contractId", "contract_id"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static CreateAccountTarget: EventAttributeType = {
        names: ["create_account_target"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Recipient: EventAttributeType = {
        names: ["recipient"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Owner: EventAttributeType = {
        names: ["owner"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Name: EventAttributeType = {
        names: ["name"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Meta: EventAttributeType = {
        names: ["meta"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Symbol: EventAttributeType = {
        names: ["symbol"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    static Decimals: EventAttributeType = {
        names: ["decimals"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    public static getAllTypes() {
        return [
            EventAttributeTypes.Amount,
            EventAttributeTypes.Approver,
            EventAttributeTypes.ContractId,
            EventAttributeTypes.CreateAccountTarget,
            EventAttributeTypes.Decimals,
            EventAttributeTypes.ExParentTokenId,
            EventAttributeTypes.From,
            EventAttributeTypes.Meta,
            EventAttributeTypes.Name,
            EventAttributeTypes.NewRootTokenId,
            EventAttributeTypes.Owner,
            EventAttributeTypes.ParentTokenId
        ];
    }
}

export class EventAttributeUtil {
    private constructor() { }

    public static hasMatchedAttriute(names: Array<string>, matchedAttrName: string): boolean {
        return _.head(_.filter(names, it => it === matchedAttrName)) != null
    }
}

export type RawMessageEventKeyType = {
    name: string,
    type: string,
    eventName: string,
    candidateEventName: Array<string>
}

export class RawMessageEventKeyTypes {
    // types
    static AccountMsgCreateAccount: RawMessageEventKeyType = {
        name: "AccountMsgCreateAccount",
        type: "account/MsgCreateAccount",
        eventName: "create_account",
        candidateEventName: ["amount"]
    }

    static AccountMsgEmpty: RawMessageEventKeyType = {
        name: "AccountMsgEmpty",
        type: "account/MsgEmpty",
        eventName: "message",
        candidateEventName: []
    }

    // coin
    static CoinMsgSend: RawMessageEventKeyType = {
        name: "CoinMsgSend",
        type: "coin/MsgSend",
        eventName: "transfer",
        candidateEventName: []
    }

    // token
    static TokenMsgIssue: RawMessageEventKeyType = {
        name: "AccountMsgCreateAccount",
        type: "token/MsgIssue",
        eventName: "issue",
        candidateEventName: []
    }
    static TokenMsgMint: RawMessageEventKeyType = {
        name: "TokenMsgMint",
        type: "token/MsgMint",
        eventName: "mint",
        candidateEventName: []
    }
    static TokenMsgBurn: RawMessageEventKeyType = {
        name: "TokenMsgBurn",
        type: "token/MsgBurn",
        eventName: "burn",
        candidateEventName: []
    }
    static TokenMsgBurnFrom: RawMessageEventKeyType = {
        name: "TokenMsgBurnFrom",
        type: "token/MsgBurnFrom",
        eventName: "burn_from",
        candidateEventName: []
    }
    static TokenMsgTransfer: RawMessageEventKeyType = {
        name: "TokenMsgTransfer",
        type: "token/MsgTransfer",
        eventName: "transfer",
        candidateEventName: []
    }
    static TokenMsgTransferFrom: RawMessageEventKeyType = {
        name: "TokenMsgTransferFrom",
        type: "token/MsgTransferFrom",
        eventName: "transfer_from",
        candidateEventName: []
    }
    static TokenMsgModify: RawMessageEventKeyType = {
        name: "TokenMsgModify",
        type: "token/MsgModify",
        eventName: "modify_token",
        candidateEventName: []
    }
    static TokenMsgApprove: RawMessageEventKeyType = {
        name: "TokenMsgApprove",
        type: "token/MsgApprove",
        eventName: "approve_token",
        candidateEventName: []
    }
    static TokenMsgGrantPermission: RawMessageEventKeyType = {
        name: "TokenMsgGrantPermission",
        type: "token/MsgGrantPermission",
        eventName: "",
        candidateEventName: []
    }
    static TokenMsgRevokePermission: RawMessageEventKeyType = {
        name: "TokenMsgRevokePermission",
        type: "token/MsgRevokePermission",
        eventName: "", candidateEventName: []
    }

    // permission
    static GrantPermission: RawMessageEventKeyType = {
        name: "GrantPermission",
        type: "",
        eventName: "grant_perm",
        candidateEventName: []
    }

    // collection
    static CollectionMsgCreate: RawMessageEventKeyType = {
        name: "CollectionMsgCreate",
        type: "collection/MsgCreate",
        eventName: "create_collection",
        candidateEventName: []
    }
    static CollectionMsgIssueFT: RawMessageEventKeyType = {
        name: "CollectionMsgIssueFT",
        type: "collection/MsgIssueFT",
        eventName: "issue_ft",
        candidateEventName: []
    }
    static CollectionMsgIssueNFT: RawMessageEventKeyType = {
        name: "CollectionMsgIssueNFT",
        type: "collection/MsgIssueNFT",
        eventName: "issue_nft",
        candidateEventName: []
    }
    static CollectionMsgMintFT: RawMessageEventKeyType = {
        name: "CollectionMsgMintFT",
        type: "collection/MsgMintFT",
        eventName: "mint_ft",
        candidateEventName: []
    }
    static CollectionMsgMintNFT: RawMessageEventKeyType = {
        name: "CollectionMsgMintNFT",
        type: "collection/MsgMintNFT",
        eventName: "mint_nft",
        candidateEventName: []
    }
    static CollectionMsgBurnFT: RawMessageEventKeyType = {
        name: "CollectionMsgBurnFT",
        type: "collection/MsgBurnFT",
        eventName: "burn_ft",
        candidateEventName: []
    }
    static CollectionMsgBurnFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgBurnFTFrom",
        type: "collection/MsgBurnFTFrom",
        eventName: "burn_ft_from",
        candidateEventName: []
    }
    static CollectionMsgBurnNFT: RawMessageEventKeyType = {
        name: "CollectionMsgBurnNFT",
        type: "collection/MsgBurnNFT",
        eventName: "burn_nft",
        candidateEventName: []
    }
    static CollectionMsgBurnNFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgBurnNFTFrom",
        type: "collection/MsgBurnNFTFrom",
        eventName: "burn_nft_from",
        candidateEventName: []
    }
    static CollectionMsgTransferFT: RawMessageEventKeyType = {
        name: "CollectionMsgTransferFT",
        type: "collection/MsgTransferFT",
        eventName: "transfer_ft",
        candidateEventName: []
    }
    static CollectionMsgTransferFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgTransferFTFrom",
        type: "collection/MsgTransferFTFrom",
        eventName: "transfer_ft_from",
        candidateEventName: []
    }
    static CollectionMsgTransferNFT: RawMessageEventKeyType = {
        name: "CollectionMsgTransferNFT",
        type: "collection/MsgTransferNFT",
        eventName: "transfer_nft",
        candidateEventName: []
    }
    static CollectionMsgTransferNFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgTransferNFT",
        type: "collection/MsgTransferNFTFrom",
        eventName: "transfer_nft_from",
        candidateEventName: []
    }
    static CollectionMsgAttach: RawMessageEventKeyType = {
        name: "CollectionMsgAttach",
        type: "collection/MsgAttach",
        eventName: "attach",
        candidateEventName: []
    }
    static CollectionMsgAttachFrom: RawMessageEventKeyType = {
        name: "CollectionMsgAttachFrom",
        type: "collection/MsgAttachFrom",
        eventName: "attach_from",
        candidateEventName: []
    }
    static CollectionMsgDetach: RawMessageEventKeyType = {
        name: "CollectionMsgDetach",
        type: "collection/MsgDetach",
        eventName: "detach",
        candidateEventName: []
    }
    static CollectionMsgDetachFrom: RawMessageEventKeyType = {
        name: "CollectionMsgDetachFrom",
        type: "collection/MsgDetachFrom",
        eventName: "detach_from",
        candidateEventName: []
    }
    static CollectionMsgApprove: RawMessageEventKeyType = {
        name: "CollectionMsgApprove",
        type: "collection/MsgApprove",
        eventName: "approve_collection",
        candidateEventName: []
    }
    static CollectionMsgModify: RawMessageEventKeyType = {
        name: "CollectionMsgModify",
        type: "collection/MsgModify",
        eventName: "modify_collection",
        candidateEventName: ["modify_token", "modify_token_type"]
    }
    static CollectionMsgDisapprove: RawMessageEventKeyType = {
        name: "CollectionMsgDisapprove",
        type: "collection/MsgDisapprove",
        eventName: "disapprove_collection",
        candidateEventName: []
    }
    static CollectionMsgGrantPermission: RawMessageEventKeyType = {
        name: "CollectionMsgGrantPermission",
        type: "collection/MsgGrantPermission",
        eventName: "",
        candidateEventName: []
    }
    static CollectionMsgRevokePermission: RawMessageEventKeyType = {
        name: "CollectionMsgRevokePermission",
        type: "collection/MsgRevokePermission",
        eventName: "",
        candidateEventName: []
    }


    public static getAllType(): Array<RawMessageEventKeyType> {
        return [
            RawMessageEventKeyTypes.AccountMsgCreateAccount,
            RawMessageEventKeyTypes.AccountMsgEmpty,
            RawMessageEventKeyTypes.CoinMsgSend,
            RawMessageEventKeyTypes.TokenMsgIssue,
            RawMessageEventKeyTypes.TokenMsgMint,
            RawMessageEventKeyTypes.TokenMsgBurn,
            RawMessageEventKeyTypes.TokenMsgBurnFrom,
            RawMessageEventKeyTypes.TokenMsgTransfer,
            RawMessageEventKeyTypes.TokenMsgTransferFrom,
            RawMessageEventKeyTypes.TokenMsgModify,
            RawMessageEventKeyTypes.TokenMsgApprove,
            RawMessageEventKeyTypes.TokenMsgGrantPermission,
            RawMessageEventKeyTypes.TokenMsgRevokePermission,
            RawMessageEventKeyTypes.GrantPermission,
            RawMessageEventKeyTypes.CollectionMsgCreate,
            RawMessageEventKeyTypes.CollectionMsgIssueFT,
            RawMessageEventKeyTypes.CollectionMsgIssueNFT,
            RawMessageEventKeyTypes.CollectionMsgMintFT,
            RawMessageEventKeyTypes.CollectionMsgMintNFT,
            RawMessageEventKeyTypes.CollectionMsgBurnFT,
            RawMessageEventKeyTypes.CollectionMsgBurnFTFrom,
            RawMessageEventKeyTypes.CollectionMsgBurnNFT,
            RawMessageEventKeyTypes.CollectionMsgBurnNFTFrom,
            RawMessageEventKeyTypes.CollectionMsgTransferFT,
            RawMessageEventKeyTypes.CollectionMsgTransferFTFrom,
            RawMessageEventKeyTypes.CollectionMsgTransferNFT,
            RawMessageEventKeyTypes.CollectionMsgTransferNFTFrom,
            RawMessageEventKeyTypes.CollectionMsgAttach,
            RawMessageEventKeyTypes.CollectionMsgAttachFrom,
            RawMessageEventKeyTypes.CollectionMsgDetach,
            RawMessageEventKeyTypes.CollectionMsgDetachFrom,
            RawMessageEventKeyTypes.CollectionMsgApprove,
            RawMessageEventKeyTypes.CollectionMsgModify,
            RawMessageEventKeyTypes.CollectionMsgDisapprove,
            RawMessageEventKeyTypes.CollectionMsgGrantPermission,
            RawMessageEventKeyTypes.CollectionMsgRevokePermission
        ];
    }
}
export class RawMessageEventKeyTypeUtil {
    private constructor() { }

    public static convertToEventType(matchedTypeValue: string): RawMessageEventKeyType {
        return _.head(_.filter(RawMessageEventKeyTypes.getAllType(), it => it.type == matchedTypeValue))
    }
}
