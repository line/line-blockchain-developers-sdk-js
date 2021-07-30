"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalTransactionSearchParameters = exports.PageRequest = exports.RequestType = exports.OrderBy = exports.UserProxyRequest = exports.IssueTransferSessionTokenRequest = exports.UserServiceTokenTransferRequest = exports.NonFungibleTokenDetachRequest = exports.NonFungibleTokenAttachRequest = exports.NonFungibleTokenBurnRequest = exports.MultiMintNonFungible = exports.NonFungibleTokenMultiMintRequest = exports.NonFungibleTokenMintRequest = exports.NonFungibleTokenCreateUpdateRequest = exports.FungibleTokenBurnRequest = exports.FungibleTokenMintRequest = exports.FungibleTokenCreateUpdateRequest = exports.TokenId = exports.BatchTransferNonFungibleTokenProxyRequest = exports.BatchTransferNonFungibleTokenRequest = exports.TransferNonFungibleTokenProxyRequest = exports.TransferNonFungibleTokenRequest = exports.TransferFungibleTokenProxyRequest = exports.TransferFungibleTokenRequest = exports.TransferServiceTokenProxyRequest = exports.TransferServiceTokenRequest = exports.TransferBaseCoinRequest = exports.MemoRequest = exports.MintServiceTokenRequest = exports.BurnFromServiceTokenRequest = exports.UpdateServiceTokenRequest = exports.AbstractTransactionRequest = exports.AbstractTokenBurnTransactionRequest = void 0;
const lodash_1 = __importDefault(require("lodash"));
class AbstractTokenBurnTransactionRequest {
    constructor(fromUserId, fromAddress) {
        this.fromUserId = fromUserId;
        this.fromAddress = fromAddress;
        if (!fromUserId && !fromAddress) {
            throw new Error("fromAddress or fromUserId, one of them is required");
        }
    }
}
exports.AbstractTokenBurnTransactionRequest = AbstractTokenBurnTransactionRequest;
class AbstractTransactionRequest {
    constructor(toAddress, toUserId) {
        this.toAddress = toAddress;
        this.toUserId = toUserId;
        if (!toUserId && !toAddress) {
            throw new Error("toAddress or toUserId, one of them is required");
        }
    }
}
exports.AbstractTransactionRequest = AbstractTransactionRequest;
class UpdateServiceTokenRequest {
    constructor(ownerAddress, ownerSecret, name, meta) {
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.name = name;
        this.meta = meta;
    }
}
exports.UpdateServiceTokenRequest = UpdateServiceTokenRequest;
class BurnFromServiceTokenRequest extends AbstractTokenBurnTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, fromUserId, fromAddress) {
        super(fromUserId, fromAddress);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
    }
}
exports.BurnFromServiceTokenRequest = BurnFromServiceTokenRequest;
class MintServiceTokenRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
    }
}
exports.MintServiceTokenRequest = MintServiceTokenRequest;
class MemoRequest {
    constructor(memo, walletAddress, walletSecret) {
        this.memo = memo;
        this.walletAddress = walletAddress;
        this.walletSecret = walletSecret;
    }
}
exports.MemoRequest = MemoRequest;
class TransferBaseCoinRequest extends AbstractTransactionRequest {
    constructor(walletSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.walletSecret = walletSecret;
        this.amount = amount;
    }
}
exports.TransferBaseCoinRequest = TransferBaseCoinRequest;
class TransferServiceTokenRequest extends AbstractTransactionRequest {
    constructor(walletSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.walletSecret = walletSecret;
        this.amount = amount;
    }
}
exports.TransferServiceTokenRequest = TransferServiceTokenRequest;
class TransferServiceTokenProxyRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
    }
}
exports.TransferServiceTokenProxyRequest = TransferServiceTokenProxyRequest;
class TransferFungibleTokenRequest extends AbstractTransactionRequest {
    constructor(walletSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.walletSecret = walletSecret;
        this.amount = amount;
    }
}
exports.TransferFungibleTokenRequest = TransferFungibleTokenRequest;
class TransferFungibleTokenProxyRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
    }
}
exports.TransferFungibleTokenProxyRequest = TransferFungibleTokenProxyRequest;
class TransferNonFungibleTokenRequest extends AbstractTransactionRequest {
    constructor(walletSecret, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.walletSecret = walletSecret;
    }
}
exports.TransferNonFungibleTokenRequest = TransferNonFungibleTokenRequest;
class TransferNonFungibleTokenProxyRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
    }
}
exports.TransferNonFungibleTokenProxyRequest = TransferNonFungibleTokenProxyRequest;
class BatchTransferNonFungibleTokenRequest extends AbstractTransactionRequest {
    constructor(walletSecret, transferList, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.walletSecret = walletSecret;
        this.transferList = transferList;
    }
}
exports.BatchTransferNonFungibleTokenRequest = BatchTransferNonFungibleTokenRequest;
class BatchTransferNonFungibleTokenProxyRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, transferList, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.transferList = transferList;
    }
}
exports.BatchTransferNonFungibleTokenProxyRequest = BatchTransferNonFungibleTokenProxyRequest;
class TokenId {
    constructor(tokenId) {
        this.tokenId = tokenId;
    }
    static from(value) {
        if (value.length != 16) {
            throw new Error("Invalid tokenId: length of token-id has to be 16");
        }
        if (!TokenId.tokenIdFormat.test(value)) {
            throw new Error(`Invalid tokenId: invalid format of tokenId, valid format is ${this.tokenIdFormat}`);
        }
        return new TokenId(value);
    }
    static fromMulti(values) {
        return lodash_1.default.map(values, (value => TokenId.from(value)));
    }
}
exports.TokenId = TokenId;
TokenId.tokenIdFormat = new RegExp("\\d{8}\\d{8}");
class FungibleTokenCreateUpdateRequest {
    constructor(ownerAddress, ownerSecret, name, meta) {
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.name = name;
        this.meta = meta;
    }
}
exports.FungibleTokenCreateUpdateRequest = FungibleTokenCreateUpdateRequest;
class FungibleTokenMintRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
    }
}
exports.FungibleTokenMintRequest = FungibleTokenMintRequest;
class FungibleTokenBurnRequest extends AbstractTokenBurnTransactionRequest {
    constructor(ownerAddress, ownerSecret, amount, fromUserId, fromAddress) {
        super(fromUserId, fromAddress);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.amount = amount;
        this.fromUserId = fromUserId;
        this.fromAddress = fromAddress;
    }
}
exports.FungibleTokenBurnRequest = FungibleTokenBurnRequest;
class NonFungibleTokenCreateUpdateRequest {
    constructor(ownerAddress, ownerSecret, name, meta) {
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.name = name;
        this.meta = meta;
    }
}
exports.NonFungibleTokenCreateUpdateRequest = NonFungibleTokenCreateUpdateRequest;
class NonFungibleTokenMintRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, name, meta, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.name = name;
        this.meta = meta;
    }
}
exports.NonFungibleTokenMintRequest = NonFungibleTokenMintRequest;
class NonFungibleTokenMultiMintRequest extends AbstractTransactionRequest {
    constructor(ownerAddress, ownerSecret, mintList, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.mintList = mintList;
    }
}
exports.NonFungibleTokenMultiMintRequest = NonFungibleTokenMultiMintRequest;
class MultiMintNonFungible {
    constructor(tokenType, name, meta) {
        this.tokenType = tokenType;
        this.name = name;
        this.meta = meta;
    }
}
exports.MultiMintNonFungible = MultiMintNonFungible;
class NonFungibleTokenBurnRequest extends AbstractTokenBurnTransactionRequest {
    constructor(ownerAddress, ownerSecret, fromUserId, fromAddress) {
        super(fromUserId, fromAddress);
        this.ownerAddress = ownerAddress;
        this.ownerSecret = ownerSecret;
        this.fromUserId = fromUserId;
        this.fromAddress = fromAddress;
    }
}
exports.NonFungibleTokenBurnRequest = NonFungibleTokenBurnRequest;
class NonFungibleTokenAttachRequest {
    constructor(parentTokenId, serviceWalletAddress, serviceWalletSecret, tokenHolderAddress, tokenHolderUserId) {
        this.parentTokenId = parentTokenId;
        this.serviceWalletAddress = serviceWalletAddress;
        this.serviceWalletSecret = serviceWalletSecret;
        this.tokenHolderAddress = tokenHolderAddress;
        this.tokenHolderUserId = tokenHolderUserId;
        if (tokenHolderAddress != null || tokenHolderUserId != null) {
            throw new Error("tokenHolderAddress or tokenHolderUserId, one of them is required");
        }
    }
}
exports.NonFungibleTokenAttachRequest = NonFungibleTokenAttachRequest;
class NonFungibleTokenDetachRequest {
    constructor(serviceWalletAddress, serviceWalletSecret, tokenHolderAddress, tokenHolderUserId) {
        this.serviceWalletAddress = serviceWalletAddress;
        this.serviceWalletSecret = serviceWalletSecret;
        this.tokenHolderAddress = tokenHolderAddress;
        this.tokenHolderUserId = tokenHolderUserId;
        if (tokenHolderAddress != null || tokenHolderUserId != null) {
            throw new Error("tokenHolderAddress or tokenHolderUserId, one of them is required");
        }
    }
}
exports.NonFungibleTokenDetachRequest = NonFungibleTokenDetachRequest;
class UserServiceTokenTransferRequest extends AbstractTransactionRequest {
    constructor(amount, toAddress = null, toUserId = null, landingUri) {
        super(toAddress, toUserId);
        this.amount = amount;
        this.landingUri = landingUri;
        if (Number(amount) <= 0) {
            throw new Error("Invalid amount - $amount is less than zero ");
        }
    }
}
exports.UserServiceTokenTransferRequest = UserServiceTokenTransferRequest;
class IssueTransferSessionTokenRequest extends AbstractTransactionRequest {
    constructor(amount, landingUri, toAddress, toUserId) {
        super(toAddress, toUserId);
        this.amount = amount;
        this.landingUri = landingUri;
        if (Number(amount) <= 0) {
            throw new Error("Invalid amount - $amount is less than zero ");
        }
    }
}
exports.IssueTransferSessionTokenRequest = IssueTransferSessionTokenRequest;
class UserProxyRequest {
    constructor(ownerAddress, landingUri) {
        this.ownerAddress = ownerAddress;
        this.landingUri = landingUri;
    }
}
exports.UserProxyRequest = UserProxyRequest;
var OrderBy;
(function (OrderBy) {
    OrderBy["ASC"] = "asc";
    OrderBy["DESC"] = "desc";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
var RequestType;
(function (RequestType) {
    RequestType["REDIRECT_URI"] = "redirect_uri";
    RequestType["AOA"] = "aoa";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
class PageRequest {
    constructor(page = 0, limit = 10, orderBy = OrderBy.ASC) {
        this.page = page;
        this.limit = limit;
        this.orderBy = orderBy;
    }
}
exports.PageRequest = PageRequest;
/*
This is for query-parameters to search transactions of a wallet and a user.
* after and before is time-stampe values
* available msgType can be found at constants.TransactionMsgTypes
*/
class OptionalTransactionSearchParameters {
    constructor(after, before, msgType) {
        this.after = after;
        this.before = before;
        this.msgType = msgType;
    }
}
exports.OptionalTransactionSearchParameters = OptionalTransactionSearchParameters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUF1QjtBQUV2QixNQUFhLG1DQUFtQztJQUU5QyxZQUNXLFVBQW1CLEVBQ25CLFdBQW9CO1FBRHBCLGVBQVUsR0FBVixVQUFVLENBQVM7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFFN0IsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7U0FDdEU7SUFDSCxDQUFDO0NBQ0Y7QUFWRCxrRkFVQztBQUVELE1BQWEsMEJBQTBCO0lBQ3JDLFlBQ1csU0FBa0IsRUFDbEIsUUFBaUI7UUFEakIsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRTFCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO1NBQ2xFO0lBQ0gsQ0FBQztDQUNGO0FBVEQsZ0VBU0M7QUFHRCxNQUFhLHlCQUF5QjtJQUNwQyxZQUNXLFlBQW9CLEVBQ3BCLFdBQW1CLEVBQ25CLElBQVksRUFDWixJQUFhO1FBSGIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFNBQUksR0FBSixJQUFJLENBQVM7SUFDcEIsQ0FBQztDQUNOO0FBUEQsOERBT0M7QUFFRCxNQUFhLDJCQUE0QixTQUFRLG1DQUFtQztJQUNsRixZQUNXLFlBQW9CLEVBQ3BCLFdBQW1CLEVBQ25CLE1BQWMsRUFDdkIsVUFBbUIsRUFDbkIsV0FBb0I7UUFFcEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQU5yQixpQkFBWSxHQUFa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