import { env } from "node:process";

export type RawValueMapper<T> = (rawValue: string) => T;

export type DefaultValueFactory<T> = () => T;

export type DefaultValue<T> = T | DefaultValueFactory<T>;

export function getEnv<T>(
  variableName: string,
  rawValueMapper: RawValueMapper<T>,
  defaultValue?: DefaultValue<T>
): T {
  const rawValue = env[variableName];

  if (rawValue === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Cannot find the '${variableName}' environment variable`);
    }

    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  }

  return rawValueMapper(rawValue);
}
