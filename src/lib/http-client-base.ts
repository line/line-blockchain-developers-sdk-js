import { LoggerFactory } from "./logger-factory";
import _ from "lodash";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import cryptoRandomString from 'crypto-random-string';
import {
  GenericResponse,
  ServiceDetail,
  ServiceToken,
  TxResultResponse,
  ServiceTokenHolder,
  ItemToken,
  FungibleToken,
  FungibleTokenHolder,
  ItemTokenType,
  NonFungibleTokenType,
  NonFungibleId,
  NonFungibleTokenTypeHolder,
  NonFungibleTokenHolder,
  WalletResponse,
  BaseCoinBalance,
  ServiceTokenBalance,
  FungibleBalance,
  NonFungibleBalance,
  UserIdAddress,
  SessionTokenResponse,
  Memo
} from './response';
import {
  RequestType,
  AbstractTransactionRequest,
  AbstractTokenBurnTransactionRequest,
  UpdateServiceTokenRequest,
  MintServiceTokenRequest,
  BurnFromServiceTokenRequest,
  PageRequest,
  OptionalTransactionSearchParameters,
  FungibleTokenCreateUpdateRequest,
  FungibleTokenMintRequest,
  FungibleTokenBurnRequest,
  NonFungibleTokenCreateUpdateRequest,
  NonFungibleTokenMintRequest,
  NonFungibleTokenMultiMintRequest,
  NonFungibleTokenBurnRequest,
  NonFungibleTokenAttachRequest,
  NonFungibleTokenDetachRequest,
  TransferBaseCoinRequest,
  TransferServiceTokenRequest,
  TransferFungibleTokenRequest,
  TransferNonFungibleTokenRequest,
  BatchTransferNonFungibleTokenRequest,
  TransferServiceTokenProxyRequest,
  TransferFungibleTokenProxyRequest,
  TransferNonFungibleTokenProxyRequest,
  BatchTransferNonFungibleTokenProxyRequest,
  IssueTransferSessionTokenRequest,
  UserProxyRequest,
  MemoRequest
} from './request';
import { SignatureGenerator } from './signature-generator';
import { Constant } from './constants';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

export class HttpClient {
  private logger = LoggerFactory.logger("HttpClient");

  protected readonly instance: AxiosInstance;
  private readonly serviceApiKey: string;
  private readonly serviceApiSecret: string;
  public constructor(
    baseURL: string,
    apiKey: string,
    apiSecret: string
  ) {
    this.instance = axios.create({
      baseURL,
    });
    this.serviceApiKey = apiKey
    this.serviceApiSecret = apiSecret
    this.instance.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"
    this.instance.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8"
    this.instance.defaults.headers.delete["Content-Type"] = "application/json;charset=UTF-8"

    this._initialzeResponseInterceptor();
  }

  // for test
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  private _initialzeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => {
    this.logger.debug(`response: ${JSON.stringify(data)}`);
    return data
  };
  protected _handleError = (error: any) => {
    this.logger.error("error response: ", error.response.data);
    this.logger.error("error response status: ", error.response.status);
    return Promise.reject(error)
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    this.logger.debug("headers: ", config.headers)
    this.logger.debug("body: ", config.data)
    if (config.data) {
      //clean null properties
      config.data = _.omitBy(config.data, _.isNil)
      this.logger.debug("body: ", config.data)
    }
    this.addRequestHeaders(config)
    this.logger.debug(`headers: ${JSON.stringify(config.headers)}`)

    if (config.params) {
      this.logger.debug(`query-params: ${JSON.stringify(config.params)}`)
    }
    return config;
  }

  protected addRequestHeaders(config: AxiosRequestConfig) {
    const nonce = cryptoRandomString({ length: 8 });
    const timestamp = Date.now()
    const method = config.method.toUpperCase()
    config.headers[Constant.SERVICE_API_KEY_HEADER] = this.serviceApiKey;
    config.headers[Constant.NONCE_HEADER] = nonce;
    config.headers[Constant.SIGNATURE_HEADER] =
      SignatureGenerator.signature(this.serviceApiSecret, method, config.url, timestamp, nonce, config.params, config.data);
    config.headers[Constant.TIMESTAMP_HEADER] = timestamp
  }

