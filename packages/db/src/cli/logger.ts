import { logger } from '@gestaltjs/core/cli'

const dbLogger = () => {
  return logger.core().child('db')
}

export default dbLogger
