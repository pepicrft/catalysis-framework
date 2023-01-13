import { coreLogger } from '@catalysisdev/core/node/logger'

export const checkLogger = () => {
  return coreLogger().child('check')
}
