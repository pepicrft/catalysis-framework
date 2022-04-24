import { logger } from '@gestaltjs/core/cli'

export const createProjectLogger = () => {
  return logger.coreLogger().child('create-project')
}
