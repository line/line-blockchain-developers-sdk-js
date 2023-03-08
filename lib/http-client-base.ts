import { LoggerFactory } from "./logger-factory";
import { LoggerWrapper } from "./logger-wrapper";
import _ from "lodash";
import { RequestParameterValidator } from "./request-parameter-validator";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { HTTPError, ReadError, RequestError } from "./exceptions";
import cryptoRandomString from "crypto-random-string";
import {
  GenericResponse,
  ServiceDetail,
  ServiceToken,
  TxHashResponse,
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
  Memo,
  TokenMediaResourceUpdateResponse,
  FungibleTokenMediaResourceUpdateStatusResponse,
  NonFungibleTokenMediaResourceUpdateStatusResponse,
  CursorPaginatedNonFungibleBalanceWithTypes,
  IssuedServiceToken,
  CreatedItemToken,
  ProxyApprovedResponse,
  IssueProxyResponse,
  UserRequestStatus,
} from "./response";

import {
  DEFAULT_PAGE_REQUEST,
  RequestType,
  TokenType,
  TokenTypeAndIndex,
  AbstractTransactionRequest,
  AbstractTokenBurnTransactionRequest,
  UpdateServiceTokenRequest,
  MintServiceTokenRequest,
  BurnFromServiceTokenRequest,
  PageRequest,
  CursorPageRequest,
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
  MemoRequest,
  MultiFungibleTokenMediaResourcesUpdateRequest,
  MultiNonFungibleTokenMediaResourcesUpdateRequest,
  NonFungibleTokenMultiMintMultiReceiversRequest,
  OrderBy,
  CreateItemTokenContractRequest,
  IssueServiceTokenRequest,
} from "./request";
import { SignatureGenerator } from "./signature-generator";
import { Constant } from "./constants";
import { TxResult } from "./tx-core-models";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

export class HttpClient {
  private logger: LoggerWrapper = LoggerFactory.logger("HttpClient");

  protected readonly instance: AxiosInstance;
  private readonly serviceApiKey: string;
  private readonly serviceApiSecret: string;
  public constructor(baseURL: string, apiKey: string, apiSecret: string) {
    this.instance = axios.create({
      baseURL,
    });
    this.serviceApiKey = apiKey;
    this.serviceApiSecret = apiSecret;
    this.instance.defaults.headers.post["Content-Type"] =
      "application/json;charset=UTF-8";
    this.instance.defaults.headers.put["Content-Type"] =
      "application/json;charset=UTF-8";
    this.instance.defaults.headers.delete["Content-Type"] =
      "application/json;charset=UTF-8";

    this._initializeResponseInterceptor();
  }

  public logOn(): void {
    this.logger.logOn();
  }

  public logOff(): void {
    this.logger.logOff();
  }

  // for test
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  private _initializeResponseInterceptor = () => {
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
    this.logger.debug("Response data", JSON.stringify(data));
    return data;
  };
  protected _handleError = (error: any) => {
    const wrappedError = this.wrapError(error);
    // console.log(wrappedError);
    this.logger.error("Fail to call API, cause:", wrappedError.toString());
    return Promise.reject(wrappedError);
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    if (config.data) {
      //clean null properties
      config.data = _.omitBy(config.data, _.isNil);
    }
    this.addRequestHeaders(config);
    this.logger.debug(`API Request - url: ${config.url},headers: ${JSON.stringify(config.headers)}, data: ${config.data || "empty"}`)

    return config;
  };

  private wrapError(err: AxiosError): Error {
    if (err.response) {
      return new HTTPError(
        err.message,
        err.response.data.statusCode,
        err.response.statusText,
        err.response.data.statusMessage || "",
        err,
      );
    } else if (err.code) {
      return new RequestError(err.message, err.code, err.response.data.statusMessage || "", err);
    } else if (err.config) {
      // unknown, but from axios
      return new ReadError(err);
    }

    // otherwise, just rethrow
    return err;
  }

