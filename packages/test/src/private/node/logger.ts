import { coreLogger } from '@catalysisdev/core/node/logger'

export const testLogger = () => {
  return coreLogger().child('test')
}
