import { logger } from '@gestaltjs/core/cli'

export const devLogger = () => {
  return logger.coreLogger().child('dev')
}
