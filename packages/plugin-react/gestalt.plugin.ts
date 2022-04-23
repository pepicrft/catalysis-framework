import { definePlugin } from '@gestaltjs/plugins'

// eslint-disable-next-line import/no-default-export
export default definePlugin({
  renderer: {
    fileExtensions: ['jsx', 'tsx'],
    requiredProjectDependencies: ['react'],
    vitePlugins: [],
  },
})
