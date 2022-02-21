import MockAdapter from "axios-mock-adapter";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const expect = chai.expect;
import { describe, it } from "mocha";

import _ from "lodash";
import { HttpClient } from "../lib/http-client-base";
import { Constant } from "../lib/constants";
import { TransactionMsgTypes } from "../lib/constants";
import {
  DEFAULT_PAGE_REQUEST,
  PageRequest,
  OrderBy,
  TokenId,
  RequestType,
  CursorPageRequest,
} from "../lib/request";
import { transactionResult, singleTransactionResult } from "./test-data";

describe("http-client-base test", () => {
  let stub: MockAdapter;

  after(() => {
    stub.restore();
  });

  const baseUrl = "http://localhost";
  const testApiKey = "test-api-key";
  const testSecret = "test-api-secret";
  const httpClient = new HttpClient(baseUrl, testApiKey, testSecret);

  it("time api test", async () => {
    const receivedData = {
      responseTime: 1581850266351,
      statusCode: 1000,
      statusMessage: "success",
    };

    let httpClient = new HttpClient(baseUrl, testApiKey, testSecret);
    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet("/v1/time").reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.time();
    expect(response["statusCode"]).to.equal(1000);
  });

  it("service-detail api test", async () => {
    const testServiceId = "cad3f2d5-fb4d-4ab9-9355-56e862f92ff6";
    const receivedData = {
      responseTime: 1585467717505,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        serviceId: testServiceId,
        name: "TESTDAPP",
        description: "TESTDAPP description",
        category: "SNS",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/services/${testServiceId}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.serviceDetail(testServiceId);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["serviceId"]).to.equal(testServiceId);
  });

  it("service-tokens api test", async () => {
    const receivedData = {
      responseTime: 1585467715136,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          contractId: "9636a07e",
          ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          name: "skt1",
          symbol: "SYNPH",
          imgUri: "https://sample.image",
          meta:
            "kjpxcnzuec5l1x8r5ngxl1ghl4tzvawv9bryobjvzc1o4uywnzeydcv4jl8f5mzw1w9e4897op6rsy43exbyojrk5e81jj9jvqd9yye6mdnffhbzptqyc8693ss4by0cjvle1jgtb8ofgr1tkve8nuyn3z9qm14wrtmdzsysvo2n33qwmc6gj2ugdsi9c4m8wa3alf5cdp1dkzs8vj715ifme6v0h4yvk7ranmby0hu0rewu7iv4ex79e8vyvqoodck1b3ry3az5xhfmlwbe1bmku908q3e0wy26rg6gcirgdbkhtryt1f1djpjo2zkkml94h8unwupoll",
          decimals: 6,
          createdAt: 1584070098000,
          totalSupply: "2185",
          totalMint: "2205",
          totalBurn: "20",
          serviceId: "cad3f2d5-fb4d-4ab9-9355-56e862f92ff6",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/service-tokens`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.serviceTokens();
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["contractId"]).to.equal("9636a07e");
  });

  it("service-token detail api test", async () => {
    const testContractId = "9636a07e";
    const receivedData = {
      responseTime: 1585467715136,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        contractId: testContractId,
        ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
        name: "skt1",
        symbol: "SYNPH",
        imgUri: "https://sample.image",
        meta:
          "kjpxcnzuec5l1x8r5ngxl1ghl4tzvawv9bryobjvzc1o4uywnzeydcv4jl8f5mzw1w9e4897op6rsy43exbyojrk5e81jj9jvqd9yye6mdnffhbzptqyc8693ss4by0cjvle1jgtb8ofgr1tkve8nuyn3z9qm14wrtmdzsysvo2n33qwmc6gj2ugdsi9c4m8wa3alf5cdp1dkzs8vj715ifme6v0h4yvk7ranmby0hu0rewu7iv4ex79e8vyvqoodck1b3ry3az5xhfmlwbe1bmku908q3e0wy26rg6gcirgdbkhtryt1f1djpjo2zkkml94h8unwupoll",
        decimals: 6,
        createdAt: 1584070098000,
        totalSupply: "2185",
        totalMint: "2205",
        totalBurn: "20",
        serviceId: "cad3f2d5-fb4d-4ab9-9355-56e862f92ff6",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/service-tokens/${testContractId}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.serviceTokenDetail(testContractId);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["contractId"]).to.equal("9636a07e");
  });

  it("update service-token api test", async () => {
    const testContractId = "9636a07e";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "dTudb9Hq5i2ieHyJFo6o",
      meta: "bdfssdfasd",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onPut(`/v1/service-tokens/${testContractId}`).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.updateServiceToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("mint service-token api test", async () => {
    const testContractId = "9636a07e";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      amount: "1249051",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onPost(`/v1/service-tokens/${testContractId}/mint`).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.mintServiceToken(testContractId, request);
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("burn from service-token api test", async () => {
    const testContractId = "9636a07e";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      fromAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      amount: "31",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(`/v1/service-tokens/${testContractId}/burn-from`)
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.burnFromServiceToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("service-token-holders api test", async () => {
    const testContractId = "9636a07e";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467715916,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          address: testAddress,
          userId: null,
          amount: "1066",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/service-tokens/${testContractId}/holders`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      return [200, receivedData];
    });

    const response = await httpClient.serviceTokenHolders(
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["address"]).to.equal(testAddress);
  });

  it("item-token api test", async () => {
    const testContractId = "61e14383";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467704763,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        contractId: testContractId,
        baseImgUri: "https://image-base-uri/",
        ownerAddress: testAddress,
        createdAt: 1584070104000,
        serviceId: "cad3f2d5-fb4d-4ab9-9355-56e862f92ff6",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/item-tokens/${testContractId}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.itemToken(testContractId);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["ownerAddress"]).to.equal(testAddress);
  });

  it("all fungible-tokens api test", async () => {
    const testContractId = "61e14383";
    const testTokenType = "0000004a";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const receivedData = {
      responseTime: 1585467697421,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: testTokenType,
          name: "TOKEN0313",
          meta: "",
          createdAt: 1585378323000,
          totalSupply: "0",
          totalMint: "0",
          totalBurn: "0",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/item-tokens/${testContractId}/fungibles`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      return [200, receivedData];
    });

    const response = await httpClient.fungibleTokens(
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenType"]).to.equal(testTokenType);
  });

  it("create fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "4W1Vj9U8tYf",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onPost(`/v1/item-tokens/${testContractId}/fungibles`).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.createFungibleToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("fungible-token api test", async () => {
    const testContractId = "61e14383";
    const testTokenType = "0000004a";

    const receivedData = {
      responseTime: 1585467697421,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenType: testTokenType,
        name: "TOKEN0313",
        meta: "",
        createdAt: 1585378323000,
        totalSupply: "0",
        totalMint: "0",
        totalBurn: "0",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/item-tokens/${testContractId}/fungibles/${testTokenType}`)
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleToken(
      testContractId,
      testTokenType,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenType"]).to.equal(testTokenType);
  });

  it("update fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "4W1Vj9U8tYf",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPut(`/v1/item-tokens/${testContractId}/fungibles/${testTokenType}`)
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.updateFungibleToken(
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("mint fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: testAddress,
      amount: "5113980",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/item-tokens/${testContractId}/fungibles/${testTokenType}/mint`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.mintFungibleToken(
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("burn fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      fromAddress: testAddress,
      amount: "5113980",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/item-tokens/${testContractId}/fungibles/${testTokenType}/burn`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.burnFungibleToken(
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("burn fungible-token without fromAddress and fromUserId api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      amount: "5113980",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/item-tokens/${testContractId}/fungibles/${testTokenType}/burn`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    expect(() =>
      httpClient.burnFungibleToken(testContractId, testTokenType, request),
    ).to.throw();
  });

  it("fungible-token-holders api test", async () => {
    const testContractId = "9636a07e";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467715916,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          walletAddress: testAddress,
          userId: null,
          amount: "1066",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/fungibles/${testTokenType}/holders`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleTokenHolders(
      testContractId,
      testTokenType,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["walletAddress"]).to.equal(testAddress);
  });

  it("non-fungible-tokens api test", async () => {
    const testContractId = "9636a07e";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467713288,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: testTokenType,
          name: "y1gcofvx0y86",
          meta: "",
          createdAt: 1585353869000,
          totalSupply: "0",
          totalMint: "0",
          totalBurn: "0",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/item-tokens/${testContractId}/non-fungibles`)
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokens(
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenType"]).to.equal(testTokenType);
  });

  it("create non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "yVvznw2RICXtz11Lw",
      meta: "235v234r01234",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(`/v1/item-tokens/${testContractId}/non-fungibles`)
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.createNonFungibleToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("non-fungible-token-type api test", async () => {
    const testContractId = "9636a07e";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const receivedData = {
      responseTime: 1585467712122,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenType: testTokenType,
        name: "NFT Name",
        meta: "NFT meta",
        createdAt: 1584075623000,
        totalSupply: 13,
        totalMint: 15,
        totalBurn: 2,
        token: [
          {
            tokenIndex: testTokenIndex,
            name: "NFT index name",
            meta: "NFT index meta",
            createdAt: 1584075664000,
            burnedAt: null,
          },
        ],
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}`)
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenType(
      testContractId,
      testTokenType,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenType"]).to.equal(testTokenType);
    expect(response["responseData"]["token"][0]["tokenIndex"]).to.equal(
      testTokenIndex,
    );
  });

  it("update non-fungible-token-type api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "yVvznw2RICXtz11Lw",
      meta: "235v234r01234",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPut(`/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}`)
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.updateNonFungibleTokenType(
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const testTokenId = testTokenType + testTokenIndex;
    const receivedData = {
      responseTime: 1585467695350,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        name: "NFT index name",
        tokenId: testTokenId,
        meta: "NFT index meta",
        createdAt: 1584075664000,
        burnedAt: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenId"]).to.equal(testTokenId);
  });

  it("update non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "yVvznw2RICXtz11Lw",
      meta: "235v234r01234",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}`;
    stub.onPut(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.updateNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("mint non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1wxxfe3etmaxv8hvrdxfwveewrcynynhlnm0jkn",
      name: "Nnq8Eda",
      meta: "5y4bh",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/mint`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.mintNonFungibleToken(
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("non-fungible-token-type holders api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const receivedData = {
      responseTime: 1585467711436,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          walletAddress: testAddress,
          userId: null,
          numberOfIndex: "5",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/holders`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenTypeHolders(
      testContractId,
      testTokenType,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["walletAddress"]).to.equal(testAddress);
  });

  it("non-fungible-token holder api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const receivedData = {
      responseTime: 1585467711436,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        walletAddress: testAddress,
        userId: null,
        numberOfIndex: "5",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/holder`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenHolder(
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["walletAddress"]).to.equal(testAddress);
  });

  it("multi-mint non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: testAddress,
      mintList: [
        {
          tokenType: "10000001",
          name: "WGk",
          meta: "5y4bh",
        },
        {
          tokenType: "10000001",
          name: "aoU",
        },
      ],
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/multi-mint`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.multiMintNonFungibleToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("multi-mint with multi-receivers non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      mintList: [
        {
          tokenType: "10000001",
          name: "WGk",
          meta: "5y4bh",
          toAddress: testAddress,
        },
        {
          tokenType: "10000001",
          name: "aoU",
          toAddress: testAddress,
        },
      ],
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/multi-recipients/multi-mint`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.multiMintWithMultiReceiversNonFungibleToken(
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("burn non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const request = {
      ownerAddress: testAddress,
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      fromAddress: testAddress,
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/burn`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.burnNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("non-fungible-token-type children api test", async () => {
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const testChildTokenId = "100000080000006a";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const receivedData = {
      responseTime: 1585498287024,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          name: "Before",
          tokenId: testChildTokenId,
          meta: "",
          createdAt: 1585207242000,
          burnedAt: null,
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/children`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.childrenOfNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenId"]).to.equal(testChildTokenId);
  });

  it("non-fungible-token-type parent api test", async () => {
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const testParentTokenId = "100000080000006a";
    const receivedData = {
      responseTime: 1585498287024,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        name: "Before",
        tokenId: testParentTokenId,
        meta: "",
        createdAt: 1585207242000,
        burnedAt: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/parent`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.parentOfNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenId"]).to.equal(testParentTokenId);
  });

  it("attach non-fungible-token api test", async () => {
    const testContractId = "9636a07e";
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const testParentTokenId = "100000010000000e";
    const request = {
      serviceWalletAddress: testAddress,
      serviceWalletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      parentTokenId: testParentTokenId,
      tokenHolderAddress: testAddress,
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/parent`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.attachNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("detach non-fungible-token api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/parent`;
    stub.onDelete(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const request = {
      serviceWalletAddress: testAddress,
      serviceWalletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      tokenHolderAddress: testAddress,
    };

    const response = await httpClient.detachNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("non-fungible-token-type root api test", async () => {
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000001";
    const testParentTokenId = "100000080000006a";
    const receivedData = {
      responseTime: 1585498287024,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        name: "Before",
        tokenId: testParentTokenId,
        meta: "",
        createdAt: 1585207242000,
        burnedAt: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/root`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.rootOfNonFungibleToken(
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenId"]).to.equal(testParentTokenId);
  });

  it("list of wallets api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467701354,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          name: "ai7x0eda9a",
          walletAddress: testAddress,
          createdAt: 1584070098000,
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.wallets();
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["walletAddress"]).to.equal(testAddress);
  });

  it("wallet detail api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467701354,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        name: "ai7x0eda9a",
        walletAddress: testAddress,
        createdAt: 1584070098000,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets/${testAddress}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.walletDetail(testAddress);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["walletAddress"]).to.equal(testAddress);
  });

  it("list of transactions of a wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTxHash =
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const receivedData = transactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets/${testAddress}/transactions`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      return [200, receivedData];
    });

    const response = await httpClient.walletTransactions(
      testAddress,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["txhash"]).to.equal(testTxHash);
  });

  it("list of transactions of a wallet with optional params api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTxHash =
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const before = 1585467706110;
    const after = 1585467906110;
    const msgType = TransactionMsgTypes.ACCOUNT_MSGEMPTY;
    const receivedData = transactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets/${testAddress}/transactions`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      assertParameters(config.params, {
        before: before,
        after: after,
        msgType: msgType,
      });
      return [200, receivedData];
    });

    const response = await httpClient.walletTransactions(
      testAddress,
      pageRequest,
      { before, after, msgType },
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["txhash"]).to.equal(testTxHash);
  });

  it("base-coin balance of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467716718,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        symbol: "TC",
        decimals: 6,
        amount: "1000000",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets/${testAddress}/base-coin`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.baseCoinBalanceOfWallet(testAddress);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["symbol"]).to.equal("TC");
    expect(response["responseData"]["decimals"]).to.equal(6);
    expect(response["responseData"]["amount"]).to.equal("1000000");
  });

  it("service-token balances of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const receivedData = {
      responseTime: 1585467709526,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          contractId: testContractId,
          name: "v2nph",
          symbol: "V2NPH",
          imgUri: "https://sample.image",
          decimals: 6,
          amount: "3520543372",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/wallets/${testAddress}/service-tokens`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      return [200, receivedData];
    });

    const response = await httpClient.serviceTokenBalancesOfWallet(
      testAddress,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["contractId"]).to.equal(testContractId);
  });

  it("service-token balance of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const receivedData = {
      responseTime: 1585467709526,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        contractId: testContractId,
        name: "v2nph",
        symbol: "V2NPH",
        imgUri: "https://sample.image",
        decimals: 6,
        amount: "3520543372",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/wallets/${testAddress}/service-tokens/${testContractId}`)
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.serviceTokenBalanceOfWallet(
      testAddress,
      testContractId,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["contractId"]).to.equal(testContractId);
  });

  it("fungible-token balances of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467708815,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: testTokenType,
          name: "Hello",
          meta: "Hello",
          amount: "1",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/wallets/${testAddress}/item-tokens/${testContractId}/fungibles`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleTokenBalancesOfWallet(
      testAddress,
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenType"]).to.equal(testTokenType);
  });

  it("fungible-token balance of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467708815,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenType: testTokenType,
        name: "Hello",
        meta: "Hello",
        amount: "1",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/wallets/${testAddress}/item-tokens/${testContractId}/fungibles/${testTokenType}`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleTokenBalanceOfWallet(
      testAddress,
      testContractId,
      testTokenType,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenType"]).to.equal(testTokenType);
  });

  it("non-fungible-token balances of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenIndex: testTokenIndex,
          name: "as",
          meta: "test",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/wallets/${testAddress}/item-tokens/${testContractId}/non-fungibles`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenBalancesOfWallet(
      testAddress,
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("non-fungible-token balances by type of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenIndex: testTokenIndex,
          name: "as",
          meta: "test",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/wallets/${testAddress}/item-tokens/${testContractId}/non-fungibles/${testTokenType}`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenBalancesByTypeOfWallet(
      testAddress,
      testContractId,
      testTokenType,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("non-fungible-token balance of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenIndex: testTokenIndex,
        name: "as",
        meta: "test",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());
    const path = `/v1/wallets/${testAddress}/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}`;
    stub.onGet(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.nonFungibleTokenBalanceOfWallet(
      testAddress,
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("tranfer base-coin of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(`/v1/wallets/${testAddress}/base-coin/transfer`)
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.transferBaseCoinOfWallet(
      testAddress,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("tranfer service-token of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const request = {
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/wallets/${testAddress}/service-tokens/${testContractId}/transfer`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.transferServiceTokenOfWallet(
      testAddress,
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("tranfer fungible-token of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const request = {
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/wallets/${testAddress}/item-tokens/${testContractId}/fungibles/${testTokenType}/transfer`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.transferFungibleTokenOfWallet(
      testAddress,
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("tranfer nonfungible-token of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const testTokenIndex = "00000001";
    const testTokenType = "0000004a";
    const request = {
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/wallets/${testAddress}/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.transferNonFungibleTokenOfWallet(
      testAddress,
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("batch-tranfer nonfungible-token of wallet api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testContractId = "9636a07e";
    const request = {
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      transferList: TokenId.fromMulti(["1000000100000001", "1000000100000002"]),
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/wallets/${testAddress}/item-tokens/${testContractId}/non-fungibles/batch-transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.batchTransferNonFungibleTokenOfWallet(
      testAddress,
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("user-detail api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const testUserId = "U556719f559479aab8b8f74c488bf6317";

    const receivedData = {
      responseTime: 1585467698558,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        userId: "U556719f559479aab8b8f74c488bf6317",
        walletAddress: testAddress,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/users/${testUserId}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.userDetail(testUserId);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["walletAddress"]).to.equal(testAddress);
    expect(response["responseData"]["userId"]).to.equal(testUserId);
  });

  it("list of transactions of a user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testTxHash =
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const receivedData = transactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/users/${testUserId}/transactions`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, pageRequest);
      return [200, receivedData];
    });

    const response = await httpClient.userTransactions(testUserId, pageRequest);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["txhash"]).to.equal(testTxHash);
  });

  it("service-token balance of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const receivedData = {
      responseTime: 1585467709526,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        contractId: testContractId,
        name: "v2nph",
        symbol: "V2NPH",
        imgUri: "https://sample.image",
        decimals: 6,
        amount: "3520543372",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/users/${testUserId}/service-tokens/${testContractId}`)
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.serviceTokenBalanceOfUser(
      testUserId,
      testContractId,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["contractId"]).to.equal(testContractId);
  });

  it("fungible-token balances of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467708815,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: testTokenType,
          name: "Hello",
          meta: "Hello",
          amount: "1",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(`/v1/users/${testUserId}/item-tokens/${testContractId}/fungibles`)
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleTokenBalancesOfUser(
      testUserId,
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenType"]).to.equal(testTokenType);
  });

  it("fungible-token balance of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const receivedData = {
      responseTime: 1585467708815,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenType: testTokenType,
        name: "Hello",
        meta: "Hello",
        amount: "1",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/users/${testUserId}/item-tokens/${testContractId}/fungibles/${testTokenType}`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        return [200, receivedData];
      });

    const response = await httpClient.fungibleTokenBalanceOfUser(
      testUserId,
      testContractId,
      testTokenType,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenType"]).to.equal(testTokenType);
  });

  it("non-fungible-token balances of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenIndex: testTokenIndex,
          name: "as",
          meta: "test",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenBalancesOfUser(
      testUserId,
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("non-fungible-token balances with type of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new CursorPageRequest("", 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenId = "1000000100000021";
    const testTokenType = "10000001";
    const receivedData = {
      responseTime: 1637929777140,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        list: [
          {
            type: {
              tokenType: testTokenType,
              name: "test-type",
              meta: "",
              createdAt: 1628843776947,
              totalSupply: "35",
              totalMint: "35",
              totalBurn: "0",
            },
            token: {
              name: "Test",
              tokenId: testTokenId,
              meta: "test-meta",
              createdAt: 1630925137769,
              burnedAt: 0,
            },
          },
        ],
        prePageToken:
          "eJxtzk0PgjAMBuD/0jMHESXoDQETYoJGd9ATWbYuEnDAmAQk/HfnZzzYU/ukfdMBKOcKm8aXPCilVpTp2HRFgUxnpUyEXmeFRgXL4bMKS9BFJnM7rx1Ptfx661rnush7wRhdVBd0WYVdPavPSL2uBQvYN9nc2p4n3LkjYLSgVBzVqjcabBOy9wOSxmEaRocgJdtNlKTktIt+5zgJo+MTTCwV78f+51ugyxwl6St88ORZ9odjybEz/uKpDeN4BzAdV4M=",
        nextPageToken:
          "eJxtjssOgjAQRf9l1iwE1AA7REyICRrtQlekaaeRgAVqIaDh363PuHBWc09mTu4NKOcKL5dQ8qiSWlGmE7OVJTKdVzIVepWXGhUEt88pBKDLXBZ20bie6nh77Tu39YtBMEb9+oxzVmPfTJsTUq/vwAL2NZtf2/PEfOYKGC2oFEe1GAyNNinZhRHJkmUW7qOMbNZxmpHjNv6JSbqMD49snFS8W/2XW6CrAiUZanzgyXPsD04kx97wF3YcGMc7LXNWrA==",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles/with-type`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        // assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenBalancesWithTypeOfUser(
      testUserId,
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response.responseData.list[0].type.tokenType).to.equal(
      testTokenType,
    );
    expect(response.responseData.list[0].token.tokenId).to.equal(testTokenId);
  });

  it("non-fungible-token balances by type of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC);
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenIndex: testTokenIndex,
          name: "as",
          meta: "test",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onGet(
        `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles/${testTokenType}`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        assertPageParameters(config.params, pageRequest);
        return [200, receivedData];
      });

    const response = await httpClient.nonFungibleTokenBalancesByTypeOfUser(
      testUserId,
      testContractId,
      testTokenType,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("non-fungible-token balance of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const testTokenIndex = "00000006";
    const receivedData = {
      responseTime: 1585467701633,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        tokenIndex: testTokenIndex,
        name: "as",
        meta: "test",
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());
    const path = `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}`;
    stub.onGet(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.nonFungibleTokenBalanceOfUser(
      testUserId,
      testContractId,
      testTokenType,
      testTokenIndex,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["tokenIndex"]).to.equal(testTokenIndex);
  });

  it("tranfer service-token of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/users/${testUserId}/service-tokens/${testContractId}/transfer`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.transferServiceTokenOfUser(
      testUserId,
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("tranfer fungible-token of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub
      .onPost(
        `/v1/users/${testUserId}/item-tokens/${testContractId}/fungibles/${testTokenType}/transfer`,
      )
      .reply(config => {
        assertHeaders(config.headers);
        expect(config.data).to.equal(JSON.stringify(request));
        return [200, receivedData];
      });

    const response = await httpClient.transferFungibleTokenOfUser(
      testUserId,
      testContractId,
      testTokenType,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("tranfer nonfungible-token of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testTokenIndex = "00000001";
    const testTokenType = "0000004a";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles/${testTokenType}/${testTokenIndex}/transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.transferNonFungibleTokenOfUser(
      testUserId,
      testContractId,
      testTokenType,
      testTokenIndex,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("batch-tranfer nonfungible-token of user api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      transferList: TokenId.fromMulti(["1000000100000001", "1000000100000002"]),
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/item-tokens/${testContractId}/non-fungibles/batch-transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.batchTransferNonFungibleTokenOfUser(
      testUserId,
      testContractId,
      request,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("issue session-token of a user for base-coin transfer api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testRequestSessionToken = "J4EDHA_oyCyXrtREGS4MpyoGeus";
    const request = {
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
      landingUri: "https://my.service.landing/home",
    };

    const receivedData = {
      responseTime: 1585484513052,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        requestSessionToken: testRequestSessionToken,
        redirectUri: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/base-coin/request-transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.issueSessionTokenForBaseCoinTransfer(
      testUserId,
      RequestType.AOA,
      request,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["requestSessionToken"]).to.equal(
      testRequestSessionToken,
    );
  });

  it("issue session-token of a user for service-token transfer api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testRequestSessionToken = "J4EDHA_oyCyXrtREGS4MpyoGeus";
    const request = {
      toAddress: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
      amount: "15",
      landingUri: "https://my.service.landing/home",
    };

    const receivedData = {
      responseTime: 1585484513052,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        requestSessionToken: testRequestSessionToken,
        redirectUri: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/service-tokens/${testContractId}/request-transfer`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.issueSessionTokenForServiceTokenTransfer(
      testUserId,
      testContractId,
      RequestType.AOA,
      request,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["requestSessionToken"]).to.equal(
      testRequestSessionToken,
    );
  });

  it("issue a user proxy request for service-token api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testRequestSessionToken = "J4EDHA_oyCyXrtREGS4MpyoGeus";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      landingUri: "https://my.service.landing/home",
    };

    const receivedData = {
      responseTime: 1585484513052,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        requestSessionToken: testRequestSessionToken,
        redirectUri: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/service-tokens/${testContractId}/request-proxy`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.issueServiceTokenProxyRequest(
      testUserId,
      testContractId,
      RequestType.AOA,
      request,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["requestSessionToken"]).to.equal(
      testRequestSessionToken,
    );
  });

  it("issue a user proxy request for item-token api test", async () => {
    const testUserId = "U556719f559479aab8b8f74c488bf6317";
    const testContractId = "9636a07e";
    const testRequestSessionToken = "J4EDHA_oyCyXrtREGS4MpyoGeus";
    const request = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      landingUri: "https://my.service.landing/home",
    };

    const receivedData = {
      responseTime: 1585484513052,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        requestSessionToken: testRequestSessionToken,
        redirectUri: null,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/users/${testUserId}/item-tokens/${testContractId}/request-proxy`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.issueItemTokenProxyRequest(
      testUserId,
      testContractId,
      RequestType.AOA,
      request,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["requestSessionToken"]).to.equal(
      testRequestSessionToken,
    );
  });

  it("commit a user proxy request api test", async () => {
    const testRequestSessionToken = "J4EDHA_oyCyXrtREGS4MpyoGeus";

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/user-requests/${testRequestSessionToken}/commit`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.commitProxyRequest(
      testRequestSessionToken,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("transaction result api test", async () => {
    const testTxHash =
      "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A";
    const receivedData = singleTransactionResult;

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/transactions/${testTxHash}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.transactionResult(testTxHash);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["txhash"]).to.equal(testTxHash);
  });

  it("creat a memo api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      walletAddress: testAddress,
      walletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      memo: "Show me the money",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/memos`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.createMemo(request);
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("query a memo api test", async () => {
    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const testMemo = "Show me the money";
    const receivedData = {
      responseTime: 1585498625527,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: {
        memo: testMemo,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/memos/${testTxHash}`;
    stub.onGet(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.memos(testTxHash);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["memo"]).to.equal(testMemo);
  });

  it("update fungible-token media resource", async () => {
    const testContractId = "9636a07e";

    const updateList = [{ tokenType: "00000001" }, { tokenType: "00000002" }];

    const expectedRequest = { updateList: updateList };

    const testRequestId = "test-request-id";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        requestId: testRequestId,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/fungibles/icon`;
    stub.onPut(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(expectedRequest));
      return [200, receivedData];
    });

    const response = await httpClient.updateTokenMediaResources(
      testContractId,
      ["00000001", "00000002"],
      true,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["requestId"]).to.equal(testRequestId);
  });

  it("update non-fungible-token media resource", async () => {
    const testContractId = "9636a07e";

    const updateList = [
      {
        tokenType: "10000001",
        tokenIndex: "00000001",
      },
      {
        tokenType: "10000002",
        tokenIndex: "00000001",
      },
    ];

    const expectedRequest = { updateList: updateList };

    const testRequestId = "test-request-id";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        requestId: testRequestId,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/non-fungibles/icon`;
    stub.onPut(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(expectedRequest));
      return [200, receivedData];
    });

    const response = await httpClient.updateTokenMediaResources(
      testContractId,
      ["1000000100000001", "1000000200000001"],
      false,
    );
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["requestId"]).to.equal(testRequestId);
  });

  it("query fungible-token media resource update status", async () => {
    const testContractId = "9636a07e";
    const testRequestId = "test-request-id";
    const testTokenType1 = "00000001";
    const testTokenType2 = "00000002";
    const receivedData = {
      responseTime: 1585498625527,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: "00000001",
          url: `https://lbw-impro.line-apps.com/v1/cashew/token/${testContractId}/${testTokenType1}`,
          status: "COMPLETED",
        },
        {
          tokenType: "00000002",
          url: `https://lbw-impro.line-apps.com/v1/cashew/token/${testContractId}/${testTokenType2}`,
          status: "COMPLETED",
          detailStatus: "-",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/fungibles/icon/${testRequestId}/status`;
    stub.onGet(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.fungibleTokenMediaResourcesUpdateStatuses(
      testContractId,
      testRequestId,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0].tokenType).to.equal(testTokenType1);
  });

  it("query non-fungible-token media resource update status", async () => {
    const testContractId = "9636a07e";
    const testRequestId = "test-request-id";
    const testTokenType1 = "10000001";
    const testTokenType2 = "10000002";
    const testTokenIndex1 = "00000001";
    const testTokenIndex2 = "00000002";
    const receivedData = {
      responseTime: 1585498625527,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          tokenType: testTokenType1,
          tokenIndex: testTokenIndex1,
          url: `https://lbw-impro.line-apps.com/v1/cashew/token/${testContractId}/${testTokenType1}${testTokenIndex1}`,
          status: "COMPLETED",
        },
        {
          tokenType: testTokenType2,
          tokenIndex: testTokenIndex2,
          url: `https://lbw-impro.line-apps.com/v1/cashew/token/${testContractId}/${testTokenType2}${testTokenIndex2}`,
          status: "COMPLETED",
          detailStatus: "-",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens/${testContractId}/fungibles/icon/${testRequestId}/status`;
    stub.onGet(path).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.fungibleTokenMediaResourcesUpdateStatuses(
      testContractId,
      testRequestId,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0].tokenType).to.equal(testTokenType1);
  });

  it("test default-paging-request when not page-request-is given", async () => {
    const testContractId = "9636a07e";
    const pageRequest = { "page": null, "limit": null, "orderBy": null };
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const receivedData = {
      responseTime: 1585467715916,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          address: testAddress,
          userId: null,
          amount: "1066",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/service-tokens/${testContractId}/holders`).reply(config => {
      assertHeaders(config.headers);
      assertPageParameters(config.params, DEFAULT_PAGE_REQUEST);
      return [200, receivedData];
    });

    const response = await httpClient.serviceTokenHolders(
      testContractId,
      pageRequest,
    );
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["address"]).to.equal(testAddress);
  });

  it("create item-token-contract api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      serviceWalletAddress: testAddress,
      serviceWalletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      baseImgUri: "https://image-base-uri.com/",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/item-tokens`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.createItemTokenContract(request);
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("issue service-token-contract api test", async () => {
    const testAddress = "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww";
    const request = {
      serviceWalletAddress: testAddress,
      serviceWalletSecret: "PCSO7JBIH1gWPNNR5vT58Hr2SycFSUb9nzpNapNjJFU=",
      name: "Test",
      symbol: "TEST",
      initialSupply: "1000",
      recipientWalletAddress: testAddress,
      imgUri: "https://image-base-uri.com/",
    };

    const testTxHash =
      "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661";
    const receivedData = {
      responseTime: 1585467711877,
      statusCode: 1002,
      statusMessage: "Accepted",
      responseData: {
        txHash: testTxHash,
      },
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    const path = `/v1/service-tokens`;
    stub.onPost(path).reply(config => {
      assertHeaders(config.headers);
      expect(config.data).to.equal(JSON.stringify(request));
      return [200, receivedData];
    });

    const response = await httpClient.issueServiceToken(request);
    expect(response["statusCode"]).to.equal(1002);
    expect(response["responseData"]["txHash"]).to.equal(testTxHash);
  });

  it("issued-service-tokens-by-txHash api test", async () => {
    const testTxHash = "22DF78611396824D293AF7ABA04A2A646B1E3055A19B32E731D8E03BAE743661"
    const receivedData = {
      responseTime: 1585467715136,
      statusCode: 1000,
      statusMessage: "Success",
      responseData: [
        {
          contractId: "9636a07e",
          ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          name: "skt1",
          symbol: "SYNPH",
          imgUri: "https://sample.image",
          meta: "",
          decimals: 6,
          createdAt: 1584070098000,
          serviceId: "cad3f2d5-fb4d-4ab9-9355-56e862f92ff6",
        },
      ],
    };

    stub = new MockAdapter(httpClient.getAxiosInstance());

    stub.onGet(`/v1/service-tokens/by-txHash/${testTxHash}`).reply(config => {
      assertHeaders(config.headers);
      return [200, receivedData];
    });

    const response = await httpClient.issuedServiceTokenByTxHash(testTxHash);
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"][0]["contractId"]).to.equal("9636a07e");
  });
});

function assertHeaders(headers: any) {
  expect(headers).to.have.any.keys(Constant.SERVICE_API_KEY_HEADER);
  expect(headers).to.have.any.keys(Constant.NONCE_HEADER);
  expect(headers).to.have.any.keys(Constant.SIGNATURE_HEADER);
  expect(headers).to.have.any.keys(Constant.TIMESTAMP_HEADER);
}

function assertPageParameters(pageParameters: any, pageRequest: PageRequest) {
  expect(pageParameters["page"]).to.equal(pageRequest.page);
  expect(pageParameters["limit"]).to.equal(pageRequest.limit);
  expect(pageParameters["orderBy"]).to.equal(pageRequest.orderBy);
}

function assertParameters(configParams: any, params: any) {
  console.log("configParams: " + JSON.stringify(configParams));
  _.forOwn(params, (value, key) => {
    console.log(`key:${key}, value: ${value}`);
    expect(configParams[key]).to.equal(value);
  });
}
