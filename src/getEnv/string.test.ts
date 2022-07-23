import { env } from "node:process";
import { getEnvString } from "./string";

const TEST_KEY = "TEST_VAR";
const TEST_VALUE = "Yogi the Bear";

describe("getEnvString()", () => {
  describe("when the environment variable is missing", () => {
    beforeEach(() => {
      delete env[TEST_KEY];
    });

    describe("when not passing a default value factory", () => {
      it("should throw", () => {
        expect(() => {
          getEnvString(TEST_KEY).getValue();
        }).toThrow("Cannot find the 'TEST_VAR' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value", () => {
        expect(getEnvString(TEST_KEY).getValue(() => "Dodo")).toBe("Dodo");
      });
    });
  });

  describe("when the environment variables exists", () => {
    beforeEach(() => {
      env[TEST_KEY] = TEST_VALUE;
    });

    describe("when not passing a default value factory", () => {
      it("should return the value itself", () => {
        expect(getEnvString(TEST_KEY).getValue()).toBe(TEST_VALUE);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        expect(getEnvString(TEST_KEY).getValue(() => "SOME OTHER VALUE")).toBe(
          TEST_VALUE
        );
      });
    });
  });
});
