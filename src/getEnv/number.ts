import { EnvironmentVariable } from "../EnvironmentVariable";

export function getEnvNumber(
  variableName: string
): EnvironmentVariable<number> {
  return new EnvironmentVariable<number>(variableName, Number);
}
