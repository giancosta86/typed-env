import { env } from "node:process";
import { getEnvString, getEnvNumber, getEnvBoolean } from "./utils";

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
