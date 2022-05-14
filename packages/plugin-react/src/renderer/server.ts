import { renderer } from '@gestaltjs/plugins'

export const serverRenderer: renderer.Server = {
  render: function (componentModuleId: string) {
    return `
    import ReactDOMServer from 'react-dom/server';
    import ComponentToRender from '${componentModuleId}';

    export default async funcion () {
      return await ReactDOMServer.renderToString(<ComponentToRender/>)
    }
    `
  },
}
