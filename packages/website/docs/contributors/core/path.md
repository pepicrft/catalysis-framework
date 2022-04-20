# path

`path` is a module that provides utilities for working with file-system paths.
We abstract away the dependency with the runtime (e.g. Node) to ensure compatibility across OSs and Javascript runtimes:

```ts
import { path } from "@gestaltjs/core"
```

### `relativize`

This function makes an absolute filesystem path relative to the current working directory. This is useful when logging paths to allow users to click on the file and let the OS open it in the editor of choice.

```ts
import { path } from "@gestaltjs/core"

// Working directory: /project/path
const relativePath = path.relativize("/project/path/src/index.js")
// Result: src/index.js
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | The path to relativize | `string` | Yes | |

#### Returns

The path relative to the current working directory.


### `fromURL`

This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string.

```ts
import { path } from "@gestaltjs/core"

const resolvedPath = path.fromURL("file://nas/foo.txt")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `url` | The file URL string or URL object to convert to a path. | `URL` | Yes | |

#### Returns

The fully-resolved platform-specific file path.
