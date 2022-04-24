import { logger } from '@gestaltjs/core/cli'

export const testLogger = () => {
  return logger.coreLogger().child('test')
}
