import { logger } from '@gestaltjs/core/cli'

export const createProjectLogger = () => {
  return logger.core().child('create-project')
}
