export const transactionResult = {
  responseTime: 1585467706110,
  statusCode: 1000,
  statusMessage: "Success",
  responseData: [
    {
      height: 241476,
      txhash:
        "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
      codespace: "collection",
      code: 502,
      index: 2,
      data: "",
      logs: [
        {
          msgIndex: 0,
          log:
            '{"codespace":"collection","code":502,"message":"token [1000000100000001] is being not owned by [tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq]"}',
          events: [
            {
              type: "message",
              attributes: [
                {
                  key: "action",
                  value: "transfer_nft",
                },
              ],
            },
          ],
        },
      ],
      info: "",
      gasWanted: 100000000,
      gasUsed: 11591,
      tx: {
        type: "cosmos-sdk/StdTx",
        value: {
          msg: [
            {
              type: "collection/MsgTransferNFT",
              value: {
                from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
                contractId: "61e14383",
                to: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
                tokenIds: ["1000000100000001"],
              },
            },
          ],
          fee: {
            gas: 100000000,
            amount: [],
          },
          memo: "",
          signatures: [
            {
              pubKey: {
                type: "tendermint/PubKeySecp256k1",
                value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
              },
              signature:
                "na4w7PkSovM/mfmkQs/in6EKufV6P6m0DRZjIoYXqehnvJA5oRs809t1f1U4SOvXt7K5TJAkRprlikRaWBCqzw==",
            },
          ],
        },
      },
      timestamp: "2020-03-29T07:41:38.000+0000",
    },
  ],
};

export const singleTransactionResult = {
  responseTime: 1585467706110,
  statusCode: 1000,
  statusMessage: "Success",
  responseData: {
    height: 241476,
    txhash: "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
    codespace: "collection",
    code: 502,
    index: 2,
    data: "",
    logs: [
      {
        msgIndex: 0,
        log:
          '{"codespace":"collection","code":502,"message":"token [1000000100000001] is being not owned by [tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq]"}',
        events: [
          {
            type: "message",
            attributes: [
              {
                key: "action",
                value: "transfer_nft",
              },
            ],
          },
        ],
      },
    ],
    info: "",
    gasWanted: 100000000,
    gasUsed: 11591,
    tx: {
      type: "cosmos-sdk/StdTx",
      value: {
        msg: [
          {
            type: "collection/MsgTransferNFT",
            value: {
              from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
              contractId: "61e14383",
              to: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
              tokenIds: ["1000000100000001"],
            },
          },
        ],
        fee: {
          gas: 100000000,
          amount: [],
        },
        memo: "",
        signatures: [
          {
            pubKey: {
              type: "tendermint/PubKeySecp256k1",
              value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
            },
            signature:
              "na4w7PkSovM/mfmkQs/in6EKufV6P6m0DRZjIoYXqehnvJA5oRs809t1f1U4SOvXt7K5TJAkRprlikRaWBCqzw==",
          },
        ],
      },
    },
    timestamp: "2020-03-29T07:41:38.000+0000",
  },
};

export const nftDetachTxResultResponse = {
  height: 199446,
  txhash: "B27F03E917AA9002624C8721635011E5A70D6D90FD2756F5B91F2078B5CE1591",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "detach",
          attributes: [
            {
              key: "contract_id",
              value: "61e14383",
            },
            {
              key: "from",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "from_token_id",
              value: "100000080000000f",
            },
            {
              key: "token_id",
              value: "100000080000000e",
            },
            {
              key: "old_root_token_id",
              value: "100000080000000f",
            },
            {
              key: "new_root_token_id",
              value: "100000080000000e",
            },
          ],
        },
        {
          type: "message",
          attributes: [
            {
              key: "module",
              value: "collection",
            },
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "action",
              value: "detach",
            },
          ],
        },
        {
          type: "operation_root_changed",
          attributes: [
            {
              key: "token_id",
              value: "100000080000000e",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 22115,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgDetach",
          value: {
            from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            tokenId: "100000080000000e",
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "yHiUyGZGKYoQGGorvw2kxrN9fiQ2nQJWWO3zVN4R6fRbUG4iC2LVPc0Vvk4SlxalmQDFi3hfThPFY0GjqVkZYA==",
        },
      ],
    },
  },
  timestamp: "2020-03-26T10:31:07.000+0000",
};

