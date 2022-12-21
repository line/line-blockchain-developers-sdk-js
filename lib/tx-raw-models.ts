import { Base64 } from "js-base64";
import _ from "lodash";
import { pubkeyToAddress } from "@cosmjs/amino";
export class RawTransactionResult {
    constructor(
        readonly height: number,
        readonly index: number,
        readonly code: number,
        readonly codeSpace: string,
        readonly txHash: string,
        readonly timestamp: number,
        readonly gasWanted: number,
        readonly gasUsed: number,
        readonly logs: Array<RawTransactionLog>,
        readonly tx: RawTransactionRequest,
        readonly data?: string,
        readonly info?: string,
    ) { }
    // TODO getSignerAddresses
    getSignerAddresses(hrpPrefix: string): Array<string> {
        let signerAddresses = _.map(this.tx.value.signatures, it => {
            return pubkeyToAddress(it.pubKey, hrpPrefix)
        });
        return signerAddresses
    }
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

export class RawTransactionEvent {
    constructor(
        readonly type: string,
        readonly attributes: Array<RawTransactionEventAttribute>,
    ) { }

    findAttributeNotNull = function (
        attributeType: EventAttributeType, defaultValue: String
    ) {
        let foundAttributeValue = _.head(_.filter(this.attributes, it => attributeType.matches(it.key)));
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
        readonly msgIndex: number,
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

export type RawEventType = {
    type: string,
    eventName: string,
    candidateEventName: Array<string>
}

export class RawEventTypes {
    private static instance: RawEventTypes

    private constructor() { }

    public static getInstance() {
        if (!RawEventTypes.instance) {
            RawEventTypes.instance = new RawEventTypes();
        }
        return RawEventTypes.instance;
    }

    // types 
    AccountMsgCreateAccount: RawEventType = {
        type: "account/MsgCreateAccount",
        eventName: "create_account",
        candidateEventName: ["amount"]
    }

    AccountMsgEmpty: RawEventType = { type: "account/MsgEmpty", eventName: "message", candidateEventName: [] }

    // coin
    CoinMsgSend: RawEventType = { type: "coin/MsgSend", eventName: "transfer", candidateEventName: [] }

    // token
    TokenMsgIssue: RawEventType = { type: "token/MsgIssue", eventName: "issue", candidateEventName: [] }
    TokenMsgMint: RawEventType = { type: "token/MsgMint", eventName: "mint", candidateEventName: [] }
    TokenMsgBurn: RawEventType = { type: "token/MsgBurn", eventName: "burn", candidateEventName: [] }
    TokenMsgBurnFrom: RawEventType = { type: "token/MsgBurnFrom", eventName: "burn_from", candidateEventName: [] }
    TokenMsgTransfer: RawEventType = { type: "token/MsgTransfer", eventName: "transfer", candidateEventName: [] }
    TokenMsgTransferFrom: RawEventType = { type: "token/MsgTransferFrom", eventName: "transfer_from", candidateEventName: [] }
    TokenMsgModify: RawEventType = { type: "token/MsgModify", eventName: "modify_token", candidateEventName: [] }
    TokenMsgApprove: RawEventType = { type: "token/MsgApprove", eventName: "approve_token", candidateEventName: [] }
    TokenMsgGrantPermission: RawEventType = { type: "token/MsgGrantPermission", eventName: "", candidateEventName: [] }
    TokenMsgRevokePermission: RawEventType = { type: "token/MsgRevokePermission", eventName: "", candidateEventName: [] }

    // permission
    GrantPermission: RawEventType = { type: "", eventName: "grant_perm", candidateEventName: [] }

    // collection
    CollectionMsgCreate: RawEventType = { type: "collection/MsgCreate", eventName: "create_collection", candidateEventName: [] }
    CollectionMsgIssueFT: RawEventType = { type: "collection/MsgIssueFT", eventName: "issue_ft", candidateEventName: [] }
    CollectionMsgIssueNFT: RawEventType = { type: "collection/MsgIssueNFT", eventName: "issue_nft", candidateEventName: [] }
    CollectionMsgMintFT: RawEventType = { type: "collection/MsgMintFT", eventName: "mint_ft", candidateEventName: [] }
    CollectionMsgMintNFT: RawEventType = { type: "collection/MsgMintNFT", eventName: "mint_nft", candidateEventName: [] }
    CollectionMsgBurnFT: RawEventType = { type: "collection/MsgBurnFT", eventName: "burn_ft", candidateEventName: [] }
    CollectionMsgBurnFTFrom: RawEventType = { type: "collection/MsgBurnFTFrom", eventName: "burn_ft_from", candidateEventName: [] }
    CollectionMsgBurnNFT: RawEventType = { type: "collection/MsgBurnNFT", eventName: "burn_nft", candidateEventName: [] }
    CollectionMsgBurnNFTFrom: RawEventType = { type: "collection/MsgBurnNFTFrom", eventName: "burn_nft_from", candidateEventName: [] }
    CollectionMsgTransferFT: RawEventType = { type: "collection/MsgTransferFT", eventName: "transfer_ft", candidateEventName: [] }
    CollectionMsgTransferFTFrom: RawEventType = { type: "collection/MsgTransferFTFrom", eventName: "transfer_ft_from", candidateEventName: [] }
    CollectionMsgTransferNFT: RawEventType = { type: "collection/MsgTransferNFT", eventName: "transfer_nft", candidateEventName: [] }
    CollectionMsgTransferNFTFrom: RawEventType = { type: "collection/MsgTransferNFTFrom", eventName: "transfer_nft_from", candidateEventName: [] }
    CollectionMsgAttach: RawEventType = { type: "collection/MsgAttach", eventName: "attach", candidateEventName: [] }
    CollectionMsgAttachFrom: RawEventType = { type: "collection/MsgAttachFrom", eventName: "attach_from", candidateEventName: [] }
    CollectionMsgDetach: RawEventType = { type: "collection/MsgDetach", eventName: "detach", candidateEventName: [] }
    CollectionMsgDetachFrom: RawEventType = { type: "collection/MsgDetachFrom", eventName: "detach_from", candidateEventName: [] }
    CollectionMsgApprove: RawEventType = { type: "collection/MsgApprove", eventName: "approve_collection", candidateEventName: [] }
    CollectionMsgModify: RawEventType = {
        type: "collection/MsgModify",
        eventName: "modify_collection",
        candidateEventName: ["modify_token", "modify_token_type"]
    }
    CollectionMsgDisapprove: RawEventType = { type: "collection/MsgDisapprove", eventName: "disapprove_collection", candidateEventName: [] }
    CollectionMsgGrantPermission: RawEventType = { type: "collection/MsgGrantPermission", eventName: "", candidateEventName: [] }
    CollectionMsgRevokePermission: RawEventType = { type: "collection/MsgRevokePermission", eventName: "", candidateEventName: [] }


    getAllType(): Array<RawEventType> {
        return [
            RawEventTypes.getInstance().AccountMsgCreateAccount,
            RawEventTypes.getInstance().AccountMsgEmpty,
            RawEventTypes.getInstance().CoinMsgSend,
            RawEventTypes.getInstance().TokenMsgIssue,
            RawEventTypes.getInstance().TokenMsgMint,
            RawEventTypes.getInstance().TokenMsgBurn,
            RawEventTypes.getInstance().TokenMsgBurnFrom,
            RawEventTypes.getInstance().TokenMsgTransfer,
            RawEventTypes.getInstance().TokenMsgTransferFrom,
            RawEventTypes.getInstance().TokenMsgModify,
            RawEventTypes.getInstance().TokenMsgApprove,
            RawEventTypes.getInstance().TokenMsgGrantPermission,
            RawEventTypes.getInstance().TokenMsgRevokePermission,
            RawEventTypes.getInstance().GrantPermission,
            RawEventTypes.getInstance().CollectionMsgCreate,
            RawEventTypes.getInstance().CollectionMsgIssueFT,
            RawEventTypes.getInstance().CollectionMsgIssueNFT,
            RawEventTypes.getInstance().CollectionMsgMintFT,
            RawEventTypes.getInstance().CollectionMsgMintNFT,
            RawEventTypes.getInstance().CollectionMsgBurnFT,
            RawEventTypes.getInstance().CollectionMsgBurnFTFrom,
            RawEventTypes.getInstance().CollectionMsgBurnNFT,
            RawEventTypes.getInstance().CollectionMsgBurnNFTFrom,
            RawEventTypes.getInstance().CollectionMsgTransferFT,
            RawEventTypes.getInstance().CollectionMsgTransferFTFrom,
            RawEventTypes.getInstance().CollectionMsgTransferNFT,
            RawEventTypes.getInstance().CollectionMsgTransferNFTFrom,
            RawEventTypes.getInstance().CollectionMsgAttach,
            RawEventTypes.getInstance().CollectionMsgAttachFrom,
            RawEventTypes.getInstance().CollectionMsgDetach,
            RawEventTypes.getInstance().CollectionMsgDetachFrom,
            RawEventTypes.getInstance().CollectionMsgApprove,
            RawEventTypes.getInstance().CollectionMsgModify,
            RawEventTypes.getInstance().CollectionMsgDisapprove,
            RawEventTypes.getInstance().CollectionMsgGrantPermission,
            RawEventTypes.getInstance().CollectionMsgRevokePermission
        ];
    }
}
export class RawEventTypesUtil {
    private constructor() { }

    public static convertToEventType(matchedTypeValue: string): RawEventType {
        return _.head(_.filter(RawEventTypes.getInstance().getAllType(), it => it.type == matchedTypeValue))
    }
}