  public async time(): Promise<GenericResponse<void>> {
    const response = await this.instance.get("/v1/time");
    return response;
  }

  public async serviceDetail(serviceId: string): Promise<GenericResponse<ServiceDetail>> {
    const path = `/v1/services/${serviceId}`;
    const response = await this.instance.get(path);
    return response;
  }

  public async serviceTokens(): Promise<GenericResponse<Array<ServiceToken>>> {
    const response = await this.instance.get(`/v1/service-tokens`);
    return response;
  }

  public async serviceTokenDetail(contractId: string): Promise<GenericResponse<ServiceToken>> {
    const path = `/v1/service-tokens/${contractId}`;
    const response = await this.instance.get(path);
    return response;
  }

  public async updateServiceToken(
    contractId: string,
    request: UpdateServiceTokenRequest): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/service-tokens/${contractId}`;
    const response = await this.instance.put(path, request);
    return response;
  }

  public async mintServiceToken(
    contractId: string,
    request: MintServiceTokenRequest): Promise<GenericResponse<TxResultResponse>> {
    this.assertTransactionRequest(request)
    const path = `/v1/service-tokens/${contractId}/mint`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async burnFromServiceToken(
    contractId: string,
    request: BurnFromServiceTokenRequest): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/service-tokens/${contractId}/burn-from`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async serviceTokenHolders(
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<ServiceTokenHolder>>> {
    const path = `/v1/service-tokens/${contractId}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    const response = await this.instance.get(path, requestConfig);
    return response;
  }

  public async itemToken(contractId: string): Promise<GenericResponse<ItemToken>> {
    const path = `/v1/item-tokens/${contractId}`;
    const response = await this.instance.get(path);
    return response;
  }

  public async fungibleTokens(
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<FungibleToken>>> {
    const path = `/v1/item-tokens/${contractId}/fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    const response = await this.instance.get(path, requestConfig);
    return response;
  }

  public async createFungibleToken(
    contractId: string,
    request: FungibleTokenCreateUpdateRequest): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async fungibleToken(
    contractId: string,
    tokenType: string
  ): Promise<GenericResponse<FungibleToken>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
    return await this.instance.get(path);
  }

