import { coreLogger } from '@catalysisdev/core/node/logger'

export const generateLogger = () => {
  return coreLogger().child('generate')
}
