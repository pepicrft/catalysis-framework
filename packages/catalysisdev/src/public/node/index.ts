import { runOclifCLI } from '@catalysisdev/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default runOclifCLI({
  moduleURL: import.meta.url,
})
