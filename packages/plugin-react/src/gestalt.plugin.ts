import { definePlugin } from '@gestaltjs/plugins'
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
        return [{ find: 'react-dom', replacement: '...' }]
      },
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
