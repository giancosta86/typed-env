import { env } from "node:process";
import { getEnvBoolean } from "./boolean";

const TEST_KEY = "TEST_VAR";

describe("Boolean environment variable", () => {
  describe("when not set", () => {
    beforeEach(() => {
      delete env[TEST_KEY];
    });

    describe("when not passing a default value factory", () => {
      it("should throw", () => {
        expect(() => {
          getEnvBoolean(TEST_KEY).getValue();
        }).toThrow("Cannot find the 'TEST_VAR' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value", () => {
        expect(getEnvBoolean(TEST_KEY).getValue(() => true)).toBe(true);
      });
    });
  });

  describe("when set", () => {
    describe("when not passing a default value factory", () => {
      describe("when the value is a non-boolean string", () => {
        it("should throw", () => {
          env[TEST_KEY] = "Yogi the Bear";

          expect(() => {
            getEnvBoolean(TEST_KEY).getValue();
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
            expect(getEnvBoolean(TEST_KEY).getValue()).toBe(true);
          }
        );

        it("should be case-insensitive", () => {
          env[TEST_KEY] = "TrUe";
          expect(getEnvBoolean(TEST_KEY).getValue()).toBe(true);
        });

        it("should ignore leading and trailing spaces", () => {
          env[TEST_KEY] = "  true ";
          expect(getEnvBoolean(TEST_KEY).getValue()).toBe(true);
        });
      });

      describe("when trying to interpret the value as false", () => {
        it.each([["false"], ["f"], ["0"]])(
          "should recognize '%s'",
          rawValue => {
            env[TEST_KEY] = rawValue;
            expect(getEnvBoolean(TEST_KEY).getValue()).toBe(false);
          }
        );

        it("should be case-insensitive", () => {
          env[TEST_KEY] = "fAlSe";
          expect(getEnvBoolean(TEST_KEY).getValue()).toBe(false);
        });

        it("should ignore leading and trailing spaces", () => {
          env[TEST_KEY] = "  false ";
          expect(getEnvBoolean(TEST_KEY).getValue()).toBe(false);
        });
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value", () => {
        env[TEST_KEY] = "true";
        expect(getEnvBoolean(TEST_KEY).getValue(() => false)).toBe(true);
      });
    });
  });
});