export const nftDetachFromTxResultResponse = {
  height: 199420,
  txhash: "70FEE4B5BB3B58380C7215CB8B1C879055922FBC2069682772DDFA4CCBD282EA",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "detach_from",
          attributes: [
            {
              key: "contract_id",
              value: "61e14383",
            },
            {
              key: "proxy",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "from",
              value: "tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph",
            },
            {
              key: "from_token_id",
              value: "100000010000000c",
            },
            {
              key: "token_id",
              value: "100000010000000b",
            },
            {
              key: "old_root_token_id",
              value: "100000010000000c",
            },
            {
              key: "new_root_token_id",
              value: "100000010000000b",
            },
          ],
        },
        {
          type: "message",
          attributes: [
            {
              key: "module",
              value: "collection",
            },
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "action",
              value: "detach_from",
            },
          ],
        },
        {
          type: "operation_root_changed",
          attributes: [
            {
              key: "token_id",
              value: "100000010000000b",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 23275,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgDetachFrom",
          value: {
            proxy: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            from: "tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph",
            tokenId: "100000010000000b",
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "s/ll55l29r3azMHFrZC2Nc0ZBVAisGrOjlrMj988iFgLkMynf63ADJYwgX5RjUz+szkNx2OCZRvgGk+hWxJwFg==",
        },
      ],
    },
  },
  timestamp: "2020-03-26T10:28:33.000+0000",
};

export const nftUpdateTxResultResponse = {
  height: 171161,
  txhash: "835A9B3D4012319A085D8104F81CE282181EF0E1D99B2B803BF0FE2FFE789233",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "message",
          attributes: [
            {
              key: "module",
              value: "collection",
            },
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "action",
              value: "modify_token",
            },
          ],
        },
        {
          type: "modify_token",
          attributes: [
            {
              key: "contract_id",
              value: "61e14383",
            },
            {
              key: "token_id",
              value: "1000000100000001",
            },
            {
              key: "name",
              value: "NFT index name",
            },
            {
              key: "meta",
              value: "NFT index meta",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 17748,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgModify",
          value: {
            owner: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            tokenType: "10000001",
            tokenIndex: "00000001",
            changes: [
              {
                field: "name",
                value: "NFT index name",
              },
              {
                field: "meta",
                value: "NFT index meta",
              },
            ],
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "56ohicLtN4PNKbfQELjkaDinWvOoWbQPyrP91GCyPSo+J7+BzMmd1pI+NZVJJj966lf0RdAJYeRDxkvdS+bjQA==",
        },
      ],
    },
  },
  timestamp: "2020-03-24T10:15:38.000+0000",
};

export const memoTxResultResponse = {
  height: 199505,
  txhash: "6126B4E3C204676E21CCC81D673AADA0D8908B769E538963C76054334B134A33",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "message",
          attributes: [
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "module",
              value: "account",
            },
            {
              key: "action",
              value: "empty",
            },
            {
              key: "action",
              value: "empty",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 8093,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "account/MsgEmpty",
          value: {
            from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "LINE Blockchain Platform",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "hZDJw71BWLEiPQ0nsDoPHVS3r6Pv1m/5QWyH9U5hEzVsYRvB7IIDe/khVA9wvbCHO7+ryxboYSgFZDYcLH67og==",
        },
      ],
    },
  },
  timestamp: "2020-03-26T10:36:56.000+0000",
};

