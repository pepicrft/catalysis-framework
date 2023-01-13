import { coreLogger } from '@catalysisdev/core/node/logger'

export const infoLogger = () => {
  return coreLogger().child('info')
}
