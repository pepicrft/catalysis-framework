import { definePlugin } from '@gestaltjs/core/node/plugin'
import vue from '@vitejs/plugin-vue'
import { hydrate } from './renderer/hydrate'
import { ssr } from './renderer/ssr'

type VuePluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin((options: VuePluginOptions = {}) => {
  return {
    name: 'vue',
    description: "Adds support for declaring UI using Vue's declarative model",
    renderer: {
      moduleExtension: 'vue',
      extensions: ['vue'],
      plugins: [
        vue({
          template: {
            compilerOptions: {},
          },
        }),
      ],
      ssr,
      hydrate,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
