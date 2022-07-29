import { DefaultValue, getEnv } from "./getEnv";
import { getEnvString } from "./standard/string";

const VARIABLE_NAME = "NODE_ENV";

const PRODUCTION_VALUE = "production";
const JEST_VALUE = "test";

export const getNodeEnv = (defaultValue?: DefaultValue<string>) =>
  getEnvString(VARIABLE_NAME, defaultValue);

export const isInProduction = (defaultValue?: DefaultValue<boolean>) =>
  getEnv(
    VARIABLE_NAME,
    rawValue => rawValue === PRODUCTION_VALUE,
    defaultValue
  );

export const isInJest = (defaultValue?: DefaultValue<boolean>) =>
  getEnv(VARIABLE_NAME, rawValue => rawValue === JEST_VALUE, defaultValue);
