import { coreLogger } from '@catalysisdev/core/node/logger'

export const devLogger = () => {
  return coreLogger().child('dev')
}
