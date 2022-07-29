import { env } from "node:process";
import { getEnvBoolean } from "./boolean";

const TEST_KEY = "TEST_VAR";

describe("getEnvBoolean()", () => {
  describe("when the environment variable is missing", () => {
    beforeEach(() => {
      delete env[TEST_KEY];
    });

    describe("when not passing a default value factory", () => {
      it("should throw", () => {
        expect(() => {
          getEnvBoolean(TEST_KEY);
        }).toThrow("Cannot find the 'TEST_VAR' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value", () => {
        expect(getEnvBoolean(TEST_KEY, () => true)).toBe(true);
      });
    });
  });

  describe("when the environment variable exists", () => {
    describe("when not passing a default value factory", () => {
      describe("when the value is a non-boolean string", () => {
        it("should throw", () => {
          env[TEST_KEY] = "Yogi the Bear";

          expect(() => {
            getEnvBoolean(TEST_KEY);
          }).toThrow(
            "The environment variable 'TEST_VAR' holds a non-boolean value - 'Yogi the Bear'"
          );
        });
      });

      describe("when trying to interpret the value as true", () => {
        it.each([["true"], ["t"], ["1"], [""]])(
          "should recognize '%s'",
          rawValue => {
            env[TEST_KEY] = rawValue;
            expect(getEnvBoolean(TEST_KEY)).toBe(true);
          }
        );

        it("should be case-insensitive", () => {
          env[TEST_KEY] = "TrUe";
          expect(getEnvBoolean(TEST_KEY)).toBe(true);
        });

        it("should ignore leading and trailing spaces", () => {
          env[TEST_KEY] = "  true ";
          expect(getEnvBoolean(TEST_KEY)).toBe(true);
        });
      });

      describe("when trying to interpret the value as false", () => {
        it.each([["false"], ["f"], ["0"]])(
          "should recognize '%s'",
          rawValue => {
            env[TEST_KEY] = rawValue;
            expect(getEnvBoolean(TEST_KEY)).toBe(false);
          }
        );

        it("should be case-insensitive", () => {
          env[TEST_KEY] = "fAlSe";
          expect(getEnvBoolean(TEST_KEY)).toBe(false);
        });

        it("should ignore leading and trailing spaces", () => {
          env[TEST_KEY] = "  false ";
          expect(getEnvBoolean(TEST_KEY)).toBe(false);
        });
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        env[TEST_KEY] = "true";
        expect(getEnvBoolean(TEST_KEY, () => false)).toBe(true);
      });
    });
  });
});
