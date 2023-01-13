import { coreLogger } from '@catalysisdev/core/node/logger'

export const buildLogger = () => {
  return coreLogger().child('build')
}
