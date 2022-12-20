import { Base64 } from "js-base64";
import _ from "lodash";

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

    // getSignerAddresses(hrpPrefix: string): Array<string> {
    //     // TODO Implement
    //     return [...""]
    // }
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
        readonly readonlyue: RawTransactionRequestValue,
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

// extension functions
/*
fun RawTransactionEvent.findAttributeNotNull(
    attributeType: EventAttributeType,
    defaultValue: String = StringUtils.EMPTY,
): String {
    return this.attributes.firstOrNull { attributeType.values.contains(it.key) }?.value ?: defaultValue
}
*/
