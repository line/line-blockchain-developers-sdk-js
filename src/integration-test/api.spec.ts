import { load } from 'ts-dotenv';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const expect = chai.expect;
import { describe, it } from "mocha";

import _ from "lodash";
import { HttpClient } from '../lib/http-client-base';
import { Constant } from '../lib/constants';
import { TransactionMsgTypes } from '../lib/constants';
import { PageRequest, OrderBy, OptionalTransactionSearchParameters } from '../lib/request';
import { NonFungibleTokenMintRequest } from '../lib/request';
import { TokenId } from '../lib/request';
import { RequestType } from '../lib/request';

const env = load(
  {
    "HOST_URL": String,
    "SERVICE_ID": String,
    "SERVICE_API_KEY": String,
    "SERVICE_API_SECRET": String,
    "SERVICE_TOKEN_CONTRACT_ID": String,
    "ITEM_TOKEN_CONTRACT_ID": String,
    "OWNER_ADDRESS": String,
    "OWNER_SECRET": String,
    "OWNER_ADDRESS2": String,
    "LINE_USER_ID": String,
    "LINE_USER_WALLET_ADDRESS": String,
  }, {
  "path": "./src/integration-test/integration-test.env"
}
)

const HOST_URL = env.HOST_URL
const SERVICE_ID = env.SERVICE_ID
const SERVICE_API_KEY = env.SERVICE_API_KEY
const SERVICE_API_SECRET = env.SERVICE_API_SECRET
const OWNER_ADDRESS = env.OWNER_ADDRESS
const OWNER_SECRET = env.OWNER_SECRET
const OWNER_ADDRESS2 = env.OWNER_ADDRESS2
const SERVICE_TOKEN_CONTRACT_ID = env.SERVICE_TOKEN_CONTRACT_ID
const ITEM_TOKEN_CONTRACT_ID = env.ITEM_TOKEN_CONTRACT_ID
const LINE_USER_ID = env.LINE_USER_ID


