# Plugins

Gestalt comes with **strong opinions and defaults** that help software crafters keep the focus around materializing their ideas.
However, we understand that this might be limiting for developers and organizations with pre-established opinions, mental models, and ideas.
Therefore,
we hold our opinions weakly and allow developers to bring theirs through **plugins**.

Plugins are NPM packages that replace, extend, or augment Gestalt functionality.
They can also add new functionality and integrate it with the rest of the framework.

### Implementing a new plugin

Plugins are distributed as NPM packages that follow the naming convention `gestalt-plugin-{name}` or `@{org}/gestalt-plugin-{name}`.
For example, `@gestaltjs/gestalt-plugin-react` adds support for using React to declare UI.

The NPM package has to be pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), and the main module has to export a default object representing the plugin.
The example below shows how to use `type` and `exports` attributes in the `package.json` to indicate to Node that the package is ESM and what are its exported modules:

```json
// package.json
{
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "types": "./dist/index.d.ts"
        },
    },
    "devDependency": {
        "@gestaltjs/plugins": "..."
    }
}
```

Gestalt expects a default export with the object representing the plugin:

```ts
// @gestaltjs/gestalt-plugin-react
// src/index.ts
import { definePlugin } from "@gestaltjs/plugins"

export default definePlugin({
  renderer: { /** ... **/ }
})
```

### Plugin types


