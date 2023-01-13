import { coreLogger } from '@catalysisdev/core/node/logger'

export const dbLogger = () => {
  return coreLogger().child('db')
}
