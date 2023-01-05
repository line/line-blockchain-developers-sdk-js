export declare const transactionResult: {
    responseTime: number;
    statusCode: number;
    statusMessage: string;
    responseData: {
        height: number;
        txhash: string;
        codespace: string;
        code: number;
        index: number;
        data: string;
        logs: {
            msgIndex: number;
            log: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                }[];
            }[];
        }[];
        info: string;
        gasWanted: number;
        gasUsed: number;
        tx: {
            type: string;
            value: {
                msg: {
                    type: string;
                    value: {
                        from: string;
                        contractId: string;
                        to: string;
                        tokenIds: string[];
                    };
                }[];
                fee: {
                    gas: number;
                    amount: any[];
                };
                memo: string;
                signatures: {
                    pubKey: {
                        type: string;
                        value: string;
                    };
                    signature: string;
                }[];
            };
        };
        timestamp: number;
    }[];
};
export declare const singleTransactionResult: {
    responseTime: number;
    statusCode: number;
    statusMessage: string;
    responseData: {
        height: number;
        txhash: string;
        codespace: string;
        code: number;
        index: number;
        data: string;
        logs: {
            msgIndex: number;
            log: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                }[];
            }[];
        }[];
        info: string;
        gasWanted: number;
        gasUsed: number;
        tx: {
            type: string;
            value: {
                msg: {
                    type: string;
                    value: {
                        from: string;
                        contractId: string;
                        to: string;
                        tokenIds: string[];
                    };
                }[];
                fee: {
                    gas: number;
                    amount: any[];
                };
                memo: string;
                signatures: {
                    pubKey: {
                        type: string;
                        value: string;
                    };
                    signature: string;
                }[];
            };
        };
        timestamp: number;
    };
};
export declare const nftDetachTxResultResponse: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const nftDetachFromTxResultResponse: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const nftUpdateTxResultResponse: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    tokenType: string;
                    tokenIndex: string;
                    changes: {
                        field: string;
                        value: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const memoTxResultResponse: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const issueServiceTokenTxResult: {
    height: number;
    txhash: string;
    codespace: any;
    code: number;
    index: number;
    data: any;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: any;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    to: string;
                    name: string;
                    meta: string;
                    symbol: string;
                    imgUri: string;
                    amount: string;
                    mintable: boolean;
                    decimals: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenMintTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    amount: number;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenModifyTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    changes: {
                        field: string;
                        value: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const genericServiceTokenModifyTxResultResponse: {
    responseTime: number;
    statusCode: number;
    statusMessage: string;
    responseData: {
        height: number;
        txhash: string;
        codespace: string;
        code: number;
        index: number;
        data: string;
        logs: {
            msgIndex: number;
            log: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                }[];
            }[];
        }[];
        info: string;
        gasWanted: number;
        gasUsed: number;
        tx: {
            type: string;
            value: {
                msg: {
                    type: string;
                    value: {
                        owner: string;
                        contractId: string;
                        changes: {
                            field: string;
                            value: string;
                        }[];
                    };
                }[];
                fee: {
                    gas: number;
                    amount: any[];
                };
                memo: string;
                signatures: {
                    pubKey: {
                        type: string;
                        value: string;
                    };
                    signature: string;
                }[];
            };
        };
        timestamp: number;
    };
};
export declare const serviceTokenBurnTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    amount: number;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenBurnFromTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contract_id: string;
                    from: string;
                    amount: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenTransferTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    amount: number;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenTransferFromTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    to: string;
                    amount: number;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const serviceTokenProxyApprovedTxResult: {
    height: number;
    txhash: string;
    codespace: any;
    code: number;
    index: number;
    data: any;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: any;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    approver: string;
                    contractId: string;
                    proxy: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const itemTokenCreateTxResult: {
    height: number;
    txhash: string;
    codespace: any;
    code: number;
    index: number;
    data: any;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: any;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    name: string;
                    meta: string;
                    base_img_uri: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const fungibleTokenModifyTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    tokenType: string;
                    tokenIndex: string;
                    changes: {
                        field: string;
                        value: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const itemTokenApproveTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    approver: string;
                    contractId: string;
                    proxy: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const itemTokenDisapproveTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    approver: string;
                    contractId: string;
                    proxy: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const fungibleTokenTransferTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    amount: {
                        tokenId: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const fungibleTokenTransferFromTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    to: string;
                    amount: {
                        tokenId: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const nonFungibleTokenTypeModifyTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    tokenType: string;
                    tokenIndex: string;
                    changes: {
                        field: string;
                        value: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const nonFungibleTokenModifyTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    tokenType: string;
                    tokenIndex: string;
                    changes: {
                        field: string;
                        value: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const attachNFTTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    toTokenId: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const attachFromNFTTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    toTokenId: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const detachNFTTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const detachNFTFromTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    tokenId: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const issueFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    to: string;
                    name: string;
                    meta: string;
                    amount: number;
                    mintable: boolean;
                    decimals: number;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const mintFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    amount: {
                        tokenId: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const burnFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    amount: {
                        tokenId: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const burnFromFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    amount: {
                        tokenId: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const issueNonFungibleTypeTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    owner: string;
                    contractId: string;
                    name: string;
                    meta: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const mintNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    params: {
                        name: string;
                        meta: string;
                        tokenType: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const burnNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    tokenIds: string[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const burnFromNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    tokenIds: string[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const multiMintNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    params: {
                        name: string;
                        meta: string;
                        tokenType: string;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const transferNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    contractId: string;
                    to: string;
                    tokenIds: string[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const transferFromNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    to: string;
                    tokenIds: string[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const baseCoinTransferTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    to: string;
                    amount: {
                        denom: string;
                        amount: number;
                    }[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const accountMsgEmptyTxResult: {
    height: number;
    txhash: string;
    codespace: any;
    code: number;
    index: number;
    data: any;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: any;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const failedTransferFromNonFungibleTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: any[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    proxy: string;
                    contractId: string;
                    from: string;
                    to: string;
                    tokenIds: string[];
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
export declare const createAccountTxResult: {
    height: number;
    txhash: string;
    codespace: string;
    code: number;
    index: number;
    data: string;
    logs: {
        msgIndex: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }[];
    info: string;
    gasWanted: number;
    gasUsed: number;
    tx: {
        type: string;
        value: {
            msg: {
                type: string;
                value: {
                    from: string;
                    target: string;
                };
            }[];
            fee: {
                gas: number;
                amount: any[];
            };
            memo: string;
            signatures: {
                pubKey: {
                    type: string;
                    value: string;
                };
                signature: string;
            }[];
        };
    };
    timestamp: number;
};
