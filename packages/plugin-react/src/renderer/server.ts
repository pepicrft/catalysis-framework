import { ServerRenderer } from '@gestaltjs/plugins'
import ReactDOMServer from 'react-dom/server'

export const serverRenderer: ServerRenderer = {
  render: async function (component) {
    return { html: ReactDOMServer.renderToString(component) }
  },
}
