import { defineClientRenderer } from '@gestaltjs/plugins'
import ReactDOM from 'react-dom'

// eslint-disable-next-line import/no-default-export
export const clientRenderer = defineClientRenderer({
  hydrate: async function (component, domElement) {
    ReactDOM.hydrate(component, domElement)
  },
})
