import { logger } from '@gestaltjs/core/cli'

const checkLogger = () => {
  return logger.core().child('check')
}

export default checkLogger
