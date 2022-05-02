import { definePlugin } from '@gestaltjs/plugins'
import vue from '@vitejs/plugin-vue'
import { clientRenderer } from './renderer/client'
import { serverRenderer } from './renderer/server'

type VuePluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin((options: VuePluginOptions = {}) => {
  return {
    name: 'vue',
    description: "Adds support for declaring UI using Vue's declarative model",
    renderer: {
      fileExtensions: ['vue'],
      requiredProjectDependencies: ['vue'],
      vitePlugins: [vue()],
      server: serverRenderer,
      client: clientRenderer,
    },
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