export const serviceTokenMintTxResult = {
  height: 151837,
  txhash: "36C7142946D9CDC93AADFCD7326EAE95CFB7670F93D8469C8669A0E4656B5EAF",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "message",
          attributes: [
            {
              key: "module",
              value: "token",
            },
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "action",
              value: "mint",
            },
          ],
        },
        {
          type: "mint",
          attributes: [
            {
              key: "contract_id",
              value: "9636a07e",
            },
            {
              key: "amount",
              value: "1000",
            },
            {
              key: "from",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "to",
              value: "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 29213,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "token/MsgMint",
          value: {
            from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "9636a07e",
            to: "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            amount: 1000,
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "Ixu86aEaZRdnlg4Dw3N8PHpNslLOMGvm0YkWvpTRLbR+luskK5mByy1VMD8Yt+bJoux4R/kQ4sH7ToiUrjp2RQ==",
        },
      ],
    },
  },
  timestamp: "2020-03-23T02:27:13.000+0000",
};

export const serviceTokenModifyTxResult = {
  height: 111177,
  txhash: "5AC811502C86DFCD5DE1A547BB855B0139C1EDFC308A3F009572AF28D84AA243",
  codespace: "",
  code: 0,
  index: 0,
  data: "",
  logs: [
    {
      msgIndex: 0,
      log: "",
      events: [
        {
          type: "message",
          attributes: [
            {
              key: "module",
              value: "token",
            },
            {
              key: "sender",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "action",
              value: "modify_token",
            },
          ],
        },
        {
          type: "modify_token",
          attributes: [
            {
              key: "contract_id",
              value: "9636a07e",
            },
            {
              key: "name",
              value: "STname",
            },
            {
              key: "meta",
              value: "meta",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 17866,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "token/MsgModify",
          value: {
            owner: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "9636a07e",
            changes: [
              {
                field: "name",
                value: "STname",
              },
              {
                field: "meta",
                value: "meta",
              },
            ],
          },
        },
      ],
      fee: {
        gas: 100000000,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy",
          },
          signature:
            "2h35WiDySARpOh9xCRHagPmsSAypbIa7JuVtPbG6lMNLrvKDQbWeYTkraZXJxqiIE2oe1J9UO5MUFd5SLAQ35w==",
        },
      ],
    },
  },
  timestamp: "2020-03-20T07:31:50.000+0000",
};

export const genericServiceTokenModifyTxResultResponse = {
  responseTime: 1585467706110,
  statusCode: 1000,
  statusMessage: "Success",
  responseData: serviceTokenModifyTxResult,
};


export const serviceTokenBurnTxResult = {
  "height": 709927,
  "txhash": "91134BFCB6AE6EC15AB4DDF52021510C59614E7A187C9C91408E65BD3110BE62",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "burn",
          "attributes": [
            {
              "key": "contract_id",
              "value": "9be17165"
            },
            {
              "key": "amount",
              "value": "1000"
            },
            {
              "key": "from",
              "value": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "burn"
            },
            {
              "key": "module",
              "value": "token"
            },
            {
              "key": "sender",
              "value": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 62178,
  "gasUsed": 50599,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "token/MsgBurn",
          "value": {
            "from": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            "contractId": "9be17165",
            "amount": 1000
          }
        }
      ],
      "fee": {
        "gas": 62178,
        "amount": []
      },
      "memo": "",
      "signatures": [
        {
          "pubKey": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A0lK2/QXWwMqSdKDtSiW4sTo6fC9ZMd3PblSX408698v"
          },
          "signature": "mY7g4CVNgHzrKCJlD42BwVseCXrajrpIENxBf1Yh0HxUE71JgMXUmS20617O5Nl0cEw73xnSHJNs7bOyQ2hjfg=="
        }
      ]
    }
  },
  "timestamp": "2020-03-20T07:31:50.000+0000",
}


