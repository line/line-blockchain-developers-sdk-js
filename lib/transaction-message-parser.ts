import { GenericResponse, TxResultResponse } from "./response";
import { TxResultUtil } from "./tx-result-util";
import { TokenUtil } from "./token-util";
import { TxResultCodeMappingsProvider } from "./tx-result-codes";
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
  ServiceTokenApprovedMessage,
  ItemTokenCreateMessage,
  ItemTokenModifyMessage,
  ItemTokenApproveMessage,
  ItemTokenDisapproveMessage,
  NonFungibleTokenAttachMessage,
  NonFungibleTokenAttachFromMessage,
  NonFungibleTokenDetachMessage,
  NonFungibleTokenDetachFromMessage,
  NonFungibleTokenMessage,
  FungibleTokenIssueMessage,
  FungibleTokenMintMessage,
  FungibleTokenBurnMessage,
  FungibleTokenBurnFromMessage,
  FungibleTokenTransferMessage,
  FungibleTokenTransferFromMessage,
  TransferredFungibleTokenAmountMessage,
  NonFungibleTokenIssueMessage,
  NonFungibleTokenMintMessage,
  NonFungibleTokenBurnMessage,
  NonFungibleTokenBurnFromMessage,
  NonFungibleTokenTransferMessage,
  NonFungibleTokenTransferFromMessage,
  BaseCoinTransferMessage,
  AccountMsgEmptyMessage,
} from "./transaction-messages";

// TODO this interface, and just parse directly
export interface TxResultMessageParser<T extends TxResultMessage> {
  parse(txResultResponse: TxResultResponse): T;

  parseGenericTxResultResponse(txResultResponse: GenericResponse<TxResultResponse>): T;
}

export class ServiceTokenIssueMessageParser implements TxResultMessageParser<ServiceTokenIssueMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenIssueMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenIssueMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenIssueMessage {
    return new ServiceTokenIssueMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
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

export class ServiceTokenModifyMessageParser implements TxResultMessageParser<ServiceTokenModifyMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenModifyMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenModifyMessage {
    return new ServiceTokenModifyMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findOwnerWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findChanges(txResultResponse),
    );
  }
}

export class ServiceTokenMintMessageParser implements TxResultMessageParser<ServiceTokenMintMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenMintMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenMintMessage {
    return new ServiceTokenMintMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
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
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenBurnMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenBurnMessage {
    return new ServiceTokenBurnMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findOwnerWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findAmount(txResultResponse),
    );
  }
}

export class ServiceTokenBurnFromMessageParser implements TxResultMessageParser<ServiceTokenBurnFromMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenBurnFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenBurnFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenBurnFromMessage {
    return new ServiceTokenBurnFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findAmount(txResultResponse),
    );
  }
}

export class ServiceTokenTransferMessageParser implements TxResultMessageParser<ServiceTokenTransferMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenTransferMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenTransferMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenTransferMessage {
    return new ServiceTokenTransferMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
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
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenTransferFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenTransferFromMessage {
    return new ServiceTokenTransferFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
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

export class ServiceTokenApprovedMessageParser implements TxResultMessageParser<ServiceTokenApprovedMessage> {
  parse(txResultResponse: TxResultResponse): ServiceTokenApprovedMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ServiceTokenApprovedMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ServiceTokenApprovedMessage {
    return new ServiceTokenApprovedMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findApproverWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
    );
  }
}

export class ItemTokenCreateMessageParser implements TxResultMessageParser<ItemTokenCreateMessage> {
  parse(txResultResponse: TxResultResponse): ItemTokenCreateMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ItemTokenCreateMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ItemTokenCreateMessage {
    return new ItemTokenCreateMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      // TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findCreatedItemToken(txResultResponse),
    );
  }
}

