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
      "timestamp": 1618370726000
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
    "timestamp": 1618370726000
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
  "timestamp": 1618370726000
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
  "timestamp": 1618370726000
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
  "timestamp": 1618370726000
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
  "timestamp": 1618370726000
};

export const issueServiceTokenTxResult = {
  "height": 1207317,
  "txhash": "2C981A65B9A2F4DF6EC8CC5E084905A9C2C8488F7E533C9F71394F254D76F039",
  "codespace": null,
  "code": 0,
  "index": 0,
  "data": null,
  "logs": [{
    "msgIndex": 0,
    "log": "",
    "events": [{
      "type": "grant_perm",
      "attributes": [{
        "key": "to",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }, {
        "key": "contract_id",
        "value": "9be17165"
      }, {
        "key": "perm",
        "value": "modify"
      }, {
        "key": "to",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }, {
        "key": "contract_id",
        "value": "9be17165"
      }, {
        "key": "perm",
        "value": "mint"
      }, {
        "key": "to",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }, {
        "key": "contract_id",
        "value": "9be17165"
      }, {
        "key": "perm",
        "value": "burn"
      }]
    }, {
      "type": "issue",
      "attributes": [{
        "key": "contract_id",
        "value": "9be17165"
      }, {
        "key": "name",
        "value": "Gamja"
      }, {
        "key": "symbol",
        "value": "GAMJA"
      }, {
        "key": "owner",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }, {
        "key": "to",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }, {
        "key": "amount",
        "value": "987654321"
      }, {
        "key": "mintable",
        "value": "true"
      }, {
        "key": "decimals",
        "value": "6"
      }]
    }, {
      "type": "message",
      "attributes": [{
        "key": "action",
        "value": "issue_token"
      }, {
        "key": "module",
        "value": "token"
      }, {
        "key": "sender",
        "value": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558"
      }]
    }]
  }],
  "info": null,
  "gasWanted": 102620,
  "gasUsed": 84423,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [{
        "type": "token/MsgIssue",
        "value": {
          "owner": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
          "to": "tlink1n9pqyk4jy8d3pd20quryudxw3g47cl99403558",
          "name": "Gamja",
          "meta": "",
          "symbol": "GAMJA",
          "imgUri": "https://obs-beta.line-scdn.net/0hCAEtmD62HG54DTUrwzdjOUdQGgEPIw5sAzkNV0MKQlpdOls4RW5WDFwPRVlROg8xR2tSTVxfRgoAaF9t/f100x100",
          "amount": "987654321",
          "mintable": true,
          "decimals": "6"
        }
      }],
      "fee": {
        "gas": 102620,
        "amount": []
      },
      "memo": "",
      "signatures": [{
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "Az3MnK6Qnud9q/16GEd/5LWc4Hy30gy2gPSY9oZoIfbJ"
        },
        "signature": "WeVI3uyU0dFuA9pc0/BFUOYgZR2T2acym0fG1WddKsEUHTMi4lHFPEj4t3/CR4DW6y2cJVFGYEgeDXEpbfUBcg=="
      }]
    }
  },
  "timestamp": 1618370726000
}

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
  "timestamp": 1618370726000
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
  "timestamp": 1618370726000
};

export const genericServiceTokenModifyTxResultResponse = {
  responseTime: 1585467706110,
  statusCode: 1000,
  statusMessage: "Success",
  responseData: serviceTokenModifyTxResult,
};

