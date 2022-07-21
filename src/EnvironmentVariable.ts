import { env } from "node:process";

export type RawValueMapper<T> = (rawValue: string) => T;
export type DefaultValueFactory<T> = () => T;

export class EnvironmentVariable<T> {
  constructor(
    private readonly name: string,
    private readonly mapper: RawValueMapper<T>
  ) {}

  getValue(defaultValueFactory?: DefaultValueFactory<T>): T {
    const rawValue = env[this.name];

    if (rawValue === undefined) {
      if (defaultValueFactory === undefined) {
        throw new Error(`Cannot find the '${this.name}' environment variable`);
      }

      return defaultValueFactory();
    }

    return this.mapper(rawValue);
  }
}