export class ItemTokenModifyMessageParser implements TxResultMessageParser<ItemTokenModifyMessage> {
  parse(txResultResponse: TxResultResponse): ItemTokenModifyMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ItemTokenModifyMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ItemTokenModifyMessage {
    const tokenType = TxResultUtil.findTokenType(txResultResponse);
    const tokenIndex = TxResultUtil.findTokenIndex(txResultResponse);
    const isFungible = TokenUtil.isFungible(tokenType);
    const tokenId = TxResultUtil.findTokenId(txResultResponse);
    return new ItemTokenModifyMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
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

export class ItemTokenApproveMessageParser implements TxResultMessageParser<ItemTokenApproveMessage> {
  parse(txResultResponse: TxResultResponse): ItemTokenApproveMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ItemTokenApproveMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ItemTokenApproveMessage {
    return new ItemTokenApproveMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findApproverWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
    );
  }
}

export class ItemTokenDisapproveMessageParser implements TxResultMessageParser<ItemTokenDisapproveMessage> {
  parse(txResultResponse: TxResultResponse): ItemTokenDisapproveMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): ItemTokenDisapproveMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): ItemTokenDisapproveMessage {
    return new ItemTokenDisapproveMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findApproverWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
    );
  }
}

export class NFTAttachMessageParser implements TxResultMessageParser<NonFungibleTokenAttachMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenAttachMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenAttachMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenAttachMessage {
    const contractId = TxResultUtil.findContractId(txResultResponse);
    const parentTokenId = TxResultUtil.findParentTokenId(txResultResponse);
    const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
    const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
    const tokenId = TxResultUtil.findTokenId(txResultResponse);
    const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
    return new NonFungibleTokenAttachMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      new NonFungibleTokenMessage(contractId, tokenType, parentTokenIndex),
      new NonFungibleTokenMessage(contractId, tokenType, tokenIndex),
    );
  }
}

export class NFTAttachFromMessageParser implements TxResultMessageParser<NonFungibleTokenAttachFromMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenAttachFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenAttachFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenAttachFromMessage {
    const contractId = TxResultUtil.findContractId(txResultResponse);
    const parentTokenId = TxResultUtil.findParentTokenId(txResultResponse);
    const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
    const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
    const tokenId = TxResultUtil.findTokenId(txResultResponse);
    const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
    return new NonFungibleTokenAttachFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      new NonFungibleTokenMessage(contractId, tokenType, parentTokenIndex),
      new NonFungibleTokenMessage(contractId, tokenType, tokenIndex),
    );
  }
}

export class NFTDetachMessageParser implements TxResultMessageParser<NonFungibleTokenDetachMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenDetachMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenDetachMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenDetachMessage {
    const contractId = TxResultUtil.findContractId(txResultResponse);
    const parentTokenId = TxResultUtil.findParentTokenIdFromDetach(txResultResponse);
    const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
    const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
    const tokenId = TxResultUtil.findTokenId(txResultResponse);
    const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
    return new NonFungibleTokenDetachMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      new NonFungibleTokenMessage(contractId, tokenType, parentTokenIndex),
      new NonFungibleTokenMessage(contractId, tokenType, tokenIndex),
    );
  }
}

export class NFTDetachFromMessageParser implements TxResultMessageParser<NonFungibleTokenDetachFromMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenDetachFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenDetachFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenDetachFromMessage {
    const contractId = TxResultUtil.findContractId(txResultResponse);
    const parentTokenId = TxResultUtil.findParentTokenIdFromDetach(txResultResponse);
    const tokenType = TokenUtil.tokenTypeFrom(parentTokenId);
    const parentTokenIndex = TokenUtil.tokenIndexFrom(parentTokenId);
    const tokenId = TxResultUtil.findTokenId(txResultResponse);
    const tokenIndex = TokenUtil.tokenIndexFrom(tokenId);
    return new NonFungibleTokenDetachFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      new NonFungibleTokenMessage(contractId, tokenType, parentTokenIndex),
      new NonFungibleTokenMessage(contractId, tokenType, tokenIndex),
    );
  }
}

