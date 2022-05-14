# npm

The `npm` module provides utilities for interacting with Node projects and managing their NPM dependencies.

```ts
import { npm } from "@gestaltjs/core/cli"
```

## Types and interfaces

### `DependencyManager`

A union type that represents the most common dependency managers in the Javascript ecosystem: `npm`, `yarn`, and `pnpm`.

### `DependencyType`

A union type that represents the type of dependencies Node projects can have: `prod`, `dev`, and `peer`.

## Functions

### `addDependencies`

Adds new dependencies to a project:

```ts
import { npm } from "@gestaltjs/core/cli"

await npm.addDependencies({
 directory: "/project",
 dependencies: ["gestaltjs"],
 dependencyManager: "npm" // npm | yarn | pnpm
 type: "dev", // dev | prod | peer
})
```

#### Options

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `directory` | The directory containing the `package.json` | `string` | Yes | |
| `dependencies` | A list of dependencies to install | `string[]` | Yes | |
| `dependencyManager` | The dependency manager to use | [`DependencyManager`](#dependencymanager) | Yes | |
| `type` | How dependencies should be added | [`DependencyType`](#dependencytype) | Yes | |
| `stdout` | A write stream to forward the standard output coming from the underlying installation process | `node:fs.WriteStream` | No | |
| `stderr` | A write stream to forward the standard error coming from the underlying installation process | `node:fs.WriteStream` | No | |


### `inferDependencyManager`

Infers the dependency manager used in a project. To do so,
it traverses the directory hierarchy up looking for lockfiles.
When it finds one, it returns the dependency manager that generated it.
When no lockfile is found, it returns `npm`:

```ts
import { npm } from "@gestaltjs/core/cli"

await npm.inferDependencyManager("/some/directory")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `fromDirectory` | The directory from where to infer the dependency manager. | `string` | Yes | |

#### Returns

The detected [DependencyManager](#dependencymanager).
