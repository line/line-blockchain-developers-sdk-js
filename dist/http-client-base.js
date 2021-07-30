"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const logger_factory_1 = require("./logger-factory");
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const signature_generator_1 = require("./signature-generator");
const constants_1 = require("./constants");
class HttpClient {
    constructor(baseURL, apiKey, apiSecret) {
        this.logger = logger_factory_1.LoggerFactory.logger("HttpClient");
        this._initializeResponseInterceptor = () => {
            this.instance.interceptors.response.use(this._handleResponse, this._handleError);
            this.instance.interceptors.request.use(this._handleRequest, this._handleError);
        };
        this._handleResponse = ({ data }) => {
            return data;
        };
        this._handleError = (error) => {
            this.logger.error("error response: ", error.response);
            return Promise.reject(error);
        };
        this._handleRequest = (config) => {
            if (config.data) {
                //clean null properties
                config.data = lodash_1.default.omitBy(config.data, lodash_1.default.isNil);
            }
            this.addRequestHeaders(config);
            return config;
        };
        this.instance = axios_1.default.create({
            baseURL,
        });
        this.serviceApiKey = apiKey;
        this.serviceApiSecret = apiSecret;
        this.instance.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
        this.instance.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8";
        this.instance.defaults.headers.delete["Content-Type"] = "application/json;charset=UTF-8";
        this._initializeResponseInterceptor();
    }
    // for test
    getAxiosInstance() {
        return this.instance;
    }
    addRequestHeaders(config) {
        const nonce = crypto_random_string_1.default({ length: 8 });
        const timestamp = Date.now();
        const method = config.method.toUpperCase();
        config.headers[constants_1.Constant.SERVICE_API_KEY_HEADER] = this.serviceApiKey;
        config.headers[constants_1.Constant.NONCE_HEADER] = nonce;
        config.headers[constants_1.Constant.SIGNATURE_HEADER] =
            signature_generator_1.SignatureGenerator.signature(this.serviceApiSecret, method, config.url, timestamp, nonce, config.params, config.data);
        config.headers[constants_1.Constant.TIMESTAMP_HEADER] = timestamp;
    }
    time() {
        return this.instance.get("/v1/time");
    }
    serviceDetail(serviceId) {
        const path = `/v1/services/${serviceId}`;
        return this.instance.get(path);
    }
    serviceTokens() {
        return this.instance.get(`/v1/service-tokens`);
    }
    serviceTokenDetail(contractId) {
        const path = `/v1/service-tokens/${contractId}`;
        return this.instance.get(path);
    }
    updateServiceToken(contractId, request) {
        const path = `/v1/service-tokens/${contractId}`;
        return this.instance.put(path, request);
    }
    mintServiceToken(contractId, request) {
        this.assertTransactionRequest(request);
        const path = `/v1/service-tokens/${contractId}/mint`;
        return this.instance.post(path, request);
    }
    burnFromServiceToken(contractId, request) {
        const path = `/v1/service-tokens/${contractId}/burn-from`;
        return this.instance.post(path, request);
    }
    serviceTokenHolders(contractId, pageRequest) {
        const path = `/v1/service-tokens/${contractId}/holders`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    itemToken(contractId) {
        const path = `/v1/item-tokens/${contractId}`;
        return this.instance.get(path);
    }
    fungibleTokens(contractId, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    createFungibleToken(contractId, request) {
        const path = `/v1/item-tokens/${contractId}/fungibles`;
        return this.instance.post(path, request);
    }
    fungibleToken(contractId, tokenType) {
        const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
        return this.instance.get(path);
    }
    updateFungibleToken(contractId, tokenType, request) {
        const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
        return this.instance.put(path, request);
    }
    mintFungibleToken(contractId, tokenType, request) {
        this.assertTransactionRequest(request);
        const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/mint`;
        return this.instance.post(path, request);
    }
    burnFungibleToken(contractId, tokenType, request) {
        this.assertItemTokenBurnTransactionRequest(request);
        const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/burn`;
        return this.instance.post(path, request);
    }
    fungibleTokenHolders(contractId, tokenType, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/holders`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    nonFungibleTokens(contractId, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    createNonFungibleToken(contractId, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles`;
        return this.instance.post(path, request);
    }
    nonFungibleTokenType(contractId, tokenType, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    updateNonFungibleTokenType(contractId, tokenType, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
        return this.instance.put(path, request);
    }
    nonFungibleToken(contractId, tokenType, tokenIndex) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
        return this.instance.get(path);
    }
    updateNonFungibleToken(contractId, tokenType, tokenIndex, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
        return this.instance.put(path, request);
    }
    mintNonFungibleToken(contractId, tokenType, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`;
        return this.instance.post(path, request);
    }
    nonFungibleTokenTypeHolders(contractId, tokenType, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/holders`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    // NFT has to belong to only one holder
    nonFungibleTokenHolder(contractId, tokenType, tokenIndex) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/holder`;
        return this.instance.get(path);
    }
    multiMintNonFungibleToken(contractId, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/multi-mint`;
        return this.instance.post(path, request);
    }
    burnNonFungibleToken(contractId, tokenType, tokenIndex, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/burn`;
        return this.instance.post(path, request);
    }
    childrenOfNonFungibleToken(contractId, tokenType, tokenIndex, pageRequest) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/children`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    parentOfNonFungibleToken(contractId, tokenType, tokenIndex) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
        return this.instance.get(path);
    }
    attachNonFungibleToken(contractId, tokenType, tokenIndex, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
        return this.instance.post(path, request);
    }
    detachNonFungibleToken(contractId, tokenType, tokenIndex, request) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
        // payload in delete has no defined semantics,
        // https://tools.ietf.org/html/rfc7231#page-29
        const requestConfig = this.detachRequestConfig(request);
        return this.instance.delete(path, requestConfig);
    }
    rootOfNonFungibleToken(contractId, tokenType, tokenIndex) {
        const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/root`;
        return this.instance.get(path);
    }
    wallets() {
        const path = `/v1/wallets`;
        return this.instance.get(path);
    }
    walletDetail(walletAddress) {
        const path = `/v1/wallets/${walletAddress}`;
        return this.instance.get(path);
    }
    walletTransactions(walletAddress, pageRequest, optionalTransactionSearchParameters) {
        const path = `/v1/wallets/${walletAddress}/transactions`;
        const requestConfig = this.pageRequestConfig(pageRequest, optionalTransactionSearchParameters);
        return this.instance.get(path, requestConfig);
    }
    baseCoinBalanceOfWallet(walletAddress) {
        const path = `/v1/wallets/${walletAddress}/base-coin`;
        return this.instance.get(path);
    }
    serviceTokenBalancesOfWallet(walletAddress, pageRequest) {
        const path = `/v1/wallets/${walletAddress}/service-tokens`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    serviceTokenBalanceOfWallet(walletAddress, contractId) {
        const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}`;
        return this.instance.get(path);
    }
    fungibleTokenBalancesOfWallet(walletAddress, contractId, pageRequest) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    fungibleTokenBalanceOfWallet(walletAddress, contractId, tokenType) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}`;
        return this.instance.get(path);
    }
    nonFungibleTokenBalancesOfWallet(walletAddress, contractId, pageRequest) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    nonFungibleTokenBalancesByTypeOfWallet(walletAddress, contractId, tokenType, pageRequest) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    nonFungibleTokenBalanceOfWallet(walletAddress, contractId, tokenType, tokenIndex) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
        return this.instance.get(path);
    }
    transferBaseCoinOfWallet(walletAddress, request) {
        const path = `/v1/wallets/${walletAddress}/base-coin/transfer`;
        return this.instance.post(path, request);
    }
    transferServiceTokenOfWallet(walletAddress, contractId, request) {
        const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}/transfer`;
        return this.instance.post(path, request);
    }
    transferFungibleTokenOfWallet(walletAddress, contractId, tokenType, request) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`;
        return this.instance.post(path, request);
    }
    transferNonFungibleTokenOfWallet(walletAddress, contractId, tokenType, tokenIndex, request) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`;
        return this.instance.post(path, request);
    }
    batchTransferNonFungibleTokenOfWallet(walletAddress, contractId, request) {
        const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/batch-transfer`;
        return this.instance.post(path, request);
    }
    userDetail(userId) {
        const path = `/v1/users/${userId}`;
        return this.instance.get(path);
    }
    userTransactions(userId, pageRequest, optionalTransactionSearchParameters) {
        const path = `/v1/users/${userId}/transactions`;
        const requestConfig = this.pageRequestConfig(pageRequest, optionalTransactionSearchParameters);
        return this.instance.get(path, requestConfig);
    }
    baseCoinBalanceOfUser(userId) {
        const path = `/v1/users/${userId}/base-coin`;
        return this.instance.get(path);
    }
    serviceTokenBalancesOfUser(userId, pageRequest) {
        const path = `/v1/users/${userId}/service-tokens`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    serviceTokenBalanceOfUser(userId, contractId) {
        const path = `/v1/users/${userId}/service-tokens/${contractId}`;
        return this.instance.get(path);
    }
    fungibleTokenBalancesOfUser(userId, contractId, pageRequest) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    fungibleTokenBalanceOfUser(userId, contractId, tokenType) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}`;
        return this.instance.get(path);
    }
    nonFungibleTokenBalancesOfUser(userId, contractId, pageRequest) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    nonFungibleTokenBalancesByTypeOfUser(userId, contractId, tokenType, pageRequest) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}`;
        const requestConfig = this.pageRequestConfig(pageRequest);
        return this.instance.get(path, requestConfig);
    }
    nonFungibleTokenBalanceOfUser(userId, contractId, tokenType, tokenIndex) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
        return this.instance.get(path);
    }
    transferServiceTokenOfUser(userId, contractId, request) {
        const path = `/v1/users/${userId}/service-tokens/${contractId}/transfer`;
        return this.instance.post(path, request);
    }
    transferFungibleTokenOfUser(userId, contractId, tokenType, request) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`;
        return this.instance.post(path, request);
    }
    transferNonFungibleTokenOfUser(userId, contractId, tokenType, tokenIndex, request) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`;
        return this.instance.post(path, request);
    }
    batchTransferNonFungibleTokenOfUser(userId, contractId, request) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/batch-transfer`;
        return this.instance.post(path, request);
    }
    issueSessionTokenForBaseCoinTransfer(userId, requestType, request) {
        const path = `/v1/users/${userId}/base-coin/request-transfer`;
        const requestTypeParam = this.requestTypeParam(requestType);
        return this.instance.post(path, request, requestTypeParam);
    }
    issueSessionTokenForServiceTokenTransfer(userId, contractId, requestType, request) {
        const path = `/v1/users/${userId}/service-tokens/${contractId}/request-transfer`;
        const requestTypeParam = this.requestTypeParam(requestType);
        return this.instance.post(path, request, requestTypeParam);
    }
    issueServiceTokenProxyRequest(userId, contractId, requestType, request) {
        const path = `/v1/users/${userId}/service-tokens/${contractId}/request-proxy`;
        const requestTypeParam = this.requestTypeParam(requestType);
        return this.instance.post(path, request, requestTypeParam);
    }
    issueItemTokenProxyRequest(userId, contractId, requestType, request) {
        const path = `/v1/users/${userId}/item-tokens/${contractId}/request-proxy`;
        const requestTypeParam = this.requestTypeParam(requestType);
        return this.instance.post(path, request, requestTypeParam);
    }
    commitProxyRequest(requestSessionToken) {
        const path = `/v1/user-requests/${requestSessionToken}/commit`;
        return this.instance.post(path);
    }
    transactionResult(txHash) {
        const path = `/v1/transactions/${txHash}`;
        return this.instance.get(path);
    }
    createMemo(request) {
        const path = `/v1/memos`;
        return this.instance.post(path, request);
    }
    memos(txHash) {
        const path = `/v1/memos/${txHash}`;
        return this.instance.get(path);
    }
    requestTypeParam(requestType) {
        return {
            "params": {
                "requestType": requestType
            }
        };
    }
    pageRequestConfig(pageRequest, optionalTransactionSearchParameters) {
        // paging parameters sorted by its key when generating signature
        var pagingParams = {
            "limit": pageRequest.limit,
            "page": pageRequest.page,
            "orderBy": pageRequest.orderBy
        };
        if (optionalTransactionSearchParameters) {
            if (optionalTransactionSearchParameters.before) {
                pagingParams["before"] = optionalTransactionSearchParameters.before;
            }
            if (optionalTransactionSearchParameters.after) {
                pagingParams["after"] = optionalTransactionSearchParameters.after;
            }
            if (optionalTransactionSearchParameters.msgType) {
                pagingParams["msgType"] = optionalTransactionSearchParameters.msgType;
            }
        }
        return {
            "params": Object.keys(pagingParams).sort().reduce((r, k) => (r[k] = pagingParams[k], r), {})
        };
    }
    detachRequestConfig(detachRequest) {
        var detachNonFungibleParams = lodash_1.default.omitBy(detachRequest, lodash_1.default.isNil);
        return {
            "data": Object.keys(detachNonFungibleParams).sort().reduce((r, k) => (r[k] = detachNonFungibleParams[k], r), {})
        };
    }
    assertTransactionRequest(request) {
        if (!request.toUserId && !request.toAddress) {
            this.logger.error("toAddress or toUserId, one of them is required");
            throw new Error("toAddress or toUserId, one of them is required");
        }
    }
    assertItemTokenBurnTransactionRequest(request) {
        if (!request.fromUserId && !request.fromAddress) {
            this.logger.error("fromAddress or fromUserId, one of them is required");
            throw new Error("fromAddress or fromUserId, one of them is required");
        }
    }
}
exports.HttpClient = HttpClient;
