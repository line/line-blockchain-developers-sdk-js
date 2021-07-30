"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMsgTypes = exports.Constant = void 0;
class Constant {
}
exports.Constant = Constant;
Constant.SERVICE_API_KEY_HEADER = "service-api-key";
Constant.SIGNATURE_HEADER = "Signature";
Constant.TIMESTAMP_HEADER = "Timestamp";
Constant.NONCE_HEADER = "Nonce";
class TransactionMsgTypes {
}
exports.TransactionMsgTypes = TransactionMsgTypes;
TransactionMsgTypes.COIN_MSGSEND = "coin/MsgSend";
TransactionMsgTypes.TOKEN_MSGISSUE = "token/MsgIssue";
TransactionMsgTypes.TOKEN_MSGMINT = "token/MsgMint";
TransactionMsgTypes.TOKEN_MSGBURN = "token/MsgBurn";
TransactionMsgTypes.TOKEN_MSGBURNFROM = "token/MsgBurnFrom";
TransactionMsgTypes.TOKEN_MSGTRANSFER = "token/MsgTransfer";
TransactionMsgTypes.TOKEN_MSGTRANSFERFROM = "token/MsgTransferFrom";
TransactionMsgTypes.TOKEN_MSGMODIFY = "token/MsgModify";
TransactionMsgTypes.TOKEN_MSGAPPROVE = "token/MsgApprove";
TransactionMsgTypes.COLLECTION_MSGCREATECOLLECTION = "collection/MsgCreateCollection";
TransactionMsgTypes.COLLECTION_MSGISSUEFT = "collection/MsgIssueFT";
TransactionMsgTypes.COLLECTION_MSGISSUENFT = "collection/MsgIssueNFT";
TransactionMsgTypes.COLLECTION_MSGMINTFT = "collection/MsgMintFT";
TransactionMsgTypes.COLLECTION_MSGMINTNFT = "collection/MsgMintNFT";
TransactionMsgTypes.COLLECTION_MSGBURNFT = "collection/MsgBurnFT";
TransactionMsgTypes.COLLECTION_MSGBURNFTFROM = "collection/MsgBurnFTFrom";
TransactionMsgTypes.COLLECTION_MSGBURNNFT = "collection/MsgBurnNFT";
TransactionMsgTypes.COLLECTION_MSGBURNNFTFROM = "collection/MsgBurnNFTFrom";
TransactionMsgTypes.COLLECTION_MSGTRANSFERFT = "collection/MsgTransferFT";
TransactionMsgTypes.COLLECTION_MSGTRANSFERFTFROM = "collection/MsgTransferFTFrom";
TransactionMsgTypes.COLLECTION_MSGTRANSFERNFT = "collection/MsgTransferNFT";
TransactionMsgTypes.COLLECTION_MSGTRANSFERNFTFROM = "collection/MsgTransferNFTFrom";
TransactionMsgTypes.COLLECTION_MSGATTACH = "collection/MsgAttach";
TransactionMsgTypes.COLLECTION_MSGATTACHFROM = "collection/MsgAttachFrom";
TransactionMsgTypes.COLLECTION_MSGDETACH = "collection/MsgDetach";
TransactionMsgTypes.COLLECTION_MSGDETACHFROM = "collection/MsgDetachFrom";
TransactionMsgTypes.COLLECTION_MSGAPPROVE = "collection/MsgApprove";
TransactionMsgTypes.COLLECTION_MSGMODIFY = "collection/MsgModify";
TransactionMsgTypes.ACCOUNT_MSGEMPTY = "account/MsgEmpty";
