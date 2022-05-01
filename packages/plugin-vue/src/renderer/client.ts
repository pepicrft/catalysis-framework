import { defineClientRenderer } from '@gestaltjs/plugins'
import { createSSRApp } from 'vue'

export const clientRenderer = defineClientRenderer({
  hydrate: async function (component, domElement) {
    const app = createSSRApp(component)
    app.mount(domElement)
  },
})
