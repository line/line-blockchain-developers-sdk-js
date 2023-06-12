const sdk = require("@line/lbd-sdk-js");
const load = require("ts-dotenv").load;

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

const client = new sdk.HttpClient(env.HOST_URL, env.SERVICE_API_KEY, env.SERVICE_API_SECRET);

// promise function example
client.time().then(response => {
  console.log("statusCode", response.statusCode);
  console.log("responseTime", response.responseTime);
  console.log("statusMessage", response.statusMessage);
  console.log("responseData", response.responseData);
});

// async function example
async function checkServerTime() {
  var response = await client.time();
  console.log("statusCode", response.statusCode);
  console.log("responseTime", response.responseTime);
  console.log("statusMessage", response.statusMessage);
  console.log("responseData", response.responseData);
}

checkServerTime();
