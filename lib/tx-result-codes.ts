import { TxResultResponse } from "./response";

const txResultCodeMappings = [
  {
    codespace: "bank",
    codes: [
      { code: 0, description: "" },
      {
        code: 1,
        description: 'No "inputs" for "send" type transaction',
      },
      {
        code: 2,
        description: 'No "outputs" for "send" type transaction',
      },
      { code: 3, description: 'Sum "inputs" != sum "outputs"' },
      { code: 4, description: '"Send" type transactions are disabled.' },
    ],
  },
  {
    codespace: "coin",
    codes: [
      { code: 0, description: "" },
      {
        code: 1,
        description: 'No "inputs" for "send" type transaction',
      },
      {
        code: 2,
        description: 'No "outputs" for "send" type transaction',
      },
      { code: 3, description: 'Sum "inputs" != sum "outputs"' },
      { code: 4, description: '"Send" type transactions are disabled.' },
      { code: 5, description: "Can't transfer to safety box addresses." },
      {
        code: 6,
        description: "The number of addresses exceeded the limit.",
      },
    ],
  },
  {
    codespace: "collection",
    codes: [
      { code: 0, description: "" },
      {
        code: 1,
        description: "Token with the given token ID already exists in the contract.",
      },
      {
        code: 2,
        description: "Token with the given token ID doesn't exist in the contract.",
      },
      {
        code: 3,
        description: "Token with the given token ID in the contract isn't mintable.",
      },
      { code: 4, description: "Token name shouldn't be empty." },
      { code: 5, description: "Invalid token ID" },
      {
        code: 6,
        description: "Token decimals should be within the range in 0–18.",
      },
      {
        code: 7,
        description:
          "Issuing token with amount[1], decimals[0], mintable[false] prohibited. Issue non-fungible token instead.",
      },
      { code: 8, description: "Invalid token amount" },
      { code: 9, description: 'Invalid "base_img_uri" length' },
      { code: 10, description: 'Invalid "name" length' },
      { code: 11, description: "Invalid token type pattern found." },
      { code: 12, description: "Invalid token index pattern found." },
      { code: 13, description: "Collection already exists." },
      { code: 14, description: "Collection doesn't exist." },
      {
        code: 15,
        description: "Token Type for the given contract ID already exists.",
      },
      {
        code: 16,
        description: "Token Type for the given contract ID doesn't exist.",
      },
      {
        code: 17,
        description: "All token types for the given contract ID are occupied.",
      },
      {
        code: 18,
        description: "All non-fungible token indices for contract ID and token type are occupied.",
      },
      {
        code: 19,
        description: "All fungible token IDs for contract ID are occupied.",
      },
      { code: 20, description: "Account doesn't have the permission." },
      {
        code: 21,
        description: "Token is already a child of some other token.",
      },
      { code: 22, description: "Token isn't a child of some other token." },
      { code: 23, description: "Token is being not owned." },
      { code: 24, description: "Can't transfer a child token." },
      { code: 25, description: "Token isn't a non-fungible token." },
      { code: 26, description: "Can't attach token to itself." },
      { code: 27, description: "Can't attach token to a descendant." },
      { code: 28, description: "Approver is same as proxy." },
      { code: 29, description: "Proxy isn't approved on the collection." },
      {
        code: 30,
        description: "Proxy is already approved on the collection.",
      },
      { code: 31, description: "Account already exists." },
      { code: 32, description: "Account doesn't exist." },
      { code: 33, description: "Insufficient supply" },
      { code: 34, description: "Invalid coin" },
      { code: 35, description: 'Invalid count of field "changes"' },
      { code: 36, description: '"changes" is empty.' },
      { code: 37, description: 'Invalid field of "changes"' },
      {
        code: 38,
        description: "There is a token index but no token type.",
      },
      {
        code: 39,
        description: "There is a token type of FT but no token index.",
      },
      { code: 40, description: "Insufficient token" },
      { code: 41, description: 'Duplicate field of "changes"' },
      { code: 42, description: 'Invalid "meta" length' },
      { code: 43, description: "Supply for collection reached maximum." },
      { code: 44, description: "Required field can't be empty." },
      {
        code: 45,
        description: "Can't attach token. (composition too deep)",
      },
      {
        code: 46,
        description: "Can't attach token. (composition too wide)",
      },
    ],
  },
  {
    codespace: "token",
    codes: [
      { code: 0, description: "" },
      { code: 1, description: "Token already exists." },
      { code: 2, description: "Token doesn't exist." },
      { code: 3, description: "Token isn't mintable." },
      { code: 4, description: "Token name shouldn't be empty." },
      {
        code: 5,
        description: "Token decimals should be within the range of 0–18.",
      },
      { code: 6, description: "Invalid token amount" },
      { code: 7, description: "Invalid token URI length" },
      { code: 8, description: "Invalid name length" },
      { code: 9, description: "Invalid token symbol" },
      { code: 10, description: "Account doesn't have the permission." },
      { code: 11, description: "Account already exists." },
      { code: 12, description: "Account doesn't exist." },
      { code: 13, description: "Insufficient balance" },
      { code: 14, description: "Supply for token already exists" },
      { code: 15, description: "Insufficient supply" },
      { code: 16, description: 'Invalid count of field "changes"' },
      { code: 17, description: '"changes" is empty.' },
      { code: 18, description: 'Invalid field of "changes"' },
      { code: 19, description: 'Invalid field of "changes"' },
      { code: 20, description: 'Invalid "meta" length' },
      { code: 21, description: "Supply for token reached maximum" },
      { code: 22, description: "Approver is same as proxy." },
      { code: 23, description: "Proxy isn't approved on the token." },
      { code: 24, description: "Proxy is already approved on the token." },
    ],
  },
  {
    codespace: "contract",
    codes: [
      { code: 0, description: "" },
      { code: 1, description: "Invalid contract ID" },
      { code: 2, description: "Contract doesn't exist." },
    ],
  },
  {
    codespace: "link",
    codes: [
      { code: 0, description: "" },
      { code: 1, description: "Error" },
      { code: 2, description: "Invalid permission" },
      { code: 3, description: "Invalid name" },
    ],
  },
  {
    codespace: "sdk",
    codes: [
      { code: 0, description: "" },
      { code: 2, description: "Tx parse error" },
      { code: 3, description: "Invalid sequence" },
      { code: 4, description: "Unauthorized" },
      { code: 5, description: "Insufficient funds" },
      { code: 6, description: "Unknown request" },
      { code: 7, description: "Invalid address" },
      { code: 8, description: "Invalid public key" },
      { code: 9, description: "Unknown address" },
      { code: 10, description: "Invalid coins" },
      { code: 11, description: "Out of gas" },
      { code: 12, description: "Memo is too large." },
      { code: 13, description: "Insufficient fee" },
      { code: 14, description: "Maximum number of signatures exceeded." },
      { code: 15, description: "No signatures supplied." },
      { code: 16, description: "Failed to marshal JSON bytes." },
      { code: 17, description: "Failed to unmarshal JSON bytes." },
      { code: 18, description: "Invalid request" },
      { code: 19, description: "Tx already in mempool." },
      { code: 20, description: "Mempool is full." },
      { code: 21, description: "Tx too large" },
    ],
  },
];

