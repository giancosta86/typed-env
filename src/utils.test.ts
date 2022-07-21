import { env } from "node:process";
import { getEnvString, getEnvNumber } from "./utils";

const TEST_KEY = "TEST_VAR";
const TEST_STRING_VALUE = "Yogi the Bear";
const TEST_NUMBER_VALUE = 90;

describe("String environment variable", () => {
  describe("when not set", () => {
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

  describe("when set", () => {
    beforeEach(() => {
      env[TEST_KEY] = TEST_STRING_VALUE;
    });

    describe("when not passing a default value factory", () => {
      it("should return the value itself", () => {
        expect(getEnvString(TEST_KEY).getValue()).toBe(TEST_STRING_VALUE);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        expect(getEnvString(TEST_KEY).getValue(() => "SOME OTHER VALUE")).toBe(
          TEST_STRING_VALUE
        );
      });
    });
  });
});

describe("Number environment variable", () => {
  describe("when not set", () => {
    beforeEach(() => {
      delete env[TEST_KEY];
    });

    describe("when not passing a default value factory", () => {
      it("should throw", () => {
        expect(() => {
          getEnvNumber(TEST_KEY).getValue();
        }).toThrow("Cannot find the 'TEST_VAR' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value", () => {
        expect(getEnvNumber(TEST_KEY).getValue(() => 95)).toBe(95);
      });
    });
  });

  describe("when set", () => {
    beforeEach(() => {
      env[TEST_KEY] = TEST_NUMBER_VALUE.toString();
    });

    describe("when not passing a default value factory", () => {
      it("should return the value itself", () => {
        expect(getEnvNumber(TEST_KEY).getValue()).toBe(TEST_NUMBER_VALUE);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        expect(getEnvNumber(TEST_KEY).getValue(() => 95)).toBe(
          TEST_NUMBER_VALUE
        );
      });
    });
  });
});
