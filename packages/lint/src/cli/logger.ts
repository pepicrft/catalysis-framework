import { logger } from '@gestaltjs/core/cli'

const lintLogger = () => {
  return logger.core().child('lint')
}

export default lintLogger
