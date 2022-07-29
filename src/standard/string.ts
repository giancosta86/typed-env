import { DefaultValueFactory, getEnv } from "../getEnv";

export const getEnvString = (
  variableName: string,
  defaultValueFactory?: DefaultValueFactory<string>
) => getEnv(variableName, rawValue => rawValue, defaultValueFactory);
