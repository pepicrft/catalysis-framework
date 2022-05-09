import { logger } from '@gestaltjs/core/cli'

export const generateLogger = () => {
  return logger.coreLogger().child('generate')
}