  protected addRequestHeaders(config: AxiosRequestConfig) {
    const nonce = cryptoRandomString({ length: 8 });
    const timestamp = Date.now();
    const method = config.method.toUpperCase();
    config.headers[Constant.SERVICE_API_KEY_HEADER] = this.serviceApiKey;
    config.headers[Constant.NONCE_HEADER] = nonce;
    config.headers[Constant.SIGNATURE_HEADER] = SignatureGenerator.signature(
      this.serviceApiSecret,
      method,
      config.url,
      timestamp,
      nonce,
      config.params,
      config.data,
    );
    config.headers[Constant.TIMESTAMP_HEADER] = timestamp;
  }

  public time(): Promise<GenericResponse<void>> {
    return this.instance.get("/v1/time");
  }

  public serviceDetail(
    serviceId: string,
  ): Promise<GenericResponse<ServiceDetail>> {
    const path = `/v1/services/${serviceId}`;
    return this.instance.get(path);
  }

  public serviceTokens(): Promise<GenericResponse<Array<ServiceToken>>> {
    return this.instance.get(`/v1/service-tokens`);
  }

  public serviceTokenDetail(
    contractId: string,
  ): Promise<GenericResponse<ServiceToken>> {
    const path = `/v1/service-tokens/${contractId}`;
    return this.instance.get(path);
  }

  public updateServiceToken(
    contractId: string,
    request: UpdateServiceTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/service-tokens/${contractId}`;
    return this.instance.put(path, request);
  }

  public mintServiceToken(
    contractId: string,
    request: MintServiceTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    this.assertTransactionRequest(request);
    const path = `/v1/service-tokens/${contractId}/mint`;
    return this.instance.post(path, request);
  }

  public burnFromServiceToken(
    contractId: string,
    request: BurnFromServiceTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/service-tokens/${contractId}/burn-from`;
    return this.instance.post(path, request);
  }

