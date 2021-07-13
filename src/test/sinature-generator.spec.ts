import { expect } from 'chai';
import { describe, it } from 'mocha';
import { SignatureGenerator } from '../lib/signature-generator';

describe('signature-generator test', () => {
  // it('signature without parameters test', () => {
  //   let method = "GET"
  //   let path = "/v1/wallets"
  //   let timestamp = 1581850266351
  //   let secret = "9256bf8a-2b86-42fe-b3e0-d3079d0141fe"
  //   let nonce = "Bp0IqgXE"
  //   let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce)
  //   expect(signature).to.equal("2LtyRNI16y/5/RdoTB65sfLkO0OSJ4pCuz2+ar0npkRbk1/dqq1fbt1FZo7fueQl1umKWWlBGu/53KD2cptcCA==")
  // });
  //
  // it('signature without parameters test2', () => {
  //   let method = "GET"
  //   let path = "/v1/wallets"
  //   let timestamp = 1611911260000
  //   let secret = "4bd950dc-329f-40e7-a0d6-6bbe7e7201e9"
  //   let nonce = "7wqcvYVf"
  //   let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce)
  //   expect(signature).to.equal("fCePTa/ggRQBK5Hq5LI/GeqO/FG5DlBzEq1HzVMz0gsZfE6+jCeHf0mCJL3rhkmjzlos44jxx4julZ2frpFZOA==")
  // });
  //
  // it('signature with parameters test', () => {
  //   let parameters = {
  //     "page": 2,
  //     "msgType": "coin/MsgSend"
  //   };
  //
  //   let method = "GET"
  //   let path = "/v1/wallets/tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq/transactions"
  //   let timestamp = 1581850266351
  //   let secret = "9256bf8a-2b86-42fe-b3e0-d3079d0141fe"
  //   let nonce = "Bp0IqgXE"
  //   let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce, parameters)
  //   expect(signature).to.equal("5x6bEV1mHkpJpEJMnMsCUH7jV5GzKzA038UwcqpYIAx7Zn1SvA9qhdf+aitu+3juXzXB+qSxM4zRon6/aNVMFg==")
  // });
  //
  // it('signature with paing parameters test', () => {
  //   // paging parameters sorted by its key when generating signature
  //   let parameters = {
  //     "limit": 10,
  //     "page": 1,
  //     "orderBy": "desc"
  //   };
  //
  //   let method = "GET"
  //   let path = "/v1/service-tokens/a48f097b/holders"
  //   let timestamp = 1611243023551
  //   let secret = "098d8862-477d-49f2-928f-7655489be2d3"
  //   let nonce = "KScYbbH0"
  //   // sign-target will be "KScYbbH01611243023551GET/v1/service-tokens/a48f097b/holders?limit=10&orderBy=desc&page=1"
  //   let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce, parameters)
  //   expect(signature).to.equal("8vcqBHXiwGaP5+78ZvuidcoZ/UiKnR1IrgXKzUaRf+HqetD5eHMaeTEW3OvHoKn7Z512WVNuKmRQDW88DvJ1aA==")
  // });

  it('signature with all parameters test', () => {
    // paging parameters sorted by its key when generating signature
    let parameters = {
      "limit": 10,
      "page": 0,
      "orderBy": "desc",
      "msgType": "collection/MsgTransferNFTFrom",
      "after": 1614563991000,
      "before": 1617155991000
    };

    let method = "GET"
    let path = "/v1/wallets/tlink1ey2p39e4l78h49pm28z5ms62ycd06sgrprtps5/transactions"
    let timestamp = 1617503164770
    let secret = "7d55f1f5-0f6f-426e-909c-47913aa09e72"
    let nonce = "805d1b42"
    // sign-target will be "805d1b421617503164770GET/v1/wallets/tlink1ey2p39e4l78h49pm28z5ms62ycd06sgrprtps5/transactions?after=1614563991000&before=1617155991000&limit=10&msgType=collection/MsgTransferNFTFrom&orderBy=desc&page=0"
    let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce, parameters)
    expect(signature).to.equal("Iq4lDCgzMmtFrZHuE0b7Xu6PqaqnoVJlG2WxMtuAHWuB8hoG98swyb578LMZMUbHLE3D1ldQA1U4hxSPyxiFSA==")
  });

  // it('signature with query parameters and body test', () => {
  //   // paging parameters sorted by its key when generating signature
  //   let queryParameters = {
  //     "requestType": "aoa"
  //   };
  //
  //   let request_body = {
  //       'ownerAddress': "tlink1ey2p39e4l78h49pm28z5ms62ycd06sgrprtps5",
  //       'landingUri': 'https://my.service.landing/home'
  //   }
  //
  //   let method = "POST"
  //   let path = "/v1/users/U9fc03e78e1ae958b1bd3633cfb48acb9/service-tokens/493aba33/request-proxy"
  //   let timestamp = 1615593846507
  //   let secret = "7d55f1f5-0f6f-426e-909c-47913aa09e72"
  //   let nonce = "fcd9cf1a"
  //   // sign-target will be "KScYbbH01611243023551GET/v1/service-tokens/a48f097b/holders?limit=10&orderBy=desc&page=1"
  //   let signature = SignatureGenerator.signature(secret, method, path, timestamp, nonce, queryParameters, request_body)
  //   expect(signature).to.equal("hnb+iDG0PPgoByLaUCPtVv5GqcJO1fcKgTO5VolKTITqpRIux7wvCE2d07eY+xXW/553Vq5wLiZ2lX8dZBIOhw==")
  // });

});