export class IssueFungibleMessageParser implements TxResultMessageParser<FungibleTokenIssueMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenIssueMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenIssueMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenIssueMessage {
    const tokenId = TxResultUtil.findTokenIdFromEvents(txResultResponse);
    const tokenType = TokenUtil.tokenTypeFrom(tokenId);
    return new FungibleTokenIssueMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findOwnerWalletAddress(txResultResponse),
      TxResultUtil.findToWalletAddress(txResultResponse),
      TxResultUtil.findIssuedFungibleToken(txResultResponse),
      TxResultUtil.findAmount(txResultResponse),
    );
  }
}

export class MintFungibleMessageParser implements TxResultMessageParser<FungibleTokenMintMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenMintMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenMintMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenMintMessage {
    const mintFtTokens = TxResultUtil.findMintedFungibleTokens(txResultResponse);
    return new FungibleTokenMintMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findToWalletAddress(txResultResponse),
      mintFtTokens,
    );
  }
}

export class BurnFungibleMessageParser implements TxResultMessageParser<FungibleTokenBurnMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenBurnMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenBurnMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenBurnMessage {
    const burnedTokens = TxResultUtil.findBurnedFungibleTokens(txResultResponse);
    return new FungibleTokenBurnMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      burnedTokens,
    );
  }
}

export class FungibleTransferMessageParser implements TxResultMessageParser<FungibleTokenTransferMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenTransferMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenTransferMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenTransferMessage {
    return new FungibleTokenTransferMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findToWalletAddress(txResultResponse),
      TxResultUtil.findTransferredFungibleTokenAmount(txResultResponse),
    );
  }
}

export class FungibleTransferFromMessageParser implements TxResultMessageParser<FungibleTokenTransferFromMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenTransferFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenTransferFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenTransferFromMessage {
    return new FungibleTokenTransferFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findToWalletAddress(txResultResponse),
      TxResultUtil.findTransferredFungibleTokenAmount(txResultResponse),
    );
  }
}

export class BurnFromFungibleMessageParser implements TxResultMessageParser<FungibleTokenBurnFromMessage> {
  parse(txResultResponse: TxResultResponse): FungibleTokenBurnFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): FungibleTokenBurnFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): FungibleTokenBurnFromMessage {
    const burnedTokens = TxResultUtil.findBurnedFungibleTokens(txResultResponse);
    return new FungibleTokenBurnFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      burnedTokens,
    );
  }
}

export class NonFungibleTokenIssueMessageParser implements TxResultMessageParser<NonFungibleTokenIssueMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenIssueMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenIssueMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenIssueMessage {
    return new NonFungibleTokenIssueMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findIssuedNonFungibleToken(txResultResponse),
    );
  }
}

export class NonFungibleTokenMintMessageParser implements TxResultMessageParser<NonFungibleTokenMintMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenMintMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenMintMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenMintMessage {
    return new NonFungibleTokenMintMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      "",
      TxResultUtil.findMintedNonFungibleTokens(txResultResponse),
    );
  }
}

export class NonFungibleTokenBurnMessageParser implements TxResultMessageParser<NonFungibleTokenBurnMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenBurnMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenBurnMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenBurnMessage {
    return new NonFungibleTokenBurnMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findBurnedNonFungibleToken(txResultResponse),
    );
  }
}

export class NonFungibleTokenBurnFromMessageParser implements TxResultMessageParser<NonFungibleTokenBurnFromMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenBurnFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenBurnFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenBurnFromMessage {
    return new NonFungibleTokenBurnFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findContractId(txResultResponse),
      TxResultUtil.findBurnedNonFungibleToken(txResultResponse),
    );
  }
}

export class NonFungibleTokenTransferMessageParser implements TxResultMessageParser<NonFungibleTokenTransferMessage> {
  parse(txResultResponse: TxResultResponse): NonFungibleTokenTransferMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenTransferMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenTransferMessage {
    return new NonFungibleTokenTransferMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findTransferredNonFungibleToken(txResultResponse),
    );
  }
}

