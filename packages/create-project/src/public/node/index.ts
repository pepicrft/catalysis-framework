import { runOclifInitCLI } from '@catalysisdev/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default runOclifInitCLI({
  moduleURL: import.meta.url,
  name: 'create-project',
})
