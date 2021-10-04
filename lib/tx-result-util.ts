import * as _ from "lodash";
import jsonpath from "jsonpath";
import { TokenUtil } from "./token-util";
import { TxResultResponse } from "./response";
import { TokenChange, MintedFungibleToken } from "./transaction-messages";

export class TxResultUtil {
  private constructor() {}
  static findFromWalletAddress(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "from",
      "",
    );
  }

  static findOwnerWalletAddress(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "owner",
      "",
    );
  }

  static findProxyWalletAddress(txResultResponse: TxResultResponse): string {
    const proxyAddress = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "proxy",
      "",
    );
    if (!proxyAddress || proxyAddress.length < 1) {
      return TxResultUtil.findValueFromMessagesWithDefaultValue(
        txResultResponse,
        "proxy",
        "",
      );
    } else {
      return proxyAddress;
    }
  }

  static findChanges(txResultResponse: TxResultResponse): Array<TokenChange> {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "changes",
      "",
    );
  }

  static findToWalletAddress(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "to",
      "",
    );
  }

  static findContractId(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "contractId",
      "",
    );
  }

  static findAmount(txResultResponse: TxResultResponse): string {
    let amount = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "amount",
      "",
    ) as string;
    if (!amount || amount.length < 1) {
      return TxResultUtil.findValueFromLogEvents(
        txResultResponse,
        "amount",
      ).toString();
    } else {
      return amount.toString();
    }
  }

  static findMintedFungibleTokens(
    txResultResponse: TxResultResponse,
  ): Array<MintedFungibleToken> {
    // array of object
    let amounts: Array<any> = TxResultUtil.findValueFromMessages(
      txResultResponse,
      "amount",
    );
    return amounts.map(it => {
      const tokenId = it["tokenId"];
      const tokenType = TokenUtil.tokenTypeFrom(tokenId);
      return new MintedFungibleToken(
        TxResultUtil.findContractId(txResultResponse),
        tokenType,
        it["amount"].toString(),
      );
    });
  }

  static findTokenId(txResultResponse: TxResultResponse): string {
    const tokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "tokenId",
      "",
    ) as string;
    if (tokenId && tokenId.length > 1) {
      return tokenId;
    } else {
      return `${TxResultUtil.findTokenType(
        txResultResponse,
      )}${TxResultUtil.findTokenIndex(txResultResponse)}`;
    }
  }

  static findTokenIdFromEvents(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromLogEvents(txResultResponse, "token_id");
  }

  static findParentTokenId(txResultResponse: TxResultResponse): string {
    const parentTokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "toTokenId",
      "",
    ) as string;
    if (parentTokenId && parentTokenId.length > 1) {
      return parentTokenId;
    } else {
      return TxResultUtil.findValueFromLogEvents(
        txResultResponse,
        "to_token_id",
      );
    }
  }

  static findOldParentTokenId(txResultResponse: TxResultResponse): string {
    const oldParentTokenId = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "oldRootTokenId",
      "",
    ) as string;
    if (oldParentTokenId && oldParentTokenId.length > 1) {
      return oldParentTokenId;
    } else {
      return TxResultUtil.findValueFromLogEvents(
        txResultResponse,
        "old_root_token_id",
      );
    }
  }

  static findParentTokenIdFromDetach(
    txResultResponse: TxResultResponse,
  ): string {
    return TxResultUtil.findValueFromLogEvents(
      txResultResponse,
      "from_token_id",
    );
  }

  static findTokenType(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "tokenType",
      "",
    );
  }

  static findTokenIndex(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "tokenIndex",
      "",
    );
  }

  static findTokenName(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "name",
      "",
    );
  }

  static findTokenDecimals(txResultResponse: TxResultResponse): number {
    const decimals = TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "decimals",
      0,
    );

    if (!decimals || decimals.toString().length < 1) {
      return TxResultUtil.findValueFromLogEvents(txResultResponse, "decimals");
    } else {
      return decimals;
    }
  }

  static findTokenMeta(txResultResponse: TxResultResponse): string {
    return TxResultUtil.findValueFromMessagesWithDefaultValue(
      txResultResponse,
      "meta",
      "",
    );
  }

  static findValueFromMessagesWithDefaultValue(
    txResultResponse: TxResultResponse,
    key: string,
    defaultValue: any,
  ): any {
    const value = TxResultUtil.findValueFromMessages(txResultResponse, key);
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  }

  static findValueFromMessages(
    txResultResponse: TxResultResponse,
    key: string,
  ): any {
    if (txResultResponse.tx.value.msg.length < 1) {
      return "";
    } else {
      const msg = _.head(
        _.filter(txResultResponse.tx.value.msg, it => !!it.value[key]),
      );
      if (msg && msg.value) {
        return msg.value[key];
      } else {
        return null;
      }
    }
  }

  static findSenderFromLogEvents(txResultResponse: TxResultResponse): any {
    return TxResultUtil.findValueFromLogEvents(txResultResponse, "sender");
  }

  static findValueFromLogEvents(
    txResultResponse: TxResultResponse,
    key: string,
  ): any {
    let targetAttribute = _.head(
      jsonpath.query(txResultResponse.logs, `$..[?(@.key === '${key}')]`),
    );
    if (targetAttribute && targetAttribute["value"]) {
      return targetAttribute["value"];
    } else {
      return "";
    }
  }
}
