import { expect } from "chai";
import { describe, it } from "mocha";

import _ from "lodash";

import { RequestBodyFlattener } from "../lib/request-body-flattener";

describe("request-body-flatten test", () => {
  it("flatten request body with mint-list parameter value test", () => {
    let req_params = {
      ownerAddress: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
      ownerSecret: "uhbdnNvIqQFnnIFDDG8EuVxtqkwsLtDR/owKInQIYmo=",
      toAddress: "tlink18zxqds28mmg8mwduk32csx5xt6urw93ycf8jwp",
      mintList: [
        {
          tokenType: "10000001",
          name: "NewNFT",
        },
        {
          tokenType: "10000003",
          name: "NewNFT2",
          meta: "New nft 2 meta information",
        },
      ],
    };

    let flatten_req_params =
      "mintList.meta=,New nft 2 meta information&mintList.name=NewNFT,NewNFT2&mintList.tokenType=10000001,10000003&ownerAddress=tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq&ownerSecret=uhbdnNvIqQFnnIFDDG8EuVxtqkwsLtDR/owKInQIYmo=&toAddress=tlink18zxqds28mmg8mwduk32csx5xt6urw93ycf8jwp";

    let flatten = RequestBodyFlattener.flatten(req_params);
    expect(flatten).to.equal(flatten_req_params);
  });

  it("flatten request body with mint-list with multi receivers test", () => {
    const req_params = {
      ownerAddress: "tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7",
      ownerSecret: "vPnwd8QBC/M4ZgKAYAJjiBEskLvbWvpkysQl1WQtthc=",
      mintList: [
        {
          toAddress: "tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7",
          tokenType: "10000001",
          name: "aiEw",
          meta: "viz23",
        },
        {
          toUserId: "U9cd1b4384f912279b17765e0b1847c99",
          tokenType: "10000001",
          name: "IEjfz",
          meta: "viz23",
        },
      ],
    };

    const flatten_req_params =
      "mintList.meta=viz23,viz23&mintList.name=aiEw,IEjfz&mintList.toAddress=tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7,&mintList.toUserId=,U9cd1b4384f912279b17765e0b1847c99&mintList.tokenType=10000001,10000001&ownerAddress=tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7&ownerSecret=vPnwd8QBC/M4ZgKAYAJjiBEskLvbWvpkysQl1WQtthc=";
    // const flatten_req_params =
    //   "mintList.meta=viz23,viz23&mintList.name=aiEw,IEjfz&mintList.toAddress=tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7&mintList.toUserId=,U9cd1b4384f912279b17765e0b1847c99&mintList.tokenType=10000001,10000001&ownerAddress=tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7&ownerSecret=vPnwd8QBC/M4ZgKAYAJjiBEskLvbWvpkysQl1WQtthc=";

    const flatten = RequestBodyFlattener.flatten(req_params);
    expect(flatten).to.equal(flatten_req_params);
  });
});
