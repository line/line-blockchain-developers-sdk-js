"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSessionStatus = exports.SessionTokenResponse = exports.UserIdAddress = exports.NonFungibleTokenHolder = exports.NonFungibleTokenTypeHolder = exports.NonFungibleId = exports.NonFungibleIndex = exports.NonFungibleTokenType = exports.ItemTokenType = exports.FungibleTokenHolder = exports.FungibleToken = exports.ItemToken = exports.TokenIndex = exports.NonFungibleBalance = exports.FungibleBalance = exports.ServiceTokenBalance = exports.WalletResponse = exports.Memo = exports.CoinResponse = exports.BaseCoinBalance = exports.SignatureResponse = exports.FeeResponse = exports.StdTxResponse = exports.TypedValueResponse = exports.KeyValueResponse = exports.EventResponse = exports.LogResponse = exports.TxResultResponse = exports.TransactionResponse = exports.ServiceTokenHolder = exports.ServiceToken = exports.RequestSessionTokenStatus = exports.UserRequestStatus = exports.ServiceDetail = exports.GenericResponse = void 0;
class GenericResponse {
    constructor(responseTime, statusCode, statusMessage, responseData) {
        this.responseTime = responseTime;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.responseData = responseData;
    }
}
exports.GenericResponse = GenericResponse;
class ServiceDetail {
    constructor(serviceId, name, category, description) {
        this.serviceId = serviceId;
        this.name = name;
        this.category = category;
        this.description = description;
    }
}
exports.ServiceDetail = ServiceDetail;
class UserRequestStatus {
    constructor(status) {
        this.status = status;
    }
}
exports.UserRequestStatus = UserRequestStatus;
var RequestSessionTokenStatus;
(function (RequestSessionTokenStatus) {
    RequestSessionTokenStatus[RequestSessionTokenStatus["Authorized"] = 0] = "Authorized";
    RequestSessionTokenStatus[RequestSessionTokenStatus["Unauthorized"] = 1] = "Unauthorized";
})(RequestSessionTokenStatus = exports.RequestSessionTokenStatus || (exports.RequestSessionTokenStatus = {}));
class ServiceToken {
    constructor(contractId, ownerAddress, createdAt, serviceId, decimals, name, symbol, meta, imgUri, totalSupply, totalMint, totalBurn) {
        this.contractId = contractId;
        this.ownerAddress = ownerAddress;
        this.createdAt = createdAt;
        this.serviceId = serviceId;
        this.decimals = decimals;
        this.name = name;
        this.symbol = symbol;
        this.meta = meta;
        this.imgUri = imgUri;
        this.totalSupply = totalSupply;
        this.totalMint = totalMint;
        this.totalBurn = totalBurn;
    }
}
exports.ServiceToken = ServiceToken;
class ServiceTokenHolder {
    constructor(address, amount, userId) {
        this.address = address;
        this.amount = amount;
        this.userId = userId;
    }
}
exports.ServiceTokenHolder = ServiceTokenHolder;
class TransactionResponse {
    constructor(txHash) {
        this.txHash = txHash;
    }
}
exports.TransactionResponse = TransactionResponse;
class TxResultResponse {
    constructor(height, txhash, code, index, gasUsed, tx, timestamp, codespace, data, logs, info, gasWanted) {
        this.height = height;
        this.txhash = txhash;
        this.code = code;
        this.index = index;
        this.gasUsed = gasUsed;
        this.tx = tx;
        this.timestamp = timestamp;
        this.codespace = codespace;
        this.data = data;
        this.logs = logs;
        this.info = info;
        this.gasWanted = gasWanted;
    }
}
exports.TxResultResponse = TxResultResponse;
class LogResponse {
    constructor(msgIndex, log, events) {
        this.msgIndex = msgIndex;
        this.log = log;
        this.events = events;
    }
}
exports.LogResponse = LogResponse;
class EventResponse {
    constructor(type, attributes) {
        this.type = type;
        this.attributes = attributes;
    }
}
exports.EventResponse = EventResponse;
class KeyValueResponse {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
exports.KeyValueResponse = KeyValueResponse;
class TypedValueResponse {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
exports.TypedValueResponse = TypedValueResponse;
class StdTxResponse {
    constructor(msg, fee, memo, signatures) {
        this.msg = msg;
        this.fee = fee;
        this.memo = memo;
        this.signatures = signatures;
    }
}
exports.StdTxResponse = StdTxResponse;
class FeeResponse {
    constructor(gas, amount) {
        this.gas = gas;
        this.amount = amount;
    }
}
exports.FeeResponse = FeeResponse;
class SignatureResponse {
    constructor(signature, pubKey) {
        this.signature = signature;
        this.pubKey = pubKey;
    }
}
exports.SignatureResponse = SignatureResponse;
class BaseCoinBalance {
    constructor(symbol, decimals, amount) {
        this.symbol = symbol;
        this.decimals = decimals;
        this.amount = amount;
    }
}
exports.BaseCoinBalance = BaseCoinBalance;
class CoinResponse {
    constructor(denom, amount) {
        this.denom = denom;
        this.amount = amount;
    }
    toString() {
        return this.amount.toString() + this.denom;
    }
}
exports.CoinResponse = CoinResponse;
class Memo {
    constructor(memo) {
        this.memo = memo;
    }
}
exports.Memo = Memo;
class WalletResponse {
    constructor(name, walletAddress, createdAt) {
        this.name = name;
        this.walletAddress = walletAddress;
        this.createdAt = createdAt;
    }
}
exports.WalletResponse = WalletResponse;
class ServiceTokenBalance {
    constructor(contractId, name, symbol, imgUri, decimals, amount) {
        this.contractId = contractId;
        this.name = name;
        this.symbol = symbol;
        this.imgUri = imgUri;
        this.decimals = decimals;
        this.amount = amount;
    }
}
exports.ServiceTokenBalance = ServiceTokenBalance;
class FungibleBalance {
    constructor(tokenType, name, meta, amount) {
        this.tokenType = tokenType;
        this.name = name;
        this.meta = meta;
        this.amount = amount;
    }
}
exports.FungibleBalance = FungibleBalance;
class NonFungibleBalance {
    constructor(tokenType, name, meta, numberOfIndex) {
        this.tokenType = tokenType;
        this.name = name;
        this.meta = meta;
        this.numberOfIndex = numberOfIndex;
    }
}
exports.NonFungibleBalance = NonFungibleBalance;
class TokenIndex {
    constructor(tokenIndex, name, meta) {
        this.tokenIndex = tokenIndex;
        this.name = name;
        this.meta = meta;
    }
}
exports.TokenIndex = TokenIndex;
class ItemToken {
    constructor(contractId, baseImgUri, ownerAddress, serviceId, createdAt) {
        this.contractId = contractId;
        this.baseImgUri = baseImgUri;
        this.ownerAddress = ownerAddress;
        this.serviceId = serviceId;
        this.createdAt = createdAt;
    }
}
exports.ItemToken = ItemToken;
class FungibleToken {
    constructor(name, meta, tokenType, totalSupply, totalMint, totalBurn, createdAt) {
        this.name = name;
        this.meta = meta;
        this.tokenType = tokenType;
        this.totalSupply = totalSupply;
        this.totalMint = totalMint;
        this.totalBurn = totalBurn;
        this.createdAt = createdAt;
    }
}
exports.FungibleToken = FungibleToken;
class FungibleTokenHolder {
    constructor(walletAddress, amount, userId) {
        this.walletAddress = walletAddress;
        this.amount = amount;
        this.userId = userId;
    }
}
exports.FungibleTokenHolder = FungibleTokenHolder;
class ItemTokenType {
    constructor(name, meta, tokenType, totalSupply, totalMint, totalBurn, createdAt) {
        this.name = name;
        this.meta = meta;
        this.tokenType = tokenType;
        this.totalSupply = totalSupply;
        this.totalMint = totalMint;
        this.totalBurn = totalBurn;
        this.createdAt = createdAt;
    }
}
exports.ItemTokenType = ItemTokenType;
class NonFungibleTokenType {
    constructor(name, meta, tokenType, totalSupply, totalMint, totalBurn, createdAt, tokens) {
        this.name = name;
        this.meta = meta;
        this.tokenType = tokenType;
        this.totalSupply = totalSupply;
        this.totalMint = totalMint;
        this.totalBurn = totalBurn;
        this.createdAt = createdAt;
        this.tokens = tokens;
    }
}
exports.NonFungibleTokenType = NonFungibleTokenType;
class NonFungibleIndex {
    constructor(tokenIndex, name, meta, createdAt, burnedAt) {
        this.tokenIndex = tokenIndex;
        this.name = name;
        this.meta = meta;
        this.createdAt = createdAt;
        this.burnedAt = burnedAt;
    }
}
exports.NonFungibleIndex = NonFungibleIndex;
class NonFungibleId {
    constructor(tokenId, name, meta, createdAt, burnedAt) {
        this.tokenId = tokenId;
        this.name = name;
        this.meta = meta;
        this.createdAt = createdAt;
        this.burnedAt = burnedAt;
    }
}
exports.NonFungibleId = NonFungibleId;
class NonFungibleTokenTypeHolder {
    constructor(walletAddress, numberOfIndex, userId) {
        this.walletAddress = walletAddress;
        this.numberOfIndex = numberOfIndex;
        this.userId = userId;
    }
}
exports.NonFungibleTokenTypeHolder = NonFungibleTokenTypeHolder;
class NonFungibleTokenHolder {
    constructor(tokenId, walletAddress, amount, userId) {
        this.tokenId = tokenId;
        this.walletAddress = walletAddress;
        this.amount = amount;
        this.userId = userId;
    }
}
exports.NonFungibleTokenHolder = NonFungibleTokenHolder;
class UserIdAddress {
    constructor(userId, address) {
        this.userId = userId;
        this.address = address;
    }
}
exports.UserIdAddress = UserIdAddress;
class SessionTokenResponse {
    constructor(requestSessionToken, redirectUri) {
        this.requestSessionToken = requestSessionToken;
        this.redirectUri = redirectUri;
    }
}
exports.SessionTokenResponse = SessionTokenResponse;
class RequestSessionStatus {
    constructor(status) {
        this.status = status;
    }
}
exports.RequestSessionStatus = RequestSessionStatus;
