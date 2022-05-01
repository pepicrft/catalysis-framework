import { defineServerRenderer } from '@gestaltjs/plugins'
import ReactDOMServer from 'react-dom/server'

export const serverRenderer = defineServerRenderer({
  render: async function (component) {
    return { html: ReactDOMServer.renderToString(component) }
  },
})
