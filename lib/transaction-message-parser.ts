import { GenericResponse, TxResultResponse } from "./response";
import { TxResultUtil } from "./tx-result-util";
import {
    MessageType,
    TxResultMessage,
    ServiceTokenModifyMessage,
    // ServiceTokenIssueMessage,
    ServiceTokenMintMessage,
    ServiceTokenBurnMessage,
    ServiceTokenTransferMessage,
    ServiceTokenTransferFromMessage,
    ItemTokenModifyMessage,
} from "./transaction-messages";

// TODO this interface, and just parse directly
export interface TxResultMessageParser<T> {
    parse(txResultResponse: TxResultResponse): T;
    parseGenericTxResultResponse(
        txResultResponse: GenericResponse<TxResultResponse>,
    ): T;
}

export class ServiceTokenModifyMessageParser implements TxResultMessageParser<ServiceTokenModifyMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenModifyMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
        return new ServiceTokenModifyMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findChanges(txResultResponse),
        );
    }
}

export class ServiceTokenMintMessageParser implements TxResultMessageParser<ServiceTokenMintMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenMintMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
        return new ServiceTokenMintMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class ServiceTokenBurnMessageParser implements TxResultMessageParser<ServiceTokenBurnMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenBurnMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenBurnMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ServiceTokenBurnMessage {
        return new ServiceTokenBurnMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class ServiceTokenTransferMessageParser implements TxResultMessageParser<ServiceTokenTransferMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenTransferMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenTransferMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ServiceTokenTransferMessage {
        return new ServiceTokenTransferMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class ServiceTokenTransferFromMessageParser implements TxResultMessageParser<ServiceTokenTransferFromMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenTransferFromMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenTransferFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ServiceTokenTransferFromMessage {
        return new ServiceTokenTransferFromMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findProxyWalletAddress(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}


export class ItemTokenModifyMessageParser implements TxResultMessageParser<ItemTokenModifyMessage> {
    parse(txResultResponse: TxResultResponse): ItemTokenModifyMessage {
        return this.createMessage(txResultResponse)
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ItemTokenModifyMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse)
    }

    private createMessage(txResultResponse: TxResultResponse): ItemTokenModifyMessage {
        const tokenIndex = TxResultUtil.findTokenIndex(txResultResponse);
        let isFungible = false;
        if (tokenIndex && tokenIndex === "00000000") {
            isFungible = true;
        }
        return new ItemTokenModifyMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findTokenType(txResultResponse),
            TxResultUtil.findTokenIndex(txResultResponse),
            TxResultUtil.findChanges(txResultResponse),
            isFungible,
        );
    }
}

export class TxResultMessageParserFactory {
    static create(
        messageType: MessageType,
    ): TxResultMessageParser<TxResultMessage> {
        let txResultMessageParser: TxResultMessageParser<TxResultMessage> = null;
        switch (messageType) {
            case MessageType.SERVICE_TOKEN_MODIFY:
                txResultMessageParser = new ServiceTokenModifyMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_MINT:
                txResultMessageParser = new ServiceTokenMintMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_BURN:
                txResultMessageParser = new ServiceTokenBurnMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_TRANSFER:
                txResultMessageParser = new ServiceTokenTransferMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_TRANSFER_FROM:
                txResultMessageParser = new ServiceTokenTransferFromMessageParser();
                break;
            case MessageType.ITEM_TOKEN_MODIFY:
                txResultMessageParser = new ItemTokenModifyMessageParser();
                break;
            // case MessageType.SERVICE_TOKEN_MODIFY:
            //     txResultMessageParser = new class implements TxResultMessageParser<ServiceTokenModifyMessage> {
            //         parse(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
            //             return null;
            //         }
            //     }
            //     break;
            default:
                return null;
        }
        return txResultMessageParser;
    }
}
