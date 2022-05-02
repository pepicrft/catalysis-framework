import { ClientRenderer } from '@gestaltjs/plugins'
import { createSSRApp } from 'vue'

export const clientRenderer: ClientRenderer = {
  hydrate: async function (component, domElement) {
    const app = createSSRApp(component)
    app.mount(domElement)
  },
}
