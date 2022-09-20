function content(componentModuleId: string) {
  return `
    import ReactDOMServer from 'react-dom/server';
    import ComponentToRender from '${componentModuleId}';

    export default async function () {
      return await ReactDOMServer.renderToString(<ComponentToRender/>)
    }
    `
}

const extension = 'jsx'

export const ssr = { content, extension }
