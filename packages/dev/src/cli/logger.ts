import { logger } from '@gestaltjs/core/cli'

export const devLogger = () => {
  return logger.core().child('dev')
}
