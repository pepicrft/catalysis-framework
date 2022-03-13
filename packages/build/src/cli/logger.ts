import { logger } from '@gestaltjs/core/cli'

const buildLogger = () => {
  return logger.core().child('build')
}

export default buildLogger
