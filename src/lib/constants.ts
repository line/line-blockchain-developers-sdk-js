export class Constant  {
  static SERVICE_API_KEY_HEADER = "service-api-key"
  static SIGNATURE_HEADER = "Signature"
  static TIMESTAMP_HEADER = "Timestamp"
  static NONCE_HEADER = "Nonce"
}

export class TransactionMsgTypes {
  static COIN_MSGSEND = "coin/MsgSend";
  static TOKEN_MSGISSUE = "token/MsgIssue";
  static TOKEN_MSGMINT = "token/MsgMint";
  static TOKEN_MSGBURN = "token/MsgBurn";
  static TOKEN_MSGBURNFROM = "token/MsgBurnFrom";
  static TOKEN_MSGTRANSFER = "token/MsgTransfer";
  static TOKEN_MSGTRANSFERFROM = "token/MsgTransferFrom";
  static TOKEN_MSGMODIFY = "token/MsgModify";
  static TOKEN_MSGAPPROVE = "token/MsgApprove";
  static COLLECTION_MSGCREATECOLLECTION = "collection/MsgCreateCollection";
  static COLLECTION_MSGISSUEFT = "collection/MsgIssueFT";
  static COLLECTION_MSGISSUENFT = "collection/MsgIssueNFT";
  static COLLECTION_MSGMINTFT = "collection/MsgMintFT";
  static COLLECTION_MSGMINTNFT = "collection/MsgMintNFT";
  static COLLECTION_MSGBURNFT = "collection/MsgBurnFT";
  static COLLECTION_MSGBURNFTFROM = "collection/MsgBurnFTFrom";
  static COLLECTION_MSGBURNNFT = "collection/MsgBurnNFT";
  static COLLECTION_MSGBURNNFTFROM = "collection/MsgBurnNFTFrom";
  static COLLECTION_MSGTRANSFERFT = "collection/MsgTransferFT";
  static COLLECTION_MSGTRANSFERFTFROM = "collection/MsgTransferFTFrom";
  static COLLECTION_MSGTRANSFERNFT = "collection/MsgTransferNFT";
  static COLLECTION_MSGTRANSFERNFTFROM = "collection/MsgTransferNFTFrom";
  static COLLECTION_MSGATTACH = "collection/MsgAttach";
  static COLLECTION_MSGATTACHFROM = "collection/MsgAttachFrom";
  static COLLECTION_MSGDETACH = "collection/MsgDetach";
  static COLLECTION_MSGDETACHFROM = "collection/MsgDetachFrom";
  static COLLECTION_MSGAPPROVE = "collection/MsgApprove";
  static COLLECTION_MSGMODIFY = "collection/MsgModify";
  static ACCOUNT_MSGEMPTY = "account/MsgEmpty";
}
