# Renderers

Although Gestalt defaults to [Vue](https://vuejs.org/) for its declarative [UI](https://en.wikipedia.org/wiki/User_interface) layer,
it supports other UI technologies (e.g., [React](https://reactjs.org/)) through renderers.
A renderer instructs Gestalt on how to transpile templates (e.g. JSX files) by providing [Vite plugins](https://vitejs.dev/plugins/).
Moreover, it offers routing components and the logic for rendering UI client and server-side.

### Implementing a new renderer

Renderers are distributed as NPM packages that follow the naming convention `{ui}-gestalt-renderer` or `@{org}/{ui}-gestalt-renderer`.
For example, `@gestaltjs/react-gestalt-renderer` in the case of React.
If a project has a renderer as a dependency, Gestalt will use it by default.

The NPM package has to be pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), and the main module has to export a default object representing the renderer.
The example below shows how to use `type` and `exports` attributes in the `package.json` to indicate tos Node that the package is ESM and what are its exported modules:

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
        "@gestaltjs/renderer": "..."
    }
}
```

Gestalt expects a default export with the object representing the renderer:

```ts
// @gestaltjs/react-gestalt-renderer
// src/index.ts
import { defineRenderer } from "@gestaltjs/renderer"
import clientRender from "./client"
import serverRender from "./server"
import react from '@vitejs/plugin-react'

export default defineRenderer({
  dependencies: {
    "react": "~> 17.0.0"
  },
  vite: {
    plugins: [
      react()
    ]
  },
  render: {
    client: clientRender
    server: serverRender
  },
  components: {}
})
```
