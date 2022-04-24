import { defineClientRenderer } from '@gestaltjs/plugins'
import { createSSRApp } from 'vue'

// eslint-disable-next-line import/no-default-export
export default defineClientRenderer({
  hydrate: async function (component, domElement) {
    const app = createSSRApp(component)
    app.mount(domElement)
  },
})
