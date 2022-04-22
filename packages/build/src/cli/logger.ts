import { logger } from '@gestaltjs/core/cli'

export const buildLogger = () => {
  return logger.core().child('build')
}
