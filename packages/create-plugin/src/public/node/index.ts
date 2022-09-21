import { runInitCLI } from '@gestaltjs/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default runInitCLI({
  moduleURL: import.meta.url,
  name: 'create-plugin',
})
