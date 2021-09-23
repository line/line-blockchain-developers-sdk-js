# LINE Blockchain Developers SDK for JavaScript

[![License](https://img.shields.io/github/license/line/line-blockchain-developers-sdk-js)](https://github.com/line/line-blockchain-developers-sdk-js)
[![NPM version](https://img.shields.io/npm/v/@line/lbd-sdk-js.svg)](https://www.npmjs.com/package/@line/lbd-sdk-js)
[![NPM downloads](https://img.shields.io/npm/dm/@line/lbd-sdk-js.svg)](https://www.npmjs.com/package/@line/bot-sdk)


## Table of Contents // TODO update
* [Introduction](#introduction)
* [Getting Started](#getting-Started)
* [Key objects and usage](#key-objects-and-usage)

## Introduction
The LINE Blockchain Developers SDK for JavaScript makes it easy to develop a service(dApp) using [LINE Blockchain Developers API](https://docs-blockchain.line.biz/api-guide/), and there are no worries about generating signature for each request.

### Documentation
See the official LINE Blockchain Developers API documentation for more information.
* English: https://docs-blockchain.line.biz/api-guide/
* Japanese: https://docs-blockchain.line.biz/ja/api-guide/
* Korean: https://docs-blockchain.line.biz/ko/api-guide/

### Requirements
* Node.js 10 or higher

### Installation
Before getting started, you need to install the library to your project. 
To make installation easy, use package managers as follows:

Using [npm](https://www.npmjs.com/?target=_blank):

`npm install @line/lbd-sdk-js`

Using [yarn](https://yarnpkg.com/?target=_blank)

`yarn add @line/lbd-sdk-js`

### Versioning
This project respects [semantic versioning](http://semver.org/?target=_blank).

See http://semver.org/

### Contributing
Please check [CONTRIBUTING](https://github.com/line/line-blockchain-developers-sdk-js/blob/master/CONTRIBUTING.md) before making a contribution.

### License
```
Copyright (C) 2021 LINE Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

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
  let response: GenericResponse<TxResultResponse> = await httpClient.createMemo(servcieId);
  console.log(response.responseData.txhash);
})();
```

### `SignatureGenerator`
This class provides a functionality to [generate signatures](https://docs-blockchain.line.biz/api-guide/Generating-Signature) for a request.

All API requests, except for the endpoint to retrieve the server time, must pass authentication information and be signed. Signing is a bit annoying, but never mind, fortunately, `HttpClient` itself will import this and generate signatures before sending a request. 

If you do want to study how LINE Blockchain signature created, it's okay to dive into the source code.


