import { coreLogger } from '@gestaltjs/core/node/logger'

export const routesLogger = () => {
  return coreLogger().child('routes')
}
