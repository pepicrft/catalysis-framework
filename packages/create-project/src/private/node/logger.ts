import { coreLogger } from '@catalysisdev/core/node/logger'

export const createProjectLogger = () => {
  return coreLogger().child('create-project')
}