export class NonFungibleTokenTransferFromMessageParser
  implements TxResultMessageParser<NonFungibleTokenTransferFromMessage>
{
  parse(txResultResponse: TxResultResponse): NonFungibleTokenTransferFromMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): NonFungibleTokenTransferFromMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): NonFungibleTokenTransferFromMessage {
    return new NonFungibleTokenTransferFromMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findProxyWalletAddress(txResultResponse),
      TxResultUtil.findTransferredFromNonFungibleTokens(txResultResponse),
    );
  }
}

export class BaseCoinSendMessageParser implements TxResultMessageParser<BaseCoinTransferMessage> {
  parse(txResultResponse: TxResultResponse): BaseCoinTransferMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): BaseCoinTransferMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): BaseCoinTransferMessage {
    return new BaseCoinTransferMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
      TxResultUtil.findSenderWalletAddress(txResultResponse),
      TxResultUtil.findToWalletAddress(txResultResponse),
      TxResultUtil.findBaseCoinAmount(txResultResponse),
    );
  }
}

export class AccountMsgEmptyMessageParser implements TxResultMessageParser<AccountMsgEmptyMessage> {
  parse(txResultResponse: TxResultResponse): AccountMsgEmptyMessage {
    return this.createMessage(txResultResponse);
  }

  parseGenericTxResultResponse(response: GenericResponse<TxResultResponse>): AccountMsgEmptyMessage {
    const txResultResponse = response.responseData;
    return this.createMessage(txResultResponse);
  }

  private createMessage(txResultResponse: TxResultResponse): AccountMsgEmptyMessage {
    return new AccountMsgEmptyMessage(
      TxResultCodeMappingsProvider.code(txResultResponse),
      txResultResponse.height,
      txResultResponse.txhash,
      TxResultUtil.findFromWalletAddress(txResultResponse),
    );
  }
}

export class TxResultMessageParserFactory {
  static create(messageType: MessageType): TxResultMessageParser<TxResultMessage> {
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
      case MessageType.SERVICE_TOKEN_PROXY_APPROVED:
        txResultMessageParser = new ServiceTokenApprovedMessageParser();
        break;
      case MessageType.ITEM_TOKEN_CREATE:
        txResultMessageParser = new ItemTokenCreateMessageParser();
        break;
      case MessageType.ITEM_TOKEN_MODIFY:
        txResultMessageParser = new ItemTokenModifyMessageParser();
        break;
      case MessageType.ITEM_TOKEN_APPROVE:
        txResultMessageParser = new ItemTokenApproveMessageParser();
        break;
      case MessageType.ITEM_TOKEN_DISAPPROVE:
        txResultMessageParser = new ItemTokenDisapproveMessageParser();
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
      case MessageType.ITEM_TOKEN_BURN_FROM_FT:
        txResultMessageParser = new BurnFromFungibleMessageParser();
        break;
      case MessageType.ITEM_TOKEN_TRANSFER_FT:
        txResultMessageParser = new FungibleTransferMessageParser();
        break;
      case MessageType.ITEM_TOKEN_TRANSFER_FROM_FT:
        txResultMessageParser = new FungibleTransferFromMessageParser();
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
      case MessageType.ITEM_TOKEN_TRANSFER_NFT:
        txResultMessageParser = new NonFungibleTokenTransferMessageParser();
        break;
      case MessageType.ITEM_TOKEN_TRANSFER_FROM_NFT:
        txResultMessageParser = new NonFungibleTokenTransferFromMessageParser();
        break;
      case MessageType.COIN_SEND:
        txResultMessageParser = new BaseCoinSendMessageParser();
        break;
      case MessageType.ACCOUNT_MSG_EMPTY:
        txResultMessageParser = new AccountMsgEmptyMessageParser();
        break;
      default:
        return null;
    }
    return txResultMessageParser;
  }
}