  public async updateFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenCreateUpdateRequest): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
    const response = await this.instance.put(path, request);
    return response;
  }

  public async mintFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenMintRequest): Promise<GenericResponse<TxResultResponse>> {
    this.assertTransactionRequest(request)
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/mint`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async burnFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenBurnRequest): Promise<GenericResponse<TxResultResponse>> {
    this.assertItemTokenBurnTransactionRequest(request)
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/burn`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async fungibleTokenHolders(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<FungibleTokenHolder>>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    const response = await this.instance.get(path, requestConfig);
    return response;
  }

  public async nonFungibleTokens(
    contractId: string,
    pageRequest: PageRequest): Promise<GenericResponse<Array<ItemTokenType>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    const response = await this.instance.get(path, requestConfig);
    return response;
  }

  public async createNonFungibleToken(
    contractId: string,
    request: NonFungibleTokenCreateUpdateRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles`;
    const response = await this.instance.post(path, request);
    return response;
  }

  public async nonFungibleTokenType(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<NonFungibleTokenType>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    const response = await this.instance.get(path, requestConfig);
    return response;
  }

  public async updateNonFungibleTokenType(
    contractId: string,
    tokenType: string,
    request: NonFungibleTokenCreateUpdateRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    const response = await this.instance.put(path, request);
    return response;
  }

  public async nonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<NonFungibleId>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    return await this.instance.get(path);
  }

  public async updateNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenCreateUpdateRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    const response = await this.instance.put(path, request);
    return response;
  }

  public async mintNonFungibleToken(
    contractId: string,
    tokenType: string,
    request: NonFungibleTokenMintRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async nonFungibleTokenTypeHolders(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<NonFungibleTokenTypeHolder>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  // NFT has to belong to only one holder
  public async nonFungibleTokenHolder(
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<NonFungibleTokenHolder>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/holder`
    return await this.instance.get(path);
  }

  public async multiMintnonFungibleToken(
    contractId: string,
    request: NonFungibleTokenMultiMintRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/multi-mint`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async burnNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenBurnRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/burn`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async childrenOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<NonFungibleId>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/children`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async parentOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<Array<NonFungibleId>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`
    return await this.instance.get(path);
  }

  public async attachNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenAttachRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async detachNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenDetachRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`
    // payload in delete has no defined semantics,
    // https://tools.ietf.org/html/rfc7231#page-29
    const requestConfig = this.detachRequestConfig(request);
    const response = await this.instance.delete(path, requestConfig);
    return response;
  }

  public async rootOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<Array<NonFungibleId>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/root`
    return await this.instance.get(path);
  }

  public async wallets(): Promise<GenericResponse<Array<WalletResponse>>> {
    const path = `/v1/wallets`
    return await this.instance.get(path);
  }

  public async walletDetail(walletAddress: string): Promise<GenericResponse<WalletResponse>> {
    const path = `/v1/wallets/${walletAddress}`
    return await this.instance.get(path);
  }

  public async walletTransactions(
    walletAddress: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/transactions`
    const requestConfig = this.pageRequestConfig(pageRequest, optionalTransactionSearchParameters);

    return await this.instance.get(path, requestConfig);
  }

  public async baseCoinBalanceOfWallet(walletAddress: string): Promise<GenericResponse<BaseCoinBalance>> {
    const path = `/v1/wallets/${walletAddress}/base-coin`
    return await this.instance.get(path);
  }

  public async serviceTokenBalancesOfWallet(
    walletAddress: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<ServiceTokenBalance>>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async serviceTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string
  ): Promise<GenericResponse<ServiceTokenBalance>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}`
    return await this.instance.get(path);
  }

  public async fungibleTokenBalancesOfWallet(
    walletAddress: string,
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<FungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async fungibleTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string
  ): Promise<GenericResponse<FungibleBalance>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}`
    return await this.instance.get(path);
  }

  public async nonFungibleTokenBalancesOfWallet(
    walletAddress: string,
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async nonFungibleTokenBalancesByTypeOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async nonFungibleTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<NonFungibleBalance>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`
    return await this.instance.get(path);
  }

  public async transferBaseCoinOfWallet(
    walletAddress: string,
    request: TransferBaseCoinRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/base-coin/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async transferServiceTokenOfWallet(
    walletAddress: string,
    contractId: string,
    request: TransferServiceTokenRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async transferFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    request: TransferFungibleTokenRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async transferNonFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: TransferNonFungibleTokenRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async batchTransferNonFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    request: BatchTransferNonFungibleTokenRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/batch-transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async userDetail(userId: string): Promise<GenericResponse<UserIdAddress>> {
    const path = `/v1/users/${userId}`
    return await this.instance.get(path);
  }

  public async userTransactions(
    userId: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/users/${userId}/transactions`
    const requestConfig = this.pageRequestConfig(pageRequest, optionalTransactionSearchParameters);
    return await this.instance.get(path, requestConfig);
  }

  public async baseCoinBalanceOfUser(userId: string): Promise<GenericResponse<BaseCoinBalance>> {
    const path = `/v1/users/${userId}/base-coin`
    return await this.instance.get(path);
  }

  public async serviceTokenBalancesOfUser(
    userId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<ServiceTokenBalance>>> {
    const path = `/v1/users/${userId}/service-tokens`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async serviceTokenBalanceOfUser(
    userId: string,
    contractId: string
  ): Promise<GenericResponse<ServiceTokenBalance>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}`
    return await this.instance.get(path);
  }

  public async fungibleTokenBalancesOfUser(
    userId: string,
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<FungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async fungibleTokenBalanceOfUser(
    userId: string,
    contractId: string,
    tokenType: string
  ): Promise<GenericResponse<FungibleBalance>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}`
    return await this.instance.get(path);
  }

  public async nonFungibleTokenBalancesOfUser(
    userId: string,
    contractId: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async nonFungibleTokenBalancesByTypeOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}`
    const requestConfig = this.pageRequestConfig(pageRequest);
    return await this.instance.get(path, requestConfig);
  }

  public async nonFungibleTokenBalanceOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string
  ): Promise<GenericResponse<NonFungibleBalance>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`
    return await this.instance.get(path);
  }

  public async transferServiceTokenOfUser(
    userId: string,
    contractId: string,
    request: TransferServiceTokenProxyRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async transferFungibleTokenOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    request: TransferFungibleTokenProxyRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async transferNonFungibleTokenOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: TransferNonFungibleTokenProxyRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async batchTransferNonFungibleTokenOfUser(
    userId: string,
    contractId: string,
    request: BatchTransferNonFungibleTokenProxyRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/batch-transfer`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async issueSessionTokenForBaseCoinTransfer(
    userId: string,
    requestType: RequestType,
    request: IssueTransferSessionTokenRequest
  ): Promise<GenericResponse<SessionTokenResponse>> {
    const path = `/v1/users/${userId}/base-coin/request-transfer`
    const requestTypeParam = this.requestTypeParam(requestType)
    const response = await this.instance.post(path, request, requestTypeParam);
    return response;
  }

  public async issueSessionTokenForServiceTokenTransfer(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: IssueTransferSessionTokenRequest
  ): Promise<GenericResponse<SessionTokenResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/request-transfer`
    const requestTypeParam = this.requestTypeParam(requestType)
    const response = await this.instance.post(path, request, requestTypeParam);
    return response;
  }

  public async issueServiceTokenProxyRequest(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: UserProxyRequest
  ) {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/request-proxy`
    const requestTypeParam = this.requestTypeParam(requestType)
    const response = await this.instance.post(path, request, requestTypeParam);
    return response;
  }

  public async issueItemTokenProxyRequest(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: UserProxyRequest
  ) {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/request-proxy`
    const requestTypeParam = this.requestTypeParam(requestType)
    const response = await this.instance.post(path, request, requestTypeParam);
    return response;
  }

  public async commitProxyRequest(
    requestSessionToken: string
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/user-requests/${requestSessionToken}/commit`
    const response = await this.instance.post(path);
    return response;
  }

  public async transactionResult(txHash: string): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/transactions/${txHash}`
    return await this.instance.get(path);
  }

  public async createMemo(
    request: MemoRequest
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/memos`
    const response = await this.instance.post(path, request);
    return response;
  }

  public async memos(txHash: string): Promise<GenericResponse<Memo>> {
    const path = `/v1/memos/${txHash}`
    return await this.instance.get(path);
  }

  private requestTypeParam(requestType: RequestType): AxiosRequestConfig {
    return {
      "params": {
        "requestType": requestType
      }
    };
  }

  private pageRequestConfig(
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters
  ): AxiosRequestConfig {
    // paging parameters sorted by its key when generating signature
    var pagingParams = {
      "limit": pageRequest.limit,
      "page": pageRequest.page,
      "orderBy": pageRequest.orderBy
    }
    if (optionalTransactionSearchParameters) {
      if (optionalTransactionSearchParameters.before) {
        pagingParams["before"] = optionalTransactionSearchParameters.before
      }
      if (optionalTransactionSearchParameters.after) {
        pagingParams["after"] = optionalTransactionSearchParameters.after
      }
      if (optionalTransactionSearchParameters.msgType) {
        pagingParams["msgType"] = optionalTransactionSearchParameters.msgType
      }
    }

    return {
      "params": Object.keys(pagingParams).sort().reduce((r, k) => (r[k] = pagingParams[k], r), {})
    };
  }

  private detachRequestConfig(detachRequest: NonFungibleTokenDetachRequest): AxiosRequestConfig {
    var detachNonFungibleParams = _.omitBy(detachRequest, _.isNil)
    return {
      "data": Object.keys(detachNonFungibleParams).sort().reduce((r, k) => (r[k] = detachNonFungibleParams[k], r), {})
    };
  }

  private assertTransactionRequest(request: AbstractTransactionRequest) {
    if (!request.toUserId && !request.toAddress) {
      this.logger.error("toAddress or toUserId, one of them is required");
      throw new Error("toAddress or toUserId, one of them is required")
    }
  }

  private assertItemTokenBurnTransactionRequest(request: AbstractTokenBurnTransactionRequest) {
    if (!request.fromUserId && !request.fromAddress) {
      this.logger.error("fromAddress or fromUserId, one of them is required");
      throw new Error("fromAddress or fromUserId, one of them is required")
    }
  }
}
