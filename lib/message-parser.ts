import { TxResultResponse } from "./response"
import {
    MessageTypes,
    TxResultMessage,
    ServiceTokenIssueMessage,
    ServiceTokenMintMessage,
    ServiceTokenModifyMessage,
    IssuedServiceToken
} from "./messages"

export interface TxResultMessageParser<T> {
    parse(txResultResponse: TxResultResponse): T
}

export class TxResultMessageParserFactory {

    static create(messageType: MessageTypes): TxResultMessageParser<TxResultMessage> {
        let txResultMessageParser: TxResultMessageParser<TxResultMessage> = null
        switch (messageType) {
            case MessageTypes.SERVICE_TOKEN_ISSUE:
                txResultMessageParser = new class implements TxResultMessageParser<ServiceTokenIssueMessage> {
                    parse(txResultResponse: TxResultResponse): ServiceTokenIssueMessage {
                        return new ServiceTokenIssueMessage(
                            txResultResponse.height,
                            txResultResponse.txhash,
                            TxResultUtil.findFromWalletAddress(txResultResponse),
                            TxResultUtil.findFromWalletAddress(txResultResponse),
                            TxResultUtil.findToWalletAddress(txResultResponse),
                            // TODO implement extracting data for IssuedServiceToken
                            new IssuedServiceToken(
                                "contract-id",
                                "name",
                                "symbol",
                                "meta",
                                "imgUri",
                                1
                            ),
                            "1000"
                        );
                    }
                }
                break;
            case MessageTypes.SERVICE_TOKEN_MINT:
                txResultMessageParser = new class implements TxResultMessageParser<ServiceTokenMintMessage> {
                    parse(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
                        return null;
                    }
                }
                break;
            case MessageTypes.SERVICE_TOKEN_MODIFY:
                txResultMessageParser = new class implements TxResultMessageParser<ServiceTokenModifyMessage> {
                    parse(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
                        return null;
                    }
                }
                break;
            default:
                return null
        }
        return txResultMessageParser

    }
}