import { logger } from '@gestaltjs/core/cli'

export const testLogger = () => {
  return logger.core().child('test')
}
