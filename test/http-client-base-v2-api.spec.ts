import MockAdapter from "axios-mock-adapter";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

const expect = chai.expect;
import { describe, it } from "mocha";

import _ from "lodash";
import { HttpClient } from "../lib/http-client-base";
import { TransactionMsgTypes } from "../lib/constants";
import { DEFAULT_PAGE_REQUEST, PageRequest, OrderBy, TokenId, RequestType, CursorPageRequest } from "../lib/request";
import { transactionResult, singleTransactionResult } from "./test-data-v2";
import { HttpTestUtil } from "./http-test-util";

describe("http-client-base v2 APIs test", () => {
  let stub: MockAdapter;

  after(() => {
    stub.restore();
  });

  const baseUrl = "http://localhost";
  const testApiKey = "test-api-key";
  const testSecret = "test-api-secret";
  const httpClient = new HttpClient(baseUrl, testApiKey, testSecret);

  it("list of transactions of a user v2 api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTxHash = "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const testTxResultResponse = transactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v2/users/${testUserId}/transactions`).reply(config => {
      HttpTestUtil.assertHeaders(config.headers);
      HttpTestUtil.assertPageParameters(config.params, pageRequest);
      return [200, testTxResultResponse];
    });

    const response = await httpClient.userTransactionsV2(testUserId, pageRequest);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["summary"]).to.deep.equal(testTxResultResponse.responseData[0]["summary"]);
  });

  it("list of transactions of a so wallet v2 api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTxHash = "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const testTxResultResponse = transactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v2/wallets/${testAddress}/transactions`).reply(config => {
      HttpTestUtil.assertHeaders(config.headers);
      HttpTestUtil.assertPageParameters(config.params, pageRequest);
      return [200, testTxResultResponse];
    });

    const response = await httpClient.walletTransactionsV2(testAddress, pageRequest);

    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["summary"]).to.deep.equal(testTxResultResponse.responseData[0]["summary"]);
  });

  it("transaction result v2 api test", async () => {
    const testTxHash = "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const testTxResultResponse = singleTransactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v2/transactions/${testTxHash}`).reply(config => {
      HttpTestUtil.assertHeaders(config.headers);
      return [200, testTxResultResponse];
    });

    const response = await httpClient.transactionResultV2(testTxHash);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["summary"]).to.deep.equal(testTxResultResponse.responseData["summary"]);
  });
});
