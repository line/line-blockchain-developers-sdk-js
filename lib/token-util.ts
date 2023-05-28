import _ from "lodash";

export class TokenUtil {
  private static FUNGIBLE_TOKEN_INDEX = "00000000";

  private constructor() {
  }

  static tokenIndexFrom(tokenId: string): string {
    let tokenIndex = "";
    if (tokenId && tokenId.length == 16) {
      tokenIndex = tokenId.substring(8, 16);
    }
    return tokenIndex;
  }

  static tokenTypeFrom(tokenId: string): string {
    let tokenType = "";
    if (tokenId && tokenId.length >= 8) {
      tokenType = tokenId.substring(0, 8);
    }
    return tokenType;
  }

  static isFungible(tokenType: string): boolean {
    return tokenType && tokenType.startsWith("0");
  }

  static tokenTypes(tokenIds: Array<string>): Array<string> {
    return _.map(tokenIds.values(), it => {
      return TokenUtil.tokenTypeFrom(it.toString())
    })

  }

  static tokenIndices(tokenIds: Array<string>): Array<string> {
    let indices = _.map(tokenIds.values(), it => {
      return TokenUtil.tokenIndexFrom(it.toString())
    });
    return indices
  }
}
