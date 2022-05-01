import { defineServerRenderer } from '@gestaltjs/plugins'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

export const serverRenderer = defineServerRenderer({
  render: async function (component) {
    const app = createSSRApp(component)
    const ctx = {}
    const html = await renderToString(app, ctx)
    return { html }
  },
})
