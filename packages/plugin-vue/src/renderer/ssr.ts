function content(componentModuleId: string) {
  return `
    import { createSSRApp } from 'vue'
    import { renderToString } from 'vue/server-renderer'
    import ComponentToRender from '${componentModuleId}';

    export default async function() {
      const app = createSSRApp(ComponentToRender)
      const ctx = {}
      const html = await renderToString(app, ctx)
      return html
    }
    `
}

const extension = 'js'

export const ssr = { content, extension }