export const serviceTokenTransferTxResult = {
  "height": 65183,
  "txhash": "1D2F18B40C8ADFFB0D653771FD77AEFC1EABE521DD485A1DE72ECE127F1398DA",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
            {
              "key": "module",
              "value": "token"
            },
            {
              "key": "sender",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "action",
              "value": "transfer_ft"
            }
          ]
        },
        {
          "type": "transfer",
          "attributes": [
            {
              "key": "from",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "to",
              "value": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"
            },
            {
              "key": "contract_id",
              "value": "9636a07e"
            },
            {
              "key": "amount",
              "value": "1000"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 27083,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "token/MsgTransfer",
          "value": {
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "9636a07e",
            "to": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            "amount": 1000
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
          "signature": "Z7/uWSVZVc7bKIh8v0YbhrJBigJcGwy3cKRJNXtEJtBftU1+MfttBAelLMymJIUeVaR6wPB8pL8VZr2wH/qx7Q=="
        }
      ]
    }
  },
  "timestamp": "2020-03-17T03:31:43.000+0000"
}


export const serviceTokenTransferFromTxResult = {
  "height": 710030,
  "txhash": "D80982B9EC8CCAE83E28221D576136373381E10581197FE68ECA154367BA9594",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "transfer_from"
            },
            {
              "key": "module",
              "value": "token"
            },
            {
              "key": "sender",
              "value": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"
            }
          ]
        },
        {
          "type": "transfer_from",
          "attributes": [
            {
              "key": "contract_id",
              "value": "9be17165"
            },
            {
              "key": "proxy",
              "value": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9"
            },
            {
              "key": "from",
              "value": "tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd"
            },
            {
              "key": "to",
              "value": "tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us"
            },
            {
              "key": "amount",
              "value": "1"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 59518,
  "gasUsed": 48383,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "token/MsgTransferFrom",
          "value": {
            "proxy": "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            "contractId": "9be17165",
            "from": "tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd",
            "to": "tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us",
            "amount": 1
          }
        }
      ],
      "fee": {
        "gas": 59518,
        "amount": []
      },
      "memo": "",
      "signatures": [
        {
          "pubKey": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A0lK2/QXWwMqSdKDtSiW4sTo6fC9ZMd3PblSX408698v"
          },
          "signature": "rrd/HPr5JZ8IXYoVPnD3S6Z8UgaElfj6UqfLDKwrqu85HqSg2sMLiVAuWCIiVHJAFwwnU/8Ya/+NDIHSgdeSTg=="
        }
      ]
    }
  },
  "timestamp": "2020-03-17T03:31:43.000+0000"
}


// item token tx-result
export const fungibleTokenModifyTxResult = {
  "height": 171161,
  "txhash": "835A9B3D4012319A085D8104F81CE282181EF0E1D99B2B803BF0FE2FFE789233",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
            {
              "key": "module",
              "value": "collection"
            },
            {
              "key": "sender",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "action",
              "value": "modify_token"
            }
          ]
        },
        {
          "type": "modify_token",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "token_id",
              "value": "1000000100000001"
            },
            {
              "key": "name",
              "value": "NFT index name"
            },
            {
              "key": "meta",
              "value": "NFT index meta"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 17748,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [{
        "type": "collection/MsgModify",
        "value": {
          "owner": "tlink16vm77f7sevz78r2aewnwfwj36uxtf9z5zztm2y",
          "contractId": "678c146a",
          "tokenType": "00000001",
          "tokenIndex": "00000000",
          "changes": [{
            "field": "name",
            "value": "cu23bilopd57q0izvy"
          }]
        }
      }],
      "fee": {
        "gas": 120000,
        "amount": []
      },
      "memo": "",
      "signatures": [{
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "AnlCw3uyMRluBOpAlurKEM2766LfrlsogcUhT8KNXL+r"
        },
        "signature": "EqQeD5KAVckvwFcgibyaF5c3nJWH/QQ2qhiNqjKSIAZhOBXbxcz/76nz6rnTy4tl2S28woODKRXtidS2RU7YmA=="
      }]
    }
  },
  "timestamp": "2020-03-24T10:15:38.000+0000"
}
