import { logger } from '@gestaltjs/core/cli'

export const routesLogger = () => {
  return logger.coreLogger().child('routes')
}
