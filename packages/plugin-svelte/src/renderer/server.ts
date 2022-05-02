import { ServerRenderer } from '@gestaltjs/plugins'

export const serverRenderer: ServerRenderer = {
  render: async function (component) {
    const { html } = component.render()
    return { html }
  },
}
