import { definePlugin, error } from '@gestaltjs/plugins'
import react from '@vitejs/plugin-react'
import { clientRenderer } from './renderer/client'
import { serverRenderer } from './renderer/server'
import { findUp } from 'find-up'

type ReactPluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin((options: ReactPluginOptions = {}) => {
  return {
    name: 'react',
    description:
      "Adds support for declaring UI using React's declarative model",
    renderer: {
      fileExtensions: ['jsx', 'tsx'],
      vitePlugins: [react()],
      client: clientRenderer,
      server: serverRenderer,
      aliases: async () => {
        const reactDomModule = await findUp('node_modules/react-dom/index.js', {
          cwd: 'x',
          type: 'file',
        })
        if (!reactDomModule) {
          throw new error.Bug(
            `The plugin @gestaltjs/gestalt-plugin-react couldn't locate the module react-dome necessary for rendering.`,
            {
              cause: `The package react-dom might be missing under @gestaltjs/gestalt-plugin-react/node_modules, the dependency might have got removed by mistake, or the exported module is no longer ./index.js.`,
            }
          )
        }
        return [{ find: 'react-dom', replacement: reactDomModule }]
      },
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
