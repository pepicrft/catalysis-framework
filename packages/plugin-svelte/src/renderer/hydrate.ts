export function content(componentModuleId: string, domElementSelector: string) {
  return `
  import ComponentToHydrate from '${componentModuleId}';

  const domElement = document.querySelector('${domElementSelector}');
  new ComponentToHydrate({
    target: domElement,
    props: {},
  })
  `
}

const extension = 'js'

export const hydrate = { content, extension }
