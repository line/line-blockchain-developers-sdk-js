export class DenomAmount {
  constructor(readonly amount: string, readonly denomination: string) {}

  public static create(obj: any): DenomAmount {
    return new DenomAmount(obj["amount"], obj["denom"] ?? obj["denomination"]);
  }
}

export class TokenIdAmount {
  constructor(readonly amount: string, readonly tokenId: string) {}

  public static create(obj: any): TokenIdAmount {
    return new TokenIdAmount(obj["amount"], obj["tokenId"]);
  }
}
