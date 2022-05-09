import { definePlugin } from '@gestaltjs/plugins'

type NetlifyPluginOptions = {
  // No options yet
}

// eslint-disable-next-line import/no-default-export
const plugin = definePlugin((options: NetlifyPluginOptions = {}) => {
  return {
    name: 'netlify',
    description:
      'Adds support for adapting Gestalt projects to deploy them to Netlify',
  }
})

// eslint-disable-next-line import/no-default-export
export default plugin
