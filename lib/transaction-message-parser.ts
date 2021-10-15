import { GenericResponse, TxResultResponse } from "./response";
import { TxResultUtil } from "./tx-result-util";
import { TokenUtil } from "./token-util";
import {
    MessageType,
    TxResultMessage,
    ServiceTokenIssueMessage,
    ServiceTokenModifyMessage,
    ServiceTokenMintMessage,
    ServiceTokenBurnMessage,
    ServiceTokenBurnFromMessage,
    ServiceTokenTransferMessage,
    ServiceTokenTransferFromMessage,
    ItemTokenModifyMessage,
    NonFungibleTokenAttachMessage,
    NonFungibleTokenAttachFromMessage,
    NonFungibleTokenDetachMessage,
    NonFungibleTokenDetachFromMessage,
    NonFungibleToken,
    FungibleTokenIssueMessage,
    FungibleTokenMintMessage,
    FungibleTokenBurnMessage,
    NonFungibleTokenIssueMessage,
    NonFungibleTokenMintMessage,
    NonFungibleTokenBurnMessage,
    NonFungibleTokenBurnFromMessage,
    BaseCoinTransferMessage
} from "./transaction-messages";

// TODO this interface, and just parse directly
export interface TxResultMessageParser<T extends TxResultMessage> {
    parse(txResultResponse: TxResultResponse): T;
    parseGenericTxResultResponse(
        txResultResponse: GenericResponse<TxResultResponse>,
    ): T;
}

export class ServiceTokenIssueMessageParser
    implements TxResultMessageParser<ServiceTokenIssueMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenIssueMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenIssueMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenIssueMessage {
        return new ServiceTokenIssueMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findIssuedServiceToken(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class ServiceTokenModifyMessageParser
    implements TxResultMessageParser<ServiceTokenModifyMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenModifyMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenModifyMessage {
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

export class ServiceTokenMintMessageParser
    implements TxResultMessageParser<ServiceTokenMintMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenMintMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenMintMessage {
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

export class ServiceTokenBurnMessageParser
    implements TxResultMessageParser<ServiceTokenBurnMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenBurnMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenBurnMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenBurnMessage {
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

export class ServiceTokenBurnFromMessageParser
    implements TxResultMessageParser<ServiceTokenBurnFromMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenBurnFromMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenBurnFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenBurnFromMessage {
        return new ServiceTokenBurnFromMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findProxyWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class ServiceTokenTransferMessageParser
    implements TxResultMessageParser<ServiceTokenTransferMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenTransferMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenTransferMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenTransferMessage {
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

export class ServiceTokenTransferFromMessageParser
    implements TxResultMessageParser<ServiceTokenTransferFromMessage> {
    parse(txResultResponse: TxResultResponse): ServiceTokenTransferFromMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ServiceTokenTransferFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ServiceTokenTransferFromMessage {
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

export class ItemTokenModifyMessageParser
    implements TxResultMessageParser<ItemTokenModifyMessage> {
    parse(txResultResponse: TxResultResponse): ItemTokenModifyMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): ItemTokenModifyMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): ItemTokenModifyMessage {
        const tokenType = TxResultUtil.findTokenType(txResultResponse);
        const tokenIndex = TxResultUtil.findTokenIndex(txResultResponse);
        const isFungible = TokenUtil.isFungible(tokenType);
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        return new ItemTokenModifyMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            tokenType,
            tokenIndex,
            tokenId,
            TxResultUtil.findChanges(txResultResponse),
            isFungible,
        );
    }
}

export class NFTAttachMessageParser
    implements TxResultMessageParser<NonFungibleTokenAttachMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenAttachMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenAttachMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenAttachMessage {
        const contractId = TxResultUtil.findContractId(txResultResponse);
        const parentTokenId = TxResultUtil.findParentTokenId(txResultResponse);
        const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
        const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
        return new NonFungibleTokenAttachMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            new NonFungibleToken(contractId, tokenType, parentTokenIndex),
            new NonFungibleToken(contractId, tokenType, tokenIndex),
        );
    }
}

export class NFTAttachFromMessageParser
    implements TxResultMessageParser<NonFungibleTokenAttachFromMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenAttachFromMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenAttachFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenAttachFromMessage {
        const contractId = TxResultUtil.findContractId(txResultResponse);
        const parentTokenId = TxResultUtil.findParentTokenId(txResultResponse);
        const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
        const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
        return new NonFungibleTokenAttachFromMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findProxyWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            new NonFungibleToken(contractId, tokenType, parentTokenIndex),
            new NonFungibleToken(contractId, tokenType, tokenIndex),
        );
    }
}

export class NFTDetachMessageParser
    implements TxResultMessageParser<NonFungibleTokenDetachMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenDetachMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenDetachMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenDetachMessage {
        const contractId = TxResultUtil.findContractId(txResultResponse);
        const parentTokenId = TxResultUtil.findParentTokenIdFromDetach(
            txResultResponse,
        );
        const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
        const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
        return new NonFungibleTokenDetachMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            new NonFungibleToken(contractId, tokenType, parentTokenIndex),
            new NonFungibleToken(contractId, tokenType, tokenIndex),
        );
    }
}

