import { definePlugin } from '@gestaltjs/plugins'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { clientRenderer } from './renderer/client'
import { serverRenderer } from './renderer/server'

type SveltePluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin((options: SveltePluginOptions = {}) => {
  return {
    name: 'svelte',
    description:
      "Adds support for declaring UI using Svelte's declarative model",
    renderer: {
      fileExtensions: ['svelte'],
      vitePlugins: [svelte()],
      server: serverRenderer,
      client: clientRenderer,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
