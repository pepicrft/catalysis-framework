import { definePlugin } from '@gestaltjs/plugins'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line import/no-default-export
export default definePlugin({
  renderer: {
    fileExtensions: ['jsx', 'tsx'],
    requiredProjectDependencies: ['react'],
    vitePlugins: [react()],
  },
})
