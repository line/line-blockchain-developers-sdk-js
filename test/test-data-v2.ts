export const transactionResult = {
    responseTime: 1585467706110,
    statusCode: 1000,
    statusMessage: "Success",
    responseData: [
        {
            summary: {
                height: 241476,
                txIndex: 2,
                txHash: "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
                signers: ["tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"],
                result: {
                    code: 0,
                    codeSpace: "collection"
                }
            },
            txMessages: [
                {
                    msgIndex: 0,
                    requestType: "collection/MsgTransferNFT",
                    details: {
                        from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
                        contractId: "61e14383",
                        to: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
                        tokenIds: ["1000000100000001"],
                    }
                }
            ],
            txEvents: [
                {
                    eventName: "EventCollectionNftTransferred",
                    msgIndex: 0,
                    contractId: "",
                    tokenIds: [],
                    fromAddress: "",
                    toAddress: "",

                }
            ],
        }
    ]
};


export const singleTransactionResult = {
    responseTime: 1585467706110,
    statusCode: 1000,
    statusMessage: "Success",
    responseData: {
        summary: {
            height: 241476,
            txIndex: 2,
            txHash: "D3833E2CED77A11639D03EC3DF4B0EC9B77EBFF48795B7151D5201439738031A",
            signers: ["tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq"],
            result: {
                code: 0,
                codeSpace: "collection"
            }
        },
        txMessages: [
            {
                msgIndex: 0,
                requestType: "collection/MsgTransferNFT",
                details: {
                    from: "tlink1fr9mpexk5yq3hu6jc0npajfsa0x7tl427fuveq",
                    contractId: "61e14383",
                    to: "tlink1s658utvasn7f5q92034h6zgv0zh2uxy9tzmtqv",
                    tokenIds: ["1000000100000001"],
                }
            }
        ],
        txEvents: [
            {
                eventName: "EventCollectionNftTransferred",
                msgIndex: 0,
                contractId: "",
                tokenIds: [],
                fromAddress: "",
                toAddress: "",

            }
        ],
    }
};
