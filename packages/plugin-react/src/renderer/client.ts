import { ClientRenderer } from '@gestaltjs/plugins'
import ReactDOM from 'react-dom'

// eslint-disable-next-line import/no-default-export
export const clientRenderer: ClientRenderer = {
  hydrate: async function (component, domElement) {
    ReactDOM.hydrate(component, domElement)
  },
}
