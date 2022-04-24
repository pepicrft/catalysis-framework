import { logger } from '@gestaltjs/core/cli'

export const dbLogger = () => {
  return logger.coreLogger().child('db')
}
