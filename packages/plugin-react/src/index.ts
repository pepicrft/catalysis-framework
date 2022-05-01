import { definePlugin } from '@gestaltjs/plugins'
import react from '@vitejs/plugin-react'
import { clientRenderer } from './renderer/client'
import { serverRenderer } from './renderer/server'

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
      requiredProjectDependencies: ['react'],
      vitePlugins: [react()],
      client: clientRenderer,
      server: serverRenderer,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