export class NFTDetachFromMessageParser
    implements TxResultMessageParser<NonFungibleTokenDetachFromMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenDetachFromMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenDetachFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenDetachFromMessage {
        const contractId = TxResultUtil.findContractId(txResultResponse);
        const parentTokenId = TxResultUtil.findParentTokenIdFromDetach(
            txResultResponse,
        );
        const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
        const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
        const tokenId = TxResultUtil.findTokenId(txResultResponse);
        const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
        return new NonFungibleTokenDetachFromMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findProxyWalletAddress(txResultResponse),
            new NonFungibleToken(contractId, tokenType, parentTokenIndex),
            new NonFungibleToken(contractId, tokenType, tokenIndex),
        );
    }
}

export class IssueFungibleMessageParser
    implements TxResultMessageParser<FungibleTokenIssueMessage> {
    parse(txResultResponse: TxResultResponse): FungibleTokenIssueMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): FungibleTokenIssueMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): FungibleTokenIssueMessage {
        const tokenId = TxResultUtil.findTokenIdFromEvents(txResultResponse);
        const tokenType = TokenUtil.tokenTypeFrom(tokenId);
        return new FungibleTokenIssueMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findOwnerWalletAddress(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findIssuedFungibleToken(txResultResponse),
            TxResultUtil.findAmount(txResultResponse),
        );
    }
}

export class MintFungibleMessageParser
    implements TxResultMessageParser<FungibleTokenMintMessage> {
    parse(txResultResponse: TxResultResponse): FungibleTokenMintMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): FungibleTokenMintMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): FungibleTokenMintMessage {
        const mintFtTokens = TxResultUtil.findMintedFungibleTokens(txResultResponse);
        return new FungibleTokenMintMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            mintFtTokens,
        );
    }
}
export class BurnFungibleMessageParser
    implements TxResultMessageParser<FungibleTokenBurnMessage> {
    parse(txResultResponse: TxResultResponse): FungibleTokenBurnMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): FungibleTokenBurnMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): FungibleTokenBurnMessage {
        const burnedTokens = TxResultUtil.findBurnedFungibleTokens(txResultResponse);
        return new FungibleTokenBurnMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            burnedTokens,
        );
    }
}

export class NonFungibleTokenIssueMessageParser
    implements TxResultMessageParser<NonFungibleTokenIssueMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenIssueMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenIssueMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenIssueMessage {
        return new NonFungibleTokenIssueMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findIssuedNonFungibleToken(txResultResponse)
        );
    }
}


export class NonFungibleTokenMintMessageParser
    implements TxResultMessageParser<NonFungibleTokenMintMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenMintMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenMintMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenMintMessage {
        return new NonFungibleTokenMintMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            "",
            TxResultUtil.findMintedNonFungibleTokens(txResultResponse)
        );
    }
}

export class NonFungibleTokenBurnMessageParser
    implements TxResultMessageParser<NonFungibleTokenBurnMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenBurnMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenBurnMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenBurnMessage {
        return new NonFungibleTokenBurnMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findBurnedNonFungibleToken(txResultResponse)
        );
    }
}