export class TxResultCode {
  constructor(readonly codeSpace: string, readonly code: number, readonly description: string) {}

  isSuccess(): boolean {
    return this.code == 0;
  }

  txResultType(): TxResultType {
    if (this.isSuccess()) {
      return TxResultType.SUCCESS;
    } else {
      return TxResultType.FAIL;
    }
  }

  static invalidTxResultCode(): TxResultCode {
    return new TxResultCode("invalid-name-space", -1, "invalid tx-result-code");
  }
}

export enum TxResultType {
  SUCCESS,
  FAIL,
}

export class TxResultCodeMappingsProvider {
  private static mappings: Array<any> = txResultCodeMappings;

  private constructor() {}

  static codes(codespace: string): Array<TxResultCode> {
    return this.mappings
      .filter(it => it.codespace == codespace)
      .flatMap(it => it.codes)
      .map(it => new TxResultCode(codespace, it.code, it.description));
  }

  static code(txResultResponse: TxResultResponse): TxResultCode {
    const code = this.mappings
      .filter(it => it.codespace == txResultResponse.codespace)
      .flatMap(it => it.codes)
      .find(it => (it.code = txResultResponse.code));

    if (code) {
      return new TxResultCode(code.codespace, code.code, code.description);
    } else {
      return TxResultCode.invalidTxResultCode();
    }
  }
}
