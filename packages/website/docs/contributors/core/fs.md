# fs

`fs` is a module that provides utilities for filesystem [I/O operations](https://en.wikipedia.org/wiki/Input/output).
We abstract away the dependency with the runtime's (e.g. Node) to ensure compatibility across OSs and versions of Node, and support additional runtimes in the future.

```ts
import {fs} from "@gestaltjs/core"
```

### `readFile`

Reads a file as a file and returns its content as a string:

```ts
import { fs } from "@gestaltjs/core"

const content = await fs.readFile("path/to/.env")
```

#### Arguments

| Name | Description | Required | Default |
| --- | ------ | ---- | ---- |
| `path` | The path to the file | Yes | |

#### Returns

A promise that resolves with the content of the file as a string or rejects with an error if the file doesn't exist or fails to read.
