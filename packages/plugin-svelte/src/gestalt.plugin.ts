import { definePlugin } from 'gestaltjs/plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { hydrate } from './renderer/hydrate'
import { ssr } from './renderer/ssr'

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
      moduleExtension: 'svelte',
      extensions: ['svelte'],
      plugins: [svelte()],
      hydrate,
      ssr,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
