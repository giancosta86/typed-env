import { EnvironmentVariable } from "./EnvironmentVariable";

export function getEnvString(
  variableName: string
): EnvironmentVariable<string> {
  return new EnvironmentVariable<string>(variableName, rawValue => rawValue);
}

export function getEnvNumber(
  variableName: string
): EnvironmentVariable<number> {
  return new EnvironmentVariable<number>(variableName, Number);
}