export class NonFungibleTokenBurnFromMessageParser
    implements TxResultMessageParser<NonFungibleTokenBurnFromMessage> {
    parse(txResultResponse: TxResultResponse): NonFungibleTokenBurnFromMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): NonFungibleTokenBurnFromMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): NonFungibleTokenBurnFromMessage {
        return new NonFungibleTokenBurnFromMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findProxyWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findContractId(txResultResponse),
            TxResultUtil.findBurnedNonFungibleToken(txResultResponse)
        );
    }
}

export class BaseCoinSendMessageParser
    implements TxResultMessageParser<BaseCoinTransferMessage> {
    parse(txResultResponse: TxResultResponse): BaseCoinTransferMessage {
        return this.createMessage(txResultResponse);
    }

    parseGenericTxResultResponse(
        response: GenericResponse<TxResultResponse>,
    ): BaseCoinTransferMessage {
        const txResultResponse = response.responseData;
        return this.createMessage(txResultResponse);
    }

    private createMessage(
        txResultResponse: TxResultResponse,
    ): BaseCoinTransferMessage {
        return new BaseCoinTransferMessage(
            txResultResponse.height,
            txResultResponse.txhash,
            TxResultUtil.findFromWalletAddress(txResultResponse),
            TxResultUtil.findSenderFromLogEvents(txResultResponse),
            TxResultUtil.findToWalletAddress(txResultResponse),
            TxResultUtil.findBaseCoinAmount(txResultResponse)
        );
    }
}

export class TxResultMessageParserFactory {
    static create(
        messageType: MessageType,
    ): TxResultMessageParser<TxResultMessage> {
        let txResultMessageParser: TxResultMessageParser<TxResultMessage> = null;
        switch (messageType) {
            case MessageType.SERVICE_TOKEN_ISSUE:
                txResultMessageParser = new ServiceTokenIssueMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_MODIFY:
                txResultMessageParser = new ServiceTokenModifyMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_MINT:
                txResultMessageParser = new ServiceTokenMintMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_BURN:
                txResultMessageParser = new ServiceTokenBurnMessageParser();
                break;
            case MessageType.SERVICE_TOKEN_BURN_FROM:
                txResultMessageParser = new ServiceTokenBurnFromMessageParser();
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
            case MessageType.ITEM_TOKEN_ATTACH:
                txResultMessageParser = new NFTAttachMessageParser();
                break;
            case MessageType.ITEM_TOKEN_ATTACH_FROM:
                txResultMessageParser = new NFTAttachFromMessageParser();
                break;
            case MessageType.ITEM_TOKEN_DETACH:
                txResultMessageParser = new NFTDetachMessageParser();
                break;
            case MessageType.ITEM_TOKEN_DETACH_FROM:
                txResultMessageParser = new NFTDetachFromMessageParser();
                break;
            case MessageType.ITEM_TOKEN_ISSUE_FT:
                txResultMessageParser = new IssueFungibleMessageParser();
                break;
            case MessageType.ITEM_TOKEN_MINT_FT:
                txResultMessageParser = new MintFungibleMessageParser();
                break;

            case MessageType.ITEM_TOKEN_BURN_FT:
                txResultMessageParser = new BurnFungibleMessageParser();
                break;
            case MessageType.ITEM_TOKEN_ISSUE_NFT:
                txResultMessageParser = new NonFungibleTokenIssueMessageParser();
                break;
            case MessageType.ITEM_TOKEN_MINT_NFT:
                txResultMessageParser = new NonFungibleTokenMintMessageParser();
                break;
            case MessageType.ITEM_TOKEN_BURN_NFT:
                txResultMessageParser = new NonFungibleTokenBurnMessageParser();
                break;
            case MessageType.ITEM_TOKEN_BURN_FROM_NFT:
                txResultMessageParser = new NonFungibleTokenBurnFromMessageParser();
                break;

            case MessageType.COIN_SEND:
                txResultMessageParser = new BaseCoinSendMessageParser();
                break;
            default:
                return null;
        }
        return txResultMessageParser;
    }
}
