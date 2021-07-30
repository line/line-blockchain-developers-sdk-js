/**
reference site: https://jokecamp.wordpress.com/2012/10/21/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/#js
*/
export declare class SignatureGenerator {
    static signature(apiSecret: string, method: string, path: string, timestamp: number, nonce: string, parameters?: object, // query string
    body?: object): string;
    private static createSignTarget;
}
