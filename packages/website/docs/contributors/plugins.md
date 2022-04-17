# Plugins

Gestalt comes with **strong opinions and defaults** that help software crafters keep the focus around materializing their ideas.
However, we understand that this might be limiting for developers and organizations with pre-established opinions, mental models, and ideas.
Therefore,
we hold our opinions weakly and allow developers to bring theirs through **plugins**.

**Plugins are NPM packages that replace, extend, or augment Gestalt functionality.**
They can also add new functionality and integrate it with the rest of the framework.

### Implementing a new plugin

Plugins are distributed as NPM packages that follow the naming convention `gestalt-plugin-{name}` or `@{org}/gestalt-plugin-{name}`.
For example, `@gestaltjs/gestalt-plugin-react` adds support for using React to declare UI.

The NPM package has to be pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules),
and have `@gestaltjs/plugins` as a dependency:

```json
// package.json
{
    "type": "module",
    "dependency": {
      "@gestaltjs/plugins": "..."
    }
}
```

Gestalt expects a `gestalt.config.{ts,js}` file at the root with the declaration of the plugin.

```ts
// gestalt.config.js
import { definePlugin } from "@gestaltjs/plugins"

export default definePlugin({
  /** plugin definition **/
})
```