  public serviceTokenHolders(
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<ServiceTokenHolder>>> {
    const path = `/v1/service-tokens/${contractId}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public itemToken(contractId: string): Promise<GenericResponse<ItemToken>> {
    const path = `/v1/item-tokens/${contractId}`;
    return this.instance.get(path);
  }

  public createItemTokenContract(
    request: CreateItemTokenContractRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    if (request.name.length <= 0) {
      throw new Error("Invalid token name - empty token name")
    }
    if (!RequestParameterValidator.isValidTokenName(request.name)) {
      throw new Error(`Invalid token name - valid pattern: ${RequestParameterValidator.validTokenNamePattern()}`);
    }

    if (!RequestParameterValidator.isValidWalletAddress(request.serviceWalletAddress)) {
      throw new Error(`Invalid serviceWalletAddress - valid pattern: ${RequestParameterValidator.validWalletAddressPattern()}`);
    }

    if (_.isEmpty(request.serviceWalletSecret)) {
      throw new Error("Empty serviceWalletSecret is not allowed");
    }

    if (!RequestParameterValidator.isValidBaseUri(request.baseImgUri)) {
      throw new Error(`Invalid baseImgUri of item token - valid pattern: ${RequestParameterValidator.validBaseUriPattern()}`);
    }
    const path = `/v1/item-tokens`;
    return this.instance.post(path, request);
  }

  public createdItemTokenContract(
    txHash?: string,
    isOnlyContractId: boolean = false,
  ): Promise<GenericResponse<CreatedItemToken>> {
    if (!_.isNil(txHash) && _.isEmpty(txHash)) {
      throw new Error("Invalid txHash - empty not allowed");
    }
    const path = `/v1/item-tokens`;
    const queryParamConfig = this.txHashAndIsOnlyContractIdRequestConfig(txHash, isOnlyContractId);
    return this.instance.get(path, queryParamConfig);
  }

  public fungibleTokens(
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<FungibleToken>>> {
    const path = `/v1/item-tokens/${contractId}/fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public createFungibleToken(
    contractId: string,
    request: FungibleTokenCreateUpdateRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles`;
    return this.instance.post(path, request);
  }

  public fungibleToken(
    contractId: string,
    tokenType: string,
  ): Promise<GenericResponse<FungibleToken>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
    return this.instance.get(path);
  }

  public updateFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenCreateUpdateRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}`;
    return this.instance.put(path, request);
  }

  public mintFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenMintRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    this.assertTransactionRequest(request);
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/mint`;
    return this.instance.post(path, request);
  }

  public burnFungibleToken(
    contractId: string,
    tokenType: string,
    request: FungibleTokenBurnRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    this.assertItemTokenBurnTransactionRequest(request);
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/burn`;
    return this.instance.post(path, request);
  }

  public fungibleTokenHolders(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<FungibleTokenHolder>>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/${tokenType}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokens(
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<ItemTokenType>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public createNonFungibleToken(
    contractId: string,
    request: NonFungibleTokenCreateUpdateRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles`;
    return this.instance.post(path, request);
  }

  public nonFungibleTokenType(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<NonFungibleTokenType>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public updateNonFungibleTokenType(
    contractId: string,
    tokenType: string,
    request: NonFungibleTokenCreateUpdateRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    return this.instance.put(path, request);
  }

  public nonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<NonFungibleId>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    return this.instance.get(path);
  }

  public updateNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenCreateUpdateRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    return this.instance.put(path, request);
  }

  public mintNonFungibleToken(
    contractId: string,
    tokenType: string,
    request: NonFungibleTokenMintRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`;
    return this.instance.post(path, request);
  }

  public nonFungibleTokenTypeHolders(
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<NonFungibleTokenTypeHolder>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/holders`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  // NFT has to belong to only one holder
  public nonFungibleTokenHolder(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<NonFungibleTokenHolder>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/holder`;
    return this.instance.get(path);
  }

  public multiMintNonFungibleToken(
    contractId: string,
    request: NonFungibleTokenMultiMintRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/multi-mint`;
    return this.instance.post(path, request);
  }

  public multiMintWithMultiReceiversNonFungibleToken(
    contractId: string,
    request: NonFungibleTokenMultiMintMultiReceiversRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/multi-recipients/multi-mint`;
    return this.instance.post(path, request);
  }

  public burnNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenBurnRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/burn`;
    return this.instance.post(path, request);
  }

  public childrenOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<NonFungibleId>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/children`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public parentOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<NonFungibleId>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
    return this.instance.get(path);
  }

  public attachNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenAttachRequest,
  ): Promise<GenericResponse<NonFungibleId>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
    return this.instance.post(path, request);
  }

