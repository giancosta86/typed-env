import { env } from "node:process";
import { getEnvNumber } from "./number";

const TEST_KEY = "TEST_VAR";
const TEST_VALUE = 90;

describe("getEnvNumber()", () => {
  describe("when the environment variable is missing", () => {
    beforeEach(() => {
      delete env[TEST_KEY];
    });

    describe("when not passing a default value factory", () => {
      it("should throw", () => {
        expect(() => {
          getEnvNumber(TEST_KEY);
        }).toThrow("Cannot find the 'TEST_VAR' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value", () => {
        expect(getEnvNumber(TEST_KEY, () => 95)).toBe(95);
      });
    });
  });

  describe("when the environment variable exists", () => {
    beforeEach(() => {
      env[TEST_KEY] = TEST_VALUE.toString();
    });

    describe("when not passing a default value factory", () => {
      it("should return the value itself", () => {
        expect(getEnvNumber(TEST_KEY)).toBe(TEST_VALUE);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        expect(getEnvNumber(TEST_KEY, () => 95)).toBe(TEST_VALUE);
      });
    });
  });
});
