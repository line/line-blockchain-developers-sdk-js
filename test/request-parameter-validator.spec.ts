import { expect } from "chai";
import { describe, it } from "mocha";
import { RequestParameterValidator } from "../lib/request-parameter-validator";

describe("request-parameter validator test - token name", () => {
  it("validate token name with valid name", () => {
    let validTokenName = "TestToken1";
    let isValid = RequestParameterValidator.isValidTokenName(validTokenName);
    expect(isValid).to.equal(true);
  });

  it("validate token name with invalid name - with not alpha numeric chars", () => {
    let validTokenName = "TestToken1_";
    let isValid = RequestParameterValidator.isValidTokenName(validTokenName);
    expect(isValid).to.equal(false);
  });

  it("validate token name with invalid name - too small characters", () => {
    let validTokenName = "Te";
    let isValid = RequestParameterValidator.isValidTokenName(validTokenName);
    expect(isValid).to.equal(false);
  });

  it("validate token name with invalid name - over length limit", () => {
    let validTokenName = "a12345678901234567890";
    let isValid = RequestParameterValidator.isValidTokenName(validTokenName);
    expect(isValid).to.equal(false);
  });

  it("validate token name with invalid name - empty", () => {
    let validTokenName = "";
    let isValid = RequestParameterValidator.isValidTokenName(validTokenName);
    expect(isValid).to.equal(false);
  });
});

describe("request-parameter validator test - token symbol", () => {
  it("validate token symbol with valid symbol", () => {
    let validTokenSymbol = "TEST";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(true);
  });

  it("validate token symbol with invalid symbol - with not alpha numeric chars", () => {
    let validTokenSymbol = "TEST_";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(false);
  });

  it("validate token symbol with invalid symbol - with not capital chars", () => {
    let validTokenSymbol = "TESTa";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(false);
  });

  it("validate token symbol with invalid symbol - too small characters", () => {
    let validTokenSymbol = "T";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(false);
  });

  it("validate token symbol with invalid symbol - over length limit", () => {
    let validTokenSymbol = "TEST12";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(false);
  });

  it("validate token symbol with invalid symbol - empty", () => {
    let validTokenSymbol = "";
    let isValid = RequestParameterValidator.isValidSymbol(validTokenSymbol);
    expect(isValid).to.equal(false);
  });
});

describe("request-parameter validator test - token initialSupply", () => {
  it("validate token initialSupply with valid initialSupply", () => {
    let validTokenInitialSupply = "10000";
    let isValid = RequestParameterValidator.isValidInitialSupply(validTokenInitialSupply);
    expect(isValid).to.equal(true);
  });

  it("validate token initialSupply with invalid initialSupply - with not alpha numeric chars", () => {
    let invalidTokenInitialSupply = "TEST_";
    let isValid = RequestParameterValidator.isValidInitialSupply(invalidTokenInitialSupply);
    expect(isValid).to.equal(false);
  });

  it("validate token initialSupply with invalid initialSupply - empty", () => {
    let invalidTokenInitialSupply = "";
    let isValid = RequestParameterValidator.isValidInitialSupply(invalidTokenInitialSupply);
    expect(isValid).to.equal(false);
  });
});

describe("request-parameter validator test - wallet address", () => {
  it("validate token wallet address with the valid", () => {
    let validWalletAddress = "tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk7";
    let isValid = RequestParameterValidator.isValidWalletAddress(validWalletAddress);
    expect(isValid).to.equal(true);
  });

  it("validate token wallet address with the invalid - short length", () => {
    let invalidTokenInitialSupply = "tlink145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk";
    let isValid = RequestParameterValidator.isValidInitialSupply(invalidTokenInitialSupply);
    expect(isValid).to.equal(false);
  });

  it("validate token wallet address with the invalid - invalid prefix", () => {
    let invalidTokenInitialSupply = "test145knu8tlpjmx9gsf0dxxfdcr68a4sapv5x6tk";
    let isValid = RequestParameterValidator.isValidInitialSupply(invalidTokenInitialSupply);
    expect(isValid).to.equal(false);
  });

  it("validate token wallet address with the invalid - empty", () => {
    let invalidTokenInitialSupply = "";
    let isValid = RequestParameterValidator.isValidInitialSupply(invalidTokenInitialSupply);
    expect(isValid).to.equal(false);
  });
});

describe("request-parameter validator test - baseUri", () => {
  it("validate token baseUri with the valid", () => {
    let validBaseUri = "https://test-image-server.com:3000/";
    let isValid = RequestParameterValidator.isValidBaseUri(validBaseUri);
    expect(isValid).to.equal(true);
  });

  it("validate token baseUri with the invalid - invalid protocol", () => {
    let validBaseUri = "http://test-image-server:3000.com/";
    let isValid = RequestParameterValidator.isValidBaseUri(validBaseUri);
    expect(isValid).to.equal(false);
  });

  it("validate token baseUri with the invalid - empty", () => {
    let validBaseUri = "";
    let isValid = RequestParameterValidator.isValidBaseUri(validBaseUri);
    expect(isValid).to.equal(true);
  });
});