  public detachNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: NonFungibleTokenDetachRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/parent`;
    // payload in delete has no defined semantics,
    // https://tools.ietf.org/html/rfc7231#page-29
    const requestConfig = this.detachRequestConfig(request);
    return this.instance.delete(path, requestConfig);
  }

  public rootOfNonFungibleToken(
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<Array<NonFungibleId>>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/root`;
    return this.instance.get(path);
  }

  public wallets(): Promise<GenericResponse<Array<WalletResponse>>> {
    const path = `/v1/wallets`;
    return this.instance.get(path);
  }

  public walletDetail(
    walletAddress: string,
  ): Promise<GenericResponse<WalletResponse>> {
    const path = `/v1/wallets/${walletAddress}`;
    return this.instance.get(path);
  }

  public walletTransactions(
    walletAddress: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<Array<TxResultResponse>>> {
    const path = `/v1/wallets/${walletAddress}/transactions`;
    const requestConfig = this.pageRequestConfig(
      pageRequest,
      optionalTransactionSearchParameters,
    );

    return this.instance.get(path, requestConfig);
  }

  public baseCoinBalanceOfWallet(
    walletAddress: string,
  ): Promise<GenericResponse<BaseCoinBalance>> {
    const path = `/v1/wallets/${walletAddress}/base-coin`;
    return this.instance.get(path);
  }

  public issueServiceToken(
    request: IssueServiceTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/service-tokens`;
    return this.instance.post(path, request);
  }

  public issuedServiceTokenByTxHash(
    txHash: string,
    isOnlyContractId: boolean = false,
  ): Promise<GenericResponse<IssuedServiceToken>> {
    if (_.isEmpty(txHash)) {
      throw new Error("Invalid txHash - empty not allowed")
    }
    const path = `/v1/service-tokens/by-txHash/${txHash}`;
    const queryParamConfig = this.isOnlyContractIdRequestConfig(isOnlyContractId)
    return this.instance.get(path, queryParamConfig);
  }

  public serviceTokenBalancesOfWallet(
    walletAddress: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<ServiceTokenBalance>>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public serviceTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string,
  ): Promise<GenericResponse<ServiceTokenBalance>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}`;
    return this.instance.get(path);
  }

  public fungibleTokenBalancesOfWallet(
    walletAddress: string,
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<FungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public fungibleTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
  ): Promise<GenericResponse<FungibleBalance>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}`;
    return this.instance.get(path);
  }

  public nonFungibleTokenBalancesOfWallet(
    walletAddress: string,
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokenBalancesByTypeOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokenBalanceOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<NonFungibleBalance>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    return this.instance.get(path);
  }

  public transferBaseCoinOfWallet(
    walletAddress: string,
    request: TransferBaseCoinRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/wallets/${walletAddress}/base-coin/transfer`;
    return this.instance.post(path, request);
  }

  public transferServiceTokenOfWallet(
    walletAddress: string,
    contractId: string,
    request: TransferServiceTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}/transfer`;
    return this.instance.post(path, request);
  }

  public transferFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    request: TransferFungibleTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`;
    return this.instance.post(path, request);
  }

  public transferNonFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: TransferNonFungibleTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`;
    return this.instance.post(path, request);
  }

  public batchTransferNonFungibleTokenOfWallet(
    walletAddress: string,
    contractId: string,
    request: BatchTransferNonFungibleTokenRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/wallets/${walletAddress}/item-tokens/${contractId}/non-fungibles/batch-transfer`;
    return this.instance.post(path, request);
  }

  public userDetail(userId: string): Promise<GenericResponse<UserIdAddress>> {
    const path = `/v1/users/${userId}`;
    return this.instance.get(path);
  }

  public userTransactions(
    userId: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<Array<TxResultResponse>>> {
    const path = `/v1/users/${userId}/transactions`;
    const requestConfig = this.pageRequestConfig(
      pageRequest,
      optionalTransactionSearchParameters,
    );
    return this.instance.get(path, requestConfig);
  }

  public baseCoinBalanceOfUser(
    userId: string,
  ): Promise<GenericResponse<BaseCoinBalance>> {
    const path = `/v1/users/${userId}/base-coin`;
    return this.instance.get(path);
  }

  public serviceTokenBalancesOfUser(
    userId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<ServiceTokenBalance>>> {
    const path = `/v1/users/${userId}/service-tokens`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public serviceTokenBalanceOfUser(
    userId: string,
    contractId: string,
  ): Promise<GenericResponse<ServiceTokenBalance>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}`;
    return this.instance.get(path);
  }

  public fungibleTokenBalancesOfUser(
    userId: string,
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<FungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public fungibleTokenBalanceOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
  ): Promise<GenericResponse<FungibleBalance>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}`;
    return this.instance.get(path);
  }

  public nonFungibleTokenBalancesOfUser(
    userId: string,
    contractId: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokenBalancesWithTypeOfUser(
    userId: string,
    contractId: string,
    cursorPageRequest: CursorPageRequest,
  ): Promise<GenericResponse<CursorPaginatedNonFungibleBalanceWithTypes>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/with-type`;
    const requestConfig = this.cursorPageRequestConfig(cursorPageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokenBalancesByTypeOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    pageRequest: PageRequest,
  ): Promise<GenericResponse<Array<NonFungibleBalance>>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}`;
    const requestConfig = this.pageRequestConfig(pageRequest);
    return this.instance.get(path, requestConfig);
  }

  public nonFungibleTokenBalanceOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
  ): Promise<GenericResponse<NonFungibleBalance>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    return this.instance.get(path);
  }

  public transferServiceTokenOfUser(
    userId: string,
    contractId: string,
    request: TransferServiceTokenProxyRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/transfer`;
    return this.instance.post(path, request);
  }

  public transferFungibleTokenOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    request: TransferFungibleTokenProxyRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/fungibles/${tokenType}/transfer`;
    return this.instance.post(path, request);
  }

  public transferNonFungibleTokenOfUser(
    userId: string,
    contractId: string,
    tokenType: string,
    tokenIndex: string,
    request: TransferNonFungibleTokenProxyRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/transfer`;
    return this.instance.post(path, request);
  }

  public batchTransferNonFungibleTokenOfUser(
    userId: string,
    contractId: string,
    request: BatchTransferNonFungibleTokenProxyRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles/batch-transfer`;
    return this.instance.post(path, request);
  }

  public updateTokenMediaResources(
    contractId: string,
    tokenIdentifiers: Array<string>,
    isFungibleRequest: boolean = true,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    if (isFungibleRequest) {
      return this.updateFungibleTokenMediaResources(
        contractId,
        tokenIdentifiers,
      );
    } else {
      return this.updateNonFungibleTokenMediaResources(
        contractId,
        tokenIdentifiers,
      );
    }
  }

  public updateFungibleTokenMediaResources(
    contractId: string,
    tokenTypes: Array<string>,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/media-resources`;
    const updateList = TokenType.fromMulti(tokenTypes);
    const request = new MultiFungibleTokenMediaResourcesUpdateRequest(
      updateList,
    );
    return this.instance.put(path, request);
  }

  public updateNonFungibleTokenMediaResources(
    contractId: string,
    tokenIds: Array<string>,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/media-resources`;
    const updateList = TokenTypeAndIndex.fromMulti(tokenIds);
    const request = new MultiNonFungibleTokenMediaResourcesUpdateRequest(
      updateList,
    );
    return this.instance.put(path, request);
  }

  public updateTokenThumbnailResources(
    contractId: string,
    tokenIdentifiers: Array<string>,
    isFungibleRequest: boolean = true,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    if (isFungibleRequest) {
      return this.updateFungibleTokenThumbnailResources(
        contractId,
        tokenIdentifiers,
      );
    } else {
      return this.updateNonFungibleTokenThumbnailResources(
        contractId,
        tokenIdentifiers,
      );
    }
  }

  public updateFungibleTokenThumbnailResources(
    contractId: string,
    tokenTypes: Array<string>,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    const path = `/v1/item-tokens/${contractId}/fungibles/thumbnails`;
    const updateList = TokenType.fromMulti(tokenTypes);
    const request = new MultiFungibleTokenMediaResourcesUpdateRequest(
      updateList,
    );
    return this.instance.put(path, request);
  }


  public updateNonFungibleTokenThumbnailResources(
    contractId: string,
    tokenIds: Array<string>,
  ): Promise<GenericResponse<TokenMediaResourceUpdateResponse>> {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/thumbnails`;
    const updateList = TokenTypeAndIndex.fromMulti(tokenIds);
    const request = new MultiNonFungibleTokenMediaResourcesUpdateRequest(
      updateList,
    );
    return this.instance.put(path, request);
  }


  public fungibleTokenMediaResourcesUpdateStatuses(
    contractId: string,
    requestId: string,
  ): Promise<
    GenericResponse<Array<FungibleTokenMediaResourceUpdateStatusResponse>>
  > {
    const path = `/v1/item-tokens/${contractId}/fungibles/media-resources/${requestId}/status`;
    return this.instance.get(path);
  }


  public fungibleTokenThumbnailResourcesUpdateStatuses(
    contractId: string,
    requestId: string,
  ): Promise<
    GenericResponse<Array<FungibleTokenMediaResourceUpdateStatusResponse>>
  > {
    const path = `/v1/item-tokens/${contractId}/fungibles/thumbnails/${requestId}/status`;
    return this.instance.get(path);
  }

  public nonFungibleTokenMediaResourcesUpdateStatuses(
    contractId: string,
    requestId: string,
  ): Promise<
    GenericResponse<Array<NonFungibleTokenMediaResourceUpdateStatusResponse>>
  > {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/media-resources/${requestId}/status`;
    return this.instance.get(path);
  }

  public nonFungibleTokenThumbnailResourcesUpdateStatuses(
    contractId: string,
    requestId: string,
  ): Promise<
    GenericResponse<Array<NonFungibleTokenMediaResourceUpdateStatusResponse>>
  > {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/thumbnails/${requestId}/status`;
    return this.instance.get(path);
  }

  public issueSessionTokenForBaseCoinTransfer(
    userId: string,
    requestType: RequestType,
    request: IssueTransferSessionTokenRequest,
  ): Promise<GenericResponse<SessionTokenResponse>> {
    const path = `/v1/users/${userId}/base-coin/request-transfer`;
    const requestTypeParam = this.requestTypeParam(requestType);
    return this.instance.post(path, request, requestTypeParam);
  }

  public issueSessionTokenForServiceTokenTransfer(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: IssueTransferSessionTokenRequest,
  ): Promise<GenericResponse<SessionTokenResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/request-transfer`;
    const requestTypeParam = this.requestTypeParam(requestType);
    return this.instance.post(path, request, requestTypeParam);
  }

  public isServiceTokenProxyApproved(
    userId: string,
    contractId: string,
  ): Promise<GenericResponse<ProxyApprovedResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/proxy`;
    return this.instance.get(path);
  }

  public issueServiceTokenProxyRequest(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: UserProxyRequest,
  ): Promise<GenericResponse<IssueProxyResponse>> {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/request-proxy`;
    const requestTypeParam = this.requestTypeParam(requestType);
    return this.instance.post(path, request, requestTypeParam);
  }

  public isItemTokenProxyApproved(
    userId: string,
    contractId: string,
  ): Promise<GenericResponse<ProxyApprovedResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/proxy`;
    return this.instance.get(path);
  }

  public issueItemTokenProxyRequest(
    userId: string,
    contractId: string,
    requestType: RequestType,
    request: UserProxyRequest,
  ): Promise<GenericResponse<IssueProxyResponse>> {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/request-proxy`;
    const requestTypeParam = this.requestTypeParam(requestType);
    return this.instance.post(path, request, requestTypeParam);
  }

  public commitProxyRequest(
    requestSessionToken: string,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/user-requests/${requestSessionToken}/commit`;
    return this.instance.post(path);
  }

  public transactionResult(
    txHash: string,
  ): Promise<GenericResponse<TxResultResponse>> {
    const path = `/v1/transactions/${txHash}`;
    return this.instance.get(path);
  }

  /**
   * @deprecated This API will be removed soon
   */
  public createMemo(
    request: MemoRequest,
  ): Promise<GenericResponse<TxHashResponse>> {
    const path = `/v1/memos`;
    return this.instance.post(path, request);
  }

  /**
   * @deprecated This API will be removed soon
   */
  public memos(txHash: string): Promise<GenericResponse<Memo>> {
    const path = `/v1/memos/${txHash}`;
    return this.instance.get(path);
  }

  // v2 APIs
  public userTransactionsV2(
    userId: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<Array<TxResult>>> {
    const path = `/v2/users/${userId}/transactions`;
    const requestConfig = this.pageRequestConfig(
      pageRequest,
      optionalTransactionSearchParameters,
    );
    return this.instance.get(path, requestConfig);
  }

  public walletTransactionsV2(
    walletAddress: string,
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): Promise<GenericResponse<Array<TxResult>>> {
    const path = `/v2/wallets/${walletAddress}/transactions`;
    const requestConfig = this.pageRequestConfig(
      pageRequest,
      optionalTransactionSearchParameters,
    );

    return this.instance.get(path, requestConfig);
  }

  public transactionResultV2(
    txHash: string,
  ): Promise<GenericResponse<TxResult>> {
    const path = `/v2/transactions/${txHash}`;
    return this.instance.get(path);
  }

  public userRequestStatus(
    requestSessionToken: string,
  ): Promise<GenericResponse<UserRequestStatus>> {
    const path = `/v1/user-requests/${requestSessionToken}`;
    return this.instance.get(path);
  }

  private requestTypeParam(requestType: RequestType): AxiosRequestConfig {
    return {
      params: {
        requestType: requestType,
      },
    };
  }

  private pageRequestConfig(
    pageRequest: PageRequest,
    optionalTransactionSearchParameters?: OptionalTransactionSearchParameters,
  ): AxiosRequestConfig {
    const _pageRequest = pageRequest || DEFAULT_PAGE_REQUEST
    // paging parameters sorted by its key when generating signature
    var pagingParams = {
      limit: _pageRequest.limit || 10,
      page: _pageRequest.page || 0,
      orderBy: _pageRequest.orderBy || OrderBy.DESC,
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
      params: Object.keys(pagingParams)
        .sort()
        .reduce((r, k) => ((r[k] = pagingParams[k]), r), {}),
    };
  }

  private isOnlyContractIdRequestConfig(isOnlyContractId: boolean): AxiosRequestConfig {
    return {
      params: {
        isOnlyContractId: isOnlyContractId,
      },
    };
  }

  private txHashAndIsOnlyContractIdRequestConfig(
    txHash?: string,
    isOnlyContractId?: boolean
  ): AxiosRequestConfig {
    if (_.isNil(txHash)) {
      return {
        params: {
          isOnlyContractId: isOnlyContractId || false
        }
      };
    } else {
      return {
        params: {
          txHash: txHash,
          isOnlyContractId: isOnlyContractId,
        },
      };
    }
  }

  private cursorPageRequestConfig(cursorPageRequest: CursorPageRequest) {
    var pagingParams = {
      limit: cursorPageRequest.limit,
      pageToken: cursorPageRequest.pageToken,
      orderBy: cursorPageRequest.orderBy,
    };
    return {
      params: Object.keys(pagingParams)
        .sort()
        .reduce((r, k) => ((r[k] = pagingParams[k]), r), {}),
    };
  }

  private detachRequestConfig(
    detachRequest: NonFungibleTokenDetachRequest,
  ): AxiosRequestConfig {
    var detachNonFungibleParams = _.omitBy(detachRequest, _.isNil);
    return {
      data: Object.keys(detachNonFungibleParams)
        .sort()
        .reduce((r, k) => ((r[k] = detachNonFungibleParams[k]), r), {}),
    };
  }

  private assertTransactionRequest(request: AbstractTransactionRequest) {
    if (!request.toUserId && !request.toAddress) {
      this.logger.error("toAddress or toUserId, one of them is required");
      throw new Error("toAddress or toUserId, one of them is required");
    }
  }

  private assertItemTokenBurnTransactionRequest(
    request: AbstractTokenBurnTransactionRequest,
  ) {
    if (!request.fromUserId && !request.fromAddress) {
      this.logger.error("fromAddress or fromUserId, one of them is required");
      throw new Error("fromAddress or fromUserId, one of them is required");
    }
  }
}
