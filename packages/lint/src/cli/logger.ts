import { logger } from '@gestaltjs/core/cli'

const lintLogger = () => {
  return logger.gestalt().child('lint')
}

export default lintLogger
