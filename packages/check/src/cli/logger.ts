import { logger } from '@gestaltjs/core/cli'

const checkLogger = () => {
  return logger.gestalt().child('type-check')
}

export default checkLogger
