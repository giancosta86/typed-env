import { DefaultValue, getEnv } from "../getEnv";

export const getEnvString = (
  variableName: string,
  defaultValue?: DefaultValue<string>
) => getEnv(variableName, rawValue => rawValue, defaultValue);
