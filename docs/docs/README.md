## Getting Started
### Requirements
* Node.js >= 10
  * It uses ES2017.

* [npm](https://www.npmjs.com/?target=_blank), preferably >=7

Other dependencies are installed via npm(or yarn), and do not need to be pre-installed.

### Install
All the dependencies can be install via [npm](https://www.npmjs.com/?target=_blank) or [yarn](https://yarnpkg.com/?target=_blank)

* [npm](https://www.npmjs.com/?target=_blank)
  ```
  npm install @line/lbd-sdk-js
  ```

* [yarn](https://yarnpkg.com/?target=_blank)
  ```
  yarn add @line/lbd-sdk-js
  ```

Instead of using package managers, you can clone and build from source as well. Run the following scripts/commends.

```
$ git clone https://github.com/line/line-blockchain-developers-sdk-js.git
$ cd line-blockchain-developers-sdk-js
$ npm install
$ npm run build
```
The built result will be placed in `build/`.

#### Test
You can run all the unit tests by following scripts.

```
npm run test
```

#### Integration tests
You can **run** all the integration tests by following scripts.

```
npm run test:integration
```

> Note
> 
> To run integration tests, `integration-test.env` is required with following properties.
```
HOST_URL=[api-url]
SERVICE_ID=[your service-id]
SERVICE_API_KEY=[your service-api-key]
SERVICE_API_SECRET=[your service-api-secret]
OWNER_ADDRESS=[your service wallet address]
OWNER_SECRET=[your service wallet secret]
OWNER_ADDRESS2=[your another service wallet address]
SERVICE_TOKEN_CONTRACT_ID=[your service-token contract-id]
ITEM_TOKEN_CONTRACT_ID=[your item-token contract-id]
LINE_USER_ID=[your line user id]
LINE_USER_WALLET_ADDRESS=[BitMax wallet address of the user]
```

### Basic Usage
It can be imported with [CommonJS](https://nodejs.org/docs/latest/api/modules.html?target=_blank), [ES2015 modules](https://babeljs.io/learn-es2015/#ecmascript-2015-features-modules?target=_blank), and preferably [TypeScript](https://www.typescriptlang.org/?target=_blank).

The library is written in TypeScript and includes TypeScript definitions by default. Nevertheless, it can surely be used with plain JavaScript too.

#### Create HttpClient
```
// CommonJS
const devSdk = require('@line/lbd-sdk-js');
const httpClient = new devSdk.HttpClient(BASE_URL, SERVICE_API_KEY, SERVICE_API_SECRET)

// ES2015 modules or TypeScript
import * as devSdk from '@line/lbd-sdk-js';
const httpClient = new devSdk.HttpClient(BASE_URL, SERVICE_API_KEY, SERVICE_API_SECRET)

```

#### Example to get server time
##### Using promise
```JavaScript
httpClient.time().then(response => {
    console.log("statusCode", response.statusCode);
    console.log("responseTime", response.responseTime);
    console.log("statusMessage", response.statusMessage);
    console.log("responseData", response.responseData);
})
```

##### Using async function
```JavaScript
async function checkServerTime() {
    var response = await httpClient.time();
    console.log("statusCode", response.statusCode);
    console.log("responseTime", response.responseTime);
    console.log("statusMessage", response.statusMessage);
    console.log("responseData", response.responseData);
}
```

## Key objects and usage
### `HttpClient`
This class represents an HTTP client to connect and interact with the LINE Blockchain Developers API server. It provides functions to call the endpoints of the API with mandatory and optional parameters.
It's an entry point for this library, every dApp for LINE Blockchain Developers should have an instance of `HttpClient`.

Create an instance with your connection and authentication information as follows:

```JavaScript
// Directly import
import { HttpClient } from './lib/http-client-base';
const httpClient = new HttpClient(baseUrl, apiKey, apiSecret);

// CommonJS
const devSdk = require('@line/lbd-sdk-js');
const httpClient = new devSdk.HttpClient(BASE_URL, SERVICE_API_KEY, SERVICE_API_SECRET)

// ES2015 modules or TypeScript
import * as devSdk from '@line/lbd-sdk-js';
const httpClient = new devSdk.HttpClient(BASE_URL, SERVICE_API_KEY, SERVICE_API_SECRET)
```

- `baseUrl` is the address of API server. Find one for the chain your service runs on in [API guide](https://docs-blockchain.line.biz/api-guide/).
- `apiKey` is your service's API key.
- `apiSecret` is your service's API secret. **Never** use the secret hard-coded in the source code.

Now, you can call any endpoints via the functions of the instance. A simple example is to get the server time:

```JavaScript
(async() => {
  const response = await httpClient.time();
  console.log(response['statusCode']);
})();
```

Remember that you must handle it in an asynchronous way.

### Request and response
When requesting, you can use predefined request data classes in `lib/request.ts`. Try to send a memo save request for example as follows:

```JavaScript
//Directly import
import { MemoRequest } from './lib/request';

(async() => {
  const request = new MemoRequest('my first memo', walletAddress, walletSecret);
  const response = await httpClient.createMemo(request);
})();
```

When you need to parse a JSON-formatted `responseData` in a response, find and use the proper response data class in `lib/response.ts`. To get the `txhash` or the above request for example:

```JavaScript
import { GenericResponse, TxResultResponse } from './lib/response';

(async() => {
  const request = new MemoRequest('my first memo', walletAddress, walletSecret);
  let response: GenericResponse<TxResultResponse> = await httpClient.createMemo(request);
  console.log(response.responseData.txhash);
})();
```

### `SignatureGenerator`
This class provides a functionality to [generate signatures](https://docs-blockchain.line.biz/api-guide/Authentication#generating-signature) for a request.

All API requests, except for the endpoint to retrieve the server time, must pass authentication information and be signed. Signing is a bit annoying, but never mind, fortunately, `HttpClient` itself will import this and generate signatures before sending a request. 

If you do want to study how LINE Blockchain signature created, it's okay to dive into the source code.


### New transaction result
LINE Blockchain Developers provide custom transaction result that is independent from on-chain transaction result, and it is more simple and understand. The new transaction result has summary, messages and events in following structure. For more details, please visit [LINE Blockchain Docs](https://docs-blockchain.line.biz/api-guide/Callback-Response)

```
{
    "summary": {
        "height": number,
        "txIndex" : number,
        "txHash"": string,
        "signers": Array<string>,
        "result: {
            "code": number,
            "codeSpace": string,
            "result": string ("SUCCEEDED", or "FAILED")
        }
    },
    "txMessages": [
        {
            "msgIndex": number,
            "requestType": string,
            "details": any (* object)
        }
    ],
    "txEvents": [
        "eventName": string,
        "msgIndex": number,
        ... // more properties depending on each concrete event
    ],
}
```

#### Summary
"summary" has `height`, `txIndex`, `txHash`, `signers` and `result`. More details on each property are as followings.
* height: block height
* txIndex: this means n-th transaction in a block
* txHash: hash string for a transaction
* signers: wallet addresses of those who signs a transaction
* result: this has `code`, `codeSpace` and `result`.
  * code: this is a sort of error code, and if it is not `0`, then it means the transaction has been failed.
  * codeSpace: Namespace of `code`
  * Status of the transaction confirmation displayed as either of the following.
    * SUCCEEDED: Confirmation successful
    * FAILED: Confirmation failed


### txMessages
There could be messages more than one in a transaction, and a message is what a client wants to mutate such as transfer coin or token, mint, burn and so on.
A message has `msgIndex`, `requestType` and `details`. More details on each property are as followings.
* msgIndex: Index number of the message in a transaction
* requestType: Type of the message. For example, "collection/MsgTransferNFT"
* details: Value included in the message. Properties vary, depending on the type of the message. 
  
> Note
>
> `details` in each message isn't a fixed object, since it's hard to provide a concrete type of data when we support smart contract. With smart contracts, developers or owners of the smart contract can define their own messages with custom properties, which are not known to LINE Blockchain Developers.

### txEvents
Event refers to a change in status, triggered by a confirmed transaction. Events are distinguished as base coin related events, service token related events and item token related events. Refer to [LINE Blochain Docs](https://lbddocs-alpha.website.line-apps-dev.com/api-guide/Callback-Response#event) for event names and their properties for each type.

By they way, all events basically have `msgIndex` and `eventName` properties.
* msgIndex: Index number of the message caused events.
* eventName: Name of a event such as `EventCoinTransferred`, `EventTokenIssued` and so on.

### Adapting to new transaction result
We need a way to adapt(convert) old transaction result in sort of raw format, which is very dependent on the chain's to new structured transaction result. 

#### Basic adapting flow
Adapting flow is simple as below.
```
Old(current) transaction result ---> raw-transaction result ---> new structured transaction result.
```

#### How to adapt old one to new one.
##### Adapting(covnerting) to raw-transaction result

```
...
const rawTransactionResultAdapter: TxResultAdapter<TxResultResponse, RawTransactionResult> = new RawTransactionResultAdapter();
// using default adapters for summary, messages and events
const lbdTxResultAdapter: TxResultAdapter<RawTransactionResult, TxResult>  = new LbdTxEventsAdapterV1(HrpPrefix.TEST_NET);

/*
We can use custom adapters for summy, messages and events
const customTxResultSummaryAdapter: TxResultAdapter<RawTransactionResult, TxResultSummary> = new CustomTxSummaryAdapterV1();
const customTxMessagesAdapter: TxResultAdapter<RawTransactionResult, Set<TxMessage>>  = new CustomTxMessageAdapterV1();
const customTxEventsAdapter: TxResultAdapter<RawTransactionResult, Set<TransactionEvent>>  = new CustomTxMessageAdapterV1();

const lbdTxResultAdapter: TxResultAdapter<RawTransactionResult, TxResult>  = new LbdTxEventsAdapterV1(
   HrpPrefix.TEST_NET,
   customTxResultSummaryAdapter ,
   customTxMessagesAdapter,
   customTxEventsAdapter
);
*/

let txResultResponse = lbdHttpClient.transactionResult(txHash);
let rawTransactionResult = rawTransactionResultAdapter.adapt(txResultResponse.responseData);
let newTransactionResult =  lbdTxResultAdapter.adapt(rawTransactionResult);
...
```