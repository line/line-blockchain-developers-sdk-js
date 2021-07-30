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
