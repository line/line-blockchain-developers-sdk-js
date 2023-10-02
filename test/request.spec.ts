import { expect } from "chai";
import { describe, it } from "mocha";
import { IssueServiceTokenRequest } from "../lib/request";

describe("request objects tests", () => {
  it("given all valid values, create IssueServiceTokenRequest", () => {
    expect(
      () =>
        new IssueServiceTokenRequest(
          "tlink14vvjtkr39ssmy9qrhv7egrxw8kg5ylpj6l07r8",
          "test-secret",
          "test",
          "TEST",
          "1000",
          "tlink14vvjtkr39ssmy9qrhv7egrxw8kg5ylpj6l07r8",
        ),
    ).to.not.throw(Error);
  });
  it("given invalid so wallet address, fail to create IssueServiceTokenRequest", () => {
    expect(
      () =>
        new IssueServiceTokenRequest(
          "invalid-address",
          "test-secret",
          "test",
          "TEST",
          "1000",
          "tlink14vvjtkr39ssmy9qrhv7egrxw8kg5ylpj6l07r8",
        ),
    ).to.throw(Error);
  });

  it("given invalid receiver wallet address, fail to create IssueServiceTokenRequest", () => {
    expect(
      () =>
        new IssueServiceTokenRequest(
          "tlink14vvjtkr39ssmy9qrhv7egrxw8kg5ylpj6l07r8",
          "test-secret",
          "test",
          "TEST",
          "1000",
          "invalid-address",
        ),
    ).to.throw(Error);
  });
});
