import { logger } from '@gestaltjs/core/cli'

export const pluginsLogger = () => {
  return logger.core().child('plugins')
}
