# typed-env

_Tiny, elegant library for type-safe environment variables_

**typed-env** is a minimalist **TypeScript** library for **Node.js**, focused on _type-checked environment variables_ - which can therefore have a _type_ and a _default value_, with lightweight notation.

Additionally, the library provides a simplified, type-checked way to explore the nuances of the **NODE_ENV** environment variable.

Only _read access_ is supported, mainly because in-process modification of environment variables tends to be a discouraged pattern - that can always be achieved by altering `process.env`; however, the _delayed_ approach adopted by **typed-env** makes the library compatible with that scenario as well.

## Installation

```bash
npm install @giancosta86/typed-env
```

or

```bash
yarn add @giancosta86/typed-env
```

## Usage

All the recommended features are exported by the index file - and can be imported as usual:

```typescript
import {...} from @giancosta86/typed-env
```

### EnvironmentVariable\<T\>

The `EnvironmentVariable<T>` class is the very heart of the library - although you will most often instantiate it via the utility functions described below.

It works as follows:

- the constructor takes 2 parameters:

  - the **name** of the environment variable, as it is appears in `process.env`

  - the **mapper** - a `(string) => T` function, mapping the `string` value of the environment variable (if present) into the expected `T` type

- it only provides a `getValue()` method, that:

  - takes an optional **default value factory** - a `() => T` function returning a default value; it is called if the environment variable is missing

  - can result in one of 3 outcomes:

    - if the environment variable is defined in `process.env`, it returns the result of the **mapper** function applied to the related `string` value

    - if the environment variable is missing from `process.env`:

      - if the **default value factory** argument is present, it is called - and its return value is also returned by `getValue()`

      - otherwise, throws a descriptive `Error`

Here is an example usage:

```typescript
const serverPort = new EnvironmentVariable<number>(
  "SERVER_PORT",
  Number //Minimalist notation for (rawValue) => Number(rawValue)
).getValue(() => 8080); //If you call getValue() without arguments when the environment variable is missing from process.env, an Error will be thrown
```

Of course, you can also create custom subclasses.

### getEnvNumber(variableName)

Simplifies the creation of `number`-based environment variables; in particular, the above example becomes:

```typescript
const serverPort = getEnvNumber("SERVER_PORT").getValue(() => 8080);
```

### getEnvString(variableName)

Simplifies the creation of `string`-based environment variables. For example:

```typescript
const apiUrl = getEnvString("API_URL").getValue(() => "http://localhost");
```

### nodeEnv

The `nodeEnv` instance revolves around the **NODE_ENV** environment variable, by providing:

- the `getValue()` method - as discussed above - returning its `string` value, a default value or throwing an `Error`

- the `inProduction` field - an `EnvironmentVariable<boolean>` instance whose mapper returns `true` _if and only if_ **NODE_ENV** is set to **production**

- the `inJest` field - an `EnvironmentVariable<boolean>` instance whose mapper returns `true` _if and only if_ **NODE_ENV** is set to **test**

For example, to ascertain whether your app is in Production mode - defaulting to `true`:

```typescript
const inProduction = nodeJs.inProduction.getValue(() => true);
```

Similarly, to just log the current NODE_ENV - and defaulting to an empty string:

```typescript
console.log(
  "NODE_ENV is:",
  nodeJs.getValue(() => "")
);
```
