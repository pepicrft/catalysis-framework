import { coreLogger } from '@catalysisdev/core/node/logger'

export const routesLogger = () => {
  return coreLogger().child('routes')
}
