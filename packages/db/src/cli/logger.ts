import { logger } from '@gestaltjs/core/cli'

const dbLogger = () => {
  return logger.gestalt().child('db')
}

export default dbLogger
