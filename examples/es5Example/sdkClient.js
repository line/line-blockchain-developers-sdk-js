import * as Sdk from '@line/lbd-sdk-js';
import {load} from 'ts-dotenv';

const env = load(
  {
    "HOST_URL": String,
    "SERVICE_ID": String,
    "SERVICE_API_KEY": String,
    "SERVICE_API_SECRET": String
  }, {
    "path": "./sdk.env"
  }
);

class SdkClient {
  constructor() {
    this.httpClient = new Sdk.HttpClient(env.HOST_URL, env.SERVICE_API_KEY, env.SERVICE_API_SECRET);
  }

  time() {
    return this.httpClient.time();
  }
}

const sdkClient = new SdkClient();
export {sdkClient};
