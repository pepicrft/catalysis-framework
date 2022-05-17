import { definePlugin } from '@gestaltjs/plugins'
import react from '@vitejs/plugin-react'
import { hydrate } from './renderer/hydrate'
import { ssr } from './renderer/ssr'

type ReactPluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin(async (options: ReactPluginOptions = {}) => {
  return {
    name: 'react',
    description:
      "Adds support for declaring UI using React's declarative model",
    renderer: {
      moduleExtension: 'jsx',
      extensions: ['jsx', 'tsx'],
      plugins: [react()],
      hydrate,
      ssr,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
