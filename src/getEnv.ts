import { env } from "node:process";

export type RawValueMapper<T> = (rawValue: string) => T;

export type DefaultValueFactory<T> = () => T;

export function getEnv<T>(
  variableName: string,
  rawValueMapper: RawValueMapper<T>,
  defaultValueFactory?: DefaultValueFactory<T>
): T {
  const rawValue = env[variableName];

  if (rawValue === undefined) {
    if (defaultValueFactory === undefined) {
      throw new Error(`Cannot find the '${variableName}' environment variable`);
    }

    return defaultValueFactory();
  }

  return rawValueMapper(rawValue);
}
