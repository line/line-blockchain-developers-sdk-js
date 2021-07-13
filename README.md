# LINE Blockchain Developers SDK for JavaScript
This is a subproject of LINE Blockchain Developers SDK.
See [README](../README.md) for overview.

This is written by Typescript, so it supports both Typescript and JavaScript.

## Install
To install package of this SDK, run following commands.

### npm
```
npm install @ryukato79/link-developers-sdk
```

### yarn
```
yarn add @ryukato79/link-developers-sdk
```

## Build
To build this library, run following commands.

```
yarn
yarn run build
```

## Test
### Run all unit tests
Run the following command to test the library.

```
yarn run test
```

### Run integration tests
To run integration tests, `integration-test.env` is required with following properties.
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

If you have `integration-test.env` ready, then you can run integration test by below command.

```
yarn run test:integration
```

## Key objects and usage
### `HttpClient`
This class represents a HTTP client to connect and interact LINE Blockchain Developers API. It provides functions to call the endpoints of the API with mandatory and optional parameters.

It's an entry point for this library, every dApp for LINE Blockchain Developers should have an instance of `HttpClient`.

Create an instance with your connection and authentication information as follows:

```javascript
import { HttpClient } from '../lib/http-client-base';
const httpClient = new HttpClient(baseUrl, apiKey, apiSecret);
```

- `baseUrl` is the address of API server. Find one for the chain your service runs on in [API guide](https://docs-blockchain.line.biz/api-guide/).
- `apiKey` is your service's API key.
- `apiSecret` is your serivce's API secret. **Never** use the secret hardcoded in the source code.

Now, you can call any endpoints via the functions of the instance. A simple example is to get the server time:

```javascript
(aync() => {
  const reponse = await httpclient.time();
  console.log(response['statusCode']);
})();
```

Remember that you must handle it in an asynchronous way.

### Request and response
When requesting, you can use predefined request data classes in `lib/request.ts`. Try to send a memo save request as follows:

```javascript
import { MemoRequest } from './lib/request';

(async() => {
  const request = new MemoRequest('my first memo', walletAddress, walletSecret);
  const response = await httpClient.createMemo(request);
})();
```

When you need to parse a JSON-formatted `responseData` in your response, find and use the proper response data class in `lib/response.ts`. To get the txhash or the above request for example:

```javascript
import { GenericResponse, TxResultResponse } from './lib/response';

(aync() => {
  const request = new MemoRequest('my first memo', walletAddress, walletSecret);
  let response: GenericResponse<TxResultResponse> = await httpclient.createMemo(servcieId);
  console.log(response.responseData.txhash);
})();
```

### `SignatureGenerator`
This class provides a functionality to generate signatures for a request.
All API requests, except for the endpoint to retrieve the server time, must pass authentication information and be signed.

Never mind, fortunately, `HttpClient` itself will import this and generate signatures before sending a request. If you do want to study how LINE Blockchain signature created, it's okay to dive into the source code.

## License
 Copyright (C) 2017-2018 LINE Corp.

   Licensed under the Apache License, Version 2.0 (the "License");
   
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.