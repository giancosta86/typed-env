import { EnvironmentVariable } from "../EnvironmentVariable";

export function getEnvString(
  variableName: string
): EnvironmentVariable<string> {
  return new EnvironmentVariable<string>(variableName, rawValue => rawValue);
}
