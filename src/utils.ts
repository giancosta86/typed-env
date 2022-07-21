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

const TRUE_RAW_VALUES = new Set<string>(["true", "t", "1", ""]);
const FALSE_RAW_VALUES = new Set<string>(["false", "f", "0"]);

export function getEnvBoolean(
  variableName: string
): EnvironmentVariable<boolean> {
  return new EnvironmentVariable<boolean>(variableName, rawValue => {
    const polishedRawValue = rawValue.trim().toLowerCase();

    if (TRUE_RAW_VALUES.has(polishedRawValue)) {
      return true;
    }

    if (FALSE_RAW_VALUES.has(polishedRawValue)) {
      return false;
    }

    throw new Error(
      `The environment variable '${variableName}' holds a non-boolean value - '${rawValue}'`
    );
  });
}
