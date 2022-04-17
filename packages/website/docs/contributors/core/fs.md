# fs

`fs` is a module that provides utilities for filesystem [I/O operations](https://en.wikipedia.org/wiki/Input/output).
We abstract away the dependency with the runtime (e.g. Node) to ensure compatibility across OSs and Javascript runtimes:

```ts
import {fs} from "@gestaltjs/core"
```

### `readFile`

Reads a file as a file and decodes its content using [utf-8](https://en.wikipedia.org/wiki/UTF-8):

```ts
import { fs } from "@gestaltjs/core"

const content = await fs.readFile("path/to/.env")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | The path to the file | `string` | Yes | |

#### Returns

A promise that resolves with the content of the file as a string or rejects with an error if the file doesn't exist or fails to read.


### `writeFile`

Writes a string to a file. If the file already exists, it overwrites its content.

```ts
import { fs } from "@gestaltjs/core"

await fs.writeFile("path/to/.env", "GESTALT_ENV=debug")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | The path to the file | `string` | Yes | |
| `content` | The content to write | `string` | Yes | |

#### Returns

A promise that resolves without any value when the write completes successfully.
It rejects with an error otherwise.

### `pathExists`

Returns whether a directory or file exists in the filesystem.

```ts
import { fs } from "@gestaltjs/core"

const exists = await fs.pathExists("path/to/.env")
```

#### Arguments

| Name | Description | Type | Required | Default |
| --- | ------ | ---- | --- | ---- |
| `path` | The path to the file or directory | `string` | Yes | |

#### Returns

A promise that resolves with true if the file or directory exists.
It rejects with an error otherwise.
