import { DefaultValueFactory, getEnv, RawValueMapper } from "../getEnv";

const TRUE_RAW_VALUES = new Set<string>(["true", "t", "1", ""]);
const FALSE_RAW_VALUES = new Set<string>(["false", "f", "0"]);

function convertRawValueToBoolean(rawValue: string): boolean | null {
  const polishedRawValue = rawValue.trim().toLowerCase();

  if (TRUE_RAW_VALUES.has(polishedRawValue)) {
    return true;
  }

  if (FALSE_RAW_VALUES.has(polishedRawValue)) {
    return false;
  }

  return null;
}

function createBooleanMapper(variableName: string): RawValueMapper<boolean> {
  return (rawValue: string) => {
    const convertedValue = convertRawValueToBoolean(rawValue);
    if (convertedValue === null) {
      throw new Error(
        `The environment variable '${variableName}' holds a non-boolean value - '${rawValue}'`
      );
    }

    return convertedValue;
  };
}

export const getEnvBoolean = (
  variableName: string,
  defaultValueFactory?: DefaultValueFactory<boolean>
) =>
  getEnv<boolean>(
    variableName,
    createBooleanMapper(variableName),
    defaultValueFactory
  );
