import { DefaultValue, getEnv } from "../getEnv";

export const getEnvNumber = (
  variableName: string,
  defaultValue?: DefaultValue<number>
) => getEnv(variableName, Number, defaultValue);
