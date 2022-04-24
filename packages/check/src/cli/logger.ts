import { logger } from '@gestaltjs/core/cli'

export const checkLogger = () => {
  return logger.coreLogger().child('check')
}
