import { env } from "node:process";
import { nodeEnv } from "./nodeEnv";

describe("Node Environment detector", () => {
  describe("when the NODE_ENV environment variable is not set", () => {
    beforeEach(() => {
      delete env["NODE_ENV"];
    });

    describe("when not passing a default value factory", () => {
      it("should throw for the value itself", () => {
        expect(() => {
          nodeEnv.getValue();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });

      it("should throw for the Production flag", () => {
        expect(() => {
          nodeEnv.inProduction.getValue();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });

      it("should throw for the Jest flag", () => {
        expect(() => {
          nodeEnv.inJest.getValue();
        }).toThrow("Cannot find the 'NODE_ENV' environment variable");
      });
    });

    describe("when passing a default value factory", () => {
      it("should return the default value for the value itself", () => {
        expect(nodeEnv.getValue(() => "Dodo")).toBe("Dodo");
      });

      it("should return the default value for the Production flag", () => {
        expect(nodeEnv.inProduction.getValue(() => true)).toBe(true);
      });

      it("should return the default value for the Jest flag", () => {
        expect(nodeEnv.inJest.getValue(() => true)).toBe(true);
      });
    });
  });

  describe("when the NODE_ENV environment variable is set to the Production value", () => {
    beforeEach(() => {
      env["NODE_ENV"] = "production";
    });

    describe("when not passing a default value factory", () => {
      it("should return the Production value for itself", () => {
        expect(nodeEnv.getValue()).toBe("production");
      });

      it("should return true for the Production flag", () => {
        expect(nodeEnv.inProduction.getValue()).toBe(true);
      });

      it("should return false for the Jest flag", () => {
        expect(nodeEnv.inJest.getValue()).toBe(false);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value for the value itself", () => {
        expect(nodeEnv.getValue(() => "Dodo")).toBe("production");
      });

      it("should ignore the default value for the Production flag", () => {
        expect(nodeEnv.inProduction.getValue(() => false)).toBe(true);
      });

      it("should ignore the default value for the Jest flag", () => {
        expect(nodeEnv.inJest.getValue(() => true)).toBe(false);
      });
    });
  });

  describe("when the NODE_ENV environment variable is set to the Jest value", () => {
    beforeEach(() => {
      env["NODE_ENV"] = "test";
    });

    describe("when not passing a default value factory", () => {
      it("should return the Jest value for itself", () => {
        expect(nodeEnv.getValue()).toBe("test");
      });

      it("should return false for the Production flag", () => {
        expect(nodeEnv.inProduction.getValue()).toBe(false);
      });

      it("should return true for the Jest flag", () => {
        expect(nodeEnv.inJest.getValue()).toBe(true);
      });
    });

    describe("when passing a default value factory", () => {
      it("should ignore the default value for the value itself", () => {
        expect(nodeEnv.getValue(() => "Dodo")).toBe("test");
      });

      it("should ignore the default value for the Production flag", () => {
        expect(nodeEnv.inProduction.getValue(() => true)).toBe(false);
      });

      it("should ignore the default value for the Jest flag", () => {
        expect(nodeEnv.inJest.getValue(() => false)).toBe(true);
      });
    });
  });
});
