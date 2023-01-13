import { runInitCLI } from '@catalysisdev/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default runInitCLI({
  moduleURL: import.meta.url,
  name: 'create-project',
})
