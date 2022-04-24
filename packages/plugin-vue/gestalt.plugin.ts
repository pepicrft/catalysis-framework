import { definePlugin } from '@gestaltjs/plugins'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line import/no-default-export
export default definePlugin({
  renderer: {
    fileExtensions: ['vue'],
    requiredProjectDependencies: ['vue'],
    vitePlugins: [vue()],
  },
})
