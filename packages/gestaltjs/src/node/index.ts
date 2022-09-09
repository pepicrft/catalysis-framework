import { runCLI } from '@gestaltjs/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default runCLI({
  moduleURL: import.meta.url,
})
