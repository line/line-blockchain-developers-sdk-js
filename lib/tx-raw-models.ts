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

    public static findAttributeNotNull(
        rawTransactionEvent: RawTransactionEvent,
        attributeType: EventAttributeType,
        defaultValue: String
    ) {
        let foundAttributeValue = _.head(_.filter(rawTransactionEvent.attributes, it => attributeType.matches(it.key)));
        if (foundAttributeValue) {
            return foundAttributeValue.value
        } else {
            return defaultValue
        }
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
    private static instance: EventAttributeTypes

    private constructor() { }

    public static getInstance() {
        if (!EventAttributeTypes.instance) {
            EventAttributeTypes.instance = new EventAttributeTypes();
        }
        return EventAttributeTypes.instance;
    }

    // type properties
    Amount: EventAttributeType = {
        names: ["amount"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    From: EventAttributeType = {
        names: ["from"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Approver: EventAttributeType = {
        names: ["approver"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Sender: EventAttributeType = {
        names: ["sender"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    To: EventAttributeType = {
        names: ["sender"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Proxy: EventAttributeType = {
        names: ["proxy"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    TokenId: EventAttributeType = {
        names: ["tokenId", "token_id"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    ParentTokenId: EventAttributeType = {
        names: ["to_token_id", "toTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    ExParentTokenId: EventAttributeType = {
        names: ["from_token_id", "fromTokenId", "old_root_token_id", "oldRootTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    NewRootTokenId: EventAttributeType = {
        names: ["new_root_token_id", "new_rootTokenId"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    TokenType: EventAttributeType = {
        names: ["tokenType", "token_type"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    ContractId: EventAttributeType = {
        names: ["contractId", "contract_id"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    CreateAccountTarget: EventAttributeType = {
        names: ["create_account_target"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Recipient: EventAttributeType = {
        names: ["recipient"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Owner: EventAttributeType = {
        names: ["owner"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Name: EventAttributeType = {
        names: ["name"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Meta: EventAttributeType = {
        names: ["meta"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Symbol: EventAttributeType = {
        names: ["symbol"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
    }

    Decimals: EventAttributeType = {
        names: ["decimals"],
        matches(attributeName: string): boolean {
            return EventAttributeUtil.hasMatchedAttriute(this.names, attributeName);
        }
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
    private static instance: RawMessageEventKeyTypes

    private constructor() { }

    public static getInstance() {
        if (!RawMessageEventKeyTypes.instance) {
            RawMessageEventKeyTypes.instance = new RawMessageEventKeyTypes();
        }
        return RawMessageEventKeyTypes.instance;
    }

    // types 
    AccountMsgCreateAccount: RawMessageEventKeyType = {
        name: "AccountMsgCreateAccount",
        type: "account/MsgCreateAccount",
        eventName: "create_account",
        candidateEventName: ["amount"]
    }

    AccountMsgEmpty: RawMessageEventKeyType = {
        name: "AccountMsgEmpty",
        type: "account/MsgEmpty",
        eventName: "message",
        candidateEventName: []
    }

    // coin
    CoinMsgSend: RawMessageEventKeyType = {
        name: "CoinMsgSend",
        type: "coin/MsgSend",
        eventName: "transfer",
        candidateEventName: []
    }

    // token
    TokenMsgIssue: RawMessageEventKeyType = {
        name: "AccountMsgCreateAccount",
        type: "token/MsgIssue",
        eventName: "issue",
        candidateEventName: []
    }
    TokenMsgMint: RawMessageEventKeyType = {
        name: "TokenMsgMint",
        type: "token/MsgMint",
        eventName: "mint",
        candidateEventName: []
    }
    TokenMsgBurn: RawMessageEventKeyType = {
        name: "TokenMsgBurn",
        type: "token/MsgBurn",
        eventName: "burn",
        candidateEventName: []
    }
    TokenMsgBurnFrom: RawMessageEventKeyType = {
        name: "TokenMsgBurnFrom",
        type: "token/MsgBurnFrom",
        eventName: "burn_from",
        candidateEventName: []
    }
    TokenMsgTransfer: RawMessageEventKeyType = {
        name: "TokenMsgTransfer",
        type: "token/MsgTransfer",
        eventName: "transfer",
        candidateEventName: []
    }
    TokenMsgTransferFrom: RawMessageEventKeyType = {
        name: "TokenMsgTransferFrom",
        type: "token/MsgTransferFrom",
        eventName: "transfer_from",
        candidateEventName: []
    }
    TokenMsgModify: RawMessageEventKeyType = {
        name: "TokenMsgModify",
        type: "token/MsgModify",
        eventName: "modify_token",
        candidateEventName: []
    }
    TokenMsgApprove: RawMessageEventKeyType = {
        name: "TokenMsgApprove",
        type: "token/MsgApprove",
        eventName: "approve_token",
        candidateEventName: []
    }
    TokenMsgGrantPermission: RawMessageEventKeyType = {
        name: "TokenMsgGrantPermission",
        type: "token/MsgGrantPermission",
        eventName: "",
        candidateEventName: []
    }
    TokenMsgRevokePermission: RawMessageEventKeyType = {
        name: "TokenMsgRevokePermission",
        type: "token/MsgRevokePermission",
        eventName: "", candidateEventName: []
    }

    // permission
    GrantPermission: RawMessageEventKeyType = {
        name: "GrantPermission",
        type: "",
        eventName: "grant_perm",
        candidateEventName: []
    }

    // collection
    CollectionMsgCreate: RawMessageEventKeyType = {
        name: "CollectionMsgCreate",
        type: "collection/MsgCreate",
        eventName: "create_collection",
        candidateEventName: []
    }
    CollectionMsgIssueFT: RawMessageEventKeyType = {
        name: "CollectionMsgIssueFT",
        type: "collection/MsgIssueFT",
        eventName: "issue_ft",
        candidateEventName: []
    }
    CollectionMsgIssueNFT: RawMessageEventKeyType = {
        name: "CollectionMsgIssueNFT",
        type: "collection/MsgIssueNFT",
        eventName: "issue_nft",
        candidateEventName: []
    }
    CollectionMsgMintFT: RawMessageEventKeyType = {
        name: "CollectionMsgMintFT",
        type: "collection/MsgMintFT",
        eventName: "mint_ft",
        candidateEventName: []
    }
    CollectionMsgMintNFT: RawMessageEventKeyType = {
        name: "CollectionMsgMintNFT",
        type: "collection/MsgMintNFT",
        eventName: "mint_nft",
        candidateEventName: []
    }
    CollectionMsgBurnFT: RawMessageEventKeyType = {
        name: "CollectionMsgBurnFT",
        type: "collection/MsgBurnFT",
        eventName: "burn_ft",
        candidateEventName: []
    }
    CollectionMsgBurnFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgBurnFTFrom",
        type: "collection/MsgBurnFTFrom",
        eventName: "burn_ft_from",
        candidateEventName: []
    }
    CollectionMsgBurnNFT: RawMessageEventKeyType = {
        name: "CollectionMsgBurnNFT",
        type: "collection/MsgBurnNFT",
        eventName: "burn_nft",
        candidateEventName: []
    }
    CollectionMsgBurnNFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgBurnNFTFrom",
        type: "collection/MsgBurnNFTFrom",
        eventName: "burn_nft_from",
        candidateEventName: []
    }
    CollectionMsgTransferFT: RawMessageEventKeyType = {
        name: "CollectionMsgTransferFT",
        type: "collection/MsgTransferFT",
        eventName: "transfer_ft",
        candidateEventName: []
    }
    CollectionMsgTransferFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgTransferFTFrom",
        type: "collection/MsgTransferFTFrom",
        eventName: "transfer_ft_from",
        candidateEventName: []
    }
    CollectionMsgTransferNFT: RawMessageEventKeyType = {
        name: "CollectionMsgTransferNFT",
        type: "collection/MsgTransferNFT",
        eventName: "transfer_nft",
        candidateEventName: []
    }
    CollectionMsgTransferNFTFrom: RawMessageEventKeyType = {
        name: "CollectionMsgTransferNFT",
        type: "collection/MsgTransferNFTFrom",
        eventName: "transfer_nft_from",
        candidateEventName: []
    }
    CollectionMsgAttach: RawMessageEventKeyType = {
        name: "CollectionMsgAttach",
        type: "collection/MsgAttach",
        eventName: "attach",
        candidateEventName: []
    }
    CollectionMsgAttachFrom: RawMessageEventKeyType = {
        name: "CollectionMsgAttachFrom",
        type: "collection/MsgAttachFrom",
        eventName: "attach_from",
        candidateEventName: []
    }
    CollectionMsgDetach: RawMessageEventKeyType = {
        name: "CollectionMsgDetach",
        type: "collection/MsgDetach",
        eventName: "detach",
        candidateEventName: []
    }
    CollectionMsgDetachFrom: RawMessageEventKeyType = {
        name: "CollectionMsgDetachFrom",
        type: "collection/MsgDetachFrom",
        eventName: "detach_from",
        candidateEventName: []
    }
    CollectionMsgApprove: RawMessageEventKeyType = {
        name: "CollectionMsgApprove",
        type: "collection/MsgApprove",
        eventName: "approve_collection",
        candidateEventName: []
    }
    CollectionMsgModify: RawMessageEventKeyType = {
        name: "CollectionMsgModify",
        type: "collection/MsgModify",
        eventName: "modify_collection",
        candidateEventName: ["modify_token", "modify_token_type"]
    }
    CollectionMsgDisapprove: RawMessageEventKeyType = {
        name: "CollectionMsgDisapprove",
        type: "collection/MsgDisapprove",
        eventName: "disapprove_collection",
        candidateEventName: []
    }
    CollectionMsgGrantPermission: RawMessageEventKeyType = {
        name: "CollectionMsgGrantPermission",
        type: "collection/MsgGrantPermission",
        eventName: "",
        candidateEventName: []
    }
    CollectionMsgRevokePermission: RawMessageEventKeyType = {
        name: "CollectionMsgRevokePermission",
        type: "collection/MsgRevokePermission",
        eventName: "",
        candidateEventName: []
    }


    getAllType(): Array<RawMessageEventKeyType> {
        return [
            RawMessageEventKeyTypes.getInstance().AccountMsgCreateAccount,
            RawMessageEventKeyTypes.getInstance().AccountMsgEmpty,
            RawMessageEventKeyTypes.getInstance().CoinMsgSend,
            RawMessageEventKeyTypes.getInstance().TokenMsgIssue,
            RawMessageEventKeyTypes.getInstance().TokenMsgMint,
            RawMessageEventKeyTypes.getInstance().TokenMsgBurn,
            RawMessageEventKeyTypes.getInstance().TokenMsgBurnFrom,
            RawMessageEventKeyTypes.getInstance().TokenMsgTransfer,
            RawMessageEventKeyTypes.getInstance().TokenMsgTransferFrom,
            RawMessageEventKeyTypes.getInstance().TokenMsgModify,
            RawMessageEventKeyTypes.getInstance().TokenMsgApprove,
            RawMessageEventKeyTypes.getInstance().TokenMsgGrantPermission,
            RawMessageEventKeyTypes.getInstance().TokenMsgRevokePermission,
            RawMessageEventKeyTypes.getInstance().GrantPermission,
            RawMessageEventKeyTypes.getInstance().CollectionMsgCreate,
            RawMessageEventKeyTypes.getInstance().CollectionMsgIssueFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgIssueNFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgMintFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgMintNFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgBurnFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgBurnFTFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgBurnNFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgBurnNFTFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgTransferFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgTransferFTFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgTransferNFT,
            RawMessageEventKeyTypes.getInstance().CollectionMsgTransferNFTFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgAttach,
            RawMessageEventKeyTypes.getInstance().CollectionMsgAttachFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgDetach,
            RawMessageEventKeyTypes.getInstance().CollectionMsgDetachFrom,
            RawMessageEventKeyTypes.getInstance().CollectionMsgApprove,
            RawMessageEventKeyTypes.getInstance().CollectionMsgModify,
            RawMessageEventKeyTypes.getInstance().CollectionMsgDisapprove,
            RawMessageEventKeyTypes.getInstance().CollectionMsgGrantPermission,
            RawMessageEventKeyTypes.getInstance().CollectionMsgRevokePermission
        ];
    }
}
export class RawMessageEventKeyTypeUtil {
    private constructor() { }

    public static convertToEventType(matchedTypeValue: string): RawMessageEventKeyType {
        return _.head(_.filter(RawMessageEventKeyTypes.getInstance().getAllType(), it => {
            return it.type === matchedTypeValue;
        }));
    }
}
