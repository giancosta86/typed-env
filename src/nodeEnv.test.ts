import { env } from "node:process";
import { getNodeEnv, isInProduction, isInJest } from "./nodeEnv";

describe("Node Environment detector", () => {
  describe("when the NODE_ENV environment variable is missing", () => {
    beforeEach(() => {
      delete env["NODE_ENV"];
    });

    describe("when not passing a default value factory", () => {
      it("should throw for the value itself", () => {
        expect(() => {
          getNodeEnv();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });

      it("should throw for the Production flag", () => {
        expect(() => {
          isInProduction();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });

      it("should throw for the Jest flag", () => {
        expect(() => {
          isInJest();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value for the value itself", () => {
        expect(getNodeEnv(() => "Dodo")).toBe("Dodo");
      });

      it("should return the default value for the Production flag", () => {
        expect(isInProduction(() => true)).toBe(true);
      });

      it("should return the default value for the Jest flag", () => {
        expect(isInJest(() => true)).toBe(true);
      });
    });
  });

  describe("when the NODE_ENV environment variable is set to the Production value", () => {
    beforeEach(() => {
      env["NODE_ENV"] = "production";
    });

    describe("when not passing a default value factory", () => {
      it("should return the Production value for itself", () => {
        expect(getNodeEnv()).toBe("production");
      });

      it("should return true for the Production flag", () => {
        expect(isInProduction()).toBe(true);
      });

      it("should return false for the Jest flag", () => {
        expect(isInJest()).toBe(false);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value for the value itself", () => {
        expect(getNodeEnv(() => "Dodo")).toBe("production");
      });

      it("should ignore the default value for the Production flag", () => {
        expect(isInProduction(() => false)).toBe(true);
      });

      it("should ignore the default value for the Jest flag", () => {
        expect(isInJest(() => true)).toBe(false);
      });
    });
  });

  describe("when the NODE_ENV environment variable is set to the Jest value", () => {
    beforeEach(() => {
      env["NODE_ENV"] = "test";
    });

    describe("when not passing a default value factory", () => {
      it("should return the Jest value for itself", () => {
        expect(getNodeEnv()).toBe("test");
      });

      it("should return false for the Production flag", () => {
        expect(isInProduction()).toBe(false);
      });

      it("should return true for the Jest flag", () => {
        expect(isInJest()).toBe(true);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value for the value itself", () => {
        expect(getNodeEnv(() => "Dodo")).toBe("test");
      });

      it("should ignore the default value for the Production flag", () => {
        expect(isInProduction(() => true)).toBe(false);
      });

      it("should ignore the default value for the Jest flag", () => {
        expect(isInJest(() => false)).toBe(true);
      });
    });
  });
});
