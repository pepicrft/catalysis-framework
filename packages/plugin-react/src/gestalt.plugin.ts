import { definePlugin, path } from '@gestaltjs/plugins'
import react from '@vitejs/plugin-react'
import { clientRenderer } from './renderer/client'
import { serverRenderer } from './renderer/server'
// eslint-disable-next-line import/no-nodejs-modules
import { fileURLToPath } from 'node:url'

type ReactPluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin(async (options: ReactPluginOptions = {}) => {
  const nodeModulesDirectories: string[] = []
  const reactDomModule = await path.findUp('node_modules', {
    cwd: path.dirname(fileURLToPath(import.meta.url)),
    type: 'directory',
  })
  if (reactDomModule) {
    nodeModulesDirectories.push(reactDomModule)
  }
  return {
    name: 'react',
    description:
      "Adds support for declaring UI using React's declarative model",
    renderer: {
      moduleExtension: 'jsx',
      fileExtensions: ['jsx', 'tsx'],
      plugins: [react()],
      client: clientRenderer,
      server: serverRenderer,
      nodeModulesDirectories,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
