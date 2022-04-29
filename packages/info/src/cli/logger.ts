import { logger } from '@gestaltjs/core/cli'

export const infoLogger = () => {
  return logger.coreLogger().child('info')
}
