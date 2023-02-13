export class JSONParseError extends Error {
  constructor(message: string, public raw: any) {
    super(message);
  }
}

export class RequestError extends Error {
  constructor(
    message: string,
    public code: string,
    public detailErrorMessage: string,
    private originalError: Error,
  ) {
    super(message);
  }

  public toString = (): string => {
    return `RequestError - message: ${this.message}, code: ${this.code}, detailErrorMessage: ${this.detailErrorMessage}`
  }
}

export class ReadError extends Error {
  constructor(private originalError: Error) {
    super(originalError.message);
  }

  public toString = (): string => {
    return `ReadError - error: ${this.originalError}`
  }
}

export class HTTPError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusMessage: string,
    public detailErrorMessage: string,
    public originalError: any,
  ) {
    super(message);
  }

  public toString = (): string => {
    return `HTTPError - message: ${this.message}, statusCode: ${this.statusCode}, statusMessage: ${this.statusMessage}, detailErrorMessage: ${this.detailErrorMessage}`
  }
}

export class IllegalArgumentException extends Error {
  constructor(
    message: string,
  ) {
    super(message);
  }
}

export class InvalidTokenIdException extends IllegalArgumentException {
  constructor(readonly invalidTokenId: string) {
    super(`Invalid token id, given token id is ${invalidTokenId}`)
  }
}


export class InvalidTokenTypeException extends IllegalArgumentException {
  constructor(readonly invalidTokenType: string) {
    super(`Invalid token type, given token type is ${invalidTokenType}`)
  }
}

export class InvalidTxResultException extends IllegalArgumentException {
  constructor(
    message: string
  ) {
    super(message);
  }
}


class TxResultAdaptFailedException extends Error {
  constructor(
    message: string,
    readonly cause?: Error
  ) {
    super(message);
  }
}
class InvalidTxResultJsonFormatException extends Error {
  constructor(
    input: string,
    readonly cause?: Error
  ) {
    super(`Invalid tx-result json format, input: ${input}, cause: ${cause}`);
  }
}
