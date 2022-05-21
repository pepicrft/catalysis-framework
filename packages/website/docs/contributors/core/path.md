# path

`path` is a module that provides utilities for working with file-system paths.
We abstract away the dependency with the runtime (e.g. Node) to ensure compatibility across OSs and Javascript runtimes:

```ts
import * as path from "@gestaltjs/core/node/path"
```

### `joinPath`

Joins all given path components together using the platform-specific separator as a delimiter, then normalizes the resulting path.
Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned, representing the current working directory.

```ts
import { joinPath } from "@gestaltjs/core/node/path"

const path = joinPath("/path/to/project", "src/index.js")
// Result: /path/to/project/src/index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `components` | Path components | `string[]` | Yes | |

#### Returns

A `string` with the joint path.

### `moduleDirname`

This utility function replaces the CJS `__dirname` variable exposed by Node. This method is expected to be invoked passing the `import.meta.url` variable that represents the caller's module.

```ts
// Module: /path/to/project/src/index.js
import { moduleDirname } from "@gestaltjs/core/node/path"

const path = moduleDirname(import.meta.url)
// Result: /path/to/project/src/
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `url` | The value of `import.meta.url` in the caller module | `string` | Yes | |

#### Returns

The caller module's directory.


### `parentDirectory`

It returns the parent directory of a path.

```ts
import { parentDirectory } from "@gestaltjs/core/node/path"

const parent = parentDirectory("/path/to/project/src/index.js")
// Result: /path/to/project/src/
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | Path | `string` | Yes | |

#### Returns

A `string` with the path's parent directory.


### `parsePath`

Parses a string that represents a path and returns a [`path.ParsedPath`](https://nodejs.org/api/path.html#pathparsepath) instance that exposes attributes to access information about the path.

```ts
import { parsePath } from "@gestaltjs/core/node/path"

const parsedPath = parsePath("/path/to/project/src/index.js")
console.log(parsedPath.dir) // /path/to/project/src
console.log(parsedPath.base) // index.js
console.log(parsedPath.ext) // .js
console.log(parsedPath.name) // index
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | Path to parse | `string` | Yes | |

#### Returns

An instance of [`path.ParsedPath`](https://nodejs.org/api/path.html#pathparsepath).

### `pathBasename`

It returns the last component of a path.

```ts
import { pathBasename } from "@gestaltjs/core/node/path"

const basename = pathBasename("/path/to/project/src/index.js")
// Result: index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | Path | `string` | Yes | |

#### Returns

A `string` with the path's last component.

### `relativePath`

Solve the relative path from {from} to {to}. At times we have two absolute paths, and we need to derive the relative path from one to the other.

```ts
import { relativePath } from "@gestaltjs/core/node/path"

const relativePath = relativePath("/path/to/project", "/path/to/project/src/index.js")
// Result: src/index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `from` | Path used as a reference. | `string` | Yes | |
| `to` | Path to relativize. | `string` | Yes | |

#### Returns

The `to` path made relative to `from`.

### `relativizePath`

This function makes an absolute filesystem path relative to the current working directory. This is useful when logging paths to allow users to click on the file and let the OS open it in the editor of choice.

```ts
import { relativizePath } from "@gestaltjs/core/node/path"

// Working directory: /project/path
const relativePath = relativizePath("/project/path/src/index.js")
// Result: src/index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | The path to relativize | `string` | Yes | |

#### Returns

The path relative to the current working directory.


### `resolvePath`

It resolves a sequence of paths or path segments into an absolute path.

```ts
import { resolvePath } from "@gestaltjs/core/node/path"

// Working directory: /project/path
const resolvedPath = resolvePath("src", "index.js")
// Result: /project/path/src/index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `pathComponents` | the path components. | `string[]` | Yes | |

#### Returns

A `string` with the ressolved absolute path.

### `pathFromURL`

This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string.

```ts
import { pathFromURL } from "@gestaltjs/core/node/path"

const resolvedPath = pathFromURL("file://nas/foo.txt")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `url` | The file URL string or URL object to convert to a path. | `URL` | Yes | |

#### Returns

The fully-resolved platform-specific file path.
