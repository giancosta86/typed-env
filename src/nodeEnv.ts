import { DefaultValueFactory, getEnv } from "./getEnv";
import { getEnvString } from "./standard/string";

const VARIABLE_NAME = "NODE_ENV";

const PRODUCTION_VALUE = "production";
const JEST_VALUE = "test";

export const getNodeEnv = (defaultValueFactory?: DefaultValueFactory<string>) =>
  getEnvString(VARIABLE_NAME, defaultValueFactory);

export const isInProduction = (
  defaultValueFactory?: DefaultValueFactory<boolean>
) =>
  getEnv(
    VARIABLE_NAME,
    rawValue => rawValue === PRODUCTION_VALUE,
    defaultValueFactory
  );

export const isInJest = (defaultValueFactory?: DefaultValueFactory<boolean>) =>
  getEnv(
    VARIABLE_NAME,
    rawValue => rawValue === JEST_VALUE,
    defaultValueFactory
  );
