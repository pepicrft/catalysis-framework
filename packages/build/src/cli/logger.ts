import { logger } from '@gestaltjs/core/cli'

const buildLogger = () => {
  return logger.gestalt().child('build')
}

export default buildLogger
