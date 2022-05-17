export function content(componentModuleId: string, domElementSelector: string) {
  return `
  import { createSSRApp } from 'vue'
  import ComponentToHydrate from '${componentModuleId}';

  const domElement = document.querySelector('${domElementSelector}');
  const app = createSSRApp(ComponentToHydrate)
  app.mount(domElement)
  `
}

const extension = 'vue'

export const hydrate = { content, extension }
