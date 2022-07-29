import { DefaultValueFactory, getEnv } from "../getEnv";

export const getEnvNumber = (
  variableName: string,
  defaultValueFactory?: DefaultValueFactory<number>
) => getEnv(variableName, Number, defaultValueFactory);
