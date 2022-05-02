import { ClientRenderer } from '@gestaltjs/plugins'

export const clientRenderer: ClientRenderer = {
  hydrate: async function (component, domElement) {
    new component({
      target: domElement,
      props: {},
    })
  },
}
