export const transactionResult = {
  "responseTime": 1585467706110,
  "statusCode": 1000,
  "statusMessage": "Success",
  "responseData": [
    {
      "height": 241476,
      "txhash": "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
      "codespace": "collection",
      "code": 502,
      "index": 2,
      "data": "",
      "logs": [
        {
          "msgIndex": 0,
          "log": "{\"codespace\":\"collection\",\"code\":502,\"message\":\"token [1000000100000001] is being not owned by [tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq]\"}",
          "events": [
            {
              "type": "message",
              "attributes": [
                {
                  "key": "action",
                  "value": "transfer_nft"
                }
              ]
            }
          ]
        }
      ],
      "info": "",
      "gasWanted": 100000000,
      "gasUsed": 11591,
      "tx": {
        "type": "cosmos-sdk/StdTx",
        "value": {
          "msg": [
            {
              "type": "collection/MsgTransferNFT",
              "value": {
                "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
                "contractId": "61e14383",
                "to": "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
                "tokenIds": [
                  "1000000100000001"
                ]
              }
            }
          ],
          "fee": {
            "gas": 100000000,
            "amount": []
          },
          "memo": "",
          "signatures": [
            {
              "pubKey": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"
              },
              "signature": "na4w7PkSovM/mfmkQs/in6EKufV6P6m0DRZjIoYXqehnvJA5oRs809t1f1U4SOvXt7K5TJAkRprlikRaWBCqzw=="
            }
          ]
        }
      },
      "timestamp": "2020-03-29T07:41:38.000+0000"
    }
  ]
};


export const singleTransactionResult = {
  "responseTime": 1585467706110,
  "statusCode": 1000,
  "statusMessage": "Success",
  "responseData": {
    "height": 241476,
    "txhash": "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
    "codespace": "collection",
    "code": 502,
    "index": 2,
    "data": "",
    "logs": [
      {
        "msgIndex": 0,
        "log": "{\"codespace\":\"collection\",\"code\":502,\"message\":\"token [1000000100000001] is being not owned by [tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq]\"}",
        "events": [
          {
            "type": "message",
            "attributes": [
              {
                "key": "action",
                "value": "transfer_nft"
              }
            ]
          }
        ]
      }
    ],
    "info": "",
    "gasWanted": 100000000,
    "gasUsed": 11591,
    "tx": {
      "type": "cosmos-sdk/StdTx",
      "value": {
        "msg": [
          {
            "type": "collection/MsgTransferNFT",
            "value": {
              "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
              "contractId": "61e14383",
              "to": "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
              "tokenIds": [
                "1000000100000001"
              ]
            }
          }
        ],
        "fee": {
          "gas": 100000000,
          "amount": []
        },
        "memo": "",
        "signatures": [
          {
            "pubKey": {
              "type": "tendermint/PubKeySecp256k1",
              "value": "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"
            },
            "signature": "na4w7PkSovM/mfmkQs/in6EKufV6P6m0DRZjIoYXqehnvJA5oRs809t1f1U4SOvXt7K5TJAkRprlikRaWBCqzw=="
          }
        ]
      }
    },
    "timestamp": "2020-03-29T07:41:38.000+0000"
  }
};
