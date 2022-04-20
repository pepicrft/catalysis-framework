import { logger } from '@gestaltjs/core/cli'

const dbLogger = () => {
  return logger.core().child('plugins')
}

export default dbLogger
