import { defineServerRenderer } from '@gestaltjs/plugins'
import ReactDOMServer from 'react-dom/server'

// eslint-disable-next-line import/no-default-export
export default defineServerRenderer({
  render: async function (component) {
    return { html: ReactDOMServer.renderToString(component) }
  },
})
