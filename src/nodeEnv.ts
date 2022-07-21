import { EnvironmentVariable } from "./EnvironmentVariable";

const NAME = "NODE_ENV";

const PRODUCTION_VALUE = "production";
const JEST_VALUE = "test";

class NodeEnv extends EnvironmentVariable<string> {
  constructor() {
    super(NAME, rawValue => rawValue);
  }

  readonly inProduction = new EnvironmentVariable<boolean>(
    NAME,
    rawValue => rawValue === PRODUCTION_VALUE
  );

  readonly inJest = new EnvironmentVariable<boolean>(
    NAME,
    rawValue => rawValue === JEST_VALUE
  );
}

export const nodeEnv = new NodeEnv();
