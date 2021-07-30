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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxlQUFlO0lBQzFCLFlBQ1csWUFBb0IsRUFDcEIsVUFBa0IsRUFDbEIsYUFBcUIsRUFDckIsWUFBZ0I7UUFIaEIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBSTtJQUFJLENBQUM7Q0FDakM7QUFORCwwQ0FNQztBQUVELE1BQWEsYUFBYTtJQUN4QixZQUNXLFNBQWlCLEVBQ2pCLElBQVksRUFDWixRQUFnQixFQUNoQixXQUFvQjtRQUhwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO0lBQzNCLENBQUM7Q0FDTjtBQVBELHNDQU9DO0FBRUQsTUFBYSxpQkFBaUI7SUFDNUIsWUFBcUIsTUFBaUM7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7SUFBSSxDQUFDO0NBQzVEO0FBRkQsOENBRUM7QUFFRCxJQUFZLHlCQUdYO0FBSEQsV0FBWSx5QkFBeUI7SUFDbkMscUZBQVUsQ0FBQTtJQUNWLHlGQUFZLENBQUE7QUFDZCxDQUFDLEVBSFcseUJBQXlCLEdBQXpCLGlDQUF5QixLQUF6QixpQ0FBeUIsUUFHcEM7QUFHRCxNQUFhLFlBQVk7SUFDdkIsWUFDVyxVQUFrQixFQUNsQixZQUFvQixFQUNwQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixJQUFZLEVBQ1osTUFBYyxFQUNkLElBQVksRUFDWixNQUFjLEVBQ2QsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsU0FBaUI7UUFYakIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQ3hCLENBQUM7Q0FDTjtBQWZELG9DQWVDO0FBRUQsTUFBYSxrQkFBa0I7SUFDN0IsWUFDVyxPQUFlLEVBQ2YsTUFBYyxFQUNkLE1BQWU7UUFGZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVM7SUFDdEIsQ0FBQztDQUNOO0FBTkQsZ0RBTUM7QUFFRCxNQUFhLG1CQUFtQjtJQUM5QixZQUFxQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7Q0FDekM7QUFGRCxrREFFQztBQUVELE1BQWEsZ0JBQWdCO0lBQzNCLFlBQ1csTUFBYyxFQUNkLE1BQWMsRUFDZCxJQUFZLEVBQ1osS0FBYSxFQUNiLE9BQWUsRUFDZixFQUFxQyxFQUNyQyxTQUFpQixFQUNqQixTQUFrQixFQUNsQixJQUFhLEVBQ2IsSUFBeUIsRUFDekIsSUFBYSxFQUNiLFNBQWtCO1FBWGxCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsT0FBRSxHQUFGLEVBQUUsQ0FBbUM7UUFDckMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFTO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVM7UUFDYixTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUN6QixDQUFDO0NBQ047QUFmRCw0Q0FlQztBQUdELE1BQWEsV0FBVztJQUN0QixZQUNXLFFBQWdCLEVBQ2hCLEdBQVcsRUFDWCxNQUE2QjtRQUY3QixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDWCxXQUFNLEdBQU4sTUFBTSxDQUF1QjtJQUNwQyxDQUFDO0NBQ047QUFORCxrQ0FNQztBQUVELE1BQWEsYUFBYTtJQUN4QixZQUNXLElBQVksRUFDWixVQUEyQztRQUQzQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osZUFBVSxHQUFWLFVBQVUsQ0FBaUM7SUFDbEQsQ0FBQztDQUNOO0FBTEQsc0NBS0M7QUFFRCxNQUFhLGdCQUFnQjtJQUMzQixZQUFxQixHQUFXLEVBQVcsS0FBUztRQUEvQixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVcsVUFBSyxHQUFMLEtBQUssQ0FBSTtJQUFJLENBQUM7Q0FDMUQ7QUFGRCw0Q0FFQztBQUNELE1BQWEsa0JBQWtCO0lBQzdCLFlBQXFCLElBQVksRUFBVyxLQUFRO1FBQS9CLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVyxVQUFLLEdBQUwsS0FBSyxDQUFHO0lBQUksQ0FBQztDQUMxRDtBQUZELGdEQUVDO0FBRUQsTUFBYSxhQUFhO0lBQ3hCLFlBQ1csR0FBbUMsRUFDbkMsR0FBZ0IsRUFDaEIsSUFBWSxFQUNaLFVBQW9DO1FBSHBDLFFBQUcsR0FBSCxHQUFHLENBQWdDO1FBQ25DLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGVBQVUsR0FBVixVQUFVLENBQTBCO0lBQzNDLENBQUM7Q0FDTjtBQVBELHNDQU9DO0FBRUQsTUFBYSxXQUFXO0lBQ3RCLFlBQXFCLEdBQWUsRUFBVyxNQUEyQjtRQUFyRCxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVcsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7SUFBSSxDQUFDO0NBQ2hGO0FBRkQsa0NBRUM7QUFDRCxNQUFhLGlCQUFpQjtJQUM1QixZQUNXLFNBQXNCLEVBQ3RCLE1BQXdDO1FBRHhDLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0M7SUFDL0MsQ0FBQztDQUNOO0FBTEQsOENBS0M7QUFFRCxNQUFhLGVBQWU7SUFDMUIsWUFDVyxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsTUFBYztRQUZkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQztDQUNOO0FBTkQsMENBTUM7QUFFRCxNQUFhLFlBQVk7SUFDdkIsWUFBcUIsS0FBYSxFQUFXLE1BQWM7UUFBdEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFXLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBQ2hFLFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUM1QyxDQUFDO0NBQ0Y7QUFMRCxvQ0FLQztBQUVELE1BQWEsSUFBSTtJQUNmLFlBQXFCLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUksQ0FBQztDQUN2QztBQUZELG9CQUVDO0FBRUQsTUFBYSxjQUFjO0lBQ3pCLFlBQ1csSUFBWSxFQUNaLGFBQXFCLEVBQ3JCLFNBQWlCO1FBRmpCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQ3hCLENBQUM7Q0FDTjtBQU5ELHdDQU1DO0FBRUQsTUFBYSxtQkFBbUI7SUFDOUIsWUFDVyxVQUFrQixFQUNsQixJQUFZLEVBQ1osTUFBYyxFQUNkLE1BQWMsRUFDZCxRQUFnQixFQUNoQixNQUFjO1FBTGQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDckIsQ0FBQztDQUNOO0FBVEQsa0RBU0M7QUFFRCxNQUFhLGVBQWU7SUFDMUIsWUFDVyxTQUFpQixFQUNqQixJQUFZLEVBQ1osSUFBWSxFQUNaLE1BQWM7UUFIZCxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDO0NBQ047QUFQRCwwQ0FPQztBQUVELE1BQWEsa0JBQWtCO0lBQzdCLFlBQ1csU0FBaUIsRUFDakIsSUFBWSxFQUNaLElBQVksRUFDWixhQUFxQjtRQUhyQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osa0JBQWEsR0FBYixhQUFhLENBQVE7SUFDNUIsQ0FBQztDQUNOO0FBUEQsZ0RBT0M7QUFFRCxNQUFhLFVBQVU7SUFDckIsWUFBcUIsVUFBa0IsRUFBVyxJQUFZLEVBQVcsSUFBWTtRQUFoRSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFXLFNBQUksR0FBSixJQUFJLENBQVE7SUFBSSxDQUFDO0NBQzNGO0FBRkQsZ0NBRUM7QUFFRCxNQUFhLFNBQVM7SUFDcEIsWUFDVyxVQUFrQixFQUNsQixVQUFrQixFQUNsQixZQUFvQixFQUNwQixTQUFpQixFQUNqQixTQUFpQjtRQUpqQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQ3hCLENBQUM7Q0FDTjtBQVJELDhCQVFDO0FBRUQsTUFBYSxhQUFhO0lBQ3hCLFlBQ1csSUFBWSxFQUNaLElBQVksRUFDWixTQUFpQixFQUNqQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixTQUFpQjtRQU5qQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFDeEIsQ0FBQztDQUNOO0FBVkQsc0NBVUM7QUFFRCxNQUFhLG1CQUFtQjtJQUM5QixZQUNXLGFBQXFCLEVBQ3JCLE1BQWMsRUFDZCxNQUFlO1FBRmYsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVM7SUFDdEIsQ0FBQztDQUNOO0FBTkQsa0RBTUM7QUFFRCxNQUFhLGFBQWE7SUFDeEIsWUFDVyxJQUFZLEVBQ1osSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFNBQWlCO1FBTmpCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUN4QixDQUFDO0NBQ047QUFWRCxzQ0FVQztBQUVELE1BQWEsb0JBQW9CO0lBQy9CLFlBQ1csSUFBWSxFQUNaLElBQVksRUFDWixTQUFpQixFQUNqQixXQUF1QixFQUN2QixTQUFxQixFQUNyQixTQUFxQixFQUNyQixTQUFpQixFQUNqQixNQUErQjtRQVAvQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7SUFDdEMsQ0FBQztDQUNOO0FBWEQsb0RBV0M7QUFFRCxNQUFhLGdCQUFnQjtJQUMzQixZQUNXLFVBQWtCLEVBQ2xCLElBQVksRUFDWixJQUFZLEVBQ1osU0FBaUIsRUFDakIsUUFBaUI7UUFKakIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUN4QixDQUFDO0NBQ047QUFSRCw0Q0FRQztBQUVELE1BQWEsYUFBYTtJQUN4QixZQUNXLE9BQWUsRUFDZixJQUFZLEVBQ1osSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLFFBQWlCO1FBSmpCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUN4QixDQUFDO0NBQ047QUFSRCxzQ0FRQztBQUVELE1BQWEsMEJBQTBCO0lBQ3JDLFlBQ1csYUFBcUIsRUFDckIsYUFBcUIsRUFDckIsTUFBZTtRQUZmLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVM7SUFDdEIsQ0FBQztDQUNOO0FBTkQsZ0VBTUM7QUFFRCxNQUFhLHNCQUFzQjtJQUNqQyxZQUNXLE9BQWUsRUFDZixhQUFxQixFQUNyQixNQUFjLEVBQ2QsTUFBZTtRQUhmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUztJQUN0QixDQUFDO0NBQ047QUFQRCx3REFPQztBQUVELE1BQWEsYUFBYTtJQUN4QixZQUFxQixNQUFjLEVBQVcsT0FBZTtRQUF4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUFJLENBQUM7Q0FDbkU7QUFGRCxzQ0FFQztBQUNELE1BQWEsb0JBQW9CO0lBQy9CLFlBQXFCLG1CQUEyQixFQUFXLFdBQW1CO1FBQXpELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUTtRQUFXLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUksQ0FBQztDQUNwRjtBQUZELG9EQUVDO0FBRUQsTUFBYSxvQkFBb0I7SUFDL0IsWUFBcUIsTUFBaUM7UUFBakMsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7SUFBRyxDQUFDO0NBQzNEO0FBRkQsb0RBRUMifQ==