export const serviceTokenBurnTxResult = {
  height: 709927,
  txhash: "91134BFCB6AE6EC15AB4DDF52021510C59614E7A187C9C91408E65BD3110BE62",
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
          type: "burn",
          attributes: [
            {
              key: "contract_id",
              value: "9be17165",
            },
            {
              key: "amount",
              value: "1000",
            },
            {
              key: "from",
              value: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            },
          ],
        },
        {
          type: "message",
          attributes: [
            {
              key: "action",
              value: "burn",
            },
            {
              key: "module",
              value: "token",
            },
            {
              key: "sender",
              value: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 62178,
  gasUsed: 50599,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "token/MsgBurn",
          value: {
            from: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            contractId: "9be17165",
            amount: 1000,
          },
        },
      ],
      fee: {
        gas: 62178,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A0lK2/QXWwMqSdKDtSiW4sTo6fC9ZMd3PblSX408698v",
          },
          signature:
            "mY7g4CVNgHzrKCJlD42BwVseCXrajrpIENxBf1Yh0HxUE71JgMXUmS20617O5Nl0cEw73xnSHJNs7bOyQ2hjfg==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const serviceTokenBurnFromTxResult = {
  "height": 1221266,
  "txhash": "05AFA2C5247EC3DFB1E6617977B01822C775D158082A8025EB4A5E7DFEFC6CAE",
  "codespace": "token",
  "code": 23,
  "index": 1,
  "data": null,
  "logs": null,
  "info": null,
  "gasWanted": 440000,
  "gasUsed": 35313,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [{
        "type": "token/MsgBurnFrom",
        "value": {
          "proxy": "tlink1zl4zgr446curnyf9jv07775529axdnu3kxnkex",
          "contractId": "3336b76f",
          "from": "tlink1jvsldpv083tu0xd58vrtp54j3q8s84av35k6ax",
          "amount": "2"
        }
      }],
      "fee": {
        "gas": 440000,
        "amount": []
      },
      "memo": "",
      "signatures": [{
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "Axk3kE9+A6XbAwjS34NvWR3/AtXcDtX602dfl0kps9zU"
        },
        "signature": "p5eW6aEhpT2kCO1jQ7Yhhr6ir1CydLbQfBUEsHPSiY463IswySRkHeENC64yRwlbC6xXB2yCutzWr/K3CB+cNQ=="
      }]
    }
  },
  "timestamp": 1618370726000
}

export const serviceTokenTransferTxResult = {
  height: 65183,
  txhash: "1D2F18B40C8ADFFB0D653771FD77AEFC1EABE521DD485A1DE72ECE127F1398DA",
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
              value: "transfer_ft",
            },
          ],
        },
        {
          type: "transfer",
          attributes: [
            {
              key: "from",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "to",
              value: "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            },
            {
              key: "contract_id",
              value: "9636a07e",
            },
            {
              key: "amount",
              value: "1000",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 27083,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "token/MsgTransfer",
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
            "Z7/uWSVZVc7bKIh8v0YbhrJBigJcGwy3cKRJNXtEJtBftU1+MfttBAelLMymJIUeVaR6wPB8pL8VZr2wH/qx7Q==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const serviceTokenTransferFromTxResult = {
  height: 710030,
  txhash: "D80982B9EC8CCAE83E28221D576136373381E10581197FE68ECA154367BA9594",
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
              key: "action",
              value: "transfer_from",
            },
            {
              key: "module",
              value: "token",
            },
            {
              key: "sender",
              value: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            },
          ],
        },
        {
          type: "transfer_from",
          attributes: [
            {
              key: "contract_id",
              value: "9be17165",
            },
            {
              key: "proxy",
              value: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            },
            {
              key: "from",
              value: "tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd",
            },
            {
              key: "to",
              value: "tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us",
            },
            {
              key: "amount",
              value: "1",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 59518,
  gasUsed: 48383,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "token/MsgTransferFrom",
          value: {
            proxy: "tlink1xrr7amq5g80afllmfcud59y3w60q58llx2zpe9",
            contractId: "9be17165",
            from: "tlink149nz34tch6wc5xslljt0q2j8rfnxg27dxrneyd",
            to: "tlink1r3nl5pm7a8effx39hvac09uxz8eay8jlhyj3us",
            amount: 1,
          },
        },
      ],
      fee: {
        gas: 59518,
        amount: [],
      },
      memo: "",
      signatures: [
        {
          pubKey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A0lK2/QXWwMqSdKDtSiW4sTo6fC9ZMd3PblSX408698v",
          },
          signature:
            "rrd/HPr5JZ8IXYoVPnD3S6Z8UgaElfj6UqfLDKwrqu85HqSg2sMLiVAuWCIiVHJAFwwnU/8Ya/+NDIHSgdeSTg==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const serviceTokenProxyApprovedTxResult = {
  "height": 1449998,
  "txhash": "666C1C8B614D382A570D592CA278878F7C3B8AB8E1E02CCFBF712DA6D7711CCF",
  "codespace": null,
  "code": 0,
  "index": 0,
  "data": null,
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "approve_token",
          "attributes": [
            {
              "key": "contract_id",
              "value": "f38bb8a6"
            },
            {
              "key": "proxy",
              "value": "link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu"
            },
            {
              "key": "approver",
              "value": "link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd"
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "approve_token"
            },
            {
              "key": "module",
              "value": "token"
            },
            {
              "key": "sender",
              "value": "link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd"
            }
          ]
        }
      ]
    }
  ],
  "info": null,
  "gasWanted": 62178,
  "gasUsed": 50599,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "token/MsgApprove",
          "value": {
            "approver": "link1j8jd9nps56txm2w3afcjsktrrjh0ft82eftchd",
            "contractId": "f38bb8a6",
            "proxy": "link1he0tp59u36mdjaw560gh8c27pz8fqms88l8nhu"
          }
        }
      ],
      "fee": {
        "gas": 48886,
        "amount": []
      },
      "memo": "",
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "AiIrcNL3/Rda9zUMlg3/ocwuvfkne5usVNjfO+oEtYua"
          },
          "signature": "GvPVC4eJg1WxkMEJq3PlRJ1EkjI42NLuejBDZkEPjeYKOkl93NowEKNn43Cg6no4g6Goe2RciQmkLUykspb2qg=="
        }
      ]
    }
  },
  "timestamp": 1618370726000,
}

// item token tx-result
export const itemTokenCreateTxResult = {
  "height": 1208188,
  "txhash": "DA712AFD9A6A4B403B712C573169DFF95A405D058C235717400E7D5AFBE8CEB7",
  "codespace": null,
  "code": 0,
  "index": 2,
  "data": null,
  "logs": [
    {
      "msgIndex": 0,
      "log": "",
      "events": [
        {
          "type": "create_collection",
          "attributes": [
            {
              "key": "contract_id",
              "value": "fee15a74"
            },
            {
              "key": "name",
              "value": "BW Card"
            },
            {
              "key": "owner",
              "value": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"
            }
          ]
        },
        {
          "type": "grant_perm",
          "attributes": [
            {
              "key": "to",
              "value": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"
            },
            {
              "key": "contract_id",
              "value": "fee15a74"
            },
            {
              "key": "perm",
              "value": "issue"
            },
            {
              "key": "perm",
              "value": "mint"
            },
            {
              "key": "perm",
              "value": "burn"
            },
            {
              "key": "perm",
              "value": "modify"
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "create_collection"
            },
            {
              "key": "module",
              "value": "collection"
            },
            {
              "key": "sender",
              "value": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"
            }
          ]
        }
      ]
    }
  ],
  "info": null,
  "gasWanted": 100000000,
  "gasUsed": 17748,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgCreate",
          "value": {
            "owner": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz",
            "name": "test",
            "meta": "",
            "base_img_uri": "http://test-image-server.com"
          }
        }
      ],
      "fee": {
        "gas": 87811,
        "amount": []
      },
      "memo": "",
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "AuP7XzFCVfejnMtr52DS42s9mjmd5kGZVeyaURsa0sAm"
          },
          "signature": "IyD2+sxxFU4MV035yx3hLKkXOIABSzcTEO4I/YkqU/VXbrvms4a0WJELed924vZZuM0fSkcbg2vrLWayQTimzQ=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

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
              "value": "0000000100000000"
            },
            {
              "key": "name",
              "value": "FT index name"
            },
            {
              "key": "meta",
              "value": "FT index meta"
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
      "msg": [
        {
          "type": "collection/MsgModify",
          "value": {
            "owner": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "tokenType": "00000001",
            "tokenIndex": "00000000",
            "changes": [
              {
                "field": "name",
                "value": "FT index name"
              },
              {
                "field": "meta",
                "value": "FT index meta"
              }
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
          "signature": "56ohicLtN4PNKbfQELjkaDinWvOoWbQPyrP91GCyPSo+J7+BzMmd1pI+NZVJJj966lf0RdAJYeRDxkvdS+bjQA=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
};


export const itemTokenApproveTxResult = {
  "height": 1211713,
  "txhash": "9BCE68FAF9B967D8D5A83BFDAC6EDD1F552AC1B3A61E0BC71331AF244F46863F",
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
          "type": "approve_collection",
          "attributes": [
            {
              "key": "contract_id",
              "value": "fee15a74"
            },
            {
              "key": "proxy",
              "value": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"
            },
            {
              "key": "approver",
              "value": "link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p"
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "approve_collection"
            },
            {
              "key": "module",
              "value": "collection"
            },
            {
              "key": "sender",
              "value": "link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 48825,
  "gasUsed": 39478,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgApprove",
          "value": {
            "approver": "link1ygceu3trpkkz9gcyr7m3zzv8n82zd3fawea59p",
            "contractId": "fee15a74",
            "proxy": "link17k4j8nfr47urlzfz6h7hzdaankpkz0dgce0xkz"
          }
        }
      ],
      "fee": {
        "gas": 48825,
        "amount": []
      },
      "memo": "",
      "signatures": [
        {
          "pubKey": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A4CS5PXnQSazMZhlGDrpOYBIwHY0MkulUMuIsaL9dI5c"
          },
          "signature": "5LPP1M7UbhVgVHwQTrfTvPR6xHQiYKygHFTSZwo4aYFnpkUEmo2vBDya0K2knd2E22XAsVPm660Ejxc9lprapg=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const fungibleTokenTransferTxResult = {
  "height": 71812,
  "txhash": "799AE1301F9F4C68683A0C5DD09A842EC0E9B3EF279E4B942C92DE05CFD7513F",
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
              "value": "transfer_ft"
            }
          ]
        },
        {
          "type": "transfer_ft",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "from",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "to",
              "value": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"
            },
            {
              "key": "amount",
              "value": "1:0000000100000000"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 63213,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgTransferFT",
          "value": {
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "to": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            "amount": [
              {
                "tokenId": "0000000100000000",
                "amount": 1
              }
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
          "signature": "wxP5TMETnnMh4sFdgyRnGC2Xlt0Hckcf+ZCMC4TLUokeFU6DXw4/kXboHZS/8I5O8ajsPOKQGUpeWmzJnHSVOw=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const nonFungibleTokenTypeModifyTxResult = {
  height: 170470,
  txhash: "0035A44F647F5B99A7B92790D6D0A0E146CC2E12C81BB1304800331553A55FFD",
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
          type: "modify_token_type",
          attributes: [
            {
              key: "contract_id",
              value: "61e14383",
            },
            {
              key: "token_type",
              value: "10000001",
            },
            {
              key: "name",
              value: "NFT Name",
            },
            {
              key: "meta",
              value: "NFT meta",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 17292,
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
            tokenIndex: "",
            changes: [
              {
                field: "name",
                value: "NFT Name",
              },
              {
                field: "meta",
                value: "NFT meta",
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
            "4G0Qi4ZqZhfAn0oHrumdZ+oGwj66ferK+6DgA+h/v6k8cHLdU9FbgnrT+8oncVZpaxsMwYQBkSzo69DvSB97og==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const nonFungibleTokenModifyTxResult = {
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
  "timestamp": 1618370726000
};

export const attachNFTTxResult =
// collection/MsgAttach
{
  height: 199344,
  txhash: "5F2C29B4A058CF21E858AF1890E1E76DA5F24F264975D768DC2E486BAC6B9422",
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
          type: "attach",
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
              key: "to_token_id",
              value: "100000080000000f",
            },
            {
              key: "token_id",
              value: "100000080000000e",
            },
            {
              key: "old_root_token_id",
              value: "100000080000000e",
            },
            {
              key: "new_root_token_id",
              value: "100000080000000f",
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
              value: "attach",
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
  gasUsed: 24438,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgAttach",
          value: {
            from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            toTokenId: "100000080000000f",
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
            "4MRKtMIK3gazQUzzGEMt2KnRuIWeSs1opwUjIxrsHLtdCOP+3M7v6lYN2E49//qthaNDNKOJQiJ5pQMZwmw9Jg==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const attachFromNFTTxResult =
// collection/MsgAttachFrom
{
  height: 199366,
  txhash: "C3A89E0DA50C9D73A9D0727970040504A49987D6789FC9B8B52C615749F58E06",
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
          type: "attach_from",
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
              key: "to_token_id",
              value: "100000010000000c",
            },
            {
              key: "token_id",
              value: "100000010000000b",
            },
            {
              key: "old_root_token_id",
              value: "100000010000000b",
            },
            {
              key: "new_root_token_id",
              value: "100000010000000c",
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
              value: "attach_from",
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
  gasUsed: 25583,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgAttachFrom",
          value: {
            proxy: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            from: "tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph",
            toTokenId: "100000010000000c",
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
            "pnuJr65omjGaVKX66GnK7O32nRLznhiBQTsW0+5muLVwbGO5AHWI2meUg63Z95pEz1YB/wAaHxdC57ocUr0t9A==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const detachNFTTxResult = {
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
  "timestamp": 1618370726000
};

export const detachNFTFromTxResult = {
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
  "timestamp": 1618370726000
};

export const issueFungibleTxResult = {
  height: 166260,
  txhash: "D9DB07D45BAABE6816E74250E2B48D6C9DC35528A95638B50A9AE26B32D98069",
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
          type: "issue_ft",
          attributes: [
            {
              key: "contract_id",
              value: "61e14383",
            },
            {
              key: "name",
              value: "FungibleName",
            },
            {
              key: "token_id",
              value: "0000003100000000",
            },
            {
              key: "owner",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "to",
              value: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            },
            {
              key: "amount",
              value: "0",
            },
            {
              key: "mintable",
              value: "true",
            },
            {
              key: "decimals",
              value: "0",
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
              value: "issue_ft",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 137987,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgIssueFT",
          value: {
            owner: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            to: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            name: "FungibleName",
            meta: "FungibleMeta",
            amount: 0,
            mintable: true,
            decimals: 0,
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
            "U0jD9M3ZotpoXd5yiQEO4l5Wxiu4DLgctuJrQ/VjbyBAhOWTncWtE/4HKNkcyHyJMA+jkA849E5Qo7rcsuIWjw==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};

export const mintFungibleTxResult = {
  height: 168260,
  txhash: "F16C8704529887A91073389EAC1C5CFB2BBF837E9C1184E2E30C054E1D1F4316",
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
              value: "mint_ft",
            },
          ],
        },
        {
          type: "mint_ft",
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
              key: "to",
              value: "tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j",
            },
            {
              key: "amount",
              value: "3000:0000000100000000",
            },
          ],
        },
      ],
    },
  ],
  info: "",
  gasWanted: 100000000,
  gasUsed: 98662,
  tx: {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "collection/MsgMintFT",
          value: {
            from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            contractId: "61e14383",
            to: "tlink1fjx6drmlf9wjjtpk3pkr6zcdl8h8a4aur3wc6j",
            amount: [
              {
                tokenId: "0000000100000000",
                amount: 3000,
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
            "yu0DnRwIC6sLAlR+xlFgbhFs8VBq1o5gIYIlYqkyyBUN7hqACOc1k4PI5ZcflE7eTxYf2bwR109t47SprXsncA==",
        },
      ],
    },
  },
  "timestamp": 1618370726000
};


export const burnFungibleTxResult = {
  "height": 168958,
  "txhash": "B522B0959DDAF915F1F2841025B2FC4B3A35DA21E85B71C7FB165D1222DC8693",
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
          "type": "burn_ft",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "from",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "amount",
              "value": "1:0000000100000000"
            }
          ]
        },
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
              "value": "burn_ft"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 132821,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgBurnFT",
          "value": {
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "amount": [
              {
                "tokenId": "0000000100000000",
                "amount": 1
              }
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
          "signature": "wdIVwwikR9Dc8XTr8+lHvDtJlDTFimMABFpKPGvwPN4fSHC2dyHDxOvdwT5e7E2fK1GyaeJaq7uTHfSczuC5hg=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const burnFromFungibleTxResult = {
  "height": 168958,
  "txhash": "B522B0959DDAF915F1F2841025B2FC4B3A35DA21E85B71C7FB165D1222DC8693",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": null,
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 132821,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgBurnFTFrom",
          "value": {
            "proxy": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "amount": [
              {
                "tokenId": "0000000100000000",
                "amount": 1
              }
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
          "signature": "wdIVwwikR9Dc8XTr8+lHvDtJlDTFimMABFpKPGvwPN4fSHC2dyHDxOvdwT5e7E2fK1GyaeJaq7uTHfSczuC5hg=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}


export const issueNonFungibleTypeTxResult = {
  "height": 170448,
  "txhash": "C3ACE6FE3B3FDD74A753B962BD415C119087EE7EB6038C7CDEC0A82B0C2B6F6B",
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
          "type": "issue_nft",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "token_type",
              "value": "1000000c"
            }
          ]
        },
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
              "value": "issue_nft"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 38247,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgIssueNFT",
          "value": {
            "owner": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "name": "NFTName",
            "meta": "NFTMETA"
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
          "signature": "4kL7T5X8QBD21+3OXznmO1X+pHDAi36BBLDRNXVL/rgjw17erdYqYJUIZ2CekbJAx+Ii0bgiHz6j6OL2ciW9NQ=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const mintNonFungibleTxResult = {
  "height": 172207,
  "txhash": "F8387F24FC023E3E6E664BF8BE3FD36E8CE3D002A95F506CA4FA9ABA83FEDDBE",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [{
    "msgIndex": 0,
    "log": "",
    "events": [{
      "type": "message",
      "attributes": [{
        "key": "module",
        "value": "collection"
      },
      {
        "key": "sender",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "action",
        "value": "mint_nft"
      }
      ]
    },
    {
      "type": "mint_nft",
      "attributes": [{
        "key": "contract_id",
        "value": "61e14383"
      },
      {
        "key": "name",
        "value": "NFT index name"
      },
      {
        "key": "token_id",
        "value": "1000000100000007"
      },
      {
        "key": "from",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "to",
        "value": "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl"
      }
      ]
    }
    ]
  }],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 116561,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [{
        "type": "collection/MsgMintNFT",
        "value": {
          "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          "contractId": "61e14383",
          "to": "tlink12v6t8c3reucj3ahfvx9tvghpltwchh7uvj5frl",
          "params": [
            {
              "name": "NFT index name",
              "meta": "NFT index meta",
              "tokenType": "10000001"
            }
          ]
        }
      }],
      "fee": {
        "gas": 100000000,
        "amount": []
      },
      "memo": "",
      "signatures": [{
        "pubKey": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"
        },
        "signature": "96H62bqWWjN9ses+BodcY1+WbciFj9wvTgA9kl3XTEsCOOJ/JR2lvZ3TZQQfc5rWzGBqrEWbhIEqCDjMZ2ssSg=="
      }]
    }
  },
  "timestamp": 1618370726000
}

export const burnNonFungibleTxResult = // collection/MsgBurnNFT
{
  "height": 183737,
  "txhash": "40CBB20B0C78A61864184EF11F05EA2EDBB582D08700C7DFAE4AE5495D63BC56",
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
          "type": "burn_nft",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "from",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "token_id",
              "value": "1000000100000003"
            }
          ]
        },
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
              "value": "burn_nft"
            }
          ]
        },
        {
          "type": "operation_burn_nft",
          "attributes": [
            {
              "key": "token_id",
              "value": "1000000100000003"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 280717,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgBurnNFT",
          "value": {
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "tokenIds": [
              "1000000100000003"
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
          "signature": "eqWCFeKzSnJkTwq45JeUkjTPngofQNiRL0xMsvICv6QLb1o7fa8towGS/Vk02TY6Yh1c/JdP1flGp+9fZn+pFw=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const burnFromNonFungibleTxResult =
// collection/MsgBurnNFTFrom
{
  "height": 199298,
  "txhash": "5B4205FF4D039695053DDBA026AB007E20F62747C22C3A5F2A79A80BC993A91E",
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
          "type": "burn_nft_from",
          "attributes": [
            {
              "key": "contract_id",
              "value": "61e14383"
            },
            {
              "key": "proxy",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "from",
              "value": "tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph"
            },
            {
              "key": "token_id",
              "value": "1000000100000005"
            }
          ]
        },
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
              "value": "burn_nft_from"
            }
          ]
        },
        {
          "type": "operation_burn_nft",
          "attributes": [
            {
              "key": "token_id",
              "value": "1000000100000005"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 357429,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "collection/MsgBurnNFTFrom",
          "value": {
            "proxy": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "contractId": "61e14383",
            "from": "tlink17dz3hqn6nd5j6euymaw3ft9phgspmuhfjqazph",
            "tokenIds": [
              "1000000100000005"
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
          "signature": "Fd71AF+PmRWdGVg6Kgbdhnnyz0th/rKahzP0Yv9vrqVEtWD1WlCngrjRA23LVMVfEmULtGlKSy7Sac9Ni6+P6g=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}

export const multiMintNonFungibleTxResult = {
  "height": 183068,
  "txhash": "5FD523F2E890687835F2031DD474AFF04117688DDD22791631538DC91E96625B",
  "codespace": "",
  "code": 0,
  "index": 0,
  "data": "",
  "logs": [{
    "msgIndex": 0,
    "log": "",
    "events": [{
      "type": "message",
      "attributes": [{
        "key": "module",
        "value": "collection"
      },
      {
        "key": "sender",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "action",
        "value": "mint_nft"
      }
      ]
    },
    {
      "type": "mint_nft",
      "attributes": [{
        "key": "contract_id",
        "value": "61e14383"
      },
      {
        "key": "name",
        "value": "Name"
      },
      {
        "key": "token_id",
        "value": "100000010000000a"
      },
      {
        "key": "from",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "to",
        "value": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"
      }
      ]
    }
    ]
  },
  {
    "msgIndex": 1,
    "log": "",
    "events": [{
      "type": "message",
      "attributes": [{
        "key": "module",
        "value": "collection"
      },
      {
        "key": "sender",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "action",
        "value": "mint_nft"
      }
      ]
    },
    {
      "type": "mint_nft",
      "attributes": [{
        "key": "contract_id",
        "value": "61e14383"
      },
      {
        "key": "name",
        "value": "Name2"
      },
      {
        "key": "token_id",
        "value": "1000000200000001"
      },
      {
        "key": "from",
        "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
      },
      {
        "key": "to",
        "value": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"
      }
      ]
    }
    ]
  }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 432463,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [{
        "type": "collection/MsgMintNFT",
        "value": {
          "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          "contractId": "61e14383",
          "to": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
          "params": [{
            "name": "Name",
            "meta": "Meta",
            "tokenType": "10000001"
          }]
        }
      },
      {
        "type": "collection/MsgMintNFT",
        "value": {
          "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
          "contractId": "61e14383",
          "to": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
          "params": [{
            "name": "Name2",
            "meta": "",
            "tokenType": "10000002"
          }]
        }
      }
      ],
      "fee": {
        "gas": 100000000,
        "amount": []
      },
      "memo": "",
      "signatures": [{
        "pubKey": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "A41pCdZ71Vw66K5er5JrzVqYffiZsjoLBDB2szrNIJjy"
        },
        "signature": "3XbW5kY10P4bVvvDscJruKG+1sNjrNhrw57ATfSS27tKUOPgScad6WDEaDM8vNRYza7Mfa7fW1ytn0L+2q1hIQ=="
      }]
    }
  },
  "timestamp": 1618370726000
}

// transfer
export const baseCoinTransferTxResult = {
  "height": 53310,
  "txhash": "2EE95DCAD67DDEC124AB57B21AA5F82653A2CE5D7E5ACA5ECEFA47B2F561518D",
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
              "value": "bank"
            },
            {
              "key": "sender",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "action",
              "value": "send"
            }
          ]
        },
        {
          "type": "transfer",
          "attributes": [
            {
              "key": "sender",
              "value": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"
            },
            {
              "key": "recipient",
              "value": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww"
            },
            {
              "key": "amount",
              "value": "1tcony"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 100000000,
  "gasUsed": 23150,
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "coin/MsgSend",
          "value": {
            "from": "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
            "to": "tlink1nf5uhdmtsshmkqvlmq45kn4q9atnkx4l3u4rww",
            "amount": [
              {
                "denom": "tcony",
                "amount": 1
              }
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
          "signature": "AF71IQpmzGaJLrv8EJ0tCtrUNQdyo5vsgDpPNyLIePhqNnzObEo00efm+9ACLbXdI4ETEGe3DQ+B0AHt70sC4A=="
        }
      ]
    }
  },
  "timestamp": 1618370726000
}