describe('http-client-base test', () => {
  const httpClient = new HttpClient(HOST_URL, SERVICE_API_KEY, SERVICE_API_SECRET);

  it('time api test', async () => { 1

    const response = await httpClient.time();
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceDetail api test', async () => {

    const response = await httpClient.serviceDetail(SERVICE_ID);
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceTokens api test', async () => {

    const response = await httpClient.serviceTokens();
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceTokenDetail api test', async () => {

    const response = await httpClient.serviceTokenDetail(SERVICE_TOKEN_CONTRACT_ID);
    expect(response["statusCode"]).to.equal(1000);
  })

  it('updateServiceToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      "name": "yyoosvctoken11"
    };

    const response =
      await httpClient.updateServiceToken(SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('mintServiceToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      "toAddress": OWNER_ADDRESS,
      "amount": "1000000"
    };

    const response =
      await httpClient.mintServiceToken(SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })
  //

  it('burnFromServiceToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      "fromAddress": OWNER_ADDRESS,
      "amount": "10"
    };

    const response =
      await httpClient.burnFromServiceToken(SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('serviceTokenHolders api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.serviceTokenHolders(SERVICE_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('itemToken api test', async () => {
    const response =
      await httpClient.itemToken(ITEM_TOKEN_CONTRACT_ID);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('fungibleTokens api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.fungibleTokens(ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('updateFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      "name": "yynft00"
    }
    const response =
      await httpClient.updateFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('mintFungibleToken api test', async () => {
    const request = {
        "ownerAddress": OWNER_ADDRESS,
        "ownerSecret": OWNER_SECRET,
        "toAddress": OWNER_ADDRESS,
        "amount": "1000000"
      };
    const response =
      await httpClient.mintFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('burnFungibleToken api test', async () => {
    const request = {
        "ownerAddress": OWNER_ADDRESS,
        "ownerSecret": OWNER_SECRET,
        "fromAddress": OWNER_ADDRESS,
        "amount": "1000000"
      };
    const response =
      await httpClient.burnFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('fungibleTokenHolders api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.fungibleTokenHolders(ITEM_TOKEN_CONTRACT_ID, "00000002", pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokens api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokens(ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('createNonFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'name': 'yyoonft02',
      'meta': '11'
    };
    const response =
      await httpClient.createNonFungibleToken(ITEM_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('updateNonFungibleTokenType api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      "name": "yynft021"
    }
    const response =
      await httpClient.updateNonFungibleTokenType(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('mintNonFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'toAddress': OWNER_ADDRESS,
      'name': 'Nnq8Edc',
      'meta': '5y4bh'
    }

    const response =
      await httpClient.mintNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('nonFungibleTokenType api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenType(ITEM_TOKEN_CONTRACT_ID, "10000002", pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleToken api test', async () => {
    const response =
      await httpClient.nonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000001");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('updateNonFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'name': 'Nnq8Edb',
      'meta': '5y4bh'
    }
    const response =
      await httpClient.updateNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000001",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('nunFungibleTokenTypeHolders api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenTypeHolders(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nunFungibleTokenHolder api test', async () => {
    const response =
      await httpClient.nonFungibleTokenHolder(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000001");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
    expect(response["responseData"]["walletAddress"]).to.equal(OWNER_ADDRESS);
  })

  it('multiMintnonFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'toAddress': OWNER_ADDRESS,
      'mintList': [
        {
          'tokenType': '10000002',
          'name': 'WGk',
          'meta': '5y4bh'
        }
      ]
    }
    const response =
      await httpClient.multiMintnonFungibleToken(ITEM_TOKEN_CONTRACT_ID,request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('burnNonFungibleToken api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'fromAddress': OWNER_ADDRESS
    }
    const response =
      await httpClient.burnNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000001",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('attachNonFungibleToken api test', async () => {
    const request = {
      'serviceWalletAddress': OWNER_ADDRESS,
      'serviceWalletSecret': OWNER_SECRET,
      'parentTokenId': '1000000200000001',
      'tokenHolderAddress': OWNER_ADDRESS
    }
    const response =
      await httpClient.attachNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('childrenOfNonFungibleToken api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.childrenOfNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000001",
        pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('detachNonFungibleToken api test', async () => {
    const request = {
      'serviceWalletAddress': OWNER_ADDRESS,
      'serviceWalletSecret': OWNER_SECRET,
      'tokenHolderAddress': OWNER_ADDRESS
    }
    const response =
      await httpClient.detachNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('rootOfNonFungibleToken api test', async () => {
    const response =
      await httpClient.rootOfNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002",);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('wallets api test', async () => {
    const response =
      await httpClient.wallets();

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('walletDetail api test', async () => {
    const response =
      await httpClient.walletDetail(OWNER_ADDRESS);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })


  it('walletTransactions api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.walletTransactions(OWNER_ADDRESS, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('walletTransactions api test with all parameters', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const optionalTransactionSearchParameters = new OptionalTransactionSearchParameters(
      1617155991000, 1614563991000, "collection/MsgTransferNFTFrom"
    )
    const response =
      await httpClient.walletTransactions(OWNER_ADDRESS, pageRequest, optionalTransactionSearchParameters);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('baseCoinBalanceOfWallet api test', async () => {
    const response =
      await httpClient.baseCoinBalanceOfWallet(OWNER_ADDRESS);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceTokenBalancesOfWallet api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.serviceTokenBalancesOfWallet(OWNER_ADDRESS, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceTokenBalanceOfWallet api test', async () => {
    const response =
      await httpClient.serviceTokenBalanceOfWallet(OWNER_ADDRESS, SERVICE_TOKEN_CONTRACT_ID);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('fungibleTokenBalancesOfWallet api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.fungibleTokenBalancesOfWallet(OWNER_ADDRESS, ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('fungibleTokenBalanceOfWallet api test', async () => {
    const response =
      await httpClient.fungibleTokenBalanceOfWallet(OWNER_ADDRESS, ITEM_TOKEN_CONTRACT_ID, "00000002");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokenBalancesOfWallet api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenBalancesOfWallet(OWNER_ADDRESS, ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokenBalancesByTypeOfWallet api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenBalancesByTypeOfWallet(
        OWNER_ADDRESS,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        pageRequest
      );

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokenBalanceOfWallet api test', async () => {
    const response =
      await httpClient.nonFungibleTokenBalanceOfWallet(
        OWNER_ADDRESS,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002"
      );

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('transferBaseCoinOfWallet api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferBaseCoinOfWallet(OWNER_ADDRESS,request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferServiceTokenOfWallet api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferServiceTokenOfWallet(OWNER_ADDRESS, SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferFungibleTokenOfWallet api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferFungibleTokenOfWallet(OWNER_ADDRESS, ITEM_TOKEN_CONTRACT_ID, "00000002", request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferNonFungibleTokenOfWallet api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferNonFungibleTokenOfWallet(
        OWNER_ADDRESS,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('batchTransferNonFungibleTokenOfWallet api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'transferList': TokenId.fromMulti(['1000000200000001', '1000000200000002'])
    }
    const response =
      await httpClient.batchTransferNonFungibleTokenOfWallet(OWNER_ADDRESS, ITEM_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('userDetail api test', async () => {
    const response =
      await httpClient.userDetail(LINE_USER_ID);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })


  it('userTransactions api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)

    const response =
      await httpClient.userTransactions(LINE_USER_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('userTransactions api test with all parameters', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const optionalTransactionSearchParameters = new OptionalTransactionSearchParameters(
      1617155991000, 1614563991000, "collection/MsgTransferNFTFrom"
    )
    const response =
      await httpClient.userTransactions(LINE_USER_ID, pageRequest, optionalTransactionSearchParameters);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('baseCoinBalanceOfUser api test', async () => {
    const response =
      await httpClient.baseCoinBalanceOfUser(LINE_USER_ID);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('serviceTokenBalancesOfUser api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.serviceTokenBalancesOfUser(LINE_USER_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })


  it('serviceTokenBalanceOfUser api test', async () => {
    const response =
      await httpClient.serviceTokenBalanceOfUser(LINE_USER_ID, SERVICE_TOKEN_CONTRACT_ID);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('fungibleTokenBalancesOfUser api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.fungibleTokenBalancesOfUser(LINE_USER_ID, ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('fungibleTokenBalanceOfUser api test', async () => {
    const response =
      await httpClient.fungibleTokenBalanceOfUser(LINE_USER_ID, ITEM_TOKEN_CONTRACT_ID, "00000002");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokenBalancesOfUser api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenBalancesOfUser(LINE_USER_ID, ITEM_TOKEN_CONTRACT_ID, pageRequest);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('nonFungibleTokenBalancesByTypeOfUser api test', async () => {
    const pageRequest = new PageRequest(0, 10, OrderBy.DESC)
    const response =
      await httpClient.nonFungibleTokenBalancesByTypeOfUser(
        LINE_USER_ID,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        pageRequest
      );

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('mintNonFungibleTokenToUser api test', async () => {
    const request = {
      "ownerAddress": OWNER_ADDRESS,
      "ownerSecret": OWNER_SECRET,
      'toUserId': LINE_USER_ID,
      'name': 'Nnq8Edc',
      'meta': '5y4bh'
    }

    const response =
      await httpClient.mintNonFungibleToken(
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('nonFungibleTokenBalanceOfUser api test', async () => {
    const response =
      await httpClient.nonFungibleTokenBalanceOfUser(
        LINE_USER_ID,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000005"
      );

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('transferServiceTokenOfWalletToUser api test', async () => {
    const request = {
      'walletSecret': OWNER_SECRET,
      'toUserId': LINE_USER_ID,
      'amount': '100'
    }
    const response =
      await httpClient.transferServiceTokenOfWallet(OWNER_ADDRESS, SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('issueServiceTokenProxyRequest api test', async () => {
    const request = {
      'ownerAddress': OWNER_ADDRESS,
      'landingUri': 'https://my.service.landing/home'
    }

    const response =
      await httpClient.issueServiceTokenProxyRequest(
        LINE_USER_ID,
        SERVICE_TOKEN_CONTRACT_ID,
        RequestType.AOA,
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('commitProxyRequest api test', async () => {
    const response =
      await httpClient.commitProxyRequest(
        "jrXaAqxWgsxw4U3U5OtW2BL4zqA");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferServiceTokenOfUser api test', async () => {
    const request = {
      'ownerAddress': OWNER_ADDRESS,
      'ownerSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferServiceTokenOfUser(LINE_USER_ID, SERVICE_TOKEN_CONTRACT_ID, request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('issueItemTokenProxyRequest api test', async () => {
    const request = {
      'ownerAddress': OWNER_ADDRESS,
      'landingUri': 'https://my.service.landing/home'
    }

    const response =
      await httpClient.issueItemTokenProxyRequest(
        LINE_USER_ID,
        ITEM_TOKEN_CONTRACT_ID,
        RequestType.AOA,
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })

  it('commitProxyRequest api test', async () => {
    const response =
      await httpClient.commitProxyRequest(
        "dpgzQZPXIKeicGEpXU27f_L--ZM");

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferFungibleTokenOfUser api test', async () => {
    const request = {
      'ownerAddress': OWNER_ADDRESS,
      'ownerSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'amount': '1'
    }
    const response =
      await httpClient.transferFungibleTokenOfUser(LINE_USER_ID, ITEM_TOKEN_CONTRACT_ID, "00000002", request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transferNonFungibleTokenOfUser api test', async () => {
      const request = {
        'ownerAddress': OWNER_ADDRESS,
        'ownerSecret': OWNER_SECRET,
        'toAddress': OWNER_ADDRESS2
      }

    const response =
      await httpClient.transferNonFungibleTokenOfUser(
        LINE_USER_ID,
        ITEM_TOKEN_CONTRACT_ID,
        "10000002",
        "00000002",
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('batchTransferNonFungibleTokenOfUser api test', async () => {
    const request = {
      'ownerAddress': OWNER_ADDRESS,
      'ownerSecret': OWNER_SECRET,
      'toAddress': OWNER_ADDRESS2,
      'transferList': TokenId.fromMulti(['1000000200000002'])
    }
    const response =
      await httpClient.batchTransferNonFungibleTokenOfUser(
        LINE_USER_ID,
        ITEM_TOKEN_CONTRACT_ID,
        request);

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

  it('transactionResult api test', async () => {
    const response =
      await httpClient.transactionResult("C96F342BAA477DC18B6B085F8F55EEA27572DF37D999BE67BC5DECFA15F65FA6")

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1000);
  })


  it('createMemo api test', async () => {
    const request = {
      'walletAddress': OWNER_ADDRESS,
      'walletSecret': OWNER_SECRET,
      'memo': 'Show me the money'
    }
    const response =
      await httpClient.createMemo(request)

    console.log("response: " + JSON.stringify(response))
    expect(response["statusCode"]).to.equal(1002);
  })

})
