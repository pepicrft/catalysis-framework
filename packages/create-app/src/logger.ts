import { logger } from '@gestaltjs/core/cli'

const createProjectLogger = () => {
  return logger.core().child('create-project')
}

export default createProjectLogger
