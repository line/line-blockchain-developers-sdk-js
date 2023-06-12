import {sdkClient} from "./sdkClient.js"

// promise function example
sdkClient.time().then(response => {
  console.log("statusCode", response.statusCode);
  console.log("responseTime", response.responseTime);
  console.log("statusMessage", response.statusMessage);
  console.log("responseData", response.responseData);
})

// async function example
async function getTime() {
  const response = await sdkClient.time()
  console.log("statusCode", response.statusCode);
  console.log("responseTime", response.responseTime);
  console.log("statusMessage", response.statusMessage);
  console.log("responseData", response.responseData);
}

getTime()
