export class TokenUtil {
  private static FUNGIBLE_TOKEN_INDEX = "00000000";
  private constructor() {}

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

  static isFungible(tokenIndex: string): boolean {
    let isFungible = false;
    if (tokenIndex && tokenIndex === TokenUtil.FUNGIBLE_TOKEN_INDEX) {
      isFungible = true;
    }
    return isFungible;
  }
}
