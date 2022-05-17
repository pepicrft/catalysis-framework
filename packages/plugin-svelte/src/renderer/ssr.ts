function content(componentModuleId: string) {
  return `
    import ComponentToRender from '${componentModuleId}';

    export default async function () {
      const { html } = ComponentToRender.render()
      return { html }
    }
    `
}

const extension = 'js'

export const ssr = { content, extension }
