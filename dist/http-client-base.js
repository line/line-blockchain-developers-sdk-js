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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9odHRwLWNsaWVudC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFEQUFpRDtBQUNqRCxvREFBdUI7QUFDdkIsa0RBQWdGO0FBQ2hGLGdGQUFzRDtBQXVEdEQsK0RBQTJEO0FBQzNELDJDQUF1QztBQU12QyxNQUFhLFVBQVU7SUFNckIsWUFDRSxPQUFlLEVBQ2YsTUFBYyxFQUNkLFNBQWlCO1FBUlgsV0FBTSxHQUFHLDhCQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBMkI1QyxtQ0FBOEIsR0FBRyxHQUFHLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDckMsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7UUFDSixDQUFDLENBQUM7UUFFTSxvQkFBZSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQWlCLEVBQUUsRUFBRTtZQUNwRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUMsQ0FBQztRQUNRLGlCQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQztRQUVNLG1CQUFjLEdBQUcsQ0FBQyxNQUEwQixFQUFFLEVBQUU7WUFDdEQsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNmLHVCQUF1QjtnQkFD